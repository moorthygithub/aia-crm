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
import { toast } from "react-toastify";
import {
  TaskManagerRepetitiveCreate,
  TaskManagerRepetitiveEdit,
} from "../../../components/buttonIndex/ButtonComponents";
import { ButtonCreate } from "../../../components/common/ButtonCss";

const RepetitiveList = () => {
  const [repetitiveListData, setRepetitiveListData] = useState(null);
  console.log(repetitiveListData, "repetitiveListData");
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
          `${BASE_URL}/api/panel-fetch-taskmanager-repetitive-list`,
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
          setRepetitiveListData(response.data?.taskmanager);
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

  const onUpdate = async (e, id) => {
    const formData = {
      task_for: "",
    };
    try {
      const response = await axios.put(
        `${BASE_URL}/api/panel-update-taskmanager-repetitive/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.code == "200") {
        toast.success("Data Updated Successfully");
        setRepetitiveListData(response?.data?.taskmanager);
      } else {
        if (response.data.code == "401") {
          toast.error("Task Duplicate Entry");
        } else if (response.data.code == "402") {
          toast.error("Task Duplicate Entry");
        } else {
          toast.error("Task Duplicate Entry");
        }
      }
    } catch (error) {
      console.error("Error updating Task:", error);
      toast.error("Error updating Task");
    }
  };

  const columns = [
    {
      name: "task_for",
      label: "Task On",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "task_day",
      label: "Task Day",
      options: {
        filter: false,
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
              <TaskManagerRepetitiveEdit
                onClick={(e) => onUpdate(e, id)}
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
          Repetitive List
        </h3>

        {/* <Link
          to="/add-repetitive"
          className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md"
        >
          + Add Repetitive
        </Link> */}
        <TaskManagerRepetitiveCreate
          className={ButtonCreate}
          onClick={() => navigate("/add-repetitive")}
        ></TaskManagerRepetitiveCreate>
      </div>
      <div className="mt-5">
        <MUIDataTable
          data={repetitiveListData ? repetitiveListData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default RepetitiveList;
