import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import axios from "axios";

import { toast } from "react-toastify";
import BASE_URL from "../../base/BaseUrl";
import Layout from "../../layout/Layout";
import Fields from "../../components/common/TextField/TextField";

const AddNotification = () => {
  const navigate = useNavigate();

  const [enquiry, setEnquiry] = useState({
    notification_heading: "",
    notification_description: "",
    notification_course: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [course, setCourse] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("id");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }

    const fetchCourseData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-notification-course`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCourse(response.data.course);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchCourseData();
  }, []);

  const onInputChange = (e) => {
    setEnquiry({
      ...enquiry,
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
      notification_heading: enquiry.notification_heading,
      notification_description: enquiry.notification_description,
      notification_course: enquiry.notification_course,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/panel-create-notification`,
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
        navigate('/notification')
      } else {
        if (response.data.code == 401) {
          toast.error("Notification Duplicate Entry");
        } else if (response.data.code == 402) {
          toast.error("Notification Duplicate Entry");
        } else {
          toast.error("Notification Duplicate Entry");
        }
      }
    } catch (error) {
      console.error("Error updating Notification:", error);
      alert("Error updating Notification");
    } finally {
      setIsButtonDisabled(false);
    }
  };


const handleBackButton =()=>{
    navigate(-1)
}

  return (
    <Layout>
      <div>
        {/* Title */}
        <div className="flex mb-4 mt-6">
          <Link to="/notification">
            <MdKeyboardBackspace className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl" />
          </Link>
          <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
            Add Notification
          </h1>
        </div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              {/* Course */}
              <div>
                <Fields
                  required={true}
                  title="Course"
                  type="courseDropdown"
                  autoComplete="Name"
                  name="notification_course"
                  value={enquiry.notification_course}
                  onChange={(e) => onInputChange(e)}
                  options={course}
                />
              </div>

              {/* Heading */}
              <div className="col-span-2">
                <Fields
                  required={true}
                  title="Heading"
                  type="textField"
                  autoComplete="Name"
                  name="notification_heading"
                  value={enquiry.notification_heading}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
              {/* Description */}
              <div>
                 <Fields
                  required={true}
                  title="Description"
                  type="textField"
                  autoComplete="Name"
                  name="notification_description"
                  value={enquiry.notification_description}
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
                
                {isButtonDisabled ? 'Submiting...' : 'Submit'}
              </button>
              <Link to="/notification">
                <button  className="bg-green-500 text-white px-4 py-2 rounded-md">
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

export default AddNotification;
