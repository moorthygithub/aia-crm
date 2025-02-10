import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import RequestFilter from "../../../components/RequestFilter";
import { ContextPanel } from "../../../utils/ContextPanel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { CiSquarePlus } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import MUIDataTable from "mui-datatables";
import Edit from "@mui/icons-material/Edit";
import moment from "moment";
import ClearIcon from "@mui/icons-material/Clear";
import { Tooltip } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { toast } from "react-toastify";
import {
  RequestPendingCancel,
  RequestPendingCompleted,
  RequestPendingCreate,
} from "../../../components/buttonIndex/ButtonComponents";
import { ButtonCreate } from "../../../components/common/ButtonCss";

const PendingListRequest = () => {
  const [pendingRListData, setPendingRListData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  const [shouldRefetch, setShouldRefetch] = useState(false);

  const updateData = (e, value) => {
    const data = {
      course_request_status: "Approved",
    };
    axios({
      url: BASE_URL + "/api/panel-update-request/" + value,
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
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
      if (res.status == 200) {
        toast.success("Data Update Sucessfully");
        setShouldRefetch(true);
      } else {
        toast.error("Error in Updating");
      }
    });
  };

  useEffect(() => {
    const fetchPendingRData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-request-list`,
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
          console.log(tempRows, "tempRows");
          setPendingRListData(response.data?.urequest);
        }
      } catch (error) {
        console.error("Error fetching pending list request data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingRData();
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
              <Tooltip title="Approved" placement="top">
                <RequestPendingCompleted
                  onClick={(e) => updateData(e, value)}
                  className="h-5 w-5 cursor-pointer"
                />
              </Tooltip>
              <Tooltip title="Cancel" placement="top">
                <RequestPendingCancel
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
  };
  return (
    <Layout>
      <RequestFilter />
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Request Pending List
        </h3>

        {/* <Link
          to="/add-request"
          className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md"
        >
          + Add Request
        </Link> */}
        <RequestPendingCreate
          className={ButtonCreate}
          onClick={() => navigate("/add-request")}
        ></RequestPendingCreate>
      </div>
      <div className="mt-5">
        <MUIDataTable
          data={pendingRListData ? pendingRListData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default PendingListRequest;
