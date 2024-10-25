import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import EnquiryFilter from "../../../components/EnquiryFilter";
import { ContextPanel } from "../../../utils/ContextPanel";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { MdEdit } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import MUIDataTable from "mui-datatables";
import moment from "moment";

const CloseListEnquiry = () => {
  const [closeListData, setCloseListData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const fetchCloseData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-closed-enquiry-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCloseListData(response.data?.enquiry);
      } catch (error) {
        console.error("Error fetching close list enquiry data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCloseData();
    setLoading(false);
  }, []);

  const columns = [
    {
      name: "enquiry_no",
      label: "Enquiry No",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "enquiry_date",
      label: "Enquiry Date",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return moment(value).format("DD-MM-YYYY");
        },
      },
    },
    {
      name: "enquiry_follow_date",
      label: "Followup Date",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return moment(value).format("DD-MM-YYYY");
        },
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
        sort: true,
      },
    },
    {
      name: "enquiry_status",
      label: "Status",
      options: {
        filter: false,
        sort: true,
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
              <MdEdit
                title="edit"
                onClick={(e) => handleOpenButtonLink(e,`${id}`)}
                className="h-5 w-5 cursor-pointer"
              />
              <MdOutlineRemoveRedEye
               onClick={(e) => handleOpenButtonLinkView(e,`${id}`)}
                title="view"
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
  const handleOpenButton = (e) => {
    e.preventDefault(); 
    localStorage.setItem("enquiry_page",location.pathname);
    navigate('/add-enquiry');
  };

  const handleOpenButtonLink = (e,value) => {
    e.preventDefault(); 
    localStorage.setItem("enquiry_page",location.pathname);
    navigate(`/edit-enquiry/${value}`);
  };

  const handleOpenButtonLinkView = (e,value) => {
    e.preventDefault(); 
    localStorage.setItem("enquiry_page",location.pathname);
    navigate(`/view-enquiry/${value}`);
  };

  return (
    <Layout>
      <EnquiryFilter />
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Enquiry Close List
        </h3>

        <button onClick={handleOpenButton} className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md">
          + Add Enquiry
        </button>
      </div>
      <div className="mt-5">
        <MUIDataTable
          data={closeListData ? closeListData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default CloseListEnquiry;
