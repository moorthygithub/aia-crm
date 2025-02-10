import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { ContextPanel } from "../../utils/ContextPanel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { NotificationCreate } from "../../components/buttonIndex/ButtonComponents";

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

        const res = response.data?.notification;
        if (Array.isArray(res)) {
          const tempRows = res.map((item) => [
            moment(item["notification_date"]).format("DD-MM-YYYY"),

            item["notification_course"],
            item["notification_heading"],
            item["notification_description"],
          ]);
          console.log(tempRows, "tempRows");
          setCNotificationListData(response.data?.notification);
        }

        // setCNotificationListData(response.data?.notification);
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
        sort: true,
        customBodyRender: (value) => {
          return moment(value).format("DD-MM-YYYY");
        },
      },
    },
    {
      name: "notification_course",
      label: "Notification",
      options: {
        filter: true,
        sort: false,
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

    responsive: "standard",
    viewColumns: true,
    download: true,
    filter: false,
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
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Notification List
        </h3>
        {/* 
        <Link
          to="/add-notification"
          className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md"
        >
          + Add Notification
        </Link> */}
        <NotificationCreate
          className="text-sm font-[400] cursor-pointer text-white bg-blue-600 hover:bg-red-700 p-2 rounded-lg shadow-md transition-all hover:scale-105 active:scale-95 w-36 mx-2"
          onClick={() => navigate("/add-notification")}
        ></NotificationCreate>
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
