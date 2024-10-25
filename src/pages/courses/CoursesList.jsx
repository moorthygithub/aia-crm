import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { ContextPanel } from "../../utils/ContextPanel";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { MdEdit } from "react-icons/md";

const CoursesList = () => {
  const [coursesListData, setCoursesListData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-courses-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCoursesListData(response.data?.course);
      } catch (error) {
        console.error("Error fetching courses data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoursesData();
    setLoading(false);
  }, []);

  const columns = [
    {
      name: "courses_name",
      label: "Courses",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "courses_duration",
      label: "Duration",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "courses_status",
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
              <MdEdit
                onClick={() => navigate(`/add-courses/${id}`)}
                title="edit courses list"
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
  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Courses List
        </h3>

        <Link to='/add-courses' className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md">
          + Add Courses
        </Link>
      </div>
      <div className="mt-5">
        <MUIDataTable
          data={coursesListData ? coursesListData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default CoursesList;
