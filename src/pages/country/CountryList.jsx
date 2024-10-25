import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { ContextPanel } from "../../utils/ContextPanel";
import { Link, useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";

const CountryList = () => {
  const [countryListData, setCountryListData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-country-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCountryListData(response.data?.country);
      } catch (error) {
        console.error("Error fetching country data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountryData();
    setLoading(false);
  }, []);

  const columns = [
    {
      name: "country_name",
      label: "Country",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "country_code",
      label: "Country Code",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "country_status",
      label: "Status",
      options: {
        filter: true,
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
               onClick={() => navigate(`/edit-country/${id}`)}
                title="edit"
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
          Country List
        </h3>

        <Link
          to="/add-country"
          className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md"
        >
          + Add Country
        </Link>
      </div>
      <div className="mt-5">
        <MUIDataTable
          data={countryListData ? countryListData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default CountryList;
