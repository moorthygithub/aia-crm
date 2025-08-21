import axios from "axios";
import MUIDataTable from "mui-datatables";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../../base/BaseUrl";
import {
  BirthDayEmail,
  BirthDayWhatsaApp,
} from "../../components/buttonIndex/ButtonComponents";
import Layout from "../../layout/Layout";
import { ContextPanel } from "../../utils/ContextPanel";

const BirthdayHoliday = () => {
  const [birthDayData, setBirthDayData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const fetchOpenData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-user-birthday-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBirthDayData(response?.data?.birthday);
      } catch (error) {
        console.error("Error fetching open list enquiry data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOpenData();
    setLoading(false);
  }, []);
  const emailnotification = async (e, value) => {
    e.preventDefault();

    const data = {
      user_id: value,
    };

    try {
      const res = await axios({
        url: BASE_URL + "/api/panel-send-user-birthday-email",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.code === "200") {
        toast.success(res.data.msg);
      } else if (res.data.code === "400") {
        toast.error(res.data.msg);
      } else {
        toast.error("Email Not Sent Successfully");
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error("Something went wrong while sending the email.");
    }
  };

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: false,
        sort: true,
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
      name: "email",
      label: "Email",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "user_uid",
      label: "User",
      options: {
        filter: false,
        sort: true,
        display: "excluded",
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id, tableMeta) => {
          const rowData = tableMeta.rowData;
          const studentName = rowData[0];
          const mobile = rowData[1];
          const userid = rowData[3];
          const message = `Happy Birthday ${studentName}!

The entire team at Academy of Internal Audit wishes you a wonderful year ahead filled with success, growth, and new opportunities. May you achieve great heights in your career and personal life. Keep learning, keep growing!
    
Best wishes,
Academy of Internal Audit`;

          const encodedMessage = encodeURIComponent(message);
          const whatsappUrl = `https://wa.me/91${mobile.replace(
            /\D/g,
            ""
          )}?text=${encodedMessage}`;

          return (
            <div className="flex items-center space-x-2">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <BirthDayWhatsaApp className="h-5 w-5 cursor-pointer text-green-500" />
              </a>
              <BirthDayEmail
                className="h-5 w-5 cursor-pointer text-blue-500"
                onClick={(e) => emailnotification(e, userid)}
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
    print: false,
  };

  return (
    <Layout>
      <div className="mt-5">
        <MUIDataTable
          title="Birthday  List"
          data={birthDayData ? birthDayData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default BirthdayHoliday;
