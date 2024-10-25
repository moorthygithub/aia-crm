import React from "react";
import { Select, Option } from "@material-tailwind/react"; // Adjust the import based on your library

const Dropdown = ({ label, options, onChange }) => {
  return (
    <div className="w-full">
      <Select label={label} onChange={onChange}>
        {options.map((option, index) => (
          <Option key={index} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default Dropdown;
