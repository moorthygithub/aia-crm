import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import Layout from "../../layout/Layout";
import Fields from "../../components/common/TextField/TextField";
import { toast } from "react-toastify";
import { ButtonBack, ButtonCreate } from "../../components/common/ButtonCss";

const AddCountry = () => {
  const navigate = useNavigate();

  const [student, setCountry] = useState({
    country_name: "",
    country_code: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("id");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
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
      country_name: student.country_name,
      country_code: student.country_code,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/panel-create-country`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
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
            Add Country
          </h1>
        </div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Country */}
              <div className="form-group">
                <Fields
                  required={true}
                  types="text"
                  title="Country"
                  type="textField"
                  autoComplete="Name"
                  name="country_name"
                  value={student.country_name}
                  onChange={onInputChange}
                />
              </div>

              {/* Country Code */}
              <div>
                <Fields
                  required={true}
                  types="text"
                  title="Country Code"
                  type="textField"
                  name="country_code"
                  value={student.country_code}
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="mt-4 text-center">
              <button
                type="submit"
                className={ButtonCreate}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Submiting..." : "Submit"}
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

export default AddCountry;
