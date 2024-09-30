import React from "react";
import {
  Card,
  CardBody,
  Typography,
  CardHeader,
} from "@material-tailwind/react";
import Layout from "../../layout/Layout";

const Profile = () => {
  return (
    <Layout>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="white" className="mb-8 p-6">
            <Typography variant="h6" color="black">
              Profile
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <form className="px-8 pt-6 pb-8 w-full max-w-lg">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="message"
                  placeholder="Your message"
                  rows="5"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Submit
                </button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
