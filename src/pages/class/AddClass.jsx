import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import { Input } from "@material-tailwind/react";
import Fields from "../../components/common/TextField/TextField";
import Layout from "../../layout/Layout";
import BASE_URL from "../../base/BaseUrl";
import { toast } from "react-toastify";

const AddClass = () => {
  const navigate = useNavigate();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [student, setClass] = useState({
    class_date: "",
    class_subject: "",
    class_time: "",
    class_to_time: "",
    class_url: "",
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
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/panel-fetch-course`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCourse(response.data.course);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchUserData();
  }, []);

  const onInputChange = (e) => {
    setClass({
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
      class_date: student.class_date,
      class_subject: student.class_subject,
      class_time: student.class_time,
      class_to_time: student.class_to_time,
      class_url: student.class_url,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/panel-create-class`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          
          },
        }
      );

      if (response.data.code == "200") {
        toast.success("Data Updated Successfully");
        navigate('/class');
      } else {
        if (response.data.code == "401") {
          toast.error("Class Duplicate Entry");
        } else if (response.data.code == "402") {
          toast.error("Class Duplicate Entry");
        } else {
          toast.error("Class Duplicate Entry");
        }
      }
    } catch (error) {
      console.error("Error updating vendor:", error);
      toast.error("Error updating Class");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <Layout>
      <div>
        {/* Title */}
        <div className="flex mb-4 mt-6">
          <Link to="/class">
            <MdKeyboardBackspace className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl" />
          </Link>
          <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
            Add Class
          </h1>
        </div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
              {/* Course */}
              <div>
                <Fields
                  required={true}
                  title="Course"
                  type="courseDropdown"
                  autoComplete="Name"
                  name="class_subject"
                  value={student.class_subject}
                  onChange={(e) => onInputChange(e)}
                  options={course}
                />
              </div>
              {/* Date */}
              <div>
                <Input
                  label="Date"
                  required
                  type="date"
                  name="class_date"
                  value={student.class_date}
                  onChange={(e) => onInputChange(e)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              {/* From Time */}
              <div>
                <Input
                  label="From Time"
                  required
                  type="time"
                  name="class_time"
                  value={student.class_time}
                  onChange={(e) => onInputChange(e)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              {/* To Time */}
              <div>
                <Input
                  required
                  label="To Time"
                  type="time"
                  name="class_to_time"
                  value={student.class_to_time}
                  onChange={(e) => onInputChange(e)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
              {/* Class URL */}
              <div>
                <Input
                  label="Class URL"
                  type="text"
                  name="class_url"
                  value={student.class_url}
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
              <Link to="/class">
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

export default AddClass;
