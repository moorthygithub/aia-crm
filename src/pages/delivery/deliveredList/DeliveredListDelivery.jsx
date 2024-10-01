import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import DeliveryFilter from "../../../components/DeliveryFilter";
import { ContextPanel } from "../../../utils/ContextPanel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { CiSquarePlus } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import MUIDataTable from "mui-datatables";

const DeliveredListDelivery = () => {
  const [deliveredDListData, setDeliveredDListData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchdeliveryDData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-other-delivery`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDeliveredDListData(response.data?.delivery);
      } catch (error) {
        console.error("Error fetching deliverd list Delivery data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchdeliveryDData();
    setLoading(false);
  }, []);

  const columns = [
    {
      name: "user_uid",
      label: "UID No",
      options: {
        filter: false,
        sort: false,
      },
    },

    {
      name: "delivery_slip_shared",
      label: "Slip Shared",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "delivery_mode",
      label: "Mode",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "delivery_tracking_number",
      label: "Tracking No",
      options: {
        filter: false,
        sort: false,
      },
    },

    {
      name: "delivery_shipping_date",
      label: "Shipping Date",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "delivery_date",
      label: "Delivery Date",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "delivery_status",
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
              <MdOutlineRemoveRedEye
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
      <DeliveryFilter />
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Delivered List
        </h3>

        <Link className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md">
          + Add Delivery
        </Link>
      </div>
      <div className="mt-5">
        <MUIDataTable
          data={deliveredDListData ? deliveredDListData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default DeliveredListDelivery;
