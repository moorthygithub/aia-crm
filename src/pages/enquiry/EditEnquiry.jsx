import {
  Card,
  CardBody,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Textarea,
  Tooltip,
} from "@material-tailwind/react";
import axios from "axios";
import { Edit } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BASE_URL from "../../base/BaseUrl";
import {
  EnquiryViewSendMail,
  EnquiryViewWhatsapp,
  FollowUpEdit,
} from "../../components/buttonIndex/ButtonComponents";
import {
  ButtonBack,
  ButtonCreate,
  ButtonIcons,
} from "../../components/common/ButtonCss";
import CommonCard from "../../components/common/dataCard/CommonCard";
import Fields from "../../components/common/TextField/TextField";
import Layout from "../../layout/Layout";
const status = [
  {
    value: "New Enquiry",
    label: "New Enquiry",
  },
  {
    value: "Postponed",
    label: "Postponed",
  },
  {
    value: "In Process",
    label: "In Process",
  },
  {
    value: "Student",
    label: "Student",
  },
  {
    value: "Not Interested Closed",
    label: "Not Interested Closed",
  },
];

const EditEnquiry = () => {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(!openModal);
  const [editData, setEditData] = useState({ id: null, value: "" });

  const navigate = useNavigate();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [enquiry, setEnquiry] = useState({
    enquiry_remarks: "",
    enquiry_follow_date: "",
    enquiry_status: "",
  });

  const [followup, setFollowUp] = useState([]);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("id");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-enquiry-by-id/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setEnquiry(response.data.enquiry);
      setFollowUp(response.data.followup);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //   const onInputChange = (e) => {
  //     setEnquiry({
  //       ...enquiry,
  //       [e.target.name]: e.target.value,
  //     });
  //   };

  const onInputChange = (e) => {
    const { name, value } = e.target;

    // Update state with the new value
    setEnquiry({
      ...enquiry,
      [name]: value,
    });
  };
  const whatsApp1 = (e) => {
    e.preventDefault();
    const fullName = enquiry.enquiry_full_name;
    const phoneNumber = enquiry.enquiry_mobile;
    const code = enquiry.enquiry_country_code;
    const message = `Hi ${fullName}\n\n Thank you for connecting with AIA. We are thrilled to help you achieve your academic and career goals.
      \n
      At AIA, we offer a range of programs (CFE, CIA & CAMS). Our experienced faculty, comprehensive study materials, and personalized support system ensure that every student receives the best guidance and support.
      \n
      We look forward to welcoming you to the AIA family and helping you reach your full potential.
      \n
      Best Regards,\n
      *Ruchi Bhat*\n
      Manager- Coordination\n
      Academy of Internal Audit\n
      C-826, Vipul Plaza, Sector-81\n
      Faridabad, Delhi-NCR, India\n
      www.aia.in.net\n
      Office No: 0129-417-4177\n
      Toll free: 1800-1200-2555`;
    const whatsappLink = `https://wa.me/${code}${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    let data = {
      eqid: enquiry.id,
    };
    axios({
      url: BASE_URL + "/api/panel-send-enquiry-whatsapp",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.data.code == 200) {
        window.open(whatsappLink, "_blank");
        navigate("/openList-enquiry");
      } else {
        toast.error("Whats App Not Sent Sucessfully");
      }
    });
  };
  const whatsApp2 = (e) => {
    e.preventDefault();

    const phoneNumber = enquiry.enquiry_mobile;
    const code = enquiry.enquiry_country_code;
    const message = `Hello dear,
    \n
    Hope you are doing well!
    \n
    We tried reaching out to you but unfortunately couldn't connect. We are eager to discuss how our programs can help you achieve your academic and career goals.  
    \n
    Thank you for considering AIA. We look forward to connecting with you soon and helping you reach your full potential.
    \n
    Best Regards,\n
    *Ruchi Bhat*\n
    Manager- Coordination\n
    Academy of Internal Audit\n
    C-826, Vipul Plaza, Sector-81\n
    Faridabad, Delhi-NCR, India\n
    www.aia.in.net\n
    Office No: 0129-417-4177\n
    Toll free: 1800-1200-2555`;
    const whatsappLink = `https://wa.me/${code}${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    let data = {
      eqid: enquiry.id,
    };
    axios({
      url: BASE_URL + "/api/panel-send-enquiry-followup-whatsapp",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.data.code == "200") {
        window.open(whatsappLink, "_blank");
        history.push("listing");
      } else {
        toast.error("Whats App Not Sent Sucessfully");
      }
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
      enquiry_remarks: enquiry.enquiry_remarks,
      enquiry_follow_date: enquiry.enquiry_follow_date,
      enquiry_status: enquiry.enquiry_status,
    };
    try {
      const response = await axios.put(
        `${BASE_URL}/api/panel-update-enquiry/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.code == 200) {
        toast.success("Data Updated Successfully");
        navigate(localStorage.getItem("enquiry_page"));
      } else {
        if (response.data.code == 401) {
          toast.error("Enquiry Duplicate Entry");
        } else if (response.data.code == 402) {
          toast.error("Enquiry Duplicate Entry");
        } else {
          toast.error("Enquiry Duplicate Entry");
        }
      }
    } catch (error) {
      console.error("Error updating Enquiry:", error);
      toast.error("Error updating Enquiry");
    } finally {
      setIsButtonDisabled(false);
    }
  };
  const sendEmail = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);

    try {
      const data = {
        eqid: enquiry.id,
        enquiry_email: enquiry.enquiry_email,
      };

      const res = await axios.post(
        `${BASE_URL}/api/panel-send-enquiry-followup-emails`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.code === 200) {
        toast.success("Email Sent Successfully");
        navigate("/openList-enquiry");
      } else {
        toast.error("Email Not Sent Successfully");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-personal/${id}`);
  };

  const handleBackButton = (e) => {
    e.preventDefault();
    navigate(localStorage.getItem("enquiry_page"));
  };
  const handleEditClick = (row) => {
    setEditData({ id: row.id, value: "" });
    setOpenModal(true);
  };

  const handleConfirm = async (e) => {
    e.preventDefault();

    try {
      const data = {
        follow_up_sub_type: editData.value,
      };

      const res = await axios.put(
        `${BASE_URL}/api/panel-update-enquiry-followup/${editData?.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.code == 200) {
        toast.success(res.data.msg || "Data Updated Successfully");
        setOpenModal(false);
        fetchData();
      } else {
        toast.error("Failed To Updated");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Layout>
      <div>
        <div>
          {/* Title */}
          <div className="md:flex justify-between">
            <div className="flex mb-4 mt-6">
              <MdKeyboardBackspace
                onClick={handleBackButton}
                className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl"
              />

              <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
                Edit Enquiry
              </h1>
            </div>
            <div className="mb-4 mt-6 md:w-[30%] w-full flex">
              <EnquiryViewSendMail
                onClick={sendEmail}
                className={ButtonIcons}
              />

              <EnquiryViewWhatsapp
                onClick={
                  enquiry.enquiry_status == "New Enquiry"
                    ? whatsApp1
                    : enquiry.enquiry_status == "Postponed" ||
                      enquiry.enquiry_status == "In Process"
                    ? whatsApp2
                    : ""
                }
                className={ButtonIcons}
              />
            </div>
          </div>
          <div className="grid grid-cols-1  gap-4">
            <div>
              <Card className="mt-4">
                <CardBody>
                  <CommonCard data={enquiry} />
                </CardBody>
              </Card>
            </div>
            <div className="p-6 mt-3 bg-white shadow-md rounded-lg">
              <form id="addIndiv" autoComplete="off">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="form-group">
                    <Fields
                      required={true}
                      title="Status"
                      type="whatsappDropdown"
                      autoComplete="Name"
                      name="enquiry_status"
                      value={enquiry.enquiry_status}
                      onChange={(e) => onInputChange(e)}
                      options={status}
                    />
                  </div>

                  <div>
                    <Input
                      required
                      label="New Followup Date"
                      type="date"
                      name="enquiry_follow_date"
                      value={enquiry.enquiry_follow_date}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
                <div>
                  <Textarea
                    label="Remarks"
                    multiline
                    required
                    autoComplete="Name"
                    name="enquiry_remarks"
                    value={enquiry.enquiry_remarks}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="flex justify-center">
                  <button onClick={handleEdit} className={ButtonCreate}>
                    Edit Personal
                  </button>
                  <button onClick={onSubmit} className={ButtonCreate}>
                    {isButtonDisabled ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="p-3 mt-3 bg-white shadow-md rounded-lg">
            <div className="flex justify-center">
              <h1 className="text-black text-2xl">FOLLOW UP</h1>
            </div>
            <div class="container mx-auto p-4">
              <div class="overflow-x-auto">
                {followup.length > 0 ? (
                  <table class="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead>
                      <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th class="py-3 px-6 text-left">Followup Date</th>
                        <th class="py-3 px-6 text-left">Next Followup Date</th>
                        <th class="py-3 px-6 text-center">Time</th>
                        <th class="py-3 px-6 text-center">Type</th>
                        <th class="py-3 px-6 text-center">Description</th>
                        <th class="py-3 px-6 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody class="text-gray-600 text-sm font-light">
                      {followup.map((dataSumm, key) => (
                        <tr class="border-b border-gray-200 hover:bg-gray-100">
                          <td class="py-3 px-6 text-left whitespace-nowrap">
                            <div class="flex items-center">
                              <span class="font-medium">
                                {dataSumm.follow_up_date == null
                                  ? ""
                                  : moment(dataSumm.follow_up_date).format(
                                      "DD-MM-YYYY"
                                    )}
                              </span>
                            </div>
                          </td>
                          <td class="py-3 px-6 text-left">
                            <div class="flex items-center">
                              <span>
                                {dataSumm.follow_up_next_date == null
                                  ? ""
                                  : moment(dataSumm.follow_up_next_date).format(
                                      "DD-MM-YYYY"
                                    )}
                              </span>
                            </div>
                          </td>
                          <td class="py-3 px-6 text-center">
                            <span>{dataSumm.follow_up_time}</span>
                          </td>
                          <td class="py-3 px-6 text-center">
                            <span>{dataSumm.follow_up_type}</span>
                          </td>
                          <td class="py-3 px-6 text-center">
                            <span>{dataSumm.follow_up_sub_type}</span>
                          </td>
                          <td class="py-3 px-6 text-center">
                            {moment(dataSumm.follow_up_date).isSame(
                              moment(),
                              "day"
                            ) ? (
                              <FollowUpEdit
                                className="text-blue-400 cursor-pointer hover:text-blue-600"
                                onClick={() => handleEditClick(dataSumm)}
                              />
                            ) : (
                              <Tooltip
                                content="You can only edit today's follow-up"
                                placement="top"
                              >
                                <Edit className="text-gray-400 cursor-not-allowed opacity-50 h-5 w-5" />
                              </Tooltip>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex justify-center">
                    <h1 className="text-black text-2xl">No Data Available</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={openModal} handler={handleOpen}>
        <DialogHeader>Edit Follow Up</DialogHeader>
        <DialogBody>
          <Textarea
            label="Follow-up Notes"
            value={editData.value}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, value: e.target.value }))
            }
            rows={4}
          />
        </DialogBody>
        <DialogFooter>
          <button
            onClick={handleOpen}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Update
          </button>
        </DialogFooter>
      </Dialog>
    </Layout>
  );
};

export default EditEnquiry;
