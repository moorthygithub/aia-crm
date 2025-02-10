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
import CourseTable from "../../components/common/table/CourseTable";
import DeliveryTable from "../../components/common/table/DeliveryTable";
import RequestTable from "../../components/common/table/RequestTable";
import FollowUpTable from "../../components/common/table/FollowUpTable";
import ResultTable from "../../components/common/table/ResultTable";
import ExamTable from "../../components/common/table/ExamTable";
import FollowUp from "../../components/common/table/FollowUp";
import { ButtonBack } from "../../components/common/ButtonCss";

const ViewStudentEquiry = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  console.log(id, "id");

  const [enquiry, setEnquiry] = useState({});
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
        const res = await axios.get(
          `${BASE_URL}/api/panel-fetch-student-enquiry-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setEnquiry(res.data.enquiry);
        setFollowUp(res.data.followup);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  const handleBackButton = (e) => {
    e.preventDefault();
    navigate(`/view-student/${localStorage.getItem("s_id")}`);
  };

  return (
    <Layout>
      <div>
        <div>
          {/* Title */}

          <div className="flex mb-4 mt-6">
            <MdKeyboardBackspace
              onClick={handleBackButton}
              className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl"
            />

            <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
              View Enquiry
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Card className="mt-4">
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-3 md:h-[150px] h-full">
                    {" "}
                    <div className="space-y-2">
                      <Typography className="text-black">
                        <strong>Enquiry No : {enquiry.enquiry_no} </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Enquiry Date :
                          {moment(enquiry.enquiry_date).format("DD-MM-YYYY")}
                        </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>Course : {enquiry.enquiry_course}</strong>
                      </Typography>
                      {enquiry.enquiry_course == "Other" && (
                        <Typography className="text-black">
                          <strong>
                            Course Other : {enquiry.enquiry_course_other}
                          </strong>
                        </Typography>
                      )}
                      <Typography className="text-black">
                        <strong>Source :{enquiry.enquiry_source}</strong>
                      </Typography>
                    </div>
                    <div className="space-y-2">
                      {enquiry.enquiry_source == "Other" && (
                        <Typography className="text-black">
                          <strong>
                            Source Other : {enquiry.enquiry_source_other}
                          </strong>
                        </Typography>
                      )}
                      <Typography className="text-black">
                        <strong>
                          Full Name : {enquiry.enquiry_title}{" "}
                          {enquiry.enquiry_full_name}
                        </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Mobile : {enquiry.enquiry_country_code}
                          {enquiry.enquiry_mobile}{" "}
                        </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>Email : {enquiry.enquiry_email}</strong>{" "}
                      </Typography>
                      <Typography className="text-black">
                        <strong>Category : {enquiry.enquiry_category}</strong>{" "}
                      </Typography>
                    </div>
                    <div className="space-y-2">
                      <Typography className="text-black">
                        <strong>
                          City/Country : {enquiry.enquiry_city} -{" "}
                          {enquiry.enquiry_country}
                        </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Next Followup Date :{" "}
                          {moment(enquiry.enquiry_follow_date).format(
                            "DD-MM-YYYY"
                          )}
                        </strong>{" "}
                      </Typography>
                      <Typography className="text-black">
                        <strong>Status : {enquiry.enquiry_status}</strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>Remarks : {enquiry.enquiry_remarks}</strong>
                      </Typography>
                    </div>
                  </div>
                  <div className="flex justify-center ">
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
                  <FollowUp options={followup} />
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

export default ViewStudentEquiry;
