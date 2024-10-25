import Layout from "../../../layout/Layout";
import BASE_URL from "../../../base/BaseUrl";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/common/PageTitle";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowCircleLeft, FaArrowDown } from "react-icons/fa";
import axios from "axios";
import { Card, Typography } from "@material-tailwind/react";
import Moment from "moment";
import DownloadCommon from "../../download/delivery/DeliveryDownload";

function EnquiryReport() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/enquiry");
  };

  const TABLE_HEAD = [
    "Enquiry Date",
    "Followup Date",
    "Full Name",
    "Mobile No",
    "City",
    "Course",
    "Status",
  ];

  // State for disabling button and storing enquiry summary data
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [teamsummary, setSummary] = useState([]);
  const [loader, setLoader] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      enquiry_date_from: localStorage.getItem("enquiry_date_from"),
      enquiry_date_to: localStorage.getItem("enquiry_date_to"),
      enquiry_status: localStorage.getItem("enquiry_status"),
      enquiry_course: localStorage.getItem("enquiry_course"),
    };

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
      })
      .catch((err) => {
        toast.error("Enquiry is Not Downloaded");
        setIsButtonDisabled(false);
      });
  };

  // Fetch table data on component load
  useEffect(() => {
    let data = {
      enquiry_date_from: localStorage.getItem("enquiry_date_from"),
      enquiry_date_to: localStorage.getItem("enquiry_date_to"),
      enquiry_status: localStorage.getItem("enquiry_status"),
      enquiry_course: localStorage.getItem("enquiry_course"),
    };

    axios({
      url: BASE_URL + "/api/fetch-enquiry-report",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setSummary(res.data.enquiry);
      setLoader(false);
    });
  }, []);

  return (
    <Layout>
      {/* <DownloadCommon /> */}
      <div className="mt-4">
        <PageTitle
          title={"Enquiry List"}
          icon={FaArrowCircleLeft}
          backLink="/enquiry"
        />
      </div>
      <Card>
        <div
          className="mt-4 flex justify-end cursor-pointer p-2  space-x-2  mr-10 "
          onClick={onSubmit}
        >
          <div className="flex justify-center items-center">
            <FaArrowDown />
          </div>
          <div className=" font-bold text-gray-700 text-sm">Download</div>
        </div>
        <hr></hr>
        <div className="flex  justify-center items-center  font-bold text-gray-700 text-2xl mt-4">
          <h2>Enquiry List</h2>
        </div>
        <Card className="h-full w-full overflow-scroll  p-4">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-gray-300 pb-4 pt-10"
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
              {teamsummary.map((dataSumm, key) => {
                const isLast = key === teamsummary.length - 1;
                const classes = isLast
                  ? "py-4"
                  : "py-4 border-b border-gray-300";

                return (
                  <tr key={key} className="hover:bg-gray-50">
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Moment(dataSumm.enquiry_date).format("DD-MM-YYYY")}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {Moment(dataSumm.enquiry_follow_date).format(
                          "DD-MM-YYYY"
                        )}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {dataSumm.enquiry_title +
                          " " +
                          dataSumm.enquiry_full_name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {dataSumm.enquiry_mobile}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {dataSumm.enquiry_city}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {dataSumm.enquiry_course}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {dataSumm.enquiry_status}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </Card>
    </Layout>
  );
}

export default EnquiryReport;
