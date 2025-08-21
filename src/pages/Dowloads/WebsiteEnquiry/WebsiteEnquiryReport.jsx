import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import Moment from "moment";
import { useEffect, useState } from "react";
import { FaArrowCircleLeft, FaArrowDown } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../../../base/BaseUrl";
import PageTitle from "../../../components/common/PageTitle";
import Layout from "../../../layout/Layout";

function WebsiteEnquiryReport() {
  const TABLE_HEAD = [
    "Name",
    "Email",
    "Mobile",
    "Location",
    "Course",
    "From",
    "Date",
    "Status",
  ];
  const [websitesummary, setWebsiteSummary] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      enquiry_date_from: localStorage.getItem("website_enquiry_date_from"),
      enquiry_date_to: localStorage.getItem("website_enquiry_date_to"),
      enquiry_status: localStorage.getItem("website_enquiry_status"),
      enquiry_course: localStorage.getItem("website_enquiry_course"),
    };

    axios({
      url: BASE_URL + "/api/panel-download-website-enquiry",
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
        link.setAttribute("download", "website_enquiry_list.csv");
        document.body.appendChild(link);
        link.click();
        toast.success("Website Enquiry is Downloaded Successfully");
      })
      .catch((err) => {
        toast.error("Website Enquiry is Not Downloaded");
      });
  };

  // Fetch table data on component load
  useEffect(() => {
    let data = {
      enquiry_date_from: localStorage.getItem("website_enquiry_date_from"),
      enquiry_date_to: localStorage.getItem("website_enquiry_date_to"),
      enquiry_status: localStorage.getItem("website_enquiry_status"),
      enquiry_course: localStorage.getItem("website_enquiry_course"),
    };

    axios({
      url: BASE_URL + "/api/fetch-website-enquiry-report",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setWebsiteSummary(res.data.enquiry);
    });
  }, []);

  return (
    <Layout>
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
      <Card className="mt-4">
        <div className="flex justify-between items-center px-4 mr-10">
          {/* Title */}
          <PageTitle
            title={"Website Enquiry List"}
            icon={FaArrowCircleLeft}
            backLink="/download-website-enquiry"
          />

          {/* Download Button */}
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={onSubmit}
          >
            <FaArrowDown className="text-lg" />
            <span className="font-bold text-gray-700 text-sm">Download</span>
          </div>
        </div>

        <hr></hr>

        <Card className="h-screen w-full p-4">
          <div className="overflow-x-auto h-full">
            <table className="w-full min-w-max table-auto text-left max-h-screen overflow-y-auto">
              <thead className="sticky top-0 bg-white z-10">
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-gray-300 pb-4 pt-10 px-6"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none capitalize"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {websitesummary.map((dataSumm, key) => {
                  const isLast = key === websitesummary.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-gray-300";

                  return (
                    <tr key={key} className="hover:bg-gray-50">
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {dataSumm.userName}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {dataSumm.userEmail}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {dataSumm.userMobile}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600 max-w-[250px]"
                        >
                          {dataSumm.userLocation}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {dataSumm.userCourse}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {dataSumm.userType}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {Moment(dataSumm.created_date).format("DD-MM-YYYY")}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {dataSumm.userStatus}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </Card>
    </Layout>
  );
}

export default WebsiteEnquiryReport;
