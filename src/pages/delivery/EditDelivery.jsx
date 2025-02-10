import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Input } from "@material-tailwind/react";
import BASE_URL from "../../base/BaseUrl";
import Layout from "../../layout/Layout";
import Fields from "../../components/common/TextField/TextField";
import { toast } from "react-toastify";
import { ButtonBack, ButtonCreate } from "../../components/common/ButtonCss";

const ss = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

const status = [
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Delivered",
    label: "Delivered",
  },
  {
    value: "Returned",
    label: "Returned",
  },
];

const EditDelivery = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [deliverymode, setDeliveryMode] = useState([]);
  const [deliverymodeURL, setDeliveryModeURL] = useState([]);
  const [student, setStudentDelivery] = useState({
    delivery_slip_shared: "",
    delivery_mode: "",
    delivery_no_of_books: "",
    delivery_tracking_number: "",
    delivery_shipping_date: "",
    delivery_status: "",
    delivery_date: "",
    delivery_tracking_url: "",
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
          `${BASE_URL}/api/panel-fetch-delivery-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStudentDelivery(response.data.studentDelivery);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchdeliverymodeData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-deliverymode`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDeliveryMode(response.data.deliverymode);
      } catch (error) {
        console.error("Error fetching deliverymode:", error);
      }
    };

    fetchdeliverymodeData();
  }, []);

  useEffect(() => {
    const fetchdeliverymodeDataURL = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-deliverytracking-by-id/${student.delivery_mode}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDeliveryModeURL(response.data?.deliverymode_url?.deliverymode_url);
      } catch (error) {
        console.error("Error fetching deliverymode:", error);
      }
    };

    fetchdeliverymodeDataURL();
  }, [student.delivery_mode]);

  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const onInputChange = (e) => {
    if (e.target.name == "delivery_no_of_books") {
      if (validateOnlyDigits(e.target.value)) {
        setStudentDelivery({
          ...student,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setStudentDelivery({
        ...student,
        [e.target.name]: e.target.value,
      });
    }
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
      delivery_slip_shared: student.delivery_slip_shared,
      delivery_no_of_books: student.delivery_no_of_books,
      delivery_mode: student.delivery_mode,
      delivery_tracking_number: student.delivery_tracking_number,
      delivery_shipping_date: student.delivery_shipping_date,
      delivery_status: student.delivery_status,
      delivery_date: student.delivery_date,
      delivery_tracking_url: deliverymodeURL,
    };
    try {
      const response = await axios.put(
        `${BASE_URL}/api/panel-update-delivery/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.code == 200) {
        toast.success("Data Updated Successfully");
        navigate("/pending-delivery");
      } else {
        if (response.data.code == 401) {
          toast.error("Delivery Duplicate Entry");
        } else if (response.data.code == 402) {
          toast.error("Delivery Duplicate Entry");
        } else {
          toast.error("Delivery Duplicate Entry");
        }
      }
    } catch (error) {
      console.error("Error updating Delivery:", error);
      toast.error("Error updating Delivery");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <Layout>
      <div>
        {/* Title */}
        <div className="flex mb-4 mt-6">
          <Link to="/pending-delivery">
            <MdKeyboardBackspace className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl" />
          </Link>
          <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
            Edit Delivery
          </h1>
        </div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {/* UID */}
              <div>
                <label className="block text-gray-700 ">UID</label>
                <span className="mt-1 text-black">{student.user_uid}</span>
              </div>
              {/* Mode */}
              <div>
                <Fields
                  required={true}
                  title="Mode"
                  type="deliverymodeDropdown"
                  autoComplete="Name"
                  name="delivery_mode"
                  value={student.delivery_mode}
                  onChange={(e) => onInputChange(e)}
                  options={deliverymode}
                />
              </div>
              {/* No of Bookings */}
              <div>
                <Input
                  required
                  label="No of Bookings "
                  type="number"
                  autoComplete="Name"
                  name="delivery_no_of_books"
                  value={student.delivery_no_of_books}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              {/* Shipping Date */}
              <div>
                <Input
                  label="Shipping Date"
                  required
                  type="date"
                  name="delivery_shipping_date"
                  value={student.delivery_shipping_date}
                  onChange={(e) => onInputChange(e)}
                  min={
                    student.delivery_shipping_date
                      ? new Date(student.delivery_shipping_date)
                          .toISOString()
                          .split("T")[0]
                      : new Date().toISOString().split("T")[0]
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {/* Traking Number */}
              <div>
                <Input
                  required
                  label="Traking Number "
                  type="text"
                  autoComplete="Name"
                  name="delivery_tracking_number"
                  value={student.delivery_tracking_number}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              {/* Delivery Date */}
              <div>
                <Input
                  label="Delivery Date"
                  type="date"
                  name="delivery_date"
                  value={student.delivery_date}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              {/* Status */}
              <div>
                <Fields
                  required={true}
                  title="Status "
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="delivery_status"
                  value={student.delivery_status}
                  onChange={(e) => onInputChange(e)}
                  options={status}
                />
              </div>
              {/* Slip Shared */}
              <div>
                <Fields
                  required={true}
                  title="Slip Shared "
                  type="whatsappDropdown"
                  autoComplete="Name"
                  name="delivery_slip_shared"
                  value={student.delivery_slip_shared}
                  onChange={(e) => onInputChange(e)}
                  options={ss}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
              <div className="col-span-5">
                <Fields
                  required={true}
                  types="text"
                  title="Tracking URL"
                  type="textField"
                  autoComplete="Name"
                  name="delivery_tracking_url"
                  value={deliverymodeURL}
                  onChange={(e) => onInputChange(e)}
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

              <Link to="/pending-delivery">
                <button className={ButtonBack}>Back</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditDelivery;
