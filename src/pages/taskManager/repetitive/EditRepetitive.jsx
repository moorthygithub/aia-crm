import { Spinner, Textarea } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BASE_URL from "../../../base/BaseUrl";
import { ButtonBack, ButtonCreate } from "../../../components/common/ButtonCss";
import Fields from "../../../components/common/TextField/TextField";
import Layout from "../../../layout/Layout";

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
const FieldStatus = [
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Inactive",
    label: "Inactive",
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

const EditRepetitive = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [taskDetails, setTaskDetails] = useState([]);

  const [enquiry, setEnquiry] = useState({
    task_details: "",
    user_id: "",
    task_for: "",
    task_day: "",
    task_status: "",
  });

  const [loading, setLoading] = useState(false);

  const fetchById = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-taskmanager-repetitive-by-id/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEnquiry(response.data.taskmanager);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };
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
  useEffect(() => {
    if (id) {
      fetchById();
    }
    fetchUserData();
  }, [id]);

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
      task_status: enquiry.task_status,
    };

    try {
      const response = await axios.put(
        `${BASE_URL}/api/panel-update-taskmanager-repetitive-all/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.code == "200") {
        toast.success(response.data.msg || "Data Updated Successfully");
        navigate("/repetitive-list");
      } else {
        if (response.data.code == "401") {
          toast.error(response.data.msg || "Task Duplicate Entry");
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
        <div className="flex mb-4 mt-6">
          <MdKeyboardBackspace
            onClick={() => navigate("/repetitive-list")}
            className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl"
          />
          <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
            Edit Repetitive Task
          </h1>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-80">
            <Spinner color="blue" size="xl" />
          </div>
        ) : (
          <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
            <form onSubmit={onSubmit} autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
                <div>
                  <Fields
                    required={true}
                    title="Status"
                    type="whatsappDropdown"
                    autoComplete="Name"
                    name="task_status"
                    value={enquiry.task_status}
                    onChange={(e) => onInputChange(e)}
                    options={FieldStatus}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
                <div>
                  <Textarea
                    label="Task Details"
                    required
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
                  {isButtonDisabled ? "Updatting..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/repetitive-list")}
                  className={ButtonBack}
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EditRepetitive;
