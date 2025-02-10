import { Card, CardBody, Input, Typography } from "@material-tailwind/react";
import CommonCard from "../../components/common/dataCard/CommonCard";
import Layout from "../../layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import moment from "moment";
import FollowUp from "../../components/common/table/FollowUp";
import { ButtonBack } from "../../components/common/ButtonCss";

const ViewResult = () => {
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
          `${BASE_URL}/api/panel-fetch-course-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setStudentExam(res.data.studentCourse);
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
              View student
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
                        <strong>UID : {student.user_uid} </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>Course :{student.course_opted}</strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>Result of Exam : {student.exam_status}</strong>
                      </Typography>

                      <Typography className="text-black">
                        <strong>
                          Congratulation Call :{" "}
                          {student.exam_congratulation_call}
                        </strong>
                      </Typography>

                      <Typography className="text-black">
                        <strong>
                          Wishes on Group :{student.exam_wishes_on_group}
                        </strong>
                      </Typography>
                    </div>
                    <div className="space-y-2">
                      <Typography className="text-black">
                        <strong>
                          Add to Alumnus : {student.exam_add_to_alumnus}
                        </strong>
                      </Typography>

                      <Typography className="text-black">
                        <strong>
                          LinkedIn Obtained : {student.exam_linkedIn_obtained}
                        </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Certificate Status : {student.exam_certificate_status}{" "}
                        </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Social Media Post : {student.exam_social_media_post}
                        </strong>{" "}
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Google Review : {student.exam_google_review}
                        </strong>{" "}
                      </Typography>
                    </div>
                    <div className="space-y-2">
                      <Typography className="text-black">
                        <strong>
                          Remove Access of PQ :{" "}
                          {student.exam_remove_access_of_pq}{" "}
                        </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Remove Access of VL :{" "}
                          {student.exam_remove_access_of_vl}
                        </strong>{" "}
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Remove from Study Group :{" "}
                          {student.exam_remove_from_study_group}
                        </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Interview Status : {student.exam_interview_status}
                        </strong>
                      </Typography>
                    </div>
                  </div>
                  <div className="flex justify-center mt-10">
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

export default ViewResult;
