import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import Layout from "../../layout/Layout";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { Link } from "react-router-dom";
import img from "../../assets/pbd.png";

const Home = () => {
  const amount = 100;

  const dateyear = ["2024-25"];

  const [cardData, setCardData] = useState([]);

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
          `${BASE_URL}/api/panel-fetch-dashboard-data/${dateyear}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCardData(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="mt-12  gap-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {(localStorage.getItem("user_type_id") == "2" ||
            localStorage.getItem("user_type_id") == "4") && (
            <Link to="/openList-enquiry" style={{ cursor: "pointer" }}>
              <div class="bg-white text-[#464D69] shadow-lg rounded-lg p-3 font-semibold text-center">
                <h1 class="text-sm ">Total Enquires</h1>
                <h1 class="text-2xl  text-[#727891]">
                  <CountUp start={0} end={cardData.total_enquiry} />
                </h1>
              </div>
            </Link>
          )}
          {(localStorage.getItem("user_type_id") == "2" ||
            localStorage.getItem("user_type_id") == "4") && (
            <Link to="/student" style={{ cursor: "pointer" }}>
              <div class="bg-white text-[#464D69] shadow-lg rounded-lg p-3 font-semibold text-center">
                <h1 class="text-sm ">Total Student</h1>
                <h1 class="text-2xl  text-[#727891]">
                  <CountUp start={0} end={cardData.total_student} />
                </h1>
              </div>
            </Link>
          )}
          {(localStorage.getItem("user_type_id") == "2" ||
            localStorage.getItem("user_type_id") == "4") && (
            <Link to="/openList-enquiry" style={{ cursor: "pointer" }}>
              <div class="bg-white text-[#464D69] shadow-lg rounded-lg p-3 font-semibold text-center">
                <h1 class="text-sm ">Open Enquires</h1>
                <h1 class="text-2xl text-[#727891]">
                  <CountUp start={0} end={cardData.open_enquiry} />
                </h1>
              </div>
            </Link>
          )}
          {(localStorage.getItem("user_type_id") == "2" ||
            localStorage.getItem("user_type_id") == "4") && (
            <Link to="/overdueList-enquiry" style={{ cursor: "pointer" }}>
              <div class="bg-white text-[#464D69] shadow-lg rounded-lg p-3 font-semibold text-center">
                <h1 class="text-sm ">Overdue Enquires</h1>
                <h1 class="text-2xl text-[#727891]">
                  <CountUp start={0} end={cardData.overdue_enquiry} />
                </h1>
              </div>
            </Link>
          )}
          <Link to="/task-pending" style={{ cursor: "pointer" }}>
            <div class="bg-white text-[#464D69] shadow-lg rounded-lg p-3 font-semibold text-center">
              <h1 class="text-sm ">Pending Task</h1>
              <h1 class="text-2xl text-[#727891]">
                <CountUp start={0} end={cardData.pending_task} />
              </h1>
            </div>
          </Link>
          {localStorage.getItem("user_type_id") == "4" && (
            <Link to="/task-inspection" style={{ cursor: "pointer" }}>
              <div class="bg-white text-[#464D69] shadow-lg rounded-lg p-3 font-semibold text-center">
                <h1 class="text-sm ">Inspection Task</h1>
                <h1 class="text-2xl text-[#727891]">
                  <CountUp start={0} end={cardData.inspection_task} />
                </h1>
              </div>
            </Link>
          )}

          {(localStorage.getItem("user_type_id") == "5" ||
            localStorage.getItem("user_type_id") == "4") && (
            <Link to="/pending-onboard" style={{ cursor: "pointer" }}>
              <div class="bg-white text-[#464D69] shadow-lg rounded-lg p-3 font-semibold text-center">
                <h1 class="text-xs ">Pending Onboarding</h1>
                <h1 class="text-2xl text-[#727891]">
                  <CountUp start={0} end={cardData.pending_onboard} />
                </h1>
              </div>
            </Link>
          )}
          {(localStorage.getItem("user_type_id") == "5" ||
            localStorage.getItem("user_type_id") == "4") && (
            <Link to="/pending-delivery" style={{ cursor: "pointer" }}>
              <div class="bg-white text-[#464D69] shadow-lg rounded-lg p-3 font-semibold text-center">
                <h1 class="text-sm ">Pending Delivery</h1>
                <h1 class="text-2xl text-[#727891]">
                  <CountUp start={0} end={cardData.pending_delivery} />
                </h1>
              </div>
            </Link>
          )}
          {(localStorage.getItem("user_type_id") == "5" ||
            localStorage.getItem("user_type_id") == "4") && (
            <Link to="/request-pending" style={{ cursor: "pointer" }}>
              <div class="bg-white text-[#464D69] shadow-lg rounded-lg p-3 font-semibold text-center">
                <h1 class="text-sm ">Pending Request</h1>
                <h1 class="text-2xl text-[#727891]">
                  <CountUp start={0} end={cardData.pending_request} />
                </h1>
              </div>
            </Link>
          )}
          {(localStorage.getItem("user_type_id") == "5" ||
            localStorage.getItem("user_type_id") == "4") && (
            <Link to="/exam-pending-list" style={{ cursor: "pointer" }}>
              <div class="bg-white text-[#464D69] shadow-lg rounded-lg p-3 font-semibold text-center">
                <h1 class="text-sm ">Pending Exam</h1>
                <h1 class="text-2xl text-[#727891]">
                  <CountUp start={0} end={cardData.pending_exam} />
                </h1>
              </div>
            </Link>
          )}
          {(localStorage.getItem("user_type_id") == "5" ||
            localStorage.getItem("user_type_id") == "4") && (
            <Link to="/pending-offboard" style={{ cursor: "pointer" }}>
              <div class="bg-white text-[#464D69] shadow-lg rounded-lg p-3 font-semibold text-center">
                <h1 class="text-xs ">Pending Offboarding</h1>
                <h1 class="text-2xl text-[#727891]">
                  <CountUp start={0} end={cardData.pending_ofboard} />
                </h1>
              </div>
            </Link>
          )}
          {(localStorage.getItem("user_type_id") == "5" ||
            localStorage.getItem("user_type_id") == "4") && (
            <Link to="/pending-interview" style={{ cursor: "pointer" }}>
              <div class="bg-white text-[#464D69] shadow-lg rounded-lg p-3 font-semibold text-center">
                <h1 class="text-sm ">Pending Interview</h1>
                <h1 class="text-2xl text-[#727891]">
                  <CountUp start={0} end={cardData.pending_intreview} />
                </h1>
              </div>
            </Link>
          )}

          {(localStorage.getItem("user_type_id") == "5" ||
            localStorage.getItem("user_type_id") == "4") && (
            <Link to="/course-due" style={{ cursor: "pointer" }}>
              <div class="bg-white text-[#464D69] shadow-lg rounded-lg p-3 font-semibold text-center">
                <h1 class="text-sm ">Course Due</h1>
                <h1 class="text-2xl text-[#727891]">
                  <CountUp start={0} end={cardData.student_course_due} />
                </h1>
              </div>
            </Link>
          )}
          <Link to="/over-due-task-list" style={{ cursor: "pointer" }}>
            <div class="bg-white text-[#464D69] shadow-lg rounded-lg p-3 font-semibold text-center">
              <h1 class="text-sm ">Overdue Task</h1>
              <h1 class="text-2xl text-[#727891]">
                <CountUp start={0} end={cardData.overdue_task} />
              </h1>
            </div>
          </Link>

          {(localStorage.getItem("user_type_id") == "5" ||
            localStorage.getItem("user_type_id") == "4") && (
            <Link to="/birthdaylist" style={{ cursor: "pointer" }}>
              <div class="bg-white text-[#464D69] shadow-lg rounded-lg p-3 font-semibold text-center">
                <h1 class="text-sm ">Birthday</h1>
                <h1 class="text-2xl text-[#727891]">
                  <CountUp start={0} end={cardData.birthday} />
                </h1>
              </div>
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
