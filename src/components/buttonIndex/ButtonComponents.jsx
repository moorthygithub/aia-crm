import {
  Check,
  Edit,
  Eye,
  Mail,
  MessageSquareShare,
  UserPlus,
  View,
  X,
} from "lucide-react";
import React from "react";
import { checkPermission } from "./checkPermission";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const getStaticPermissions = () => {
  const buttonPermissions = localStorage.getItem("buttonControl");
  try {
    return buttonPermissions ? JSON.parse(buttonPermissions) : [];
  } catch (error) {
    console.error(
      "Error parsing StaticPermission data from localStorage",
      error
    );
    return [];
  }
};

/*-------------------------Country---------------- */
// export const VechilesEdit = ({ onClick, className }) => {
//   const userId = localStorage.getItem("id") || "";
//   const staticPermissions = getStaticPermissions();
//   if (!checkPermission(userId, "VechilesEdit", staticPermissions)) {
//     return null;
//   }

//   return (
//     <button onClick={onClick} className={className} title="Edit Vehicles">
//       <Edit className="h-4 w-4 text-blue-500" />
//     </button>
//   );
// };
// VechilesEdit.page = "Vehicles";
// export const VechilesView = ({ onClick, className }) => {
//   const userId = localStorage.getItem("id") || "";
//   const staticPermissions = getStaticPermissions();
//   if (!checkPermission(userId, "VechilesView", staticPermissions)) {
//     return null;
//   }

//   return (
//     <button onClick={onClick} className={className} title="Side View">
//       <Eye className="h-4 w-4 text-blue-500" />
//     </button>
//   );
// };
// VechilesView.page = "Vehicles";

export const CountryCreate = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "CountryCreate", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}+ Country
    </button>
  );
};
CountryCreate.page = "Country";

export const CountryEdit = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "CountryEdit", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Edit Country">
      <Edit className="h-4 w-4" />
    </button>
  );
};

CountryEdit.page = "Country";

/*----------------------------------Courses----------------- */

export const CoursesCreate = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "CoursesCreate", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}+ Courses
    </button>
  );
};
CoursesCreate.page = "Courses";

export const CoursesEdit = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "CoursesEdit", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Edit Courses">
      <Edit className="h-4 w-4" />
    </button>
  );
};

CoursesEdit.page = "Courses";

/*-----------------------------Enquiry------------------------------ */

export const EnquiryOpenCreate = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "EnquiryOpenCreate", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}+ Enquiry
    </button>
  );
};
EnquiryOpenCreate.page = "Enquiry";
export const EnquiryViewSendMail = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "EnquiryViewSendMail", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
       <MdEmail className="mt-1 h-4 w-4 mr-2" />Send Mail
    </button>
  );
};
EnquiryViewSendMail.page = "Enquiry";
export const EnquiryViewWhatsapp = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "EnquiryViewWhatsapp", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      <FaWhatsapp className="h-4 w-4 mt-1 mr-2 " /> Whatsapp
    </button>
  );
};
EnquiryViewWhatsapp.page = "Enquiry";


export const EnquiryOpenEdit = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "EnquiryOpenEdit", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Edit ">
      <Edit className="h-4 w-4" />
    </button>
  );
};

EnquiryOpenEdit.page = "Enquiry";

export const EnquiryOpenView = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "EnquiryOpenView", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="View ">
      <Eye className="h-4 w-4 " />
    </button>
  );
};

EnquiryOpenView.page = "Enquiry";




export const EnquiryOverDueCreate = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "EnquiryOverDueCreate", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}+ Enquiry
    </button>
  );
};
EnquiryOverDueCreate.page = "Enquiry";
export const EnquiryCloseCreate = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "EnquiryCloseCreate", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}+ Enquiry
    </button>
  );
};
EnquiryCloseCreate.page = "Enquiry";


export const EnquiryCloseEdit = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "EnquiryCloseEdit", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Edit ">
      <Edit className="h-4 w-4" />
    </button>
  );
};

EnquiryCloseEdit.page = "Enquiry";

export const EnquiryCloseView = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "EnquiryCloseView", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="View ">
      <Eye className="h-4 w-4 " />
    </button>
  );
};

EnquiryCloseView.page = "Enquiry";

