import { Card, CardBody, Input, Typography } from "@material-tailwind/react";
import CommonCard from "../../components/common/dataCard/CommonCard";
import Layout from "../../layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { useEffect, useState } from "react";
import Fields from "../../components/common/TextField/TextField";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import moment from "moment";
import { toast } from "react-toastify";
import { FaWhatsapp } from "react-icons/fa6";

const View = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [student, setStudentDelivery] = useState({});
  const [studentnew, setStudent] = useState({});

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("id");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/panel-fetch-delivery-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setStudentDelivery(res.data.studentDelivery);
        setStudent(res.data.student);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

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
    * You can track your package here : * ${student.delivery_tracking_number}
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

  const handleBackButton = () => {
    navigate('/pending-delivery');
  };

  return (
    <Layout>
      <div>
        <div>
          {/* Title */}
          <div className="flex justify-between">
            <div className="flex mb-4 mt-6">
              <MdKeyboardBackspace
                onClick={handleBackButton}
                className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl"
              />

              <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
                View Delivery
              </h1>
            </div>
            <div className="mt-6 mr-5">
            <button
                onClick={whatsApp}
                className="bg-[#FFB70F] flex  ml-3 text-black px-4 py-2 rounded-md"
              >
                <FaWhatsapp className="mt-1 mr-2" /> WhatsApp
              </button>
            </div>
          </div>

          <div className="flex">
            <div>
              <Card className="mt-4">
                <CardBody>
                  <div className="flex justify-center h-[150px] ">
                    {" "}
                    <div className="space-y-2">
                      <Typography className="text-black">
                        <strong>UID : {student.user_uid} </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Slip Shared : {student.delivery_slip_shared}
                        </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>Mode : {student.delivery_mode}</strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Tracking Number : {student.delivery_tracking_number}
                        </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Shipping Date :{" "}
                          {student.delivery_shipping_date == null
                            ? ""
                            : moment(student.delivery_shipping_date).format(
                                "DD-MM-YYYY"
                              )}
                        </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>Status : {student.delivery_status}</strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>Tracking URL : {student.delivery_tracking_url}</strong>
                      </Typography>
                    </div>
                  </div>
                  <div className="flex justify-center mt-24 ">
                    <button
                      onClick={handleBackButton}
                      className="bg-[#5D92F4] text-white px-6  py-2 rounded-md"
                    >
                      Back
                    </button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default View;
