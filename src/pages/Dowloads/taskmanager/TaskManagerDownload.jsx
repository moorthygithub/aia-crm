import { Card, Input } from "@material-tailwind/react";
import axios from "axios";
import Moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../../../base/BaseUrl";
import {
  DownloadTaskManagerDownload,
  DownloadTaskManagerView,
} from "../../../components/buttonIndex/ButtonComponents";
import { ButtonCreate } from "../../../components/common/ButtonCss";
import PageTitle from "../../../components/common/PageTitle";
import Layout from "../../../layout/Layout";
import DownloadCommon from "../../download/delivery/DeliveryDownload";
function TaskManager() {
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  //FROM AND TO DATE
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  var todayback = yyyy + "-" + mm + "-" + dd;

  const firstdate = Moment().startOf("month").format("YYYY-MM-DD");

  const [downloadStudent, setStudentDownload] = useState({
    task_date_from: firstdate,
    task_date_to: todayback,
  });

  const onInputChange = (e) => {
    setStudentDownload({
      ...downloadStudent,
      [e.target.name]: e.target.value,
    });
  };

  //SUBMIT
  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      task_date_from: downloadStudent.task_date_from,
      task_date_to: downloadStudent.task_date_to,
    };
    var v = document.getElementById("dowRecp").checkValidity();
    var v = document.getElementById("dowRecp").reportValidity();
    e.preventDefault();
    if (v) {
      setIsButtonDisabled(true);

      axios({
        url: BASE_URL + "/api/panel-download-taskmanager",
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
          link.setAttribute("download", "TaskManagement_list.csv");
          document.body.appendChild(link);
          link.click();
          toast.success("TaskManagement is Downloaded Successfully");
          setIsButtonDisabled(false);
        })
        .catch((err) => {
          toast.error("TaskManagement is Not Downloaded");
          setIsButtonDisabled(false);
        });
    }
  };

  const onReportView = (e) => {
    e.preventDefault();
    localStorage.setItem("task_date_from", downloadStudent.task_date_from);
    localStorage.setItem("task_date_to", downloadStudent.task_date_to);
    navigate("/taskmanagementreport");
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
        <PageTitle title={"Download Task Manager"} backLink="-1" />
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
                name="task_date_from"
                className="required"
                value={downloadStudent.task_date_from}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="w-full">
              <Input
                type="date"
                label="To Date"
                className="required"
                name="task_date_to"
                value={downloadStudent.task_date_to}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
          <div className="flex justify-center m-3">
            <DownloadTaskManagerDownload
              className={ButtonCreate}
              onClick={onSubmit}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Downloading..." : "Download"}
            </DownloadTaskManagerDownload>

            <DownloadTaskManagerView
              className={ButtonCreate}
              onClick={onReportView}
            >
              View
            </DownloadTaskManagerView>
          </div>
        </form>
      </Card>
    </Layout>
  );
}

export default TaskManager;
