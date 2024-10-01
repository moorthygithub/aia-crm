import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import RequestFilter from "../../../components/RequestFilter";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import MUIDataTable from "mui-datatables";
import { ContextPanel } from "../../../utils/ContextPanel";

const CompletedListRequest = () => {
  const [completedRListData, setCompletedRListData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCompletyedRData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-request-notpending-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCompletedRListData(response.data?.urequest);
      } catch (error) {
        console.error("Error fetching completed list request data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompletyedRData();
    setLoading(false);
  }, []);

  const columns = [
    {
      name: "course_request_date",
      label: "Date",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "name",
      label: "Full Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "course_opted",
      label: "Course",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "course_request",
      label: "Request Type",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "course_request_remarks",
      label: "Remark",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "course_request_status",
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
      <RequestFilter />
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Request Completed List
        </h3>

        <Link className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md">
          + Add Request
        </Link>
      </div>
      <div className="mt-5">
        <MUIDataTable
          data={completedRListData ? completedRListData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default CompletedListRequest;
