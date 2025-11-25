import axios from "axios";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BASE_URL from "../../../base/BaseUrl";
import {
  TaskManagerRepetativeBulkDeleteTask,
  TaskManagerRepetitiveCreate,
  TaskManagerRepetitiveEdit,
} from "../../../components/buttonIndex/ButtonComponents";
import { ButtonCreate } from "../../../components/common/ButtonCss";
import TaskManagerFilter from "../../../components/TaskManagerFilter";
import Layout from "../../../layout/Layout";

const RepetitiveList = () => {
  const [repetitiveListData, setRepetitiveListData] = useState(null);
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([]);

  const fetchPendingTData = async () => {
    try {
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
        setRepetitiveListData(response.data?.taskmanager);
      }
    } catch (error) {
      console.error("Error fetching pending list task manager data", error);
    }
  };
  useEffect(() => {
    fetchPendingTData();
  }, []);

  const columns = [
    {
      name: "select",
      label: "",
      options: {
        filter: false,
        sort: false,
        customHeadRender: () => {
          const allIds = repetitiveListData?.map((item) => item.id) || [];
          const allSelected =
            allIds.length > 0 && allIds.every((id) => selectedIds.includes(id));

          return (
            <div className="flex justify-center items-center w-full mt-6">
              <input
                type="checkbox"
                className="h-4 w-4 cursor-pointer"
                checked={allSelected}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedIds(allIds);
                  } else {
                    setSelectedIds([]);
                  }
                }}
              />
            </div>
          );
        },

        customBodyRenderLite: (dataIndex) => {
          const rowId = repetitiveListData?.[dataIndex]?.id;
          const isChecked = selectedIds.includes(rowId);

          return (
            <div className="flex justify-center items-center w-full">
              <input
                type="checkbox"
                className="h-4 w-4 cursor-pointer"
                checked={isChecked}
                onChange={() => {
                  if (isChecked) {
                    setSelectedIds(selectedIds.filter((id) => id !== rowId));
                  } else {
                    setSelectedIds([...selectedIds, rowId]);
                  }
                }}
              />
            </div>
          );
        },
      },
    },
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
        sort: true,
      },
    },
    {
      name: "task_details",
      label: "Task Details",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "task_status",
      label: "Status",
      options: {
        filter: false,
        sort: true,
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
                onClick={(e) => navigate(`/update-repetitive/${id}`)}
                className="h-5 w-5 cursor-pointer"
              />
            </div>
          );
        },
      },
    },
  ];
  const handleSubmitSelected = async () => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one task!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${BASE_URL}/api/panel-delete-taskmanager-bulk`,
        {
          task_ids: selectedIds,

          // task_status: "Completed",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code == "200") {
        toast.success(response.data.msg || "Data Deleted Successfully");
        fetchPendingTData();
        setSelectedIds([]);
      } else {
        if (response.data.code == "401") {
          toast.error(response.data.msg || "Unknown Error");
        } else {
          toast.error("Error Deleted selected items");
        }
      }
    } catch (error) {
      toast.error("Error Deleted selected items");
    }
  };
  const options = {
    selectableRows: "none",
    elevation: 0,

    responsive: "standard",
    viewColumns: true,
    download: true,
    filter: false,
    print: true,
    customToolbar: () => {
      return (
        <TaskManagerRepetativeBulkDeleteTask
          className={ButtonCreate}
          onClick={handleSubmitSelected}
        />
      );
    },
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
