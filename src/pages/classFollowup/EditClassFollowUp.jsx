import { CardBody, Card, Input } from "@material-tailwind/react";
import { Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import Layout from "../../layout/Layout";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { Link, useNavigate, useParams } from "react-router-dom";
import Fields from "../../components/common/TextField/TextField";
import { toast } from "react-toastify";

const status = [
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Completed",
    label: "Completed",
  },
];

const EditClassFollowUp = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [student, setStudent] = useState({});

  const [followUpData, setFollowUpData] = useState({
    class_follow_status: "",
    follow_up_next_date: "",
    follow_up_remarks: "",
  });

  const [tableData, setTableData] = useState(null);

  const onInputChange = (e) => {
    setFollowUpData({
      ...followUpData,
      [e.target.name]: e.target.value,
    });
  };

  const [attendClass, setAttendClass] = useState(null);
  const [notAttendClass, setNotAttendClass] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/panel-fetch-classfollowup/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // const s_id = res.data?.studentData?.id;
        // localStorage.setItem("s_id", s_id);
        setStudent(res.data.studentData);
        setFollowUpData(res.data.studentData);
        setAttendClass(res.data?.attend);
        setNotAttendClass(res.data?.notattend);
        setTableData(res.data?.studentFollowUp);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setIsButtonDisabled(true);
    const formData = {
      class_follow_status: followUpData.class_follow_status,
      follow_up_next_date: followUpData.follow_up_next_date,
      follow_up_remarks: followUpData.follow_up_remarks,
    };
    try {
      const response = await axios.put(
        `${BASE_URL}/api/panel-update-classfollowup/${student.user_uid}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.code == "200") {
        navigate("/class-followup");
        toast.success("Data Updated Successfully");
      } else {
        if (response.data.code == "401") {
          toast.error("Class Follow Up Duplicate Entry");
        } else if (response.data.code == "402") {
          toast.error("Class Follow Up  Duplicate Entry");
        } else {
          toast.error("Class Follow Up Duplicate Entry");
        }
      }
    } catch (error) {
      console.error("Error updating Class Follow Up:", error);
      toast.error("Error updating Class Follow Up");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <Layout>
      <div>
        <div className="">
          <div className="flex  mb-4 mt-6">
            <Link to="/class-followup">
              <MdKeyboardBackspace className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl" />
            </Link>

            <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
              Edit Class Follow Up
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Card className="mt-4">
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-3 md:h-[150px] h-full">
                  {" "}
                  <div className="space-y-2">
                    <Typography className="text-black">
                      <strong>UID No : {student.user_uid} </strong>
                    </Typography>
                    <Typography className="text-black">
                      <strong>
                        Registration Date :{" "}
                        {moment(student.registration_date).format("DD-MM-YYYY")}
                      </strong>
                    </Typography>
                    <Typography className="text-black">
                      <strong>Full Name : {student.name}</strong>
                    </Typography>
                    <Typography className="text-black">
                      <strong>Mobile :{student.mobile}</strong>
                    </Typography>
                  </div>
                  <div className="space-y-2">
                    <Typography className="text-black">
                      <strong>Email : {student.email}</strong>
                    </Typography>
                    <Typography className="text-black">
                      <strong>
                        Mobile Device for Study : {student.mobile_device}{" "}
                      </strong>
                    </Typography>
                    <Typography className="text-black">
                      <strong>PC Device for Study : {student.pc_device}</strong>{" "}
                    </Typography>
                    <Typography className="text-black">
                      <strong>
                        Admission Form Number : {student.admission_form_no}
                      </strong>{" "}
                    </Typography>
                  </div>
                  <div className="space-y-2">
                    <Typography className="text-black">
                      <strong>Qualification : {student.qualification}</strong>
                    </Typography>
                    <Typography className="text-black">
                      <strong>Address : {student.address}</strong>{" "}
                    </Typography>
                    <Typography className="text-black">
                      <strong>Remarks : {student.remarks}</strong>
                    </Typography>
                    <Typography className="text-black">
                      <strong>
                        Class Follow Course : {student.class_follow_course}
                      </strong>
                    </Typography>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
            <Card className="mt-4">
              <h1 className="flex justify-center pt-2  bg-gray-100 text-gray-600 uppercase text-xl font-bold leading-normal">
                {" "}
                Recent Classes
              </h1>
              <div className="flex justify-between">
                <div>
                  <CardBody>
                    <div className="  h-full w-full">
                      {" "}
                      <div className="space-y-2">
                        <Typography className="text-black flex justify-center">
                          <strong> Attend </strong>
                        </Typography>
                        {attendClass?.map((data, key) => (
                          <div key={key} className="ml-2">
                            <ul className="list-disc text-black">
                              <li className="text-black">
                                <strong>
                                  {moment(data.attendance_date).format(
                                    "DD-MM-YYYY"
                                  )}
                                </strong>
                              </li>
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardBody>
                </div>
                <div>
                  <CardBody>
                    <div className=" md:h-fit h-full w-full ">
                      {" "}
                      <div className="space-y-2">
                        <Typography className="text-black  flex justify-center">
                          <strong>Not Attend </strong>
                        </Typography>
                        {notAttendClass?.map((data, key) => (
                          <div key={key} className="ml-2">
                            <ul className="list-disc text-black ">
                              <li className="text-black">
                                <strong>
                                  {moment(data.class_date).format("DD-MM-YYYY")}
                                </strong>
                              </li>
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardBody>
                </div>
              </div>
            </Card>

            <div className="col-span-2 mt-3">
              <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    {/* <th className="py-3  text-center">Create Date</th> */}
                    <th className="py-3 text-center">Follow Up Date</th>
                    <th className="py-3 px-12 text-center" colSpan={2}>Remarks</th>
                  </tr>
                </thead>
                {tableData?.map((dataSumm, key) => (
                  <tbody key={key} className="text-gray-600 text-sm font-light">
                    <tr className="border-b border-gray-600 hover:bg-gray-100">
                      {/* <td className="py-3 text-center">
                        <span>
                          {dataSumm.follow_up_create_date == null
                            ? ""
                            : moment(dataSumm.follow_up_create_date).format(
                                "DD-MM-YYYY"
                              )}
                        </span>
                      </td> */}
                      <td className="py-3  text-center">
                        <span>
                          {dataSumm.follow_up_next_date == null
                            ? ""
                            : moment(dataSumm.follow_up_next_date).format(
                                "DD-MM-YYYY"
                              )}
                        </span>
                      </td>
                      <td className="py-3 px-12 text-center" colSpan={2}>
                        <span>{dataSumm.follow_up_remarks}</span>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
          <div>
            <Card className="mt-4">
              <form onSubmit={onSubmit} autoComplete="off">
                <CardBody>
                  <div className="grid md:grid-cols-4 grid-cols-1 md:h-fit h-full w-full gap-4">
                    {" "}
                    <div>
                      <Input
                        required
                        type="date"
                        label="Follow Up Date"
                        autoComplete="Name"
                        name="follow_up_next_date"
                        value={followUpData.follow_up_next_date}
                        onChange={onInputChange}
                      />
                    </div>
                    
                    
                    <div className="col-span-2">
                      <Input
                        required
                        type="text"
                        label="Remarks"
                        autoComplete="Name"
                        name="follow_up_remarks"
                        value={followUpData.follow_up_remarks}
                        onChange={onInputChange}
                      />
                    </div>
                    <div>
                      <Fields
                        required={true}
                        title="Status"
                        type="whatsappDropdown"
                        autoComplete="Name"
                        name="class_follow_status"
                        value={followUpData.class_follow_status}
                        onChange={onInputChange}
                        options={status}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center mt-3">
                    <button
                      disabled={isButtonDisabled}
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                      {isButtonDisabled ? "Submiting..." : "Submit"}
                    </button>
                  </div>
                </CardBody>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditClassFollowUp;
