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
  DownloadEnquiryDownload,
  DownloadEnquiryView,
} from "../../../components/buttonIndex/ButtonComponents";
import { ButtonCreate } from "../../../components/common/ButtonCss";

function Enquiry() {
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

  const [downloadEnquiry, setEnquiryDownload] = useState({
    enquiry_date_from: firstdate,
    enquiry_date_to: todayback,
    enquiry_status: "",
    enquiry_course: "",
  });

  const status = [
    { value: "New Enquiry", label: "New Enquiry" },
    { value: "Postponed", label: "Postponed" },
    { value: "In Process", label: "In Process" },
    { value: "Not Interested Closed", label: "Not Interested Closed" },
  ];

  //SUBMIT
  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      enquiry_date_from: downloadEnquiry.enquiry_date_from,
      enquiry_date_to: downloadEnquiry.enquiry_date_to,
      enquiry_status: downloadEnquiry.enquiry_status,
      enquiry_course: downloadEnquiry.enquiry_course,
    };
    var v = document.getElementById("dowRecp").checkValidity();
    var v = document.getElementById("dowRecp").reportValidity();
    e.preventDefault();
    console.log("Data : ", data);
    if (v) {
      setIsButtonDisabled(true);

      axios({
        url: BASE_URL + "/api/panel-download-enquiry",
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
          link.setAttribute("download", "enquiry_list.csv");
          document.body.appendChild(link);
          link.click();
          toast.success("Enquiry is Downloaded Successfully");
          setIsButtonDisabled(false);
          //   setEnquiryDownload("");
        })
        .catch((err) => {
          toast.error("Enquiry is Not Downloaded");
          setIsButtonDisabled(false);
        });
    }
  };

  //LOCAL STORAGE SET
  const onReportView = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "enquiry_date_from",
      downloadEnquiry.enquiry_date_from
    );
    localStorage.setItem("enquiry_date_to", downloadEnquiry.enquiry_date_to);
    localStorage.setItem("enquiry_status", downloadEnquiry.enquiry_status);
    localStorage.setItem("enquiry_course", downloadEnquiry.enquiry_course);
    navigate("/enquiryreport");
  };
  //FETCHCOURSE
  const [course, setCourse] = useState([]);
  useEffect(() => {
    axios({
      url: BASE_URL + "/api/panel-fetch-course",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setCourse(res.data.course);
      console.log(res.data.course, "datacourse");
    });
  }, []);

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
          title={"Download Enquiry"}
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
                label="From Date "
                className="required"
                value={downloadEnquiry.enquiry_date_from}
                onChange={(e) =>
                  setEnquiryDownload({
                    ...downloadEnquiry,
                    enquiry_date_from: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-full">
              <Input
                type="date"
                label="To Date"
                className="required"
                value={downloadEnquiry.enquiry_date_to}
                onChange={(e) =>
                  setEnquiryDownload({
                    ...downloadEnquiry,
                    enquiry_date_to: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-full">
              <Dropdown
                label="Course"
                className="required"
                options={course.map((item, index) => ({
                  value: item.courses_name,
                  label: item.courses_name,
                }))}
                onChange={(value) =>
                  setEnquiryDownload({
                    ...downloadEnquiry,
                    enquiry_course: value,
                  })
                }
              />
            </div>

            <div className="w-full">
              <Dropdown
                label="Status"
                className="required"
                options={status}
                onChange={(value) =>
                  setEnquiryDownload({
                    ...downloadEnquiry,
                    enquiry_status: value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex justify-center m-3">
            <DownloadEnquiryDownload
              className={ButtonCreate}
              onClick={onSubmit}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Downloading..." : "Download"}
            </DownloadEnquiryDownload>

            <DownloadEnquiryView
              className={ButtonCreate}
              onClick={onReportView}
            >
              View
            </DownloadEnquiryView>
          </div>
        </form>
      </Card>
    </Layout>
  );
}

export default Enquiry;
