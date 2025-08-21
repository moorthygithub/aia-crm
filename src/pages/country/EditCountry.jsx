import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import Layout from "../../layout/Layout";
import Fields from "../../components/common/TextField/TextField";
import { ContextPanel } from "../../utils/ContextPanel";
import { toast } from "react-toastify";
import { Input } from "@material-tailwind/react";
import { ButtonBack, ButtonCreate } from "../../components/common/ButtonCss";

const status = [
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Inactive",
    label: "Inactive",
  },
];

const EditCountry = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [student, setCountry] = useState({
    country_status: "",
    country_name: "",
    country_code: "",
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("id");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }

    const fetchCountryData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-country-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCountry(response.data.country);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchCountryData();
  }, []);

  const onInputChange = (e) => {
    setCountry({
      ...student,
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
      country_status: student.country_status,
      country_name: student.country_name,
      country_code: student.country_code,
    };
    try {
      const response = await axios.put(
        `${BASE_URL}/api/panel-update-country/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.code == 200) {
        toast.success("Data Updated Successfully");
        navigate("/country");
      } else {
        if (response.data.code == 401) {
          toast.error("Country Duplicate Entry");
        } else if (response.data.code == 402) {
          toast.error("Country Duplicate Entry");
        } else {
          toast.error("An unknown error occurred");
        }
      }
    } catch (error) {
      console.error("Error updating vendor:", error);
      toast.error("Error  updating Country");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <Layout>
      <div>
        {/* Title */}
        <div className="flex mb-4 mt-6">
          <Link to="/country">
            <MdKeyboardBackspace className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl" />
          </Link>
          <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
            Edit Country
          </h1>
        </div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Country */}
              <div className="relative">
                <Input
                  disabled
                  required
                  type="text"
                  label="Country"
                  autoComplete="Name"
                  name="country_name"
                  value={student.country_name}
                  onChange={onInputChange}
                  labelProps={{
                    className:
                      "!text-gray-500 absolute top-[1px] rounded-lg !border !border-gray-500",
                  }}
                />
                {/* <label
                  className={`block text-gray-700 ${!student.country_name ? 'text-gray-400' : 'text-gray-900'} transition-all`}>
                  Country
                </label>
                <Input
                  disabled
                  required
                  type="text"
                  autoComplete="Name"
                  name="country_name"
                  value={student.country_name}
                  onChange={onInputChange}
                  className={`border ${disabled ? 'border-gray-300' : 'border-blue-500'} rounded-md p-2`}
                /> */}
              </div>

              {/* Country Code */}
              <div>
                <Fields
                  required={true}
                  types="text"
                  title="Country Code"
                  type="textField"
                  autoComplete="Name"
                  name="country_code"
                  value={student.country_code}
                  onChange={onInputChange}
                />
              </div>

              {/* Status */}
              <div>
                <Fields
                  required={true}
                  title="Status"
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="country_status"
                  value={student.country_status}
                  onChange={onInputChange}
                  options={status}
                />
              </div>
            </div>
            <div className="mt-4 text-center">
              <button
                type="submit"
                className={ButtonCreate}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Updating..." : "Update"}
              </button>

              <button
                className={ButtonBack}
                onClick={() => navigate("/country")}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditCountry;
