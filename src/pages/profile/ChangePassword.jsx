import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  CardHeader,
  Input,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import Layout from "../../layout/Layout";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onInputChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const formData = {
      old_password: password.old_password,
      password: password.new_password,
      username: localStorage.getItem("username"),
    };
 
      try {
        const response = await axios.post(
          `${BASE_URL}/api/panel-change-password`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status == "200") {
          toast.success("Password Changed Successfully");
          navigate(`/`);
        } else {
          if (response.status == "401") {
            toast.error("Please enter a Password Properly");
          } else if (response.status == "402") {
            toast.error("Please enter a Password Properly");
          } else {
            toast.error("Please enter a Password Properly");
          }
        }
      } catch (error) {
        console.error("Error updating Password:", error);
        toast.error("Error updating Password");
      } 
   
  };

  return (
    <Layout>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <form onSubmit={onSubmit} autoComplete="off">
          <Card>
            <CardHeader variant="gradient" color="white" className="mb-8 p-6">
              <Typography variant="h6" color="black">
                Change Password
              </Typography>
            </CardHeader>
            <CardBody className="grid md:grid-cols-3 grid-cols-1 gap-4">
              <Input
                type="password"
                label="Old Password"
                size="lg"
                color="blue"
                required
                name="old_password"
                value={password.old_password}
                onChange={(e) => onInputChange(e)}
              />
              <Input
                type="password"
                label="New Password"
                size="lg"
                color="blue"
                name="new_password"
                required
                value={password.new_password}
                onChange={(e) => onInputChange(e)}
              />
              <Input
                type="password"
                label="Confirm Password"
                size="lg"
                color="blue"
                required
                name="confirm_password"
                value={password.confirm_password}
                onChange={(e) => onInputChange(e)}
              />
            </CardBody>
            <CardFooter className="pt-0 flex justify-center">
              <Button
                type="submit"
                className="w-[20%]"
                variant="gradient"
                color="blue"
                fullWidth
              >
                
                {isButtonDisabled ? 'Submiting...' : 'Submit'}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </Layout>
  );
};

export default ChangePassword;
