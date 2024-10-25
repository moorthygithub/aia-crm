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

const AddCourse = () => {
  const navigate = useNavigate();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [course, setCourse] = useState({
    courses_name: "",
    courses_d_no: "",
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("id");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
  }, []);

  const onInputChange = (e) => {
    setCourse({
      ...course,
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
      courses_name: course.courses_name,
      courses_d_no: course.courses_d_no,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/panel-create-courses`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.code == 200) {
        toast.success("Data Updated Successfully");
        navigate('/courses');
      } else {
        if (response.data.code == 401) {
          toast.error("Couty Duplicate Entry");
        } else if (response.data.code == 402) {
          toast.error("Country Duplicate Entry");
        } else {
          toast.error("Country Duplicate Entry");
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
          <Link to="/courses">
            <MdKeyboardBackspace className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl" />
          </Link>
          <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
            Add Course
          </h1>
        </div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Course */}
              <div>
                <Fields
                  required={true}
                  title="Course"
                  type="textField"
                  autoComplete="Name"
                  name="courses_name"
                  value={course.courses_name}
                  onChange={onInputChange}
                />
              </div>

              {/* Course Duration */}
              <div>
                <Input
                  required
                  label="Course Duration"
                  type="number"
                  name="courses_d_no"
                  value={course.courses_d_no}
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="mt-4 text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                disabled={isButtonDisabled}
              >
                
                {isButtonDisabled ? 'Submiting...' : 'Submit'}
              </button>
              <Link to="/courses">
                <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                  Back
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddCourse;
