import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  CardHeader,
  Input,
} from "@material-tailwind/react";
import Layout from "../../layout/Layout";
import { toast } from "react-toastify";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ButtonCreate } from "../../components/common/ButtonCss";

const Profile = () => {
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [admin, setStudentDetails] = useState({
    full_name: "",
    number: "",
    email: "",
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("id");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStudentDetails({
          full_name: response.data.user.name,
          number: response.data.user.mobile,
          email: response.data.user.email,
        });
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchUserData();
  }, []);

  const onInputChange = (e) => {
    setStudentDetails({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setIsButtonDisabled(true);
    const formData = {
      first_name: admin.full_name,
      phone: admin.number,
      email: admin.email,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/panel-update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.code == 200) {
        toast.success("Profile Updated Successfully");
        navigate(`/`);
      } else {
        if (response.data.code == 401) {
          toast.error("Data Duplicate Entry");
        } else if (response.data.code == 402) {
          toast.error("Data Duplicate Entry");
        } else {
          toast.error("Data Duplicate Entry");
        }
      }
    } catch (error) {
      console.error("Error updating  Data:", error);
      toast.error("Duplicate Entry");
    } finally {
      setIsButtonDisabled(false);
    }
  };
  return (
    <Layout>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="white" className="mb-8 p-6">
            <Typography variant="h6" color="black">
              Profile
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <form
              onSubmit={onSubmit}
              autoComplete="off"
              className="px-8 pt-6 pb-8 gap-3 w-full grid md:grid-cols-3 grid-cols-1"
            >
              <div className="mb-4">
                <Input
                  label="Full Name"
                  disabled
                  required
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="full_name"
                  name="full_name"
                  type="text"
                  placeholder="Enter your name"
                  value={admin.full_name}
                  onChange={(e) => onInputChange(e)}
                  labelProps={{
                    style: { color: "gray" },
                  }}
                />
              </div>

              <div className="mb-4">
                <Input
                  label="Mobile No"
                  required
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="number"
                  name="number"
                  type="number"
                  placeholder="Enter your Number"
                  value={admin.number}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-4">
                <Input
                  label="Email"
                  required
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={admin.email}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className="flex items-center justify-between">
                <button className={ButtonCreate} type="submit">
                  {isButtonDisabled ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
