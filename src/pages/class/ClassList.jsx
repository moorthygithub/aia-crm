import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { Link, useNavigate } from "react-router-dom";
import { ContextPanel } from "../../utils/ContextPanel";
import { CiSquarePlus } from "react-icons/ci";

const ClassList = () => {
  const [classListData, setClassListData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchClassData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-class-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setClassListData(response.data?.class);
      } catch (error) {
        console.error("Error fetching class data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClassData();
    setLoading(false);
  }, []);

  const columns = [
    {
      name: "class_date",
      label: "Date",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "class_time",
      label: "Time",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          const time_class = tableMeta.rowData[1];
          const time_class_to = tableMeta.rowData[2];
          return `${time_class} - ${time_class_to}`;
        },
      },
    },
    {
      name: "class_to_time",
      label: "Time To",
      options: {
        display: false,
      },
    },
    {
      name: "class_subject",
      label: "Subject",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "class_status",
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
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Class List
        </h3>

        <Link className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md">
          + Add Class
        </Link>
      </div>
      <div className="mt-5">
        <MUIDataTable
          data={classListData ? classListData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default ClassList;
