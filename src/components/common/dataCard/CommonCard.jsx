import { Typography } from "@material-tailwind/react";

const CommonCard = (props) => {

    const { data } = props;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:h-[230px] h-full gap-4">
      {" "}
      <div className="space-y-2">
        <Typography className="text-black">
          <strong>Enquiry No :  {data.enquiry_no} </strong>
        </Typography>
        <Typography className="text-black">
          <strong>Enquiry Date :  {data.enquiry_date}</strong>
        </Typography>
        <Typography className="text-black">
          <strong>Course :  {data.enquiry_course}</strong>
        </Typography>
        <Typography className="text-black">
          <strong>Source : {data.enquiry_source}</strong>
        </Typography>
        <Typography className="text-black">
          <strong>Source Other : {data.enquiry_source_other}</strong>
        </Typography>
      </div>
      <div className="space-y-2">
        <Typography className="text-black">
          <strong>Full Name :  {data.enquiry_full_name}</strong>{" "}
        </Typography>
        <Typography className="text-black">
          <strong>Mobile : {data.enquiry_mobile}</strong>{" "}
        </Typography>
        <Typography className="text-black">
          <strong>Email : {data.enquiry_email}</strong>
        </Typography>
        <Typography className="text-black">
          <strong>Category : {data.enquiry_category}</strong>{" "}
        </Typography>
        <Typography className="text-black">
          <strong>City/Country : {data.enquiry_city}/{data.enquiry_country}</strong>
        </Typography>
      </div>
    </div>
  );
};

export default CommonCard;
