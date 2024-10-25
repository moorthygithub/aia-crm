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

const subject = [
  {
    value: "M1",
    label: "M1",
  },
  {
    value: "M2",
    label: "M2",
  },
  {
    value: "M3",
    label: "M3",
  },
  {
    value: "M4",
    label: "M4",
  },
  {
    value: "CAMS",
    label: "CAMS",
  },
  {
    value: "CIAC",
    label: "CIAC",
  },
  {
    value: "CIAP1",
    label: "CIAP1",
  },
  {
    value: "CIAP2",
    label: "CIAP2",
  },
  {
    value: "CIAP3",
    label: "CIAP3",
  },
  {
    value: "Other",
    label: "Other",
  },
];

const status = [
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Qualified",
    label: "Qualified",
  },
  {
    value: "Not Qualified",
    label: "Not Qualified",
  },
];

const EditExam = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [student, setStudentExam] = useState({
    exam_subject: "",
    exam_status: "",
    exam_date: "",
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
          `${BASE_URL}/api/panel-fetch-exam-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStudentExam(response.data.studentExam);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchUserData();
  }, []);

  const onInputChange = (e) => {
    setStudentExam({
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
      exam_subject: student.exam_subject,
      exam_status: student.exam_status,
      exam_date: student.exam_date,
    };
    try {
      const response = await axios.put(
        `${BASE_URL}/api/panel-update-exam/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.code == 200) {
        toast.success("Exam Updated Successfully");
        navigate(`/view-student/${localStorage.getItem("s_id")}`);
      } else {
        if (response.data.code == 401) {
          toast.error("Exam Duplicate Entry");
        } else if (response.data.code == 402) {
          toast.error("Exam Duplicate Entry");
        } else {
          toast.error("Exam Duplicate Entry");
        }
      }
    } catch (error) {
      console.error("Error updating Exam:", error);
      toast.error("Error updating Exam");
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
            Edit Exam
          </h1>
        </div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {/* UID */}
              <div>
                <label className="block text-gray-700 ">UID</label>
                <span className="mt-1 text-black">{student.user_uid}</span>
              </div>

              <div>
                <Fields
                  required={true}
                  title="Register for exam"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="exam_status"
                  value={student.exam_status}
                  onChange={(e) => onInputChange(e)}
                  options={status}
                />
              </div>

              <div>
                <Fields
                  required={true}
                  title="Subject"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="exam_subject"
                  value={student.exam_subject}
                  onChange={(e) => onInputChange(e)}
                  options={subject}
                />
              </div>
              <div>
                <Input
                  required
                  label="Exam Date"
                  type="date"
                  autoComplete="Name"
                  name="exam_date"
                  value={student.exam_date}
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
               {isButtonDisabled ? 'Updating...' : 'Update'}
              </button>

              <button
               type="button"
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

export default EditExam;
