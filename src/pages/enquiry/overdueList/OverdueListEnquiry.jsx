import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import EnquiryFilter from "../../../components/EnquiryFilter";
import { ContextPanel } from "../../../utils/ContextPanel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { CiSquarePlus } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import MUIDataTable from "mui-datatables";

const OverdueListEnquiry = () => {
  const [overdueListData, setOverdueListData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOverData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-overdue-enquiry-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOverdueListData(response.data?.enquiry);
      } catch (error) {
        console.error("Error fetching overdue list enquiry data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOverData();
    setLoading(false);
  }, []);

  const columns = [
    {
      name: "enquiry_no",
      label: "Enquiry No",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "enquiry_date",
      label: "Enquiry Date",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "enquiry_follow_date",
      label: "Followup Date",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "enquiry_full_name",
      label: "Full Name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "enquiry_mobile",
      label: "Mobile No",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "enquiry_city",
      label: "City",
      options: {
        filter: false,
        sort: false,
      },
    },

    {
      name: "enquiry_course",
      label: "Courses",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "enquiry_status",
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
      <EnquiryFilter />
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Enquiry Overude List
        </h3>

        <Link className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md">
          + Add Enquiry
        </Link>
      </div>
      <div className="mt-5">
        <MUIDataTable
          data={overdueListData ? overdueListData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default OverdueListEnquiry;
