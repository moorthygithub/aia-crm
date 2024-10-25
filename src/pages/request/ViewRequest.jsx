import { Card, CardBody, Input, Typography } from "@material-tailwind/react";
import Layout from "../../layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import moment from "moment";

const ViewRequest = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [student, setStudentDelivery] = useState({});

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
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  const handleBackButton = (e) => {
    e.preventDefault(); 
    navigate(-1);
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
              View Delivery
            </h1>
          </div>

          <div className="flex">
            <div>
              <Card className="mt-4">
                <CardBody>
                  <div className="flex justify-center md:h-[150px] h-full ">
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
                          Tracking Number :{student.delivery_tracking_number}
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
                    </div>
                  </div>
                  <div className="flex justify-center mt-14">
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

export default ViewRequest;
