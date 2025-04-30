import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import BASE_URL from "../../base/BaseUrl";
import Dropdown from "../../components/common/DropDown";

const statusOptions = [
  { value: "Pending", label: "Pending" },
  { value: "Close", label: "Close" },
];

const WebsiteEnquiryStatusDialog = ({
  open,
  onClose,
  userStatus,
  setUserStatus,
  selectedEnquiry,
  fetchStudentData,
}) => {
  const handleUpdateStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("userStatus", userStatus);

      await axios.put(
        `${BASE_URL}/api/panel-update-webenquiry/${selectedEnquiry.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Status updated successfully!");
      fetchStudentData();
      onClose();
    } catch (error) {
      console.error("Error updating user status", error);
      toast.error("Failed to update status");
    }
  };

  return (
    <Dialog open={open} handler={onClose} size="xs">
      <DialogHeader>Update Enquiry Status</DialogHeader>
      <DialogBody className="space-y-4">
        <div className="flex flex-col">
          <Dropdown
            label="User Status"
            className="required"
            options={statusOptions}
            value={userStatus}
            name="userStatus"
            onChange={setUserStatus}
          />
        </div>
      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button variant="outlined" color="gray" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="gradient" color="blue" onClick={handleUpdateStatus}>
          Update
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default WebsiteEnquiryStatusDialog;
