import { Edit, Eye, Plus, PlusCircle, Trash, Truck, View } from "lucide-react";
import React from "react";
import { checkPermission } from "./checkPermission";

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
      {/* <Plus className="h-4 w-4 " /> */}
      + Country
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
      {/* <Plus className="h-4 w-4 " /> */}
      + Courses
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
      {/* <Plus className="h-4 w-4 " /> */}
      + Enquiry 
    </button>
  );
};
EnquiryOpenCreate.page = "Enquiry";

export const EnquiryOverDueCreate = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "EnquiryOverDueCreate", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}
      + Enquiry 
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
      {/* <Plus className="h-4 w-4 " /> */}
      + Enquiry 
    </button>
  );
};
EnquiryCloseCreate.page = "Enquiry";


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


/*---------------------------------Delivery-------------------------- */

export const DeliveryPendingCreate = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "DeliveryPendingCreate", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      {/* <Plus className="h-4 w-4 " /> */}
      + Delivery 
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
      {/* <Plus className="h-4 w-4 " /> */}
      + Delivery 
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



































































































































































































































































































































































































































































































































































































































































































































































































































































































































































/*-----------------------------------Morrthy------------------ */

export default {
    CountryCreate,
    CountryEdit,
    CoursesCreate,
    CoursesEdit,
    EnquiryOpenCreate,
    EnquiryOverDueCreate,
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










































































































































































































    /*-----------------------------------Morrthy------------------ */
};
