import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Input } from "@material-tailwind/react";
import Layout from "../../layout/Layout";
import Fields from "../../components/common/TextField/TextField";
import BASE_URL from "../../base/BaseUrl";
import { toast } from "react-toastify";
import { ButtonBack, ButtonCreate } from "../../components/common/ButtonCss";

const mobile = [
  {
    value: "IOS",
    label: "IOS",
  },
  {
    value: "Android",
    label: "Android",
  },
];

const pc = [
  {
    value: "Windows",
    label: "Windows",
  },
  {
    value: "Mac",
    label: "Mac",
  },
];

const status = [
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Inactive",
    label: "Inactive",
  },
];

const EditStudent = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [employedata, setEmploye] = useState([]);

  const [student, setStudent] = useState({
    address: "",
    user_dob: "",
    mobile_device: "",
    admission_form_no: "",
    qualification: "",
    employee_name: "",
    remarks: "",
    status: "",
    pc_device: "",
  });

  const fetchEnquiryData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-employee-name`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const employees = response.data.employee || [];

      const formattedEmployees = employees.map((emp) => ({
        label: emp.employee_name,
        value: emp.employee_name,
      }));

      setEmploye(formattedEmployees);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchCourseData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-student-by-id/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setStudent(response.data.studentData);
    } catch (error) {
      console.error("Error fetching vendor data:", error);
    }
  };
  useEffect(() => {
    fetchCourseData();
    fetchEnquiryData();
  }, []);
  const onInputChange = (e) => {
    setStudent({
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
      user_dob: student.user_dob,
      address: student.address,
      admission_form_no: student.admission_form_no,
      qualification: student.qualification,
      remarks: student.remarks,
      mobile_device: student.mobile_device,
      pc_device: student.pc_device,
      status: student.status,
      employee_name: student.employee_name,
    };
    try {
      const response = await axios.put(
        `${BASE_URL}/api/panel-update-student/${id}"`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.code == "200") {
        toast.success("Data Updated Successfully");
        navigate(`/view-student/${localStorage.getItem("s_id")}`);
      } else {
        if (response.data.code == "401") {
          toast.error("Student Duplicate Entry");
        } else if (response.data.code == "402") {
          toast.error("Student Duplicate Entry");
        } else {
          toast.error("Student Duplicate Entry");
        }
      }
    } catch (error) {
      console.error("Error updating Student:", error);
      toast.error("Error updating Student");
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
            Edit Student
          </h1>
        </div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
              {/* UID */}
              <div>
                <label className="block text-gray-700 ">UID</label>
                <span className="mt-1 text-black">{student.user_uid}</span>
              </div>
              <div>
                <label className="block text-gray-700 ">Full Name</label>
                <span className="mt-1 text-black">{student.name}</span>
              </div>
              <div>
                <label className="block text-gray-700 ">Mobile</label>
                <span className="mt-1 text-black">{student.mobile}</span>
              </div>
              <div>
                <label className="block text-gray-700 ">Email</label>
                <span className="mt-1 text-black">{student.email}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              <div>
                <Input
                  type="date"
                  label="DOB"
                  name="user_dob"
                  value={student.user_dob}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="md:col-span-2">
                <Fields
                  required={true}
                  title="Address"
                  type="textField"
                  autoComplete="Name"
                  name="address"
                  value={student.address}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
              <div>
                <Fields
                  required={true}
                  title="Mobile Device for Study"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="mobile_device"
                  value={student.mobile_device}
                  onChange={(e) => onInputChange(e)}
                  options={mobile}
                />
              </div>

              <div>
                <Fields
                  required={true}
                  title="PC Device for Study"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="pc_device"
                  value={student.pc_device}
                  onChange={(e) => onInputChange(e)}
                  options={pc}
                />
              </div>

              <div>
                <Input
                  required
                  label="Admission Form Number"
                  type="text"
                  name="admission_form_no"
                  value={student.admission_form_no}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              {/* Qualification */}
              <div>
                <Input
                  required
                  label="Qualification"
                  type="text"
                  name="qualification"
                  value={student.qualification}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
              {/* Remark */}
              <div className="col-span-2">
                <Input
                  label="Remarks"
                  type="text"
                  name="remarks"
                  value={student.remarks}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              {/* Exam Date */}
              <Fields
                title="Employee Name"
                type="whatsappDropdown"
                autoComplete="Name"
                name="employee_name"
                value={student.employee_name}
                onChange={(e) => onInputChange(e)}
                options={employedata}
              />
              <div>
                <Fields
                  required={true}
                  title="Status"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="status"
                  value={student.status}
                  onChange={(e) => onInputChange(e)}
                  options={status}
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

export default EditStudent;
