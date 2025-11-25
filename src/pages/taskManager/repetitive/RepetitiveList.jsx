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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
        setRepetitiveListData(res);
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
      name: "id",
      label: "Select",
      options: {
        filter: false,
        sort: false,
        setCellProps: () => ({
          style: { textAlign: "center", width: "60px" },
        }),

        customHeadRender: () => {
          // slice current page rows
          const currentPageRows =
            repetitiveListData?.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            ) || [];

          const pageIds = currentPageRows.map((item) => item.id);

          // check if all current page rows are selected
          const allSelected =
            pageIds.length > 0 &&
            pageIds.every((id) => selectedIds.includes(id));

          return (
            <th style={{ textAlign: "center", padding: 4, width: "60px" }}>
              <input
                type="checkbox"
                className="h-4 w-4 cursor-pointer"
                checked={allSelected}
                onChange={() => {
                  if (allSelected) {
                    // remove current page IDs
                    setSelectedIds(
                      selectedIds.filter((id) => !pageIds.includes(id))
                    );
                  } else {
                    // add only current page IDs
                    setSelectedIds([...new Set([...selectedIds, ...pageIds])]);
                  }
                }}
              />
            </th>
          );
        },

        customBodyRenderLite: (dataIndex) => {
          const row = repetitiveListData?.[dataIndex];
          const rowId = row?.id;
          const isChecked = selectedIds.includes(rowId);

          return (
            <td style={{ textAlign: "center", width: "60px" }}>
              <input
                type="checkbox"
                className="h-4 w-4 cursor-pointer"
                checked={isChecked || false}
                onChange={() => {
                  setSelectedIds(
                    isChecked
                      ? selectedIds.filter((id) => id !== rowId)
                      : [...selectedIds, rowId]
                  );
                }}
              />
            </td>
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
    elevation: 0,
    selectableRows: "none",
    page: page,
    rowsPerPage: rowsPerPage,
    rowsPerPageOptions: [10, 20, 50, 100],

    onTableChange: (action, tableState) => {
      switch (action) {
        case "changePage":
          setPage(tableState.page);
          break;

        case "changeRowsPerPage":
          setRowsPerPage(tableState.rowsPerPage);
          setPage(0);
          break;

        default:
          break;
      }
    },

    customToolbar: () => (
      <TaskManagerRepetativeBulkDeleteTask
        className={ButtonCreate}
        onClick={handleSubmitSelected}
      />
    ),
  };
  return (
    <Layout>
      <TaskManagerFilter />
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Repetitive List
        </h3>

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
