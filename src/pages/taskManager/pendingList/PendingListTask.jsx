import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import TaskManagerFilter from "../../../components/TaskManagerFilter";
import { ContextPanel } from "../../../utils/ContextPanel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { MdEdit } from "react-icons/md";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import {
  TaskManagerPendingCreateRepetitive,
  TaskManagerPendingCreateTask,
  TaskManagerPendingEdit,
} from "../../../components/buttonIndex/ButtonComponents";

const PendingListTask = () => {
  const [pendingTListData, setPendingTListData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPendingTData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-taskmanager-pending-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let res = response.data?.taskmanager;
        if (Array.isArray(res)) {
          const tempRows = res.map((item) => [
            moment(item["task_from_date"]).format("DD-MM-YYYY"),
            moment(item["task_to_date"]).format("DD-MM-YYYY"),

            item["name"],
            item["task_details"],
            item["task_status"],
            item["id"],
          ]);
          console.log(tempRows, "tempRows");
          setPendingTListData(response.data?.taskmanager);
        }
      } catch (error) {
        console.error("Error fetching pending list task manager data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingTData();
    setLoading(false);
  }, []);

  const columns = [
    {
      name: "task_from_date",
      label: "Assign Date",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return moment(value).format("DD-MM-YYYY");
        },
      },
    },
    {
      name: "task_to_date",
      label: "Due Date",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return moment(value).format("DD-MM-YYYY");
        },
      },
    },
    {
      name: "name",
      label: "Employee",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "task_details",
      label: "Task Details",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "task_status",
      label: "Status",
      options: {
        filter: false,
        sort: false,
      },
    },

    {
      name: "id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id) => {
          return (
            <div className="flex items-center space-x-2">
              <TaskManagerPendingEdit
                onClick={() => navigate(`/edit-task/${id}`)}
                title="Edit"
                className="h-5 w-5 cursor-pointer"
              />
            </div>
          );
        },
      },
    },
  ];
  const options = {
    selectableRows: "none",
    elevation: 0,

    responsive: "standard",
    viewColumns: true,
    download: true,
    filter: false,
    print: true,
  };
  return (
    <Layout>
      <TaskManagerFilter />
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Task Manager Pending List
        </h3>
        <div>
          {/* <Link
            to="/add-task"
            className="mr-2 btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md"
          >
            + Add Task
          </Link>
          <Link
            to="/add-repetitive"
            className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md"
          >
            + Add Repetitive
          </Link> */}

          <TaskManagerPendingCreateTask
            className="text-sm font-[400] cursor-pointer text-white bg-blue-600 hover:bg-red-700 p-2 rounded-lg shadow-md transition-all hover:scale-105 active:scale-95 w-36 mx-2"
            onClick={() => navigate("/add-task")}
          ></TaskManagerPendingCreateTask>
          <TaskManagerPendingCreateRepetitive
            className="text-sm font-[400] cursor-pointer text-white bg-blue-600 hover:bg-red-700 p-2 rounded-lg shadow-md transition-all hover:scale-105 active:scale-95 w-36 mx-2"
            onClick={() => navigate("/add-repetitive")}
          ></TaskManagerPendingCreateRepetitive>
        </div>
      </div>
      <div className="mt-5">
        <MUIDataTable
          data={pendingTListData ? pendingTListData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default PendingListTask;
