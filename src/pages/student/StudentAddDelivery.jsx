import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Input } from "@material-tailwind/react";
import { toast } from "react-toastify";
import BASE_URL from "../../base/BaseUrl";
import Layout from "../../layout/Layout";
import Fields from "../../components/common/TextField/TextField";
import { ButtonBack, ButtonCreate } from "../../components/common/ButtonCss";

const StudentAddDelivery = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [deliverymode, setDeliveryMode] = useState([]);
  const [student, setStudentDelivery] = useState({
    user_uid: id,
    delivery_no_of_books: "",
    delivery_slip_shared: "No",
    delivery_mode: "",
    delivery_tracking_number: "",
    delivery_shipping_date: "",
    delivery_status: "Pending",
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

  const handleBackButton = (e) => {
    e.preventDefault();
    navigate(-1);
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
      user_uid: student.user_uid,
      delivery_no_of_books: student.delivery_no_of_books,
      delivery_slip_shared: student.delivery_slip_shared,
      delivery_mode: student.delivery_mode,
      delivery_tracking_number: student.delivery_tracking_number,
      delivery_shipping_date: student.delivery_shipping_date,
      delivery_status: student.delivery_status,
      delivery_tracking_url: student.delivery_tracking_url,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/panel-create-delivery`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.code == 200) {
        toast.success("Data Updated Successfully");
        navigate(`/view-student/${localStorage.getItem("s_id")}`);
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
          <MdKeyboardBackspace
            onClick={handleBackButton}
            className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl"
          />

          <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
            Add Delivery
          </h1>
        </div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-4">
              {/* UID */}
              <div>
                <label className="block text-gray-700 ">UID</label>
                <span className="mt-1 text-black">
                  {/* {student.user_uid} */}
                  {id}
                </span>
              </div>
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

              <div>
                <Input
                  fullWidth
                  label="No of Books"
                  required
                  autoComplete="Name"
                  name="delivery_no_of_books"
                  value={student.delivery_no_of_books}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div>
                <Input
                  fullWidth
                  type="date"
                  label="Shipping Date"
                  required
                  autoComplete="Name"
                  name="delivery_shipping_date"
                  value={student.delivery_shipping_date}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div>
                <Input
                  fullWidth
                  label="Tracking Number"
                  required
                  autoComplete="Name"
                  name="delivery_tracking_number"
                  value={student.delivery_tracking_number}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
             <div className="col-span-5">
                <Fields
                  types="text"
                  title="Tracking URL"
                  type="textField"
                  autoComplete="Name"
                  name="delivery_tracking_url"
                  value={student.delivery_tracking_url}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
             </div> */}
            <div className="mt-4 text-center">
              <button
                type="submit"
                className={ButtonCreate}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Submiting..." : "Submit"}
              </button>

              <button onClick={handleBackButton} className={ButtonBack}>
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default StudentAddDelivery;
