import Layout from "../../../layout/Layout";
import PageTitle from "../../../components/common/PageTitle";
import Dropdown from "../../../components/common/DropDown";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import { Card } from "@material-tailwind/react";
import Moment from "moment";
import { useState, useEffect } from "react";
import BASE_URL from "../../../base/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DownloadCommon from "../../download/delivery/DeliveryDownload";
import {
  DownloadDeliveryDownload,
  DownloadDeliveryView,
} from "../../../components/buttonIndex/ButtonComponents";
import { ButtonCreate } from "../../../components/common/ButtonCss";

function Delivery() {
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleClick = () => {
    navigate("-1");
  };

  //FROM AND TO DATE
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  var todayback = yyyy + "-" + mm + "-" + dd;

  const firstdate = Moment().startOf("month").format("YYYY-MM-DD");

  const [downloadDelivery, setDeliveryDownload] = useState({
    delivery_date_from: firstdate,
    delivery_date_to: todayback,
    student_uid: "",
    delivery_status: "",
  });

  const status = [
    { value: "Pending", label: "Pending" },
    { value: "Delivered", label: "Delivered" },
    { value: "Returned", label: "Returned" },
  ];

  const onInputChange = (e) => {
    setDeliveryDownload({
      ...downloadDelivery,
      [e.target.name]: e.target.value,
    });
  };

  const [student, setStudent] = useState([]);
  useEffect(() => {
    axios({
      url: BASE_URL + "/api/panel-fetch-student",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setStudent(res.data.student);
    });
  }, []);

  //SUBMIT
  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      delivery_date_from: downloadDelivery.delivery_date_from,
      delivery_date_to: downloadDelivery.delivery_date_to,
      student_uid: downloadDelivery.student_uid,
      delivery_status: downloadDelivery.delivery_status,
    };
    var v = document.getElementById("dowRecp").checkValidity();
    var v = document.getElementById("dowRecp").reportValidity();
    if (v) {
      setIsButtonDisabled(true);

      axios({
        url: BASE_URL + "/api/panel-download-delivery",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "delivery_list.csv");
          document.body.appendChild(link);
          link.click();
          toast.success("Delivery is Downloaded Successfully");
          setIsButtonDisabled(false);
        })
        .catch((err) => {
          toast.error("Delivery is Not Downloaded");
          setIsButtonDisabled(false);
        });
    }
  };

  //LOCAL STORAGE SET
  const onReportView = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "delivery_date_from",
      downloadDelivery.delivery_date_from
    );
    localStorage.setItem("student_uid", downloadDelivery.student_uid);
    localStorage.setItem("delivery_date_to", downloadDelivery.delivery_date_to);
    localStorage.setItem("delivery_status", downloadDelivery.delivery_status);
    navigate("/deliveryreport");
  };

  return (
    <Layout>
      <DownloadCommon />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="mt-4 mb-6">
        <PageTitle
          title={"Download Delivery"}
          // icon={FaArrowCircleLeft}
          backLink="-1"
        />
      </div>
      <Card className="p-4">
        <h3 className="text-red-500 mb-5">
          Leave blank if you want all records.
        </h3>

        <form id="dowRecp" autoComplete="off">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="w-full">
              <Input
                type="date"
                label="From Date"
                className="required"
                value={downloadDelivery.delivery_date_from}
                onChange={(e) => onInputChange(e)}
                name="delivery_date_from"
              />
            </div>
            <div className="w-full">
              <Input
                type="date"
                label="To Date"
                className="required"
                value={downloadDelivery.delivery_date_to}
                onChange={(e) => onInputChange(e)}
                name="delivery_date_to"
              />
            </div>

            <div className="w-full">
              <Dropdown
                label="Student"
                className="required"
                options={student.map((option, index) => ({
                  value: option.user_uid,
                  label: option.name,
                }))}
                onChange={(value) => {
                  setDeliveryDownload((prev) => ({
                    ...prev,
                    student_uid: value,
                  }));
                }}
                name="student_uid"
              />
            </div>
            <div className="w-full">
              <Dropdown
                label="Status"
                className="required"
                options={status}
                onChange={(value) =>
                  setDeliveryDownload({
                    ...downloadDelivery,
                    delivery_status: value,
                  })
                }
              />
            </div>
            {/* <div className="w-77">
              <Button
                color="blue"
                fullWidth
                onClick={onSubmit}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Downloading..." : "Download"}
              </Button>
            </div>

            <div className="w-full">
              <Button color="blue" fullWidth onClick={onReportView}>
                View
              </Button>
            </div> */}
          </div>
          <div className="flex justify-center m-3">
            <DownloadDeliveryDownload
              className={ButtonCreate}
              onClick={onSubmit}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Downloading..." : "Download"}
            </DownloadDeliveryDownload>

            <DownloadDeliveryView
              className={ButtonCreate}
              onClick={onReportView}
            >
              View
            </DownloadDeliveryView>
          </div>
        </form>
      </Card>
    </Layout>
  );
}

export default Delivery;
