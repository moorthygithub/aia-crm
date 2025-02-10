import Layout from "../../../layout/Layout";
import PageTitle from "../../../components/common/PageTitle";

import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import { Card } from "@material-tailwind/react";
import Moment from "moment";
import { useState, useEffect } from "react";
import BASE_URL from "../../../base/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DownloadCommon from "../../../pages/download/delivery/DeliveryDownload";
import Dropdown from "../../../components/common/DropDown";
import {
  DownloadAttendanceDownloadAttend,
  DownloadAttendanceDownloadNotAttend,
  DownloadAttendanceViewAttend,
  DownloadAttendanceViewNotAttend,
} from "../../../components/buttonIndex/ButtonComponents";

function Attendance() {
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isButtonDisableds, setIsButtonDisableds] = useState(false);

  const handleClick = () => {
    navigate("-1");
  };

  //FROM AND TO DATE
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  var todayback = yyyy + "-" + mm + "-" + dd;

  const firstdate = Moment().startOf("month").format("YYYY-MM-DD");

  const [downloadDelivery, setAttendanceDownload] = useState({
    class_date_from: firstdate,
    class_date_to: todayback,
    student_uid: "",
    student_course: "",
  });

  const onInputChange = (e) => {
    setAttendanceDownload({
      ...downloadDelivery,
      [e.target.name]: e.target.value,
    });
  };

  //SUBMIT
  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      class_date_from: downloadDelivery.class_date_from,
      class_date_to: downloadDelivery.class_date_to,
      student_uid: downloadDelivery.student_uid,
      student_course: downloadDelivery.student_course,
    };
    var v = document.getElementById("dowRecp").checkValidity();
    var v = document.getElementById("dowRecp").reportValidity();
    if (v) {
      setIsButtonDisabled(true);

      axios({
        url: BASE_URL + "/api/panel-download-attendance",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "attendance_list.csv");
          document.body.appendChild(link);
          link.click();
          toast.success("Attendence is Downloaded Successfully");
          setIsButtonDisabled(false);
          setIsButtonDisableds(false);
        })
        .catch((err) => {
          toast.error("Attendence is Not Downloaded");
          setIsButtonDisabled(false);
          setIsButtonDisableds(false);
        });
    }
  };

  //LOCAL STORAGE SET
  const onReportView = (e) => {
    e.preventDefault();
    localStorage.setItem("class_date_from", downloadDelivery.class_date_from);
    localStorage.setItem("class_date_to", downloadDelivery.class_date_to);
    localStorage.setItem("student_uid", downloadDelivery.student_uid);
    localStorage.setItem("student_course", downloadDelivery.student_course);
    navigate("/attendancereport");
  };

  // SUBMIT FOR NOT ATTEND
  const onSubmit1 = (e) => {
    e.preventDefault();
    let data = {
      class_date_from: downloadDelivery.class_date_from,
      class_date_to: downloadDelivery.class_date_to,
      student_uid: downloadDelivery.student_uid,
      student_course: downloadDelivery.student_course,
    };
    var v = document.getElementById("dowRecp").checkValidity();
    var v = document.getElementById("dowRecp").reportValidity();
    if (v) {
      setIsButtonDisableds(true);
      axios({
        url: BASE_URL + "/api/panel-download-notattend",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          console.log(res, "res");
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "notattend_list.csv");
          document.body.appendChild(link);
          link.click();
          toast.success("Attendence is Downloaded Successfully");
          setIsButtonDisableds(false);
        })
        .catch((err) => {
          toast.error("Attendence is Not Downloaded");
          setIsButtonDisableds(false);
        });
    }
  };

  const onReportView1 = (e) => {
    e.preventDefault();
    localStorage.setItem("class_date_from", downloadDelivery.class_date_from);
    localStorage.setItem("class_date_to", downloadDelivery.class_date_to);
    localStorage.setItem("student_uid", downloadDelivery.student_uid);
    localStorage.setItem("student_course", downloadDelivery.student_course);
    navigate("/notattend");
  };

  //FETCHCOURSE
  const [course, setCourse] = useState([]);
  useEffect(() => {
    axios({
      url: BASE_URL + "/api/panel-fetch-course",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setCourse(res.data.course);
    });
  }, []);

  //STUDENT GET
  const [student, setStudent] = useState([]);
  useEffect(() => {
    axios({
      url: BASE_URL + "/api/panel-fetch-student",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setStudent(res.data.student);
    });
  }, []);

  return (
    <Layout>
      <DownloadCommon />
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
      />
      <div className="mb-6">
        <PageTitle title={"Download Attendance"} backLink="-1" />
      </div>
      <Card className="p-4">
        <h3 className="text-red-500 mb-5">
          Leave blank if you want all records.
        </h3>

        <form id="dowRecp" autoComplete="off">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="w-full">
              <Input
                type="date"
                label="From Date"
                name="class_date_from"
                value={downloadDelivery.class_date_from}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="w-full">
              <Input
                type="date"
                label="To Date"
                name="class_date_to"
                value={downloadDelivery.class_date_to}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="w-full">
              <Dropdown
                label="Course"
                name="student_course"
                options={course.map((item, index) => ({
                  value: item.courses_name,
                  label: item.courses_name,
                }))}
                onChange={(value) => {
                  setAttendanceDownload((prev) => ({
                    ...prev,
                    student_course: value,
                  }));
                }}
              />
            </div>
            <div className="w-full">
              <Dropdown
                label="Student"
                name="student_uid"
                options={student.map((option, index) => ({
                  value: option.user_uid,
                  label: option.name,
                }))}
                onChange={(value) => {
                  setAttendanceDownload((prev) => ({
                    ...prev,
                    student_uid: value,
                  }));
                }}
              />
            </div>
            {/* <div className="w-full">
              <Button
                color="blue"
                fullWidth
                onClick={onSubmit}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Downloading..." : "Download Attend"}
              </Button>
            </div>

            <div className="w-full">
              <Button color="blue" fullWidth onClick={onReportView}>
                View Attend
              </Button>
            </div> */}
            {/* 
            <div className="w-full">
              <Button
                color="blue"
                fullWidth
                onClick={onSubmit1}
                disabled={isButtonDisableds}
              >
                {isButtonDisableds ? "Downloading..." : "Download Not Attend"}
              </Button>
            </div>

            <div className="w-full">
              <Button color="blue" fullWidth onClick={onReportView1}>
                View Not Attend
              </Button>
            </div> */}
          </div>
          <div className="flex justify-center m-3">
            <DownloadAttendanceDownloadAttend
              className="text-sm font-[400] cursor-pointer text-white bg-blue-600 hover:bg-red-700 p-2 rounded-lg shadow-md transition-all hover:scale-105 active:scale-95 w-36 mx-2"
              onClick={onSubmit}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Downloading..." : "Download"}
            </DownloadAttendanceDownloadAttend>

            <DownloadAttendanceViewAttend
              className="text-sm font-[400] cursor-pointer text-white bg-blue-600 hover:bg-red-700 p-2 rounded-lg shadow-md transition-all hover:scale-105 active:scale-95 w-36 mx-2"
              onClick={onReportView}
            ></DownloadAttendanceViewAttend>
            <DownloadAttendanceDownloadNotAttend
              className="text-sm font-[400] cursor-pointer text-white bg-blue-600 hover:bg-red-700 p-2 rounded-lg shadow-md transition-all hover:scale-105 active:scale-95 w-40 mx-2"
              onClick={onSubmit1}
            ></DownloadAttendanceDownloadNotAttend>
            <DownloadAttendanceViewNotAttend
              className="text-sm font-[400] cursor-pointer text-white bg-blue-600 hover:bg-red-700 p-2 rounded-lg shadow-md transition-all hover:scale-105 active:scale-95 w-36 mx-2"
              onClick={onReportView1}
            ></DownloadAttendanceViewNotAttend>
          </div>
        </form>
      </Card>
    </Layout>
  );
}

export default Attendance;
