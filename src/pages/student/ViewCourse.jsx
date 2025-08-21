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
import CourseTable from "../../components/common/table/CourseTable";
import DeliveryTable from "../../components/common/table/DeliveryTable";
import RequestTable from "../../components/common/table/RequestTable";
import FollowUpTable from "../../components/common/table/FollowUpTable";
import ResultTable from "../../components/common/table/ResultTable";
import ExamTable from "../../components/common/table/ExamTable";
import { ButtonBack } from "../../components/common/ButtonCss";

const ViewCourse = () => {
  const { id } = useParams();

  const navigate = useNavigate();

 

  const [student, setStudentCourse] = useState({});

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
          `${BASE_URL}/api/panel-fetch-course-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setStudentCourse(res.data.studentCourse);
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
              View Course
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Card className="mt-4">
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-3 md:h-[150px] h-full ">
                    {" "}
                    <div className="space-y-2">
                      <Typography className="text-black">
                        <strong>UID : {student.user_uid} </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>Course : {student.course_opted}</strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Validity of the Course : {student.course_validity}
                        </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Course Expiry Date :{" "}
                          {moment(student.course_expiry_date).format(
                            "DD-MM-YYYY"
                          )}{" "}
                        </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>Course Status : {student.course_status}</strong>
                      </Typography>
                    </div>
                    <div className="space-y-2">
                      <Typography className="text-black">
                        <strong>Fees Paid : {student.course_fees}</strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Mode of Payment : {student.course_mode_payment}{" "}
                        </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Receiving Bank Name : {student.course_received_bank}
                        </strong>{" "}
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Video Lectures Issue Status : {student.course_vlis}
                        </strong>{" "}
                      </Typography>
                      <Typography className="text-black">
                        <strong>LinkedIn Request : {student.course_lr}</strong>
                      </Typography>
                    </div>
                    <div className="space-y-2">
                      <Typography className="text-black">
                        <strong>PQ Issue Status : {student.course_pqis}</strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Welcome Letter Status : {student.course_wls}
                        </strong>{" "}
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Add to the WA Group : {student.course_awag}
                        </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>Welcome Call : {student.course_wc}</strong>
                      </Typography>
                    </div>
                  </div>
                  <div className="flex justify-center mt-8">
                    <button onClick={handleBackButton} className={ButtonBack}>
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

export default ViewCourse;
