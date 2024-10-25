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

const ViewExam = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [student, setStudentExam] = useState({});

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
          `${BASE_URL}/api/panel-fetch-exam-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setStudentExam(res.data.studentExam);
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
              View Exam
            </h1>
          </div>

          <div className="flex">
            <div>
              <Card className="mt-4">
                <CardBody>
                  <div className="flex justify-center md:h-[150px] h-full">
                    {" "}
                    <div className="space-y-2">
                      <Typography className="text-black">
                        <strong>UID : {student.user_uid} </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                        Register for exam : {student.exam_status}
                        </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>Subject : {student.exam_subject}</strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                        Exam Date :{" "}
                          {student.exam_date == null
                            ? ""
                            : moment(student.exam_date).format(
                                "DD-MM-YYYY"
                              )}
                        </strong>
                      </Typography>
                    </div>
                  </div>
                  <div className="flex justify-center mt-6">
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

export default ViewExam;
