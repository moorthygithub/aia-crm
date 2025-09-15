import { CircularProgress } from "@mui/material";
import axios from "axios";
import moment from "moment";
import MUIDataTable from "mui-datatables";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BASE_URL from "../../base/BaseUrl";
import { StudentView } from "../../components/buttonIndex/ButtonComponents";
import Layout from "../../layout/Layout";
import { ContextPanel } from "../../utils/ContextPanel";

const StudentList = () => {
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
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-student-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const res = response.data?.student;

        if (Array.isArray(res)) {
          setStudentListData(response.data?.student);
        }
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
        sort: true,
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
      name: "employee_name",
      label: "Employee Name",
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
              <StudentView
                onClick={() => navigate(`/view-student/${id}`)}
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
  };

  const emailnotification = (e) => {
    e.preventDefault();
    setLoading(true);
    axios({
      url: BASE_URL + "/api/panel-send-email-notification",
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.data.code == "200") {
        toast.success("Notification Sent Sucessfully");
        setLoading(false);
      } else {
        toast.error("Notification Not Sent Sucessfully");
        setLoading(false);
      }
    });
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
          <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
            <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
              Student List
            </h3>

            {/* <button onClick={emailnotification} className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md">
              Month End Email Notification
            </button> */}
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

export default StudentList;