export const EnquiryOverDueEdit = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "EnquiryOverDueEdit", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Edit OverDue">
      <Edit className="h-4 w-4" />
    </button>
  );
};

EnquiryOverDueEdit.page = "Enquiry";

export const EnquiryOverDueView = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "EnquiryOverDueView", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="View OverDue">
      <Eye className="h-4 w-4 " />
    </button>
  );
};

EnquiryOverDueView.page = "Enquiry";

/*------------------------------------Student--------------------- */

export const StudentView = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "StudentView", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="View Student">
      <Eye className="h-4 w-4 " />
    </button>
  );
};

StudentView.page = "Student";

export const StudentViewEdStudent = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "StudentViewEdStudent", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}Edit Student
    </button>
  );
};
StudentViewEdStudent.page = "Student";
export const StudentViewAdCourse = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "StudentViewAdCourse", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}Add Courses
    </button>
  );
};
StudentViewAdCourse.page = "Student";
export const StudentViewAdDelivery = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "StudentViewAdDelivery", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}Add Delivery
    </button>
  );
};
StudentViewAdDelivery.page = "Student";
export const StudentViewAdExam = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "StudentViewAdExam", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}Add Exam
    </button>
  );
};
StudentViewAdExam.page = "Student";
export const StudentViewVieEnquiry = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "StudentViewVieEnquiry", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}View Enquiry
    </button>
  );
};
StudentViewVieEnquiry.page = "Student";



export const StdViewCourseEdit = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "StdViewCourseEdit", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Edit ">
      <Edit className="h-5 w-5" />
    </button>
  );
};

StdViewCourseEdit.page = "Student";

export const StdViewCourseView = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "StdViewCourseView", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="View">
      <Eye className="h-5 w-5 " />
    </button>
  );
};

StdViewCourseView.page = "Student";











export const StdViewDeliveryEdit = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "StdViewDeliveryEdit", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Edit ">
      <Edit className="h-5 w-5" />
    </button>
  );
};

StdViewDeliveryEdit.page = "Student";

export const StdViewDeliveryView = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "StdViewDeliveryView", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="View">
      <Eye className="h-5 w-5  " />
    </button>
  );
};

StdViewDeliveryView.page = "Student";
export const StdViewDeliveryWhatsapp = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "StdViewDeliveryWhatsapp", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Whatsapp">
      <FaWhatsapp className="h-5 w-5  " />
    </button>
  );
};

StdViewDeliveryWhatsapp.page = "Student";







export const StdViewExamEdit = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "StdViewExamEdit", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Edit ">
      <Edit className="h-5 w-5" />
    </button>
  );
};

StdViewExamEdit.page = "Student";

export const StdViewExamView = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "StdViewExamView", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="View">
      <Eye className="h-5 w-5 " />
    </button>
  );
};

StdViewExamView.page = "Student";





export const StdViewResultEdit = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "StdViewResultEdit", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Edit ">
      <Edit className="h-5 w-5" />
    </button>
  );
};

StdViewResultEdit.page = "Student";

export const StdViewResultView = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "StdViewResultView", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="View">
      <Eye className="h-5 w-5 " />
    </button>
  );
};

StdViewResultView.page = "Student";
export const StdViewResultWhatsapp = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "StdViewResultWhatsapp", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Whatsapp">
      <FaWhatsapp className="h-5 w-5 " />
    </button>
  );
};

StdViewResultWhatsapp.page = "Student";
export const StdViewResultMail = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "StdViewResultMail", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Mail">
      <Mail className="h-5 w-5 " />
    </button>
  );
};

StdViewResultMail.page = "Student";

/*---------------------------------Delivery-------------------------- */

export const DeliveryPendingCreate = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "DeliveryPendingCreate", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}+ Delivery
    </button>
  );
};
DeliveryPendingCreate.page = "Delivery";

export const DeliveryPendingEdit = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "DeliveryPendingEdit", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Edit Pending">
      <Edit className="h-4 w-4" />
    </button>
  );
};

DeliveryPendingEdit.page = "Delivery";

export const DeliveryPenViewWhatsapp = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "DeliveryPenViewWhatsapp", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="On Conversion to Registered">
      <FaWhatsapp className="h-5 w-5 " />
    </button>
  );
};

