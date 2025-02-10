import { Card, CardBody, Input } from "@material-tailwind/react";
import CommonCard from "../../components/common/dataCard/CommonCard";
import Layout from "../../layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { useEffect, useState } from "react";
import Fields from "../../components/common/TextField/TextField";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import moment from "moment";
import { toast } from "react-toastify";
import Student from "../Dowloads/Students/Students";
import { ButtonCreate } from "../../components/common/ButtonCss";

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

  const navigate = useNavigate();

  console.log(id, "id");

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

  useEffect(() => {
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
    console.log("debug", formData);
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

  const handleEdit = () => {
    navigate(`/edit-personal/${id}`);
  };

  const handleBackButton = (e) => {
    e.preventDefault();
    navigate(localStorage.getItem("enquiry_page"));
  };

  return (
    <Layout>
      <div>
        <div>
          {/* Title */}
          <div className="flex mb-4 mt-6">
            <MdKeyboardBackspace
              onClick={handleBackButton}
              className=" text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl"
            />

            <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
              Edit Enquiry
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <Card className="mt-4">
                <CardBody>
                  <CommonCard data={enquiry} />
                </CardBody>
              </Card>
            </div>
            <div className="p-6 mt-3 bg-white shadow-md rounded-lg">
              <form id="addIndiv" autoComplete="off">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
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
                  <div>
                    <Input
                      label="Remarks"
                      multiline
                      required
                      autoComplete="Name"
                      name="enquiry_remarks"
                      value={enquiry.enquiry_remarks}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
                <div className="mt-4 text-center">
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
    </Layout>
  );
};

export default EditEnquiry;
