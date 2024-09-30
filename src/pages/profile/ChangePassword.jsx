import React from "react";
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

const ChangePassword = () => {
  return (
    <Layout>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="white" className="mb-8 p-6">
            <Typography variant="h6" color="black">
              Change Password
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              type="password"
              label="Old Password"
              size="lg"
              color="blue"
              required
            />
            <Input
              type="password"
              label="New Password"
              size="lg"
              color="blue"
              required
            />
            <Input
              type="password"
              label="Confirm Password"
              size="lg"
              color="blue"
              required
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" color="blue" fullWidth>
              Submit
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default ChangePassword;
