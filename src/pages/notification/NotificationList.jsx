import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { ContextPanel } from "../../utils/ContextPanel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import MUIDataTable from "mui-datatables";

const NotificationList = () => {
  const [notificationListData, setCNotificationListData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchNotificationData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-notification-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCNotificationListData(response.data?.notification);
      } catch (error) {
        console.error("Error fetching notification data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotificationData();
    setLoading(false);
  }, []);

  const columns = [
    {
      name: "notification_date",
      label: "Date",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "notification_course",
      label: "Notification",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "notification_heading",
      label: "Heading",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "notification_description",
      label: "Details",
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
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Notification List
        </h3>

        <Link className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md">
          + Add Notification
        </Link>
      </div>
      <div className="mt-5">
        <MUIDataTable
          data={notificationListData ? notificationListData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default NotificationList;
