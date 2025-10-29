import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      {/* Error Code */}
      <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest mb-4">
        404
      </h1>

      {/* Message */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
        Forbidden or Page Not Found
      </h2>

      <p className="text-gray-500 text-center mb-8 max-w-md">
        Oops! The page you’re trying to reach doesn’t exist or you don’t have
        permission to view it.
      </p>

      {/* Button */}
      <Button
        color="indigo"
        size="lg"
        className="flex items-center gap-2"
        onClick={() => navigate("/home")}
      >
        Go to Home
      </Button>
    </div>
  );
};

export default NotFound;
