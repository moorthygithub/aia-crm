import axios from "axios";
import moment from "moment";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BASE_URL from "../../../base/BaseUrl";
import {
  TaskManagerInspectionBulkAproveTask,
  TaskManagerInspectionCreateRepetitive,
  TaskManagerInspectionCreateTask,
  TaskManagerInspectionEdit,
} from "../../../components/buttonIndex/ButtonComponents";
import { ButtonCreate } from "../../../components/common/ButtonCss";
import TaskManagerFilter from "../../../components/TaskManagerFilter";
import Layout from "../../../layout/Layout";

const InspectionListTask = () => {
  const [inspectionTListData, setInspectionTListData] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();

  const fetchPendingTData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-taskmanager-inspection-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let res = response.data?.taskmanager;
      if (Array.isArray(res)) {
        setInspectionTListData(response.data?.taskmanager);
      }
    } catch (error) {
      console.error("Error fetching inspection list task manager data", error);
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
          const allIds = inspectionTListData?.map((item) => item.id) || [];
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
          const rowId = inspectionTListData?.[dataIndex]?.id;
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
      name: "id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id) => {
          return (
            <div className="flex items-center space-x-2">
              <TaskManagerInspectionEdit
                onClick={() => navigate(`/edit-task/${id}`)}
                className="h-5 w-5 cursor-pointer capitalize"
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
        `${BASE_URL}/api/panel-update-taskmanager-bulk`,
        {
          task_ids: selectedIds,

          task_status: "Completed",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code == "200") {
        toast.success(response.data.msg || "Data Updated Successfully");
        fetchPendingTData();
        setSelectedIds([]);
      } else {
        if (response.data.code == "401") {
          toast.error(response.data.msg || "Unknown Error");
        } else {
          toast.error("Error submitting selected items");
        }
      }
    } catch (error) {
      toast.error("Error submitting selected items");
      console.error("Error submitting selected items", error);
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
        <TaskManagerInspectionBulkAproveTask
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
          Task Manager Inspection List
        </h3>
        <div>
          <TaskManagerInspectionCreateTask
            className={ButtonCreate}
            onClick={() => navigate("/add-task")}
          ></TaskManagerInspectionCreateTask>
          <TaskManagerInspectionCreateRepetitive
            className={ButtonCreate}
            onClick={() => navigate("/add-repetitive")}
          ></TaskManagerInspectionCreateRepetitive>
        </div>
      </div>
      <div className="mt-5">
        <MUIDataTable
          data={inspectionTListData ? inspectionTListData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default InspectionListTask;
