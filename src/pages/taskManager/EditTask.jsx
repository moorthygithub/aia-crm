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

const status = [
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Inspection",
    label: "Inspection",
  },
  {
    value: "Cancel",
    label: "Cancel",
  },
  {
    value: "Reschedule",
    label: "Reschedule",
  },
  {
    value: "Completed",
    label: "Completed",
  },
];

const status1 = [
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Inspection",
    label: "Submit",
  },
];

const EditTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [enquiry, setEnquiry] = useState({
    task_from_date: "",
    task_details: "",
    user_id: "",
    task_to_date: "",
    task_note: "",
    task_status: "",
  });
  const [userList, setUserList] = useState([]);
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
        setUserList(response.data.userList);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-taskmanager-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEnquiry(response.data.task);
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
      task_from_date: enquiry.task_from_date,
      task_details: enquiry.task_details,
      user_id: enquiry.user_id,
      task_to_date: enquiry.task_to_date,
      task_note: enquiry.task_note,
      task_status: enquiry.task_status,
    };
    try {
      const response = await axios.put(
        `${BASE_URL}/api/panel-update-taskmanager-by-id/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.code == '200') {
        toast.success("Data Updated Successfully");
        navigate("/task-pending");
        console.log("calling")
      } else {
        if (response.data.code == '401') {
          toast.error("Task Duplicate Entry");
        } else if (response.data.code == '402') {
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
          <Link to="/task-pending">
            <MdKeyboardBackspace className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl" />
          </Link>
          <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
            Edit Task
          </h1>
        </div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
              {/* Assign Date */}
              <div>
                <Input
                  label="Assign Date"
                  required
                  disabled
                  labelProps={{
                    style: { color: "gray" },
                  }}
                  type="date"
                  name="task_from_date"
                  value={enquiry.task_from_date}
                  onChange={(e) => onInputChange(e)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              {/* Due Date */}
              <div>
                <Input
                  label="Due Date"
                  required
                  disabled
                  type="date"
                  name="task_to_date"
                  value={enquiry.task_to_date}
                  onChange={(e) => onInputChange(e)}
                  labelProps={{
                    style: { color: "gray" },
                  }}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              {/* Employee */}
              <div>
                <Fields
                  disabled={true}
                  required={true}
                  title="Employee"
                  type="employeeDropdown"
                  autoComplete="Name"
                  name="user_id"
                  value={enquiry.user_id}
                  onChange={(e) => onInputChange(e)}
                  options={userList}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-5">
              {/* Task Details */}
              <div>
                <Input
                  label="Task Details"
                  disabled
                  required
                  type="text"
                  labelProps={{
                    style: { color: "gray" },
                  }}
                  name="task_details"
                  value={enquiry.task_details}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Comment */}
              <div className="col-span-2">
                <Input
                  label="Comment"
                  required
                  type="text"
                  name="task_note"
                  value={enquiry.task_note}
                  onChange={(e) => onInputChange(e)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              {/* Task Details */}
              <div>
                <Fields
                  required={true}
                  title="Status"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="task_status"
                  value={enquiry.task_status}
                  onChange={(e) => onInputChange(e)}
                  options={
                    localStorage.getItem("user_type_id") == "4"
                      ? status
                      : status1
                  }
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
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditTask;
