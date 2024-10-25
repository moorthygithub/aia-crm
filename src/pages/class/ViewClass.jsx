import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, IconButton, Tooltip } from "@material-tailwind/react";
import axios from "axios";
import baseURL from "../../base/BaseUrl";
import Moment from "moment";
import MUIDataTable from "mui-datatables";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../layout/Layout";
import { IoMdPersonAdd } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { BiLeftArrowAlt } from "react-icons/bi";

const ViewClass = () => {
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [classes, setClass] = useState({});
  const [attendance, setAttendance] = useState([]);
  const [notAttend, setNotAttend] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${baseURL}/api/panel-fetch-class-view-by-id/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setClass(res.data.class);
        setAttendance(res.data.attendance);
        setNotAttend(res.data.notattend);
      });
  }, [id]);

  const sendclassEmail = (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    let data = {
      class_id: id,
    };

    axios
      .post(`${baseURL}/api/panel-send-email-template-not-attend-class`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.code == "200") {
          toast.success("Email Sent Successfully");
        } else {
          toast.error("Email Not Sent Successfully");
        }
        setIsButtonDisabled(false);
      });
  };

  const updateDataSub = (e, value) => {
    e.preventDefault();
    let data = {
      class_id: id,
      attendence_id: value,
    };

    axios
      .post(`${baseURL}/api/panel-delete-attendance-extra`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Data Updated Successfully");
        setClass(res.data.class);
        setAttendance(res.data.attendance);
        setNotAttend(res.data.notattend);
      });
  };

  const updateDataAdd = (e, value) => {
    e.preventDefault();
    let data = {
      class_id: id,
      user_uid: value.split("#")[1],
    };

    axios
      .post(`${baseURL}/api/panel-create-attendance-extra`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Data Updated Successfully");
        setClass(res.data.class);
        setAttendance(res.data.attendance);
        setNotAttend(res.data.notattend);
      });
  };

  const whatsApp1 = (e, value) => {
    e.preventDefault();
    const phoneNumber = value.split("#")[0];
    const uid = value.split("#")[1];

    const message = `Hello dear.\nWe Missed You in Sunday’s online class...`;

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    let data = { uid };

    axios
      .post(`${baseURL}/api/panel-send-not-attend-whatsapp`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.code == "200") {
          window.open(whatsappLink, "_blank");
        } else {
          toast.error("WhatsApp message not sent successfully");
        }
      });
  };

  const columns = [
    {
      name: "UID No",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Full Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Mobile",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    
    {
      name: "Actions",
      options: {
        filter: false,
        print: false,
        sort: false,
        download: false,
        customBodyRender: (value) => (
          <Tooltip content="Add to Not Attend" placement="top">
            <div>
              <IoPerson
                className="cursor-pointer text-blue-500"
                onClick={(e) => updateDataSub(e, value)}
                size={20}
              />
            </div>
          </Tooltip>
        ),
      },
    },
  ];

  const columns1 = [
    {
      name: "UID No",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Full Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Mobile",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Actions",
      options: {
        filter: false,
        print: false,
        sort: false,
        download: false,
        customBodyRender: (value) => (
          <div className="flex space-x-2">
            <Tooltip content="Add to Attend" placement="top">
              <div>
                <IoMdPersonAdd
                  className="cursor-pointer text-blue-500"
                  onClick={(e) => updateDataAdd(e, value)}
                  size={20}
                />
              </div>
            </Tooltip>
            <Tooltip content="Missed Class" placement="top">
              <div>
                <FaWhatsapp
                  className="cursor-pointer text-blue-500"
                  onClick={(e) => whatsApp1(e, value)}
                  size={20}
                />
              </div>
            </Tooltip>
          </div>
        ),
      },
    },
  ];

  const options = {
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 25],
    responsive: "standard",
    viewColumns: true,
    download: false,
    print: false,
    setRowProps: (rowData) => {
      return {
        style: {
          borderBottom: "10px solid #f1f7f9",
        },
      };
    },
  };

  return (
    <Layout>
      <div className="textfields-wrapper mt-4">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />{" "}
        <div className="flex mb-4 mt-6">
          <Link to="/class">
            <BiLeftArrowAlt className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl" />
          </Link>
          <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
            View List
          </h1>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <form id="addIndiv" autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <div>
                <label className="text-blue-700 text-sm mb-0">Course</label>
                <br />
                <span className="text-black text-lg">
                  {classes.class_subject}
                </span>
              </div>
              <div>
                <label className="text-blue-700 text-sm mb-0">Date</label>
                <br />
                <span className="text-black text-lg">
                  {Moment(classes.class_date).format("DD-MM-YYYY")}
                </span>
              </div>
              <div>
                <label className="text-blue-700 text-sm mb-0">From Time</label>
                <br />
                <span className="text-black text-lg">{classes.class_time}</span>
              </div>
              <div>
                <label className="text-blue-700 text-sm mb-0">To Time</label>
                <br />
                <span className="text-black text-lg">
                  {classes.class_to_time}
                </span>
              </div>
            </div>

            <MUIDataTable
              title="Attendance List"
              data={attendance.map((item) => [
                item.user_uid,
                item.name,
                item.mobile,
                item.email,
                item.id,
              ])}
              columns={columns}
              options={options}
            />

            <MUIDataTable
              title="Not Attend List"
              data={notAttend.map((item) => [
                item.user_uid,
                item.name,
                item.mobile,
                item.email,
                `${item.user_country_code}${item.mobile}#${item.user_uid}`,
              ])}
              columns={columns1}
              options={options}
            />

            <div className="flex justify-center mt-6">
              <Button
                onClick={sendclassEmail}
                className="mr-4 bg-gradient-to-r from-yellow-500 to-teal-400 text-white flex items-center"
                disabled={isButtonDisabled}
              >
                <CiMail className="mr-2" />{" "}
                {isButtonDisabled ? "Sending..." : "Send Email to Not Attend"}
              </Button>
              <Link to="/class">
                <Button color="green">Back</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ViewClass;
