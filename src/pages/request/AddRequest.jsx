import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { ImCancelCircle } from "react-icons/im";
import BASE_URL from "../../base/BaseUrl";
import Layout from "../../layout/Layout";
import Fields from "../../components/common/TextField/TextField";
import SelectPopup from "../../components/common/popup/SelectPopup";
import { toast } from "react-toastify";


const AddRequest = () => {
  const navigate = useNavigate();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [student, setRequest] = useState({
    user_uid: "",
    course_request: "",
    course_request_remarks: "",
  });

  const [requestType, setRequestType] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("id");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
  }, []);

  const [userUID, setUserUID] = useState("");

  const getUserid = (userUID) => {
    setUserUID(userUID);
    setShowmodal(false);
  };

  const [showmodal, setShowmodal] = useState(false);
  const closegroupModal = () => {
    setShowmodal(false);
  };
  const openmodal = () => {
    setShowmodal(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-request-type`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setRequestType(response.data.requestType);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchUserData();
  }, []);

  const onInputChange = (e) => {
    setRequest({
    ...student,
    [e.target.name]: e.target.value,
    });  

    if(e.target.name == 'user_uid'){

        setUserUID(e.target.value);
    }
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
      user_uid: userUID,
            course_request: student.course_request,
            course_request_remarks: student.course_request_remarks,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/panel-create-request`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
           
          },
        }
      );

      if (response.data.code == 200) {
        toast.success("Data Updated Successfully");
        navigate('/request-pending');
      } else {
        if (response.data.code == 401) {
          toast.error("Request Duplicate Entry");
        } else if (response.data.code == 402) {
          toast.error("Request Duplicate Entry");
        } else {
          toast.error("Request Duplicate Entry");
        }
      }
    } catch (error) {
      console.error("Error updating Request:", error);
      toast.error("Error updating Request");
    } finally {
      setIsButtonDisabled(false);
    }
  };


  const handleBackButton = (e) => {
    e.preventDefault(); 
    navigate(-1);
  };

  return (
    <Layout>
      <div>
        {/* Title */}
        <div className="flex mb-4 mt-6">
         
            <MdKeyboardBackspace onClick={handleBackButton} className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl" />
        
          <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
            Add Request
          </h1>
        </div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {/* Request Type */}
              <div>
                <Fields
                  required={true}
                  title="Request Type"
                  type="requestDropdown"
                  autoComplete="Name"
                  name="course_request"
                  value={student.course_request}
                  onChange={(e) => onInputChange(e)}
                  options={requestType}
                />
              </div>
              
              <div>
                <Fields
                  required={true}
                  title="Student UID"
                  type="textField"
                  autoComplete="Name"
                  name="user_uid"
                  value={userUID}
                  onChange={(e) => onInputChange(e)}
                  onClick={() => openmodal()}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
              {/* Remarks */}
              <div>
                
                 <Fields
                 
                  title="Remarks"
                  type="textField"
                  autoComplete="Name"
                  name="course_request_remarks"
                  value={student.course_request_remarks}
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
            
                <button onClick={handleBackButton} className="bg-green-500 text-white px-4 py-2 rounded-md">
                  Back
                </button>
              
            </div>
          </form>
          <Dialog open={showmodal} onClose={() => closegroupModal()}>
            <DialogTitle className="flex justify-between">
              <h1>Student UID List</h1>
              <ImCancelCircle
                className="cursor-pointer"
                onClick={() => closegroupModal()}
              />
            </DialogTitle>
            <DialogContent>
              <SelectPopup getUserid={getUserid} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
};

export default AddRequest;
