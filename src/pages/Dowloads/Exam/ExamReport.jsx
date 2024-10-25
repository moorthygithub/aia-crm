import Layout from "../../../layout/Layout";
import BASE_URL from "../../../base/BaseUrl";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/common/PageTitle";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowCircleLeft, FaArrowDown } from "react-icons/fa";
import axios from "axios";
import { Card, Typography, Spinner } from "@material-tailwind/react";
import Moment from "moment";
import DownloadCommon from "../../download/delivery/DeliveryDownload";

function ExamEnquiryReport() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/exam");
  };

  const TABLE_HEAD = [
    "Date",
    "UiD",
    "Full Name",
    "Mobile No",
    "Exam Date",
    "Subject",
    "Exam Status",
  ];

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [teamsummary, setSummary] = useState([]);
  const [loader, setLoader] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      exam_date_from: localStorage.getItem("exam_date_from"),
      exam_date_to: localStorage.getItem("exam_date_to"),
      student_uid: localStorage.getItem("student_uid"),
    };

    setIsButtonDisabled(true);

    axios({
      url: BASE_URL + "/api/panel-download-exam",
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
        link.setAttribute("download", "exam_list.csv");
        document.body.appendChild(link);
        link.click();
        toast.success("Report is Downloaded Successfully");
        setIsButtonDisabled(false);
      })
      .catch((err) => {
        toast.error("Report is Not Downloaded");
        setIsButtonDisabled(false);
      });
  };

  // Fetch table data on component load
  useEffect(() => {
    let data = {
      exam_date_from: localStorage.getItem("exam_date_from"),
      exam_date_to: localStorage.getItem("exam_date_to"),
      student_uid: localStorage.getItem("student_uid"),
    };
    //GET REPORT
    axios({
      url: BASE_URL + "/api/fetch-exam-report",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setSummary(res.data.exam || []);
        setLoader(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch data");
        setLoader(false);
      });
  }, []);

  return (
    <Layout>
      {/* <DownloadCommon /> */}
      <div className="mt-4">
        <PageTitle
          title={"Exam List"}
          icon={FaArrowCircleLeft}
          backLink="/exam"
        />
      </div>
      {loader ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner color="blue" size="xl" />
        </div>
      ) : (
        <Card>
          <div
            className="mt-4 flex justify-end cursor-pointer p-2  space-x-2  mr-10"
            onClick={onSubmit}
          >
            <div className="flex justify-center items-center">
              <FaArrowDown />
            </div>
            <div className=" font-bold text-gray-700 text-sm">Download</div>
          </div>
          <hr></hr>
          <div className="flex justify-center items-center  font-bold text-gray-700 text-2xl mt-4">
            <h2>Exam List</h2>
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
                        className="font-bold leading-none"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teamsummary.length > 0 ? (
                  teamsummary.map((dataSumm, key) => {
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
                            {Moment(dataSumm.registration_date).format(
                              "DD-MM-YYYY"
                            )}{" "}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {dataSumm.user_uid}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {dataSumm.name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {dataSumm.mobile}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {dataSumm.qualification}{" "}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {dataSumm.admission_form_no}{" "}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {dataSumm.status}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={TABLE_HEAD.length}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600 text-center"
                      >
                        No data available
                      </Typography>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>
        </Card>
      )}
    </Layout>
  );
}

export default ExamEnquiryReport;
