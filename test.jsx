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
        sort: true,
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
          const studentName = rowData[0]; // name
          const mobile = rowData[1]; // mobile

          // const fullMobile = `91${mobileWithoutCode}`;
          const globalWhatsappMessage = `Happy Birthday ${studentName}! 🎉
  
  The entire team at Academy of Internal Audit wishes you a wonderful year ahead filled with success, growth, and new opportunities. May you achieve great heights in your career and personal life. Keep learning, keep growing!
  
  Best wishes,
  Academy of Internal Audit`;

          // const encodedMessage = encodeURIComponent(message);
          // const whatsappUrl = `https://wa.me/${fullMobile}?text=${encodedMessage}`;

          // const handleWhatsAppClick = () => {
          //   window.open(whatsappUrl, "_blank");
          // };

          const handleWhatsAppClick = () => {
            // e.stopPropagation();
            const encodedMessage = encodeURIComponent(globalWhatsappMessage);
            const whatsappUrl = `https://wa.me/+91${mobile.replace(
              /\D/g,
              ""
            )}?text=${encodedMessage}`;
            console.log("WhatsApp URL:", whatsappUrl);
            window.open(whatsappUrl, "_blank");
          };

          return (
            <div className="flex items-center space-x-2">
              {/* <a
                href={`https://wa.me/91${mobileWithoutCode}?text=${encodedMessage}`}
                target="_blank"
                rel="noopener noreferrer" */}
              {/* > */}
              <BirthDayWhatsaApp
                className="h-5 w-5 cursor-pointer text-green-500"
                onClick={(e) => handleWhatsAppClick()}
              />
              {/* </a> */}

              <BirthDayEmail className="h-5 w-5 cursor-pointer text-blue-500" />
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
  };

  return (
    <Layout>
      <div className="mt-5">
        <MUIDataTable
          title="BirthDay Holiday List"
          data={birthDayData ? birthDayData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default BirthdayHoliday;
