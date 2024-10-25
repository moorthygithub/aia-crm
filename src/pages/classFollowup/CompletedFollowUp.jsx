import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { ContextPanel } from "../../utils/ContextPanel";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import ClassFollowUpFilter from "../../components/ClassFollowupFilter";

const CompletedFollowUp = () => {

  const { id}  = useParams();

  const [studentListData, setStudentListData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const formData = {
          class_follow_date: localStorage.getItem("class_follow_date"),
          class_follow_course: localStorage.getItem("class_follow_course"),
        };
        const response = await axios.post(
          `${BASE_URL}/api/panel-fetch-classfollowup-completed-list`,formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let res = response.data?.student;
        setStudentListData(res);
        // if (Array.isArray(res)) {
        //   const tempRows = res.map((item) => [
        //     item["user_uid"],
        //     moment(item["registration_date"]).format("DD-MM-YYYY"),

        //     item["name"],
        //     item["mobile"],
        //     item["qualification"],
        //     item["admission_form_no"],
        //     item["status"],
        //     item["id"],
        //   ]);
        //   setStudentListData(response.data?.student);
        // }
      } catch (error) {
        console.error("Error fetching student data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
    setLoading(false);
  }, []);

  const columns = [
    {
      name: "user_uid",
      label: "UID",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "registration_date",
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
      name: "mobile",
      label: "Mobile",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "qualification",
      label: "Qualification",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "admission_form_no",
      label: "Admission No",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "status",
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
              <MdOutlineRemoveRedEye
              onClick={() => navigate(`/view-completed-followup/${id}`)}
                title="view "
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
    <>
      {loading && (
        <CircularProgress
          disableShrink
          style={{
            marginLeft: "600px",
            marginTop: "300px",
            marginBottom: "300px",
          }}
          color="secondary"
        />
      )}
      {!loading && (
        <Layout>
              <ClassFollowUpFilter />
          <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
            <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
              Student Class Follow Up List
            </h3>

         
          </div>
          <div className="mt-5">
            <MUIDataTable
              data={studentListData ? studentListData : []}
              columns={columns}
              options={options}
            />
          </div>
        </Layout>
      )}
    </>
  );
};

export default CompletedFollowUp;
