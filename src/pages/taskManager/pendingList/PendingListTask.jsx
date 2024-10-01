import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import TaskManagerFilter from "../../../components/TaskManagerFilter";
import { ContextPanel } from "../../../utils/ContextPanel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { CiSquarePlus } from "react-icons/ci";
import MUIDataTable from "mui-datatables";

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

        setPendingTListData(response.data?.taskmanager);
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
        sort: false,
      },
    },
    {
      name: "task_to_date",
      label: "Due Date",
      options: {
        filter: true,
        sort: true,
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
              <CiSquarePlus
                title="edit country list"
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
      <TaskManagerFilter />
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Task Manager Pending List
        </h3>

        <Link className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md">
          + Add Task
        </Link>
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
