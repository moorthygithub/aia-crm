import React from "react";
import { useNavigate } from "react-router-dom";

function PageTitle({ title, icon: Icon, backLink }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    console.log("Back link clicked:", backLink);
    if (backLink === "-1") {
      navigate(-1);
    } else {
      navigate(backLink);
    }
  };

  return (
    <div
      className="flex items-center space-x-2 text-gray-900 text-2xl cursor-pointer mt-4 mb-6"
      onClick={handleBackClick}
    >
      {Icon && (
        <div className="cursor-pointer">
          <Icon className="text-gray-700" />
        </div>
      )}
      <div className="font-bold text-gray-700 text-2xl">{title}</div>
    </div>
  );
}

export default PageTitle;
