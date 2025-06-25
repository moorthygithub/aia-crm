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
import { ButtonBack, ButtonCreate } from "../../components/common/ButtonCss";
import moment from "moment";

const video_lecture = [
  {
    value: "Edukrypt",
    label: "Edukrypt",
  },
  {
    value: "Classplus",
    label: "Classplus",
  },
  {
    value: "Googledrive",
    label: "Googledrive",
  },
  {
    value: "Pending",
    label: "Pending",
  },
];

const pq_issue = [
  {
    value: "Edukrypt",
    label: "Edukrypt",
  },
  {
    value: "Classplus",
    label: "Classplus",
  },
  {
    value: "Googledrive",
    label: "Googledrive",
  },
  {
    value: "Gleim",
    label: "Gleim",
  },
  {
    value: "Pending",
    label: "Pending",
  },
];

const letter_status = [
  {
    value: "Shared",
    label: "Shared",
  },
  {
    value: "Not Applicable",
    label: "Not Applicable",
  },
  {
    value: "Pending",
    label: "Pending",
  },
];

const add_wa = [
  {
    value: "Added",
    label: "Added",
  },
  {
    value: "Not Applicable",
    label: "Not Applicable",
  },
  {
    value: "Pending",
    label: "Pending",
  },
];

const wel_call = [
  {
    value: "Done",
    label: "Done",
  },
  {
    value: "Not Applicable",
    label: "Not Applicable",
  },
  {
    value: "Pending",
    label: "Pending",
  },
];

const delivery_c = [
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Added",
    label: "Added",
  },
  {
    value: "Not Applicable",
    label: "Not Applicable",
  },
];

const lr = [
  {
    value: "Shared",
    label: "Shared",
  },
  {
    value: "Not Applicable",
    label: "Not Applicable",
  },
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Joined",
    label: "Joined",
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

const course_status = [
  {
    value: "Ongoing",
    label: "Ongoing",
  },
  {
    value: "Qualified",
    label: "Qualified",
  },
  {
    value: "Course Expired",
    label: "Course Expired",
  },
  {
    value: "Blacklisted",
    label: "Blacklisted",
  },
  {
    value: "Extended",
    label: "Extended",
  },
];

const EditStudentCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [student, setStudentCourse] = useState({
    course_validity: "",
    course_fees: "",
    course_mode_payment: "",
    course_received_bank: "",
    course_vlis: "",
    course_pqis: "",
    course_status: "",
    course_wls: "",
    course_awag: "",
    course_wc: "",
    course_lr: "",
    course_remarks: "",
    course_expiry_new_date: "",
    course_expiry_date: "",
    delivery_c_status: "",
    course_start_date: "",
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("id");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-course-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setStudentCourse(response.data.studentCourse);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchUserData();
  }, []);

  const onInputChange = (e) => {
    setStudentCourse({
      ...student,
      [e.target.name]: e.target.value,
    });
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
      course_validity: student.course_validity,
      course_fees: student.course_fees,
      course_mode_payment: student.course_mode_payment,
      course_received_bank: student.course_received_bank,
      course_vlis: student.course_vlis,
      course_pqis: student.course_pqis,
      course_status: student.course_status,
      course_wls: student.course_wls,
      course_awag: student.course_awag,
      course_wc: student.course_wc,
      course_lr: student.course_lr,
      course_remarks: student.course_remarks,
      course_expiry_new_date: student.course_expiry_new_date,
      course_expiry_date: student.course_expiry_date,
      delivery_c_status: student.delivery_c_status,
    };
    try {
      const response = await axios.put(
        `${BASE_URL}/api/panel-update-course/${id}`,
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
      //   toast.error("Error updating Course");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const handleBackButton = (e) => {
    e.preventDefault();
    navigate(`/view-student/${localStorage.getItem("s_id")}`);
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
            Edit Course
          </h1>
        </div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5  mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  UID
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {student.user_uid}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Course
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {student.course_opted}
                  {student.course_opted === "Other" && (
                    <span className="text-gray-500">
                      {" "}
                      ({student.course_opted_other})
                    </span>
                  )}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Validity Course
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {student.course_validity}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Start Date
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {moment(student.course_start_date).format("DD-MM-YYYY")}
                </p>
              </div>

              <div>
                <Input
                  required
                  label="Expiry Date"
                  type="date"
                  name="course_expiry_date"
                  value={student.course_expiry_date}
                  onChange={onInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div>
                <Input
                  required
                  label="Fees Paid"
                  type="number"
                  autoComplete="off"
                  name="course_fees"
                  value={student.course_fees}
                  onChange={onInputChange}
                />
              </div>
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
              <div className="md:col-span-2">
                <Input
                  label="Receiving Bank Name"
                  type="text"
                  name="course_received_bank"
                  value={student.course_received_bank}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div>
                <Fields
                  title="Video Lectures Issue Status"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="course_vlis"
                  value={student.course_vlis}
                  onChange={(e) => onInputChange(e)}
                  options={video_lecture}
                />
              </div>
              <div>
                <Fields
                  title="PQ Issue Status"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="course_pqis"
                  value={student.course_pqis}
                  onChange={(e) => onInputChange(e)}
                  options={pq_issue}
                />
              </div>
              <div>
                <Fields
                  title="Welcome Letter Status"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="course_wls"
                  value={student.course_wls}
                  onChange={(e) => onInputChange(e)}
                  options={letter_status}
                />
              </div>
              <div>
                <Fields
                  title="Add to the WA Group"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="course_awag"
                  value={student.course_awag}
                  onChange={(e) => onInputChange(e)}
                  options={add_wa}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div>
                <Fields
                  title="Welcome Call"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="course_wc"
                  value={student.course_wc}
                  onChange={(e) => onInputChange(e)}
                  options={wel_call}
                />
              </div>
              <div>
                <Fields
                  title="LinkedIn Request"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="course_lr"
                  value={student.course_lr}
                  onChange={(e) => onInputChange(e)}
                  options={lr}
                />
              </div>
              <div>
                <Fields
                  required={true}
                  title="Course Status"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="course_status"
                  value={student.course_status}
                  onChange={(e) => onInputChange(e)}
                  options={course_status}
                />
              </div>
              {student.course_status == "Extended" && (
                <div>
                  <Input
                    label="Expiry Date"
                    required
                    type="date"
                    name="course_expiry_new_date"
                    value={student.course_expiry_new_date}
                    onChange={(e) => onInputChange(e)}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              )}
              <div>
                <Fields
                  title="Delivery Status"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="delivery_c_status"
                  value={student.delivery_c_status}
                  onChange={(e) => onInputChange(e)}
                  options={delivery_c}
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
                className={ButtonCreate}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Updating..." : "Update"}
              </button>

              <button
                type="button"
                onClick={handleBackButton}
                className={ButtonBack}
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

export default EditStudentCourse;
