import axios from "axios";
import moment from "moment";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../base/BaseUrl";
import {
  TaskManagerCompletedCreateRepetitive,
  TaskManagerCompletedCreateTask,
} from "../../../components/buttonIndex/ButtonComponents";
import { ButtonCreate } from "../../../components/common/ButtonCss";
import TaskManagerFilter from "../../../components/TaskManagerFilter";
import Layout from "../../../layout/Layout";

const CompletedListTask = () => {
  const [completedTListData, setCompletedTListData] = useState(null);
  const navigate = useNavigate();

  const fetchCompletedTData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-taskmanager-completed-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let res = response.data?.taskmanager;
      if (Array.isArray(res)) {
        setCompletedTListData(response.data?.taskmanager);
      }
    } catch (error) {
      console.error("Error fetching completed list task manager data", error);
    }
  };
  useEffect(() => {
    fetchCompletedTData();
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
        sort: true,
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
      name: "updated_at",
      label: "Completed Date",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          // Check if value exists and is valid
          if (!value || value === "" || value === null || value === undefined) {
            return "-";
          }

          const formatted = moment(value).isValid()
            ? moment(value).format("DD-MM-YYYY")
            : "-"; // fallback if date is invalid

          return formatted;
        },
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
          Task Manager Completed List
        </h3>
        <div>
          {/* <Link
            to="/add-task"
            className="btn mr-2 btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md"
          >
            + Add Task
          </Link>
          <Link
            to="/add-repetitive"
            className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md"
          >
            + Add Repetitive
          </Link> */}
          <TaskManagerCompletedCreateTask
            className={ButtonCreate}
            onClick={() => navigate("/add-task")}
          ></TaskManagerCompletedCreateTask>
          <TaskManagerCompletedCreateRepetitive
            className={ButtonCreate}
            onClick={() => navigate("/add-repetitive")}
          ></TaskManagerCompletedCreateRepetitive>
        </div>
      </div>
      <div className="mt-5">
        <MUIDataTable
          data={completedTListData ? completedTListData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default CompletedListTask;
