import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Input } from "@material-tailwind/react";
import { toast } from "react-toastify";
import BASE_URL from "../../../base/BaseUrl";
import Layout from "../../../layout/Layout";
import Fields from "../../../components/common/TextField/TextField";
import { ButtonBack, ButtonCreate } from "../../../components/common/ButtonCss";

const status = [
  {
    value: "Month",
    label: "Month",
  },
  {
    value: "Weekly",
    label: "Weekly",
  },
];

const daysOfWeek = [
  { value: "Sunday", label: "Sunday" },
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
];

const daysOfMonth = Array.from({ length: 30 }, (_, i) => ({
  value: (i + 1).toString(),
  label: (i + 1).toString(),
}));

const AddRepetitive = () => {
  const navigate = useNavigate();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [enquiry, setEnquiry] = useState({
    task_details: "",

    user_id: "",
    task_for: "",
    task_day: "",
  });

  const [taskDetails, setTaskDetails] = useState([]);
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
          `${BASE_URL}/api/panel-fetch-user-taskmanager`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTaskDetails(response.data.userList);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchUserData();
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
      task_for: enquiry.task_for,
      task_details: enquiry.task_details,
      user_id: enquiry.user_id,
      task_day: enquiry.task_day,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/panel-create-taskmanager-repetitive`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.code == "200") {
        toast.success("Data Updated Successfully");
        navigate("/repetitive-list");
      } else {
        if (response.data.code == "401") {
          toast.error("Task Duplicate Entry");
        } else if (response.data.code == "402") {
          toast.error("Task Duplicate Entry");
        } else {
          toast.error("Task Duplicate Entry");
        }
      }
    } catch (error) {
      console.error("Error updating Task:", error);
      toast.error("Error updating Task");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <Layout>
      <div>
        {/* Title */}
        <div className="flex mb-4 mt-6">
          <Link to="/repetitive-list">
            <MdKeyboardBackspace className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl" />
          </Link>
          <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
            Add Repetitive Task
          </h1>
        </div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <Fields
                  title="Task On"
                  required={true}
                  type="whatsappDropdown"
                  name="task_for"
                  value={enquiry.task_for}
                  onChange={(e) => onInputChange(e)}
                  options={status}
                />
              </div>
              <div>
                <Fields
                  required={true}
                  title="Task Day"
                  type="whatsappDropdown"
                  name="task_day"
                  value={enquiry.task_day}
                  onChange={(e) => onInputChange(e)}
                  options={
                    enquiry.task_for == "Month" ? daysOfMonth : daysOfWeek
                  }
                />
              </div>
              {/* Due Date */}

              {/* Employee */}
              <div>
                <Fields
                  required={true}
                  title="Employee"
                  type="employeeDropdown"
                  autoComplete="Name"
                  name="user_id"
                  value={enquiry.user_id}
                  onChange={(e) => onInputChange(e)}
                  options={taskDetails}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
              {/* Task Details */}
              <div>
                <Input
                  label="Task Details"
                  required
                  type="text"
                  name="task_details"
                  value={enquiry.task_details}
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
                {isButtonDisabled ? "Submiting..." : "Submit"}
              </button>
              <Link to="/repetitive-list">
                <button className={ButtonBack}>Back</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddRepetitive;
