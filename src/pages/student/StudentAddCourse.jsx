import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Input } from "@material-tailwind/react";
import BASE_URL from "../../base/BaseUrl";
import Layout from "../../layout/Layout";
import Fields from "../../components/common/TextField/TextField";
import { toast } from "react-toastify";

const course_validity = [
  {
    value: "6 Months",
    label: "6 Months",
  },
  {
    value: "12 Months",
    label: "12 Months",
  },
  {
    value: "18 Months",
    label: "18 Months",
  },
  {
    value: "Open",
    label: "Open",
  },
];

const mode = [
  {
    value: "Bank Transfer",
    label: "Bank Transfer",
  },
  {
    value: "Credit Card",
    label: "Credit Card",
  },
  {
    value: "International Payment",
    label: "International Payment",
  },
  {
    value: "Cash",
    label: "Cash",
  },
];

const StudentAddCourse = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [student, setStudentCourse] = useState({
    user_uid: id,
    course_opted: "",
    course_opted_other: "",
    course_validity: "",
    course_fees: "",
    course_mode_payment: "",
    course_received_bank: "",
    course_remarks: "",
  });

  const [course, setCourse] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("id");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
  }, []);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/panel-fetch-course`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCourse(response.data.course);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchCourseData();
  }, []);

  const onInputChange = (e) => {
    setStudentCourse({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleBackButton = (e) => {
    e.preventDefault(); 
    navigate(-1);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setIsButtonDisabled(true);
    const formData = {
      user_uid: student.user_uid,
      course_opted: student.course_opted,
      course_opted_other: student.course_opted_other,
      course_validity: student.course_validity,
      course_fees: student.course_fees,
      course_mode_payment: student.course_mode_payment,
      course_received_bank: student.course_received_bank,
      course_remarks: student.course_remarks,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/panel-create-course`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.code == 200) {
        toast.success("Data Updated Successfully");
        navigate(`/view-student/${localStorage.getItem("s_id")}`);
      } else {
        if (response.data.code == 401) {
          toast.error("Course Duplicate Entry");
        } else if (response.data.code == 402) {
          toast.error("Course Duplicate Entry");
        } else {
          toast.error("Course Duplicate Entry");
        }
      }
    } catch (error) {
      console.error("Error updating Course:", error);
      toast.error("Error updating Course");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <Layout>
      <div>
        {/* Title */}
        <div className="flex mb-4 mt-6">
          <MdKeyboardBackspace
            onClick={handleBackButton}
            className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl"
          />

          <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
            Add Course
          </h1>
        </div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
              {/* UID */}
              <div>
                <label className="block text-gray-700 ">UID</label>
                <span className="mt-1 text-black">
                 
                  {id}
                </span>
              </div>
              <div>
                <Fields
                  required={true}
                  title="Course"
                  type="courseDropdown"
                  autoComplete="Name"
                  name="course_opted"
                  value={student.course_opted}
                  onChange={(e) => onInputChange(e)}
                  options={course}
                />
              </div>
              {student.course_opted == "Other" && (
                <div>
                  <Input
                    fullWidth
                    label="Course Other"
                    required
                    autoComplete="Name"
                    name="course_opted_other"
                    value={student.course_opted_other}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              )}
              <div>
                <Fields
                  required={true}
                  title="Validity of the Course"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="course_validity"
                  value={student.course_validity}
                  onChange={(e) => onInputChange(e)}
                  options={course_validity}
                />
              </div>
              <div>
                <Fields
                  required={true}
                  title="Fees Paid"
                  type="textField"
                  autoComplete="Name"
                  name="course_fees"
                  value={student.course_fees}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
              <div>
                <Fields
                  required={true}
                  title="Mode of Payment"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="course_mode_payment"
                  value={student.course_mode_payment}
                  onChange={(e) => onInputChange(e)}
                  options={mode}
                />
              </div>
              <div className="md:col-span-3">
                <Fields
                 
                  title="Receiving Bank Name"
                  type="textField"
                  autoComplete="Name"
                  name="course_received_bank"
                  value={student.course_received_bank}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
            <div className="md:col-span-3">
                <Input
                  
                  label="Remarks"
                  type="text"
                  name="course_remarks"
                  value={student.course_remarks}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="mt-4 text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Submiting..." : "Submit"}
              </button>

              <button
                onClick={handleBackButton}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default StudentAddCourse;
