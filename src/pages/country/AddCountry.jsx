import React, { useState } from "react";
import Layout from "../../layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import { MdArrowBack, MdSend } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";

const AddCountry = () => {
  const [country, setCountry] = useState({
    country_name: "",
    country_code: "",
  });
  const navigate = useNavigate();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // Validation function

  const onInputChange = (e) => {
    setCountry({
      ...country,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("addIndiv");
    if (!form.checkValidity()) {
      toast.error("Fill all required");
    } else {
      setIsButtonDisabled(true);
      let data = {
        country_name: country.country_name,
        country_code: country.country_code,
      };
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/panel-create-country`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code == "200") {
        toast.success("Branch Create succesfull");

        setCountry({
          country_name: "",
          country_code: "",
        });
        navigate("/country");
      } else {
        toast.error("duplicate entry");
      }
    }
  };
  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Add Country
        </h3>
      </div>
      <div className="w-full mt-5 mx-auto p-8 bg-white shadow-lg rounded-xl">
        <form id="addIndiv" autoComplete="off" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Service Field */}
            <div className="form-group">
              <Input
                label="Country"
                type="text"
                name="country_name"
                value={country.country_name}
                onChange={onInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none   transition-all duration-300 shadow-sm"
              />
            </div>

            {/* Service Commission Field */}
            <div className="form-group">
              <Input
                label="Country Code"
                type="tel"
                name="country_code"
                value={country.country_code}
                onChange={onInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none  transition-all duration-300 shadow-sm"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4">
            {/* Submit Button */}

            <Button
              type="submit"
              className="mr-2 mb-2 bg-black"
              disabled={isButtonDisabled}
            >
              <div className="flex gap-1">
                <MdSend className="w-4 h-4" />
                <span>{isButtonDisabled ? "Submiting..." : "Submit"}</span>
              </div>
            </Button>

            {/* Back Button */}
            <Link to="/country">
              <Button className="mr-2 mb-2 bg-black">
                <div className="flex gap-1">
                  <MdArrowBack className="w-4 h-4" />
                  <span>Back</span>
                </div>
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddCountry;
