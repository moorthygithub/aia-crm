import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import DeliveryFilter from "../../../components/DeliveryFilter";
import { ContextPanel } from "../../../utils/ContextPanel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { MdEdit } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import {
  Card,
  CardContent,
  CardHeader,
  Dialog,
  Tooltip,
  Typography,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const DeliveredListDelivery = () => {
  const [deliveredDListData, setDeliveredDListData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [student, setStudentDelivery] = useState({});
  const [studentnew, setStudentNew] = useState({});

  const handleClickOpen = (value) => {
    fetchData(value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async (valu) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/panel-fetch-delivery-by-id/${valu}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setStudentNew(res.data.student);
      setStudentDelivery(res.data.studentDelivery);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const whatsApp = (e) => {
    e.preventDefault();
    const fullName = studentnew.name;
    const phoneNumber = studentnew.mobile;
    const code = studentnew.user_country_code;
    const message = `Hello dear,
    \n
    Your Books have been shipped!
    \n
    *Details:*
    \n
    *Books : * ${student.delivery_no_of_books}
    \n
    *Tracking No : * ${student.delivery_tracking_number}
    \n
    *Courier : * ${student.delivery_mode}
    \n
    * You can track your package here : * 
    \n
    Best Regards,\n
    *Sadaf Choudhary*\n
    Sr. Officer-  Coordination\n
    Academy of Internal Audit\n
    C-826, Vipul Plaza, Sector-81\n
    Faridabad, Delhi-NCR, India\n
    www.aia.in.net\n
    Office No: 0129-417-4177\n
    Toll free: 1800-1200-2555`;
    const whatsappLink = `https://wa.me/${code}${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    let data = {
      uid: student.user_uid,
    };
    axios({
      url: BASE_URL + "/api/panel-send-delivery-followup-whatsapp",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.data.code == "200") {
        window.open(whatsappLink, "_blank");
      } else {
        toast.error("Whats App Not Sent Sucessfully");
      }
    });
  };

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
        const res = response.data?.delivery;
        console.log(res, "res");
        if (Array.isArray(res)) {
          const tempRows = res.map((item) => [
            item["user_uid"],
            item["name"],
            item["mobile"],
            item["delivery_slip_shared"],
            item["delivery_mode"],
            item["delivery_slip_shared"],

            item["delivery_shipping_date"] == null
              ? ""
              : moment(item["delivery_shipping_date"]).format("DD-MM-YYYY"),
            item["delivery_date"] == null
              ? ""
              : moment(response["delivery_date"]).format("DD-MM-YYYY"),
            item["delivery_status"],
            item["id"],
          ]);
          console.log(tempRows, "tempRows");
          setDeliveredDListData(response.data?.delivery);
        }
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
        filter: true,
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
        sort: true,
        customBodyRender: (value) => {
          return moment(value).format("DD-MM-YYYY");
        },
      },
    },
    {
      name: "delivery_date",
      label: "Delivery Date",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return moment(value).format("DD-MM-YYYY");
        },
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
              <MdEdit
                onClick={() => navigate(`/edit-delivery/${id}`)}
                title="edit"
                className="h-5 w-5 cursor-pointer"
              />
              <MdOutlineRemoveRedEye
                // onClick={() => navigate(`/view-student-delivery/${id}`)}
                onClick={() =>handleClickOpen(id)}
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
  return (
    <>
      <Layout>
        <DeliveryFilter />
        <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
          <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
            Delivered List
          </h3>

          <Link
            to="/add-delivery"
            className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md"
          >
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
      <Dialog
        open={open}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        // className="m-3  rounded-lg shadow-xl"
      >
        <Card className="p-6 space-y-1 w-[400px]">
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-slate-800 text-xl font-semibold">
                View Delivery
              </h1>
              <div className="flex">
                <Tooltip title="On Conversion to Registered">
                  <button
                    onClick={whatsApp}
                    className="bg-[#FFB70F] md:ml-0 ml-3 flex items-center text-black px-4 py-2 rounded-2xl hover:bg-[#e5a70e] transition"
                  >
                    <WhatsAppIcon />
                  </button>
                </Tooltip>
                <Tooltip title="Close">
                  <button
                    className="ml-3 pl-2 hover:bg-gray-200 rounded-full"
                    onClick={handleClose}
                  >
                    <HighlightOffIcon />
                  </button>
                </Tooltip>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left text-gray-700 flex">
                <thead className="text-start">
                  <tr>
                    <td className="p-2 font-semibold">UID </td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">Slip Shared </td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">Mode </td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">Shipping Date </td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">Delivery Date </td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">Tracking Number </td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">Tracking URL </td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">Status </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">: {student.user_uid}</td>
                  </tr>
                  <tr>
                    <td className="p-2">: {student.delivery_slip_shared}</td>
                  </tr>
                  <tr>
                    <td className="p-2">: {student.delivery_mode}</td>
                  </tr>
                  <tr>
                    <td className="p-2">
                      :{" "}
                      {student.delivery_shipping_date
                        ? moment(student.delivery_shipping_date).format(
                            "DD-MM-YYYY"
                          )
                        : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">
                      :{" "}
                      {student.delivery_date
                        ? moment(student.delivery_date).format("DD-MM-YYYY")
                        : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">
                      {" "}
                      : {student.delivery_tracking_number}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">: {student.delivery_tracking_url}</td>
                  </tr>
                  <tr>
                    <td className="p-2">: {student.delivery_status}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Dialog>
    </>
  );
};

export default DeliveredListDelivery;
