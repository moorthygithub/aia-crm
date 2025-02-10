import Layout from "../../../layout/Layout";
import PageTitle from "../../../components/common/PageTitle";
import Dropdown from "../../../components/common/DropDown";
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
import {
  DownloadExamDownload,
  DownloadExamView,
} from "../../../components/buttonIndex/ButtonComponents";
import { ButtonCreate } from "../../../components/common/ButtonCss";

function Exam() {
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Current date for "To Date"
  const today = Moment().format("YYYY-MM-DD");

  // First date of the month for "From Date"
  const firstdate = Moment().startOf("month").format("YYYY-MM-DD");

  const [examDownload, setExamDownload] = useState({
    exam_date_from: firstdate,
    exam_date_to: today,
    student_uid: "",
    exam_status: "",
  });

  const status = [
    { value: "Pending", label: "Pending" },
    { value: "Qualified", label: "Qualified" },
    { value: "Not Qualified", label: "Not Qualified" },
  ];

  const onInputChange = (e) => {
    setExamDownload({
      ...examDownload,
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
      exam_date_from: examDownload.exam_date_from,
      exam_date_to: examDownload.exam_date_to,
      student_uid: examDownload.student_uid,
      exam_status: examDownload.exam_status,
    };

    var isValid = document.getElementById("dowRecp").checkValidity();
    document.getElementById("dowRecp").reportValidity();
    if (isValid) {
      setIsButtonDisabled(true);

      axios({
        url: BASE_URL + "/api/panel-download-exam",
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
          link.setAttribute("download", "exam_list.csv");
          document.body.appendChild(link);
          link.click();
          toast.success("Exam is Downloaded Successfully");
          setIsButtonDisabled(false);
        })
        .catch((err) => {
          toast.error("Exam is Not Downloaded");
          setIsButtonDisabled(false);
        });
    }
  };

  //LOCAL STORAGE SET
  const onReportView = (e) => {
    e.preventDefault();
    localStorage.setItem("exam_date_from", examDownload.exam_date_from);
    localStorage.setItem("exam_date_to", examDownload.exam_date_to);
    localStorage.setItem("student_uid", examDownload.student_uid);
    localStorage.setItem("exam_status", examDownload.exam_status);
    navigate("/examreport");
  };

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
        <PageTitle title={"Download Exam"} backLink="-1" />
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
                className="required"
                value={examDownload.exam_date_from}
                onChange={(e) => onInputChange(e)}
                name="exam_date_from"
              />
            </div>
            <div className="w-full">
              <Input
                type="date"
                label="To Date"
                className="required"
                value={examDownload.exam_date_to}
                onChange={(e) => onInputChange(e)}
                name="exam_date_to"
              />
            </div>

            <div className="w-full">
              <Dropdown
                label="Student"
                className="required"
                options={student.map((option) => ({
                  value: option.user_uid,
                  label: option.name,
                }))}
                onChange={(value) => {
                  setExamDownload((prev) => ({
                    ...prev,
                    student_uid: value,
                  }));
                }}
                name="student_uid"
              />
            </div>
            <div className="w-full">
              <Dropdown
                label="Status"
                className="required"
                options={status}
                onChange={(value) =>
                  setExamDownload({
                    ...examDownload,
                    exam_status: value,
                  })
                }
              />
            </div>
            {/* <div className="w-77">
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
            </div> */}
          </div>
          <div className="flex justify-center m-3">
            <DownloadExamDownload
              className={ButtonCreate}
              onClick={onSubmit}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Downloading..." : "Download"}
            </DownloadExamDownload>

            <DownloadExamView
              className={ButtonCreate}
              onClick={onReportView}
            ></DownloadExamView>
          </div>
        </form>
      </Card>
    </Layout>
  );
}

export default Exam;