DeliveryPenViewWhatsapp.page = "Delivery";
export const DeliveryDeliViewWhatsapp = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "DeliveryDeliViewWhatsapp", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="On Conversion to Registered">
      <FaWhatsapp className="h-5 w-5 " />
    </button>
  );
};

DeliveryDeliViewWhatsapp.page = "Delivery";
export const DeliveryPendingView = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "DeliveryPendingView", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="View Pending">
      <Eye className="h-4 w-4 " />
    </button>
  );
};

DeliveryPendingView.page = "Delivery";

export const DeliveryDeliverdCreate = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "DeliveryDeliverdCreate", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}+ Delivery
    </button>
  );
};
DeliveryDeliverdCreate.page = "Delivery";

export const DeliveryDeliverdEdit = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "DeliveryDeliverdEdit", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Edit Deliverd">
      <Edit className="h-4 w-4" />
    </button>
  );
};

DeliveryDeliverdEdit.page = "Delivery";

export const DeliveryDeliverdView = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "DeliveryDeliverdView", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="View Deliverd">
      <Eye className="h-4 w-4 " />
    </button>
  );
};

DeliveryDeliverdView.page = "Delivery";
//Class
export const ClassCreate = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "ClassCreate", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}+ Class
    </button>
  );
};
ClassCreate.page = "Class";

//View
export const ClassView = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "ClassView", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Edit">
      <View className="h-4 w-4" />
    </button>
  );
};

ClassView.page = "Class";
//edit
export const ClassEdit = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "ClassEdit", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Edit">
      <Edit className="h-4 w-4" />
    </button>
  );
};

ClassEdit.page = "Class";
//mail

export const ClassMail = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "ClassMail", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Send Mail">
      <Mail className="h-4 w-4 " />
    </button>
  );
};

ClassMail.page = "Class";
// ClassWhatsapp;
export const ClassWhatsapp = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "ClassWhatsapp", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Whatsapp">
      <FaWhatsapp className="h-4 w-4" />
    </button>
  );
};

ClassWhatsapp.page = "Class";
//ClassSendNotification

export const ClassSendNotification = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "ClassSendNotification", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Send Notification">
      <MessageSquareShare className="h-4 w-4 " />
    </button>
  );
};

ClassSendNotification.page = "Class";
//ClassAddAttendance

export const ClassAddAttendance = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "ClassAddAttendance", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="AddAttendance">
      <UserPlus className="h-4 w-4 " />
    </button>
  );
};

ClassAddAttendance.page = "Class";

//////////////////////////CLASS FOLLOW UP--------------------
export const ClassFollowUpCreate = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "ClassFollowUpCreate", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}+ Follow Up
    </button>
  );
};
ClassFollowUpCreate.page = "Class Follow Up";
// //////////////////////////Request--------------------
export const RequestPendingCreate = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "RequestPendingCreate", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}+ Request
    </button>
  );
};
RequestPendingCreate.page = "Request";
// //////////////////////////Request approved--------------------
export const RequestApprovedCreate = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "RequestApprovedCreate", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}+ Request
    </button>
  );
};
RequestApprovedCreate.page = "Request";

export const RequestApprovedCompleted = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "RequestApprovedCompleted", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="ApprovedCompleted">
      <Check className="h-4 w-4 " />
    </button>
  );
};

RequestApprovedCompleted.page = "Request";

export const RequestApprovedCancel = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "RequestApprovedCancel", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="ApprovedCancel">
      <X className="h-4 w-4 " />
    </button>
  );
};

RequestApprovedCancel.page = "Request";
// //////////////////////////Request Pending--------------------
export const RequestCompletedCreate = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "RequestCompletedCreate", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}+ Request
    </button>
  );
};
RequestCompletedCreate.page = "Request";

export const RequestPendingEdit = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "RequestPendingEdit", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Edit">
      <Edit className="h-4 w-4 " />
    </button>
  );
};

RequestPendingEdit.page = "Request";
export const RequestPendingView = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "RequestPendingView", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="View">
      <View className="h-4 w-4 " />
    </button>
  );
};

RequestPendingView.page = "Request";
export const RequestPendingCompleted = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "RequestPendingCompleted", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="ApprovedCompleted">
      <Check className="h-4 w-4 " />
    </button>
  );
};

RequestPendingCompleted.page = "Request";

