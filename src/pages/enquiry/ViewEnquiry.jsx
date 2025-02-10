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
import { Button } from "@mui/material";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";
import {
  EnquiryViewSendMail,
  EnquiryViewWhatsapp,
} from "../../components/buttonIndex/ButtonComponents";
import {
  ButtonBack,
  ButtonCreate,
  ButtonIcons,
} from "../../components/common/ButtonCss";

const ViewEnquiry = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [enquiry, setEnquiry] = useState({
    enquiry_remarks: "",
    enquiry_follow_date: "",
    enquiry_status: "",
  });

  const [followup, setFollowUp] = useState([]);
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
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-enquiry-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setEnquiry(response.data.enquiry);
        setFollowUp(response.data.followup);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  const whatsApp1 = (e) => {
    e.preventDefault();
    const fullName = enquiry.enquiry_full_name;
    const phoneNumber = enquiry.enquiry_mobile;
    const code = enquiry.enquiry_country_code;
    const message = `Hi ${fullName}\n\n Thank you for connecting with AIA. We are thrilled to help you achieve your academic and career goals.
    \n
    At AIA, we offer a range of programs (CFE, CIA & CAMS). Our experienced faculty, comprehensive study materials, and personalized support system ensure that every student receives the best guidance and support.
    \n
    We look forward to welcoming you to the AIA family and helping you reach your full potential.
    \n
    Best Regards,\n
    *Ruchi Bhat*\n
    Manager- Coordination\n
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
      eqid: enquiry.id,
    };
    axios({
      url: BASE_URL + "/api/panel-send-enquiry-whatsapp",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.data.code == 200) {
        window.open(whatsappLink, "_blank");
        navigate("/openList-enquiry");
      } else {
        toast.error("Whats App Not Sent Sucessfully");
      }
    });
  };

  const whatsApp2 = (e) => {
    e.preventDefault();

    const phoneNumber = enquiry.enquiry_mobile;
    const code = enquiry.enquiry_country_code;
    const message = `Hello dear,
    \n
    Hope you are doing well!
    \n
    We tried reaching out to you but unfortunately couldn't connect. We are eager to discuss how our programs can help you achieve your academic and career goals.  
    \n
    Thank you for considering AIA. We look forward to connecting with you soon and helping you reach your full potential.
    \n
    Best Regards,\n
    *Ruchi Bhat*\n
    Manager- Coordination\n
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
      eqid: enquiry.id,
    };
    axios({
      url: BASE_URL + "/api/panel-send-enquiry-followup-whatsapp",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.data.code == "200") {
        window.open(whatsappLink, "_blank");
        history.push("listing");
      } else {
        toast.error("Whats App Not Sent Sucessfully");
      }
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    let data = {
      eqid: enquiry.id,
      enquiry_email: enquiry.enquiry_email,
    };
    axios({
      url: BASE_URL + "/api/panel-send-enquiry-followup-email",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.data.code == 200) {
        toast.success("Email Sent Sucessfully");
        navigate("/openList-enquiry");
        setIsButtonDisabled(false);
      } else {
        toast.error("Email Not Sent Sucessfully");
        setIsButtonDisabled(false);
      }
    });
  };

  const handleBackButton = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <Layout>
      <div>
        <div>
          {/* Title */}
          <div className="md:flex justify-between">
            <div className="flex mb-4 mt-6">
              <MdKeyboardBackspace
                onClick={handleBackButton}
                className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl"
              />

              <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
                View Enquiry
              </h1>
            </div>
            <div className="mb-4 mt-6 md:w-[30%] w-full flex">
              {/* <button
                onClick={sendEmail}
                className="bg-[#FFB70F] flex text-black px-4 py-2 rounded-md"
              >
              <button onClick={sendEmail} className={ButtonIcons}>
                <MdEmail className="mt-1 mr-2" />
                Send Email 
              </button> */}
              <EnquiryViewSendMail
                onClick={sendEmail}
                className={ButtonIcons}
              />
              {/* <button
                onClick={
                  enquiry.enquiry_status == "New Enquiry"
                    ? whatsApp1
                    : enquiry.enquiry_status == "Postponed" ||
                      enquiry.enquiry_status == "In Process"
                    ? whatsApp2
                    : ""
                }
                className={ButtonIcons}
              >
                <FaWhatsapp className="mt-1 mr-2" /> WhatsApp
              </button> */}
              <EnquiryViewWhatsapp
                onClick={
                  enquiry.enquiry_status == "New Enquiry"
                    ? whatsApp1
                    : enquiry.enquiry_status == "Postponed" ||
                      enquiry.enquiry_status == "In Process"
                    ? whatsApp2
                    : ""
                }
                className={ButtonIcons}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Card className="mt-4">
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 md:h-[200px] h-full">
                    {" "}
                    <div className="space-y-2">
                      <Typography className="text-black">
                        <strong>Enquiry No : {enquiry.enquiry_no} </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>Enquiry Date : {enquiry.enquiry_date}</strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>Course : {enquiry.enquiry_course}</strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>Source : {enquiry.enquiry_source}</strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>Status : {enquiry.enquiry_status}</strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          New Followup Date :{" "}
                          {moment(enquiry.enquiry_follow_date).format(
                            "DD-MM-YYYY"
                          )}
                        </strong>
                      </Typography>
                    </div>
                    <div className="space-y-2">
                      <Typography className="text-black">
                        <strong>Full Name : {enquiry.enquiry_full_name}</strong>{" "}
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Mobile :{" "}
                          <a
                            href={`tel:${enquiry.enquiry_country_code}${enquiry.enquiry_mobile}`}
                          >
                            {enquiry.enquiry_country_code}{" "}
                            {enquiry.enquiry_mobile}
                          </a>
                        </strong>{" "}
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Email :{" "}
                          <a href={`mailto:${enquiry.enquiry_email}`}>
                            {enquiry.enquiry_email}
                          </a>
                        </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>Category : {enquiry.enquiry_category}</strong>{" "}
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          City/Country : {enquiry.enquiry_city}/
                          {enquiry.enquiry_country}
                        </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>Remarks : {enquiry.enquiry_remarks}</strong>
                      </Typography>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <button onClick={handleBackButton} className={ButtonBack}>
                      Back
                    </button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>

          <div className="p-3 mt-3 bg-white shadow-md rounded-lg">
            <div className="flex justify-center">
              <h1 className="text-black text-2xl">FOLLOW UP</h1>
            </div>
            <div class="container mx-auto p-4">
              <div class="overflow-x-auto">
                {followup.length > 0 ? (
                  <table class="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead>
                      <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th class="py-3 px-6 text-left">Followup Date</th>
                        <th class="py-3 px-6 text-left">Next Followup Date</th>
                        <th class="py-3 px-6 text-center">Time</th>
                        <th class="py-3 px-6 text-center">Type</th>
                        <th class="py-3 px-6 text-center">Description</th>
                      </tr>
                    </thead>
                    <tbody class="text-gray-600 text-sm font-light">
                      {followup.map((dataSumm, key) => (
                        <tr class="border-b border-gray-200 hover:bg-gray-100">
                          <td class="py-3 px-6 text-left whitespace-nowrap">
                            <div class="flex items-center">
                              <span class="font-medium">
                                {dataSumm.follow_up_date == null
                                  ? ""
                                  : moment(dataSumm.follow_up_date).format(
                                      "DD-MM-YYYY"
                                    )}
                              </span>
                            </div>
                          </td>
                          <td class="py-3 px-6 text-left">
                            <div class="flex items-center">
                              <span>
                                {dataSumm.follow_up_next_date == null
                                  ? ""
                                  : moment(dataSumm.follow_up_next_date).format(
                                      "DD-MM-YYYY"
                                    )}
                              </span>
                            </div>
                          </td>
                          <td class="py-3 px-6 text-center">
                            <span>{dataSumm.follow_up_time}</span>
                          </td>
                          <td class="py-3 px-6 text-center">
                            <span>{dataSumm.follow_up_type}</span>
                          </td>
                          <td class="py-3 px-6 text-center">
                            <span>{dataSumm.follow_up_sub_type}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex justify-center">
                    <h1 className="text-black text-2xl">No Data Available</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewEnquiry;
