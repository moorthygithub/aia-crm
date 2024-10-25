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

const cc = [
  {
    value: "Done",
    label: "Done",
  },
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Not Applicable",
    label: "Not Applicable",
  },
];

const wG = [
  {
    value: "Done",
    label: "Done",
  },
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Not Applicable",
    label: "Not Applicable",
  },
];

const lo = [
  {
    value: "Done",
    label: "Done",
  },
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Not Applicable",
    label: "Not Applicable",
  },
];

const cs = [
  {
    value: "Done",
    label: "Done",
  },
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Not Applicable",
    label: "Not Applicable",
  },
];

const smp = [
  {
    value: "Done",
    label: "Done",
  },
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Not Applicable",
    label: "Not Applicable",
  },
];

const Gr = [
  {
    value: "Done",
    label: "Done",
  },
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Not Applicable",
    label: "Not Applicable",
  },
];

const ra = [
  {
    value: "Done",
    label: "Done",
  },
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Not Applicable",
    label: "Not Applicable",
  },
];

const ravl = [
  {
    value: "Done",
    label: "Done",
  },
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Not Applicable",
    label: "Not Applicable",
  },
];

const rfsG = [
  {
    value: "Done",
    label: "Done",
  },
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Not Applicable",
    label: "Not Applicable",
  },
];

const is = [
  {
    value: "Not interested",
    label: "Not interested",
  },
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Not Applicable",
    label: "Not Applicable",
  },
  {
    value: "Recorded",
    label: "Recorded",
  },
  {
    value: "Published",
    label: "Published",
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

const EditResult = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [student, setStudentExam] = useState({
    course_opted: "",
    exam_status: "",
    exam_congratulation_call: "",
    exam_wishes_on_group: "",
    exam_add_to_alumnus: "",
    exam_linkedIn_obtained: "",
    exam_certificate_status: "",
    exam_social_media_post: "",
    exam_google_review: "",
    exam_remove_access_of_pq: "",
    exam_remove_access_of_vl: "",
    exam_remove_from_study_group: "",
    exam_interview_status: "",
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
        setStudentExam(response.data.studentCourse);
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
      exam_status: student.exam_status,
      exam_congratulation_call: student.exam_congratulation_call,
      exam_wishes_on_group: student.exam_wishes_on_group,
      exam_add_to_alumnus: student.exam_add_to_alumnus,
      exam_linkedIn_obtained: student.exam_linkedIn_obtained,
      exam_certificate_status: student.exam_certificate_status,
      exam_social_media_post: student.exam_social_media_post,
      exam_google_review: student.exam_google_review,
      exam_remove_access_of_pq: student.exam_remove_access_of_pq,
      exam_remove_access_of_vl: student.exam_remove_access_of_vl,
      exam_remove_from_study_group: student.exam_remove_from_study_group,
      exam_interview_status: student.exam_interview_status,
    };
    try {
      const response = await axios.put(
        `${BASE_URL}/api/panel-update-result/${id}`,
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
          toast.error("Result Duplicate Entry");
        } else if (response.data.code == 402) {
          toast.error("Result Duplicate Entry");
        } else {
          toast.error("Result Duplicate Entry");
        }
      }
    } catch (error) {
      console.error("Error updating Result:", error);
      toast.error("Error updating Result");
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
            Edit Result
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
                <label className="block text-gray-700 ">Course</label>
                <span className="mt-1 text-black">{student.course_opted}</span>
              </div>

              <div>
                <Fields
                  required={true}
                  title="Result of Exam"
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
                  title="Congratulation Call"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="exam_congratulation_call"
                  value={student.exam_congratulation_call}
                  onChange={(e) => onInputChange(e)}
                  options={cc}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div>
                <Fields
                  required={true}
                  title="Wishes on Group"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="exam_wishes_on_group"
                  value={student.exam_wishes_on_group}
                  onChange={(e) => onInputChange(e)}
                  options={wG}
                />
              </div>
              <div>
                <Fields
                  required={true}
                  title="Add to Alumnus"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="exam_add_to_alumnus"
                  value={student.exam_add_to_alumnus}
                  onChange={(e) => onInputChange(e)}
                  options={wG}
                />
              </div>
              <div>
                <Fields
                  required={true}
                  title="LinkedIn Obtained"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="exam_linkedIn_obtained"
                  value={student.exam_linkedIn_obtained}
                  onChange={(e) => onInputChange(e)}
                  options={lo}
                />
              </div>
              <div>
                <Fields
                  required={true}
                  title="Certificate Status"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="exam_certificate_status"
                  value={student.exam_certificate_status}
                  onChange={(e) => onInputChange(e)}
                  options={cs}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div>
                <Fields
                  required={true}
                  title="Social Media Post"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="exam_social_media_post"
                  value={student.exam_social_media_post}
                  onChange={(e) => onInputChange(e)}
                  options={smp}
                />
              </div>
              <div>
                <Fields
                  required={true}
                  title="Google Review"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="exam_google_review"
                  value={student.exam_google_review}
                  onChange={(e) => onInputChange(e)}
                  options={Gr}
                />
              </div>
              <div>
                <Fields
                  required={true}
                  title="Remove Access of PQ"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="exam_remove_access_of_pq"
                  value={student.exam_remove_access_of_pq}
                  onChange={(e) => onInputChange(e)}
                  options={ra}
                />
              </div>
              <div>
                <Fields
                  required={true}
                  title="Remove Access of VL"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="exam_remove_access_of_vl"
                  value={student.exam_remove_access_of_vl}
                  onChange={(e) => onInputChange(e)}
                  options={ravl}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div>
                <Fields
                  required={true}
                  title="Remove from Study Group"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="exam_remove_from_study_group"
                  value={student.exam_remove_from_study_group}
                  onChange={(e) => onInputChange(e)}
                  options={rfsG}
                />
              </div>
              <div>
                <Fields
                  required={true}
                  title="Interview Status"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="exam_interview_status"
                  value={student.exam_interview_status}
                  onChange={(e) => onInputChange(e)}
                  options={is}
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

export default EditResult;