export const RequestPendingCancel = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "RequestPendingCancel", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="ApprovedCancel">
      <X className="h-4 w-4 " />
    </button>
  );
};

RequestPendingCancel.page = "Request";

//Task Manager
//////////////////////////Request Pending--------------------
// Repetative
export const TaskManagerRepetitiveCreate = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (
    !checkPermission(userId, "TaskManagerRepetitiveCreate", staticPermissions)
  ) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}+ Repetative
    </button>
  );
};
TaskManagerRepetitiveCreate.page = "Task Manager";

export const TaskManagerRepetitiveEdit = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (
    !checkPermission(userId, "TaskManagerRepetitiveEdit", staticPermissions)
  ) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Edit">
      <Edit className="h-4 w-4 " />
    </button>
  );
};

TaskManagerRepetitiveEdit.page = "Task Manager";
// // Pending
export const TaskManagerPendingCreateRepetitive = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (
    !checkPermission(
      userId,
      "TaskManagerPendingCreateRepetitive",
      staticPermissions
    )
  ) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}+ Repetative
    </button>
  );
};
TaskManagerPendingCreateRepetitive.page = "Task Manager";
export const TaskManagerPendingCreateTask = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (
    !checkPermission(userId, "TaskManagerPendingCreateTask", staticPermissions)
  ) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}+ Task
    </button>
  );
};
TaskManagerPendingCreateTask.page = "Task Manager";

export const TaskManagerPendingEdit = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "TaskManagerPendingEdit", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Edit">
      <Edit className="h-4 w-4 " />
    </button>
  );
};

TaskManagerPendingEdit.page = "Task Manager";
// // // Inspection
export const TaskManagerInspectionCreateRepetitive = ({
  onClick,
  className,
}) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (
    !checkPermission(
      userId,
      "TaskManagerInspectionCreateRepetitive",
      staticPermissions
    )
  ) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}+ Repetative
    </button>
  );
};
TaskManagerInspectionCreateRepetitive.page = "Task Manager";
export const TaskManagerInspectionCreateTask = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (
    !checkPermission(
      userId,
      "TaskManagerInspectionCreateTask",
      staticPermissions
    )
  ) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}+ Task
    </button>
  );
};
TaskManagerInspectionCreateTask.page = "Task Manager";

export const TaskManagerInspectionEdit = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (
    !checkPermission(userId, "TaskManagerInspectionEdit", staticPermissions)
  ) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Edit">
      <Edit className="h-4 w-4 " />
    </button>
  );
};

TaskManagerInspectionEdit.page = "Task Manager";
//// // // Completed
export const TaskManagerCompletedCreateRepetitive = ({
  onClick,
  className,
}) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (
    !checkPermission(
      userId,
      "TaskManagerCompletedCreateRepetitive",
      staticPermissions
    )
  ) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}+ Repetative
    </button>
  );
};
TaskManagerCompletedCreateRepetitive.page = "Task Manager";
export const TaskManagerCompletedCreateTask = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (
    !checkPermission(
      userId,
      "TaskManagerCompletedCreateTask",
      staticPermissions
    )
  ) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}+ Task
    </button>
  );
};
TaskManagerCompletedCreateTask.page = "Task Manager";
//Notification
export const NotificationCreate = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "NotificationCreate", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}+ Notification
    </button>
  );
};
NotificationCreate.page = "Notification";
//Download-enquiry
export const DownloadEnquiryDownload = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "DownloadEnquiryDownload", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      Download
    </button>
  );
};
DownloadEnquiryDownload.page = "Download";
// view;
export const DownloadEnquiryView = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "DownloadEnquiryView", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      View
    </button>
  );
};
DownloadEnquiryView.page = "Download";
// //Download-Student
export const DownloadStudentDownload = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "DownloadStudentDownload", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      Download
    </button>
  );
};
DownloadStudentDownload.page = "Download";
// view;
export const DownloadStudentView = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "DownloadStudentView", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      View
    </button>
  );
};
DownloadStudentView.page = "Download";
//DElivery Download
export const DownloadDeliveryDownload = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "DownloadDeliveryDownload", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      Download
    </button>
  );
};
DownloadDeliveryDownload.page = "Download";
// view;
export const DownloadDeliveryView = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "DownloadDeliveryView", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      View
    </button>
  );
};
DownloadDeliveryView.page = "Download";
// //DElivery Download
export const DownloadExamDownload = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "DownloadExamDownload", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      Download
    </button>
  );
};
DownloadExamDownload.page = "Download";
// view;
export const DownloadExamView = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "DownloadExamView", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      View
    </button>
  );
};
DownloadExamView.page = "Download";
// //DElivery Attendance
export const DownloadAttendanceDownloadAttend = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (
    !checkPermission(
      userId,
      "DownloadAttendanceDownloadAttend",
      staticPermissions
    )
  ) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      Download Attend
    </button>
  );
};
DownloadAttendanceDownloadAttend.page = "Download";
// view;
export const DownloadAttendanceViewAttend = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (
    !checkPermission(userId, "DownloadAttendanceViewAttend", staticPermissions)
  ) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      View Attend
    </button>
  );
};
DownloadAttendanceViewAttend.page = "Download";

