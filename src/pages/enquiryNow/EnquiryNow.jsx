import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { toast } from "react-toastify";
import BASE_URL from "../../base/BaseUrl";
import Fields from "../../components/common/TextField/TextField";
import styles from "./enquiry.module.css";
import { ButtonCreate } from "../../components/common/ButtonCss";
const title = [
  {
    value: "Mr",
    label: "Mr",
  },
  {
    value: "Ms",
    label: "Ms",
  },
  {
    value: "Mrs",
    label: "Mrs",
  },
  {
    value: "MD",
    label: "MD",
  },
];

const category = [
  {
    value: "Indian",
    label: "Indian",
  },
  {
    value: "International",
    label: "International",
  },
];

const source = [
  {
    value: "Referral",
    label: "Referral",
  },
  {
    value: "Repeat Student",
    label: "Repeat Student",
  },
  {
    value: "WA",
    label: "WA",
  },
  {
    value: "Email",
    label: "Email",
  },
  {
    value: "Adv",
    label: "Adv",
  },
  {
    value: "Website",
    label: "Website",
  },
  {
    value: "Social Media",
    label: "Social Media",
  },
  {
    value: "Other",
    label: "Others(mention)",
  },
];

const EnquiryNow = () => {
  const navigate = useNavigate();

  const [booking, setEnquiry] = useState({
    enquiry_year: "2024-25",
    enquiry_title: "",
    enquiry_full_name: "",
    enquiry_mobile: "",
    enquiry_email: "",
    enquiry_country: "",
    enquiry_city: "",
    enquiry_category: "",
    enquiry_course: "",
    enquiry_course_other: "",
    enquiry_source: "",
    enquiry_source_other: "",
  });

  const [country, setCountry] = useState([]);
  const [course, setCourse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/panel-fetch-country`);
        setCountry(response.data.country);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/panel-fetch-courses`);
        setCourse(response.data.course);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchData();
  }, []);

  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const onInputChange = (e) => {
    if (e.target.name == "enquiry_mobile") {
      if (validateOnlyDigits(e.target.value)) {
        setEnquiry({
          ...booking,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setEnquiry({
        ...booking,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("addIdniv");

    if (!form.checkValidity()) {
      toast.error("Fill all the filled");
      return;
    }

    const data = {
      enquiry_year: booking.enquiry_year,
      enquiry_title: booking.enquiry_title,
      enquiry_full_name: booking.enquiry_full_name,
      enquiry_mobile: booking.enquiry_mobile,
      enquiry_email: booking.enquiry_email,
      enquiry_country: booking.enquiry_country,
      enquiry_city: booking.enquiry_city,
      enquiry_category: booking.enquiry_category,
      enquiry_course: booking.enquiry_course,
      enquiry_source: booking.enquiry_source,
      enquiry_course_other: booking.enquiry_course_other,
      enquiry_source_other: booking.enquiry_source_other,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/panel-create-enquiry`,
        data
      );

      if (response.data.code == "200") {
        toast.success("Enquiry Created Successfully");
        // Reset the enquiry form
        setEnquiry({
          enquiry_year: "2024-25",
          enquiry_title: "",
          enquiry_full_name: "",
          enquiry_mobile: "",
          enquiry_email: "",
          enquiry_country: "",
          enquiry_city: "",
          enquiry_category: "",
          enquiry_course: "",
          enquiry_source: "",
          enquiry_source_other: "",
          enquiry_course_other: "",
        });
      } else {
        if (response.data.code == "402") {
          toast.error("Enquiry Duplicate Entry");
        } else if (response.data.code == " 403") {
          toast.error("Enquiry Duplicate Entry");
        } else {
          toast.error("Network Issue , Pls Try again later");
        }
      }
    } catch (error) {
      console.error("Error creating equiry:", error);
      toast.error("Error creating equiry");
    }
  };

  const handleBackButton = () => {
    navigate("/");
  };

  return (
    <div className="bg-gray-200 ">
      <div className={styles["main-container-out"]}>
        <div className={styles["sub-container-out"]}>
          <div className="flex justify-center mb-4">
            <img
              src={logo}
              alt="logo"
              className="w-30 md:h-[50px] h-full mb-4"
            />
          </div>
          <form id="addIdniv" onSubmit={onSubmit}>
            <div className={styles["form-container-div"]}>
              <div className="md:flex gap-2 justify-start ju mb-5">
                <div className="form-group md:w-24 md:mb-0 mb-3">
                  <Fields
                    required={true}
                    type="whatsappDropdown"
                    title="Title"
                    name="enquiry_title"
                    value={booking.enquiry_title}
                    onChange={(e) => onInputChange(e)}
                    options={title}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full justify-between ">
                  <div className="form-group">
                    <Fields
                      required={true}
                      type="textField"
                      title="Full Name"
                      autoComplete="Name"
                      name="enquiry_full_name"
                      value={booking.enquiry_full_name}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div>
                    <Input
                      required
                      maxLength={10}
                      label="Mobile No"
                      type="tel"
                      name="enquiry_mobile"
                      value={booking.enquiry_mobile}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div>
                    <Input
                      label="Email"
                      type="email"
                      name="enquiry_email"
                      value={booking.enquiry_email}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
                <div>
                  <Fields
                    required={true}
                    title="Country"
                    type="priceforDropdown"
                    autoComplete="Name"
                    name="enquiry_country"
                    value={booking.enquiry_country}
                    onChange={(e) => onInputChange(e)}
                    options={country}
                  />
                </div>
                <div>
                  <Fields
                    required="required"
                    title="City"
                    type="textField"
                    autoComplete="Name"
                    name="enquiry_city"
                    value={booking.enquiry_city}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div>
                  <Fields
                    required={true}
                    type="whatsappDropdown"
                    title="Category"
                    name="enquiry_category"
                    value={booking.enquiry_category}
                    onChange={(e) => onInputChange(e)}
                    options={category}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-3 grid-cols-1 gap-3 mt-5">
                <div>
                  <Fields
                    required={true}
                    type="courseDropdown"
                    title="Course"
                    name="enquiry_course"
                    value={booking.enquiry_course}
                    onChange={(e) => onInputChange(e)}
                    options={course}
                  />
                </div>
                {booking.enquiry_course == "Other" && (
                  <div>
                    <Input
                      type="text"
                      required
                      label="Course Other"
                      name="enquiry_course_other"
                      value={booking.enquiry_course_other}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                )}
                <div>
                  <Fields
                    required={true}
                    type="whatsappDropdown"
                    title="Source"
                    name="enquiry_source"
                    value={booking.enquiry_source}
                    onChange={(e) => onInputChange(e)}
                    options={source}
                  />
                </div>

                {(booking.enquiry_source == "Other" ||
                  booking.enquiry_source == "Social Media") && (
                  <div>
                    <Input
                      type="text"
                      required
                      label="Source Other"
                      name="enquiry_source_other"
                      value={booking.enquiry_source_other}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-center mt-4">
                <button type="submit" className={`${ButtonCreate} `}>
                  {" "}
                  Submit{" "}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnquiryNow;
