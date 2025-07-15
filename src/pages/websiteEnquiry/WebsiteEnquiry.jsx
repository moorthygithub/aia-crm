import { CircularProgress } from "@mui/material";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BASE_URL from "../../base/BaseUrl";
import { WebisteEnquiryEdit } from "../../components/buttonIndex/ButtonComponents";
import Layout from "../../layout/Layout";
import CommonWebsiteEnquiry from "./CommonWebsiteEnquiry";
import WebsiteEnquiryStatusDialog from "./WebsiteEnquiryStatusDialog";

const WebsiteEnquiry = () => {
  const [websiteListData, setWebsiteListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [userStatus, setUserStatus] = useState("");

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-webenquiry-pending-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWebsiteListData(response.data?.webenquiry);
    } catch (error) {
      console.error("Error fetching student data", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStudentData();
  }, []);
  const handleOpenDialog = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-webenquiry-by-id/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const enquiryData = response.data?.webenquiry;
      setSelectedEnquiry(enquiryData);
      setUserStatus(enquiryData?.userStatus || "Pending");
      setOpenDialog(true);
    } catch (error) {
      console.error("Error fetching enquiry by ID", error);
      toast.error("Failed to load enquiry details");
    }
  };

  const columns = [
    {
      name: "userName",
      label: "Full Name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "userEmail",
      label: "Email",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "userMobile",
      label: "Mobile",
      options: {
        filter: false,
        sort: false,
      },
    },

    {
      name: "userLocation",
      label: "Loaction",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "userCourse",
      label: "Course",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "userMessage",
      label: "Message",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "userType",
      label: "From",
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
              <WebisteEnquiryEdit
                onClick={() => handleOpenDialog(id)}
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
    viewColumns: false,
    download: false,
    filter: false,
    print: false,
    setRowProps: (row, dataIndex) => {
      if (websiteListData[dataIndex]?.is_duplicate === true) {
        return {
          style: { backgroundColor: "#fff9c4" }, 
        };
      }
      return {};
    },
  };
  const handleUpdateStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("userStatus", userStatus);

      await axios.put(
        `${BASE_URL}/api/panel-update-webenquiry/${selectedEnquiry.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Status updated successfully!");
      setOpenDialog(false);
    } catch (error) {
      console.error("Error updating user status", error);
      toast.error("Failed to update status");
    }
  };

  return (
    <>
      <Layout>
        {loading ? (
          <CircularProgress
            disableShrink
            style={{
              marginLeft: "500px",
              marginTop: "300px",
              marginBottom: "300px",
            }}
            color="secondary"
          />
        ) : (
          <>
            <CommonWebsiteEnquiry />

            <div className="mt-5">
              <MUIDataTable
                title="Website Enquiry Pending List"
                data={websiteListData ? websiteListData : []}
                columns={columns}
                options={options}
              />
            </div>
          </>
        )}
      </Layout>
      <WebsiteEnquiryStatusDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onUpdate={handleUpdateStatus}
        userStatus={userStatus}
        setUserStatus={setUserStatus}
        selectedEnquiry={selectedEnquiry}
        fetchStudentData={fetchStudentData}
      />
    </>
  );
};

export default WebsiteEnquiry;
