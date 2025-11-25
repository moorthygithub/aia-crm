import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import Moment from "moment";
import { useEffect, useState } from "react";
import { FaArrowCircleLeft, FaArrowDown } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../../../base/BaseUrl";
import PageTitle from "../../../components/common/PageTitle";
import Layout from "../../../layout/Layout";

function TaskManagerReport() {
  const TABLE_HEAD = [
    "From Date",
    "To Date",
    "Name",
    "Details",
    "Complete Date",

    "Status",
  ];

  const [taskmanagersummary, setTaskManagerSummary] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      task_date_from: localStorage.getItem("task_date_from"),
      task_date_to: localStorage.getItem("task_date_to"),
    };

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
        link.setAttribute("download", "TaskManager_list.csv");
        document.body.appendChild(link);
        link.click();
        toast.success("TaskManager is Downloaded Successfully");
      })
      .catch((err) => {
        toast.error("TaskManager is Not Downloaded");
      });
  };

  useEffect(() => {
    let data = {
      task_date_from: localStorage.getItem("task_date_from"),
      task_date_to: localStorage.getItem("task_date_to"),
    };

    axios({
      url: BASE_URL + "/api/fetch-taskmanager-report",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setTaskManagerSummary(res.data.taskmanager);
    });
  }, []);

  return (
    <Layout>
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
      <Card className="mt-4">
        <div className="flex justify-between items-center px-4 mr-10">
          {/* Title */}
          <PageTitle
            title={"Task Manager List"}
            icon={FaArrowCircleLeft}
            backLink="/taskmanager"
          />

          {/* Download Button */}
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={onSubmit}
          >
            <FaArrowDown className="text-lg" />
            <span className="font-bold text-gray-700 text-sm">Download</span>
          </div>
        </div>

        <hr></hr>

        <Card className="h-screen w-full p-4">
          <div className="overflow-x-auto h-full">
            <table className="w-full min-w-max table-auto text-left max-h-screen overflow-y-auto">
              <thead className="sticky top-0 bg-white z-10">
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-gray-300 pb-4 pt-10 px-6"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none capitalize"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {taskmanagersummary.map((dataSumm, key) => {
                  const isLast = key === taskmanagersummary.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-gray-300";

                  return (
                    <tr key={key} className="hover:bg-gray-50">
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {Moment(dataSumm.task_from_date).format("DD-MM-YYYY")}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {Moment(dataSumm.task_to_date).format("DD-MM-YYYY")}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {dataSumm.name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600 max-w-[250px]"
                        >
                          {dataSumm.task_details}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {Moment(dataSumm.task_complete_date).format(
                            "DD-MM-YYYY"
                          )}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {dataSumm.task_status}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </Card>
    </Layout>
  );
}

export default TaskManagerReport;
