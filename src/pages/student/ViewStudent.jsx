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
import ClassFollowUpTable from "../../components/common/table/ClassFollowUpTable";
import ResultTable from "../../components/common/table/ResultTable";
import ExamTable from "../../components/common/table/ExamTable";
import {
  StudentViewAdCourse,
  StudentViewAdDelivery,
  StudentViewAdExam,
  StudentViewEdStudent,
  StudentViewVieEnquiry,
} from "../../components/buttonIndex/ButtonComponents";
import {
  ButtonBack,
  ButtonCreate,
  ButtonIcons,
} from "../../components/common/ButtonCss";

const ViewStudent = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [studentCourse, setStudentCourse] = useState({});
  const [studentExam, setStudentExam] = useState({});
  const [studentRequest, setStudentRequest] = useState({});
  const [studentFollowUp, setStudentFollowUp] = useState({});
  const [studentClassFollowUp, setStudentClassFollowUp] = useState({});
  const [studentFinal, setStudentFinal] = useState({});
  const [enquiryData, setEnquiryData] = useState({});
  const [studentDelivery, setStudentDelivery] = useState({});

  const [activeSection, setActiveSection] = useState("courses");

  const handleClick = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/panel-fetch-student-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const s_id = res.data?.studentData?.id;
        localStorage.setItem("s_id", s_id);
        setStudent(res.data.studentData);
        setStudentCourse(res.data.studentCourse);
        setStudentFinal(res.data.studentCourse);
        setStudentExam(res.data?.studentExam);
        setStudentRequest(res.data.studentRequest);
        setEnquiryData(res.data.enquiryData);
        setStudentFollowUp(res.data.studentFollowUp);
        setStudentClassFollowUp(res.data.studentClassFollowUp);
        setStudentDelivery(res.data.studentDelivery);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  const whatsApp = (e) => {
    e.preventDefault();
    const fullName = student.name;
    const phoneNumber = student.mobile;
    const code = student.user_country_code;
    const message = `Hello ${fullName}\n\n Congratulations and welcome to AIA.
    \n
    We are delighted to confirm your registration and look forward to being a part of your academic journey.
    \n
    *Next Steps:*
    \n
    *1.	Orientation Session:* Ms. Sadaf (M. No +91-93194-47197) with be in touch with you shortly and guide you everything about way ahead and answer any questions you might have.
    \n
    *2.	Study Materials:* We shall dispatch your study materials through courier. You want receive it asap subject to transit time. 
    \n
    *3.	Portal Access:* You will soon receive details over WhatsAp with your login credentials for our student portal, where you can access all study materials.
    \n
    If you have any questions or need further assistance, please do not hesitate to reach out to Ms. Sadaf or me.
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
      uid: student.user_uid,
    };
    axios({
      url: BASE_URL + "/api/panel-send-convert-followup-whatsapp",
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

  const sendresultEmail = (e, id) => {
    e.preventDefault();
    let data = {
      user_uid: student.user_uid,
      id: id,
    };
    axios({
      url: BASE_URL + "/api/panel-send-email-result",
      method: "post",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.data.code == 200) {
        toast.success("Email Sent Sucessfully");
      } else {
        toast.error("Email Not Sent Sucessfully");
      }
    });
  };

  const resultwhatsApp = (e) => {
    e.preventDefault();
    const fullName = student.name;
    const phoneNumber = student.mobile;
    const code = student.user_country_code;
    const message = `Dear ${fullName}\n\n Many congratulations on successfully passing the Exam and becoming officially certified!.
    \n
    This is a significant achievement, and we are incredibly proud of your hard work and dedication.
    \n
    Your commitment to excellence and your perseverance have truly paid off. We are honored to have been a part of your journey.
    \n
    Once again  *Congratulations on Your Success and stay in touch!*.
    \n
    Best Regards,\n
    *Puneet Garg*\n
    CEO & Faculty\n
    Academy of Internal Audit`;
    const whatsappLink = `https://wa.me/${code}${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    let data = {
      uid: student.user_uid,
    };
    axios({
      url: BASE_URL + "/api/panel-send-email-result-whatsapp",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.data.code == 200) {
        window.open(whatsappLink, "_blank");
      } else {
        toast.error("Whats App Not Sent Sucessfully");
      }
    });
  };

  const deliverywhatsApp = (e, value) => {
    e.preventDefault();
    axios({
      url: BASE_URL + "/api/panel-fetch-delivery-by-id/" + value,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      const fullName = student.name;
      const phoneNumber = student.mobile;
      const code = "+91";
      const message = `Hello dear,
    \n
    Your Books have been shipped!
    \n
    *Details:*
    \n
    *Books : * ${res.data.studentDelivery.delivery_no_of_books}
    \n
    *Tracking No : * ${res.data.studentDelivery.delivery_tracking_number}
    \n
    *Courier : * ${res.data.studentDelivery.delivery_mode}
    \n
    *Tracking URL: * ${res.data.studentDelivery?.delivery_tracking_url}
    \n
    * You can track your package here : * ${res.data.studentDelivery.delivery_tracking_number}
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
      const whatsappLink = `https://wa.me/${code}${
        res.data.student.mobile
      }?text=${encodeURIComponent(message)}`;

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
    });
  };

  const handleBackButton = (e) => {
    e.preventDefault();
    navigate(`/student`);
  };

  return (
    <Layout>
      <div>
        <div>
          {/* Title */}
          <div className="md:flex justify-between">
            <div className="flex  mb-4 mt-6">
              <MdKeyboardBackspace
                onClick={handleBackButton}
                className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl"
              />

              <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
                View Student
              </h1>
            </div>
            <div className="mb-4 mt-6  flex md:flex-row flex-col md:gap-0 gap-2">
              <StudentViewEdStudent
                className={ButtonCreate}
                onClick={() => navigate(`/edit-student/${student.id}`)}
              />
              {student.whatsapp_count == 0 && (
                <button
                  onClick={whatsApp}
                  className={`${ButtonCreate} flex justify-center`}
                >
                  <FaWhatsapp className="mr-2 mt-0.5" /> WhatsApp
                </button>
              )}

              <StudentViewAdCourse
                onClick={() =>
                  navigate(`/add-student-course/${student.user_uid}`)
                }
                className={ButtonCreate}
              />

              <StudentViewAdDelivery
                className={ButtonCreate}
                onClick={() =>
                  navigate(`/add-student-delivery/${student.user_uid}`)
                }
              />

              <StudentViewAdExam
                onClick={() => navigate(`/add-exam/${student.user_uid}`)}
                className={ButtonCreate}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Card className="mt-4">
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-3  h-full">
                    {" "}
                    <div className="space-y-2">
                      <Typography className="text-black">
                        <strong>UID No : {student.user_uid} </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Registration Date :{" "}
                          {moment(student.registration_date).format(
                            "DD-MM-YYYY"
                          )}
                        </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>Full Name : {student.name}</strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>Mobile :{student.mobile}</strong>
                      </Typography>
                    </div>
                    <div className="space-y-2">
                      <Typography className="text-black">
                        <strong>Email : {student.email}</strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Mobile Device for Study : {student.mobile_device}{" "}
                        </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          PC Device for Study : {student.pc_device}
                        </strong>{" "}
                      </Typography>
                      <Typography className="text-black">
                        <strong>
                          Admission Form Number : {student.admission_form_no}
                        </strong>{" "}
                      </Typography>
                    </div>
                    <div className="space-y-2">
                      <Typography className="text-black">
                        <strong>
                          DOB :
                          {student.user_dob
                            ? moment(student.user_dob).format("DD-MM-YYYY")
                            : ""}
                        </strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>Qualification : {student.qualification}</strong>
                      </Typography>
                      <Typography className="text-black">
                        <strong>Address : {student.address}</strong>{" "}
                      </Typography>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3  h-full">
                    <Typography className="text-black my-3  break-words whitespace-pre-line">
                      <strong>
                        Employee Name : {student?.employee_name || ""}
                      </strong>
                    </Typography>

                    <Typography className="text-black my-3 col-span-2">
                      <strong>Remarks: {student.remarks}</strong>
                    </Typography>
                  </div>
                  <div className="flex justify-center ">
                    <StudentViewVieEnquiry
                      className={ButtonCreate}
                      onClick={() =>
                        navigate(`/view-student-enquiry/${student.user_uid}`)
                      }
                    />
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>

          <div className="container p-4">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
              <button
                onClick={() => handleClick("courses")}
                className={`px-4 py-2 rounded ${
                  activeSection === "courses"
                    ? "from-blue-500 to-cyan-400 bg-gradient-to-r  shadow-lg transform -translate-y-1"
                    : "bg-blue-200 text-white"
                }`}
              >
                Courses
              </button>
              <button
                onClick={() => handleClick("delivery")}
                className={`px-4 py-2 rounded ${
                  activeSection === "delivery"
                    ? "from-pink-500 to-orange-400 bg-gradient-to-r  shadow-lg transform -translate-y-1"
                    : "bg-blue-200 text-white"
                }`}
              >
                Delivery
              </button>
              <button
                onClick={() => handleClick("exam")}
                className={`px-4 py-2 rounded ${
                  activeSection === "exam"
                    ? "from-blue-500 to-cyan-400 text-white bg-gradient-to-r  shadow-lg transform -translate-y-1"
                    : "bg-blue-300 text-white"
                }`}
              >
                Exam
              </button>
              <button
                onClick={() => handleClick("request")}
                className={`px-4 py-2 rounded ${
                  activeSection === "request"
                    ? "from-pink-500 to-orange-400 text-white bg-gradient-to-r  shadow-lg transform -translate-y-1"
                    : "bg-blue-400 text-white"
                }`}
              >
                Request
              </button>
              <button
                onClick={() => handleClick("followup")}
                className={`px-4 py-2 rounded ${
                  activeSection === "followup"
                    ? "from-blue-500 to-cyan-400 text-white bg-gradient-to-r  shadow-lg transform -translate-y-1"
                    : "bg-blue-200 text-white"
                }`}
              >
                Follow Up
              </button>
              <button
                onClick={() => handleClick("classfollowup")}
                className={`px-4 py-2 rounded ${
                  activeSection === "classfollowup"
                    ? "from-blue-500 to-cyan-400 text-white bg-gradient-to-r  shadow-lg transform -translate-y-1"
                    : "bg-blue-200 text-white"
                }`}
              >
                Class Follow Up
              </button>
              <button
                onClick={() => handleClick("result")}
                className={`px-4 py-2 rounded ${
                  activeSection === "result"
                    ? "from-pink-500 to-orange-400 bg-gradient-to-r  shadow-lg transform -translate-y-1 text-white"
                    : "bg-blue-300 text-white"
                }`}
              >
                Result
              </button>
            </div>
          </div>

          {activeSection === "courses" && (
            <div className="p-3 mt-3 bg-white shadow-md rounded-lg">
              <div className="flex justify-center">
                <h1 className="text-black text-2xl">COURSES</h1>
              </div>
              <div class="container mx-auto p-4">
                <div class="overflow-x-auto">
                  {studentCourse.length > 0 ? (
                    <CourseTable options={studentCourse} />
                  ) : (
                    <div className="flex justify-center">
                      <h1 className="text-black text-2xl">No Data Available</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {activeSection === "delivery" && (
            <div className="p-3 mt-3 bg-white shadow-md rounded-lg">
              <div className="flex justify-center">
                <h1 className="text-black text-2xl">DELIVERY</h1>
              </div>
              <div class="container mx-auto p-4">
                <div class="overflow-x-auto">
                  {studentDelivery.length > 0 ? (
                    <DeliveryTable
                      options={studentDelivery}
                      deliverywhatsApp={deliverywhatsApp}
                    />
                  ) : (
                    <div className="flex justify-center">
                      <h1 className="text-black text-2xl">No Data Available</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {activeSection === "exam" && (
            <div className="p-3 mt-3 bg-white shadow-md rounded-lg">
              <div className="flex justify-center">
                <h1 className="text-black text-2xl">EXAM</h1>
              </div>
              <div class="container mx-auto p-4">
                <div class="overflow-x-auto">
                  {studentExam.length > 0 ? (
                    <ExamTable options={studentExam} />
                  ) : (
                    <div className="flex justify-center">
                      <h1 className="text-black text-2xl">No Data Available</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {activeSection === "request" && (
            <div className="p-3 mt-3 bg-white shadow-md rounded-lg">
              <div className="flex justify-center">
                <h1 className="text-black text-2xl">REQUEST</h1>
              </div>
              <div class="container mx-auto p-4">
                <div class="overflow-x-auto">
                  {studentRequest.length > 0 ? (
                    <RequestTable options={studentRequest} />
                  ) : (
                    <div className="flex justify-center">
                      <h1 className="text-black text-2xl">No Data Available</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {activeSection === "followup" && (
            <div className="p-3 mt-3 bg-white shadow-md rounded-lg">
              <div className="flex justify-center">
                <h1 className="text-black text-2xl">FOLLOW UP</h1>
              </div>
              <div class="container mx-auto p-4">
                <div class="overflow-x-auto">
                  {studentFollowUp.length > 0 ? (
                    <FollowUpTable options={studentFollowUp} />
                  ) : (
                    <div className="flex justify-center">
                      <h1 className="text-black text-2xl">No Data Available</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {activeSection === "classfollowup" && (
            <div className="p-3 mt-3 bg-white shadow-md rounded-lg">
              <div className="flex justify-center">
                <h1 className="text-black text-2xl">CLASS FOLLOW UP</h1>
              </div>
              <div class="container mx-auto p-4">
                <div class="overflow-x-auto">
                  {studentClassFollowUp.length > 0 ? (
                    <ClassFollowUpTable options={studentClassFollowUp} />
                  ) : (
                    <div className="flex justify-center">
                      <h1 className="text-black text-2xl">No Data Available</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {activeSection === "result" && (
            <div className="p-3 mt-3 bg-white shadow-md rounded-lg">
              <div className="flex justify-center">
                <h1 className="text-black text-2xl">RESULT</h1>
              </div>
              <div class="container mx-auto p-4">
                <div class="overflow-x-auto">
                  {studentExam.length > 0 ? (
                    <ResultTable
                      options={studentFinal}
                      sendresultEmail={sendresultEmail}
                      resultwhatsApp={resultwhatsApp}
                    />
                  ) : (
                    <div className="flex justify-center">
                      <h1 className="text-black text-2xl">No Data Available</h1>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex justify-center">
                  <button onClick={handleBackButton} className={ButtonBack}>
                    Back
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ViewStudent;
