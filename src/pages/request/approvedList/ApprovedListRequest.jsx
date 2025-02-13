import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import RequestFilter from "../../../components/RequestFilter";
import { ContextPanel } from "../../../utils/ContextPanel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { MdEdit } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { Clear, Done } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import {
  RequestApprovedCancel,
  RequestApprovedCompleted,
  RequestApprovedCreate,
} from "../../../components/buttonIndex/ButtonComponents";
import { ButtonCreate } from "../../../components/common/ButtonCss";

const ApprovedListRequest = () => {
  const [approvedRListData, setApprovedRListData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  const [shouldRefetch, setShouldRefetch] = useState(false);

  const updateData = (e, value) => {
    const data = {
      course_request_status: "Completed",
    };
    axios({
      url: BASE_URL + "/api/panel-update-request/" + value,
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      console.log("clicking");
      if (res.status == 200) {
        toast.success("Data Update Sucessfully");
        setShouldRefetch(true);
      } else {
        toast.error("Error in Updating");
      }
    });
  };

  const updateDataCancel = (e, value) => {
    const data = {
      course_request_status: "Cancel",
    };
    axios({
      url: BASE_URL + "/api/panel-update-request/" + value,
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setShouldRefetch(true);
      if (res.status == 200) {
        toast.success("Data Update Sucessfully");
        setShouldRefetch(true);
      } else {
        toast.error("Error in Updating");
      }
    });
  };

  useEffect(() => {
    const fetchApprovedRData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-request-approved-list`,
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
          setApprovedRListData(response.data?.urequest);
        }

        // setApprovedRListData(response.data?.urequest);
      } catch (error) {
        console.error("Error fetching approved list request data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApprovedRData();
    setLoading(false);
  }, [shouldRefetch]);

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

    {
      name: "id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <div className="flex items-center space-x-2">
              <Tooltip title="Completed" placement="top">
                <RequestApprovedCompleted
                  onClick={(e) => updateData(e, value)}
                  className="h-5 w-5 cursor-pointer"
                />
              </Tooltip>
              <Tooltip title="Cancel" placement="top">
                <RequestApprovedCancel
                  onClick={(e) => updateDataCancel(e, value)}
                  className="h-5 w-5 cursor-pointer"
                />
              </Tooltip>
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
    print: true,
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
          Request Approved List
        </h3>

        {/* <Link to="/add-request" className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md">
          + Add Request
        </Link> */}
        <RequestApprovedCreate
          className={ButtonCreate}
          onClick={() => navigate("/add-request")}
        ></RequestApprovedCreate>
      </div>
      <div className="mt-5">
        <MUIDataTable
          data={approvedRListData ? approvedRListData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default ApprovedListRequest;
