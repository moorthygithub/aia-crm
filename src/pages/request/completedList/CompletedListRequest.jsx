import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import RequestFilter from "../../../components/RequestFilter";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import MUIDataTable from "mui-datatables";
import { ContextPanel } from "../../../utils/ContextPanel";
import moment from "moment";
import { RequestCompletedCreate } from "../../../components/buttonIndex/ButtonComponents";
import { ButtonCreate } from "../../../components/common/ButtonCss";

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

        const res = response.data?.urequest;
        if (Array.isArray(res)) {
          const tempRows = res.map((item) => [
            moment(item["course_request_date"]).format("DD-MM-YYYY"),
            item["name"],
            item["course_opted"],
            item["course_request"],
            item["course_request_remarks"],
            item["course_request_status"],
            item["id"],
          ]);
          setCompletedRListData(response.data?.urequest);
        }

        // setCompletedRListData(response.data?.urequest);
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
        sort: true,
        customBodyRender: (value) => {
          return moment(value).format("DD-MM-YYYY");
        },
      },
    },
    {
      name: "name",
      label: "Full Name",
      options: {
        filter: false,
        sort: false,
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
        filter: true,
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

    responsive: "standard",
    viewColumns: true,
    download: true,
    print: true,
  };
  return (
    <Layout>
      <RequestFilter />
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Request Completed List
        </h3>
        {/* 
        <Link
          to="/add-request"
          className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md"
        >
          + Add Request
        </Link> */}
        <RequestCompletedCreate
          className={ButtonCreate}
          onClick={() => navigate("/add-request")}
        ></RequestCompletedCreate>
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