export const DownloadAttendanceDownloadNotAttend = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (
    !checkPermission(
      userId,
      "DownloadAttendanceDownloadNotAttend",
      staticPermissions
    )
  ) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      Download Not Attend
    </button>
  );
};
DownloadAttendanceDownloadNotAttend.page = "Download";
// view;
export const DownloadAttendanceViewNotAttend = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (
    !checkPermission(
      userId,
      "DownloadAttendanceViewNotAttend",
      staticPermissions
    )
  ) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      View Not Attend
    </button>
  );
};
DownloadAttendanceViewNotAttend.page = "Download";
/*-----------------------------------Morrthy------------------ */

export default {
  CountryCreate,
  CountryEdit,
  CoursesCreate,
  CoursesEdit,
  EnquiryOpenCreate,
  EnquiryOverDueCreate,
  EnquiryOpenEdit,
  EnquiryOpenView,
  EnquiryCloseEdit,
  EnquiryCloseView,
  EnquiryCloseCreate,
  EnquiryOverDueEdit,
  EnquiryOverDueView,
  StudentView,
  DeliveryPendingCreate,
  DeliveryPendingEdit,
  DeliveryPendingView,

  DeliveryDeliverdCreate,

  DeliveryDeliverdEdit,

  DeliveryDeliverdView,


  StudentViewEdStudent,
  StudentViewAdCourse,
  StudentViewAdDelivery,
  StudentViewAdExam,
  StudentViewVieEnquiry,
  DeliveryPenViewWhatsapp,
  DeliveryDeliViewWhatsapp,




  StdViewCourseEdit,
  StdViewCourseView,

  StdViewDeliveryEdit,
  StdViewDeliveryView,
  StdViewDeliveryWhatsapp,

  StdViewExamEdit,
  StdViewExamView,

  StdViewResultEdit,
  StdViewResultView,
  StdViewResultWhatsapp,
  StdViewResultMail,

  EnquiryViewWhatsapp,
  





  /*-----------------------------------Morrthy------------------ */
  ClassCreate,
  ClassView,
  ClassEdit,

  ClassMail,

  ClassWhatsapp,

  ClassSendNotification,

  ClassAddAttendance,
  ClassFollowUpCreate,
  RequestPendingCreate,

  RequestApprovedCreate,

  RequestApprovedCompleted,

  RequestApprovedCancel,

  RequestCompletedCreate,

  RequestPendingEdit,

  RequestPendingView,

  RequestPendingCompleted,

  RequestPendingCancel,
  TaskManagerRepetitiveCreate,

  TaskManagerRepetitiveEdit,

  TaskManagerPendingCreateRepetitive,

  TaskManagerPendingCreateTask,

  TaskManagerPendingEdit,

  TaskManagerInspectionCreateRepetitive,

  TaskManagerInspectionCreateTask,

  TaskManagerInspectionEdit,

  TaskManagerCompletedCreateRepetitive,

  TaskManagerCompletedCreateTask,
  NotificationCreate,
  DownloadEnquiryDownload,

  DownloadEnquiryView,

  DownloadStudentDownload,

  DownloadStudentView,

  DownloadDeliveryDownload,
  DownloadDeliveryView,

  DownloadExamDownload,

  DownloadExamView,

  DownloadAttendanceDownloadAttend,

  DownloadAttendanceViewAttend,

  DownloadAttendanceDownloadNotAttend,

  DownloadAttendanceViewNotAttend,
};
