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
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();

  // ======================= Fetch Data ============================
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

      const result = response.data?.taskmanager;
      if (Array.isArray(result)) {
        setRepetitiveListData(result);
      }
    } catch (error) {
      console.error("Error fetching repetitive list data:", error);
    }
  };

  useEffect(() => {
    fetchPendingTData();
  }, []);

  // ======================= Columns ===============================
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

    { name: "task_for", label: "Task On" },
    { name: "task_day", label: "Task Day" },
    { name: "name", label: "Employee" },
    { name: "task_details", label: "Task Details" },
    { name: "task_status", label: "Status" },

    {
      name: "id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id) => (
          <TaskManagerRepetitiveEdit
            onClick={() => navigate(`/update-repetitive/${id}`)}
            className="h-5 w-5 cursor-pointer"
          />
        ),
      },
    },
  ];

  const handleSubmitSelected = async () => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one task!");
      return;
    }

    toast.success("Selected Tasks: " + selectedIds.join(", "));
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
      <div className="mt-5">
        <MUIDataTable
          data={repetitiveListData || []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default RepetitiveList;
