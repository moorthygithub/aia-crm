import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { ContextPanel } from "../../../utils/ContextPanel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import MUIDataTable from "mui-datatables";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
import Moment from "moment";
import BookingFilter from "../../../components/BookingFilter";

const TodayBooking = () => {
  const [todayBookingData, setTodayBookingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodayData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-booking-today-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTodayBookingData(response.data?.booking);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodayData();
    setLoading(false);
  }, []);

  const columns = [
    {
      name: "order_ref",
      label: "ID",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "branch_name",
      label: "Branch",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "order_customer",
      label: "Customer",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "order_customer_mobile",
      label: "Mobile",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "order_date",
      label: "Booking Date",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return Moment(value).format("DD-MM-YYYY");
        },
      },
    },
    {
      name: "order_service_date",
      label: "Service Date",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return Moment(value).format("DD-MM-YYYY");
        },
      },
    },
    {
      name: "order_service",
      label: "Service",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "order_amount",
      label: "Price",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "order_no_assign",
      label: "No of Assign",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "updated_by",
      label: "Confirm By",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "order_status",
      label: "Status",
      options: {
        filter: true,
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
                onClick={() => navigate(`/edit-booking/${id}`)}
                title="edit booking"
                className="h-5 w-5 cursor-pointer"
              />
              <MdOutlineRemoveRedEye
                onClick={() => navigate(`/view-booking/${id}`)}
                title="View Cylinder Info"
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
      const orderStatus = rowData[10];
      let backgroundColor = "";
      if (orderStatus === "Confirmed") {
        backgroundColor = "#d4edda"; // light green
      } else if (orderStatus === "Completed") {
        backgroundColor = "#fff3cd"; // light yellow
      } else if (orderStatus === "Inspection") {
        backgroundColor = "#e2e3e5"; // light gray
      } else if (orderStatus === "Pending") {
        backgroundColor = "#f8d7da"; // light red
      } else if (orderStatus === "Cancel") {
        backgroundColor = "#ADD8E6"; // light  blue
      } else if (orderStatus === "On the way") {
        backgroundColor = "#b68dee"; // light  purple
      }

      return {
        style: {
          backgroundColor: backgroundColor,
          borderBottom: "10px solid #f1f7f9",
        },
      };
    },
  };
  return (
    <Layout>
      <BookingFilter />
      {/* <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Today Booking List
        </h3>

        <Link className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md">
          + Add Booking
        </Link>
      </div> */}
      <div className="mt-5">
        <MUIDataTable
          title={"Today Booking List"}
          data={todayBookingData ? todayBookingData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default TodayBooking;
