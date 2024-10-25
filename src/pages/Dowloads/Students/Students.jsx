import Layout from "../../../layout/Layout";
import PageTitle from "../../../components/common/PageTitle";
import Dropdown from "../../../components/common/DropDown";
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
import DownloadCommon from "../../download/delivery/DeliveryDownload";
function Student() {
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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

  const [downloadStudent, setStudentDownload] = useState({
    student_date_from: firstdate,
    student_date_to: todayback,
    student_uid: "",
    student_course: "",
  });

  const onInputChange = (e) => {
    setStudentDownload({
      ...downloadStudent,
      [e.target.name]: e.target.value,
    });
  };

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

  //SUBMIT
  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      student_date_from: downloadStudent.student_date_from,
      student_date_to: downloadStudent.student_date_to,
      student_uid: downloadStudent.student_uid,
      student_course: downloadStudent.student_course,
    };
    var v = document.getElementById("dowRecp").checkValidity();
    var v = document.getElementById("dowRecp").reportValidity();
    e.preventDefault();
    console.log("Data : ", data);
    if (v) {
      setIsButtonDisabled(true);

      axios({
        url: BASE_URL + "/api/panel-download-student",
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
          link.setAttribute("download", "Student_list.csv");
          document.body.appendChild(link);
          link.click();
          toast.success("Student is Downloaded Successfully");
          setIsButtonDisabled(false);
        })
        .catch((err) => {
          toast.error("Student is Not Downloaded");
          console.error("Download error:", err.response);
          setIsButtonDisabled(false);
        });
    }
  };

  //LOCAL STORAGE SET
  const onReportView = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "student_date_from",
      downloadStudent.student_date_from
    );
    localStorage.setItem("student_uid", downloadStudent.student_uid);
    localStorage.setItem("student_date_to", downloadStudent.student_date_to);
    localStorage.setItem("student_course", downloadStudent.student_course);
    navigate("/studentreport");
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
      console.log(res.data.course, "datacourse");
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
      <div className="mt-4 mb-6">
        <PageTitle
          title={"Download Student"}
          // icon={FaArrowCircleLeft}
          backLink="-1"
        />
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
                label="From Date "
                name="student_date_from"
                className="required"
                value={downloadStudent.student_date_from}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="w-full">
              <Input
                type="date"
                label="To Date"
                className="required"
                name="student_date_to"
                value={downloadStudent.student_date_to}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="w-full">
              <Dropdown
                label="Course"
                className="required"
                name="student_course"
                options={course.map((item, index) => ({
                  value: item.courses_name,
                  label: item.courses_name,
                }))}
                onChange={(value) => {
                  setStudentDownload((prev) => ({
                    ...prev,
                    student_course: value,
                  }));
                }}
              />
            </div>

            <div className="w-full">
              <Dropdown
                label="Student"
                className="required"
                name="student_uid"
                options={student.map((option, index) => ({
                  value: option.user_uid,
                  label: option.name,
                }))}
                onChange={(value) => {
                  setStudentDownload((prev) => ({
                    ...prev,
                    student_uid: value,
                  }));
                }}
              />
            </div>

            <div className="w-77">
              <Button
                color="blue"
                fullWidth
                onClick={onSubmit}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Downloading..." : "Download"}
              </Button>
            </div>

            <div className="w-full">
              <Button color="blue" fullWidth onClick={onReportView}>
                View
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </Layout>
  );
}

export default Student;
