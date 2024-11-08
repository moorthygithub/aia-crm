import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, IconButton, Tooltip } from "@material-tailwind/react";
import axios from "axios";
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
import BASE_URL from "../../base/BaseUrl";

const AddAttendence = () => {
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [classes, setClass] = useState({});
  const [students, setStudents] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/panel-fetch-class-by-id/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setClass(res.data.class);
        setStudents(res.data.student);
      });
  }, [id]);


  const columns = [
    {
      name: "user_uid",
      label: "UID No",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "name",
      label: "Full Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "mobile",
      label: "Mobile",
      options: {
        display: false,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: false,
        sort: false,
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    filter: true,
    search: true,
    print: false,
    viewColumns: false,
    download: false,
    selectableRows: true,
    selectToolbarPlacement: "above",
    isRowSelectable: (dataIndex, selectedRows, data) => {
      return students[dataIndex].name == "Allotted" ? false : true;
    },
    selectableRowsOnClick: true,

    onRowsSelect: (currentRowSelected, allRowsSelected) => {
      var tempvalue = allRowsSelected.map((row) => row.dataIndex);

      var new_id = [];

      for (var i = 0; i < tempvalue.length; i++) {
        new_id.push(students[tempvalue[i]]["user_uid"]);
      }

      localStorage.setItem("selectedUserIds", new_id + "");
    },
    customToolbarSelect: () => {},
  };
  const onSubmit = (e) => {
    var schoolIdsSelected = localStorage.getItem("selectedUserIds");

    const data = {
      class_id: id,
      user_uid: schoolIdsSelected,
    };

    var v = document.getElementById("addIndiv").checkValidity();
    var v = document.getElementById("addIndiv").reportValidity();
    e.preventDefault();

    if (v) {
      setIsButtonDisabled(true);
      axios({
        url: BASE_URL + "/api/panel-create-attendance",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        if (res.data.code == "200") {
          toast.success("Attendance Added Sucessfully");
          navigate("/class");
        } else {
          toast.error("Duplicate Entry");
          setIsButtonDisabled(false);
        }
      });
    }
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
            Add Attendence
          </h1>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <form id="addIndiv" autoComplete="off" >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-4">
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
                <label className="text-blue-700 text-sm mb-0">Time</label>
                <br />
                <span className="text-black text-lg">{classes.class_time}</span>
              </div>
            </div>

            <MUIDataTable
              title={"Student List"}
              data={students ? students : []}
              columns={columns}
              options={options}
            />

            <div className="flex justify-center mt-6 gap-2">
              <button
                type="submit"
                onClick={onSubmit}
                className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md"
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Submiting..." : "Submit"}
              </button>
              <Link to="/class">
                <button className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md">Back</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddAttendence;
