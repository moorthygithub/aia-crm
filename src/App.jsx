import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import SignIn from "./pages/auth/SignIn";
import SIgnUp from "./pages/auth/SIgnUp";
import Maintenance from "./pages/maintenance/Maintenance";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Profile from "./pages/profile/Profile";
import ChangePassword from "./pages/profile/ChangePassword";
import CountryList from "./pages/country/CountryList";
import CoursesList from "./pages/courses/CoursesList";
import OpenListEnquiry from "./pages/enquiry/openList/OpenListEnquiry";
import StudentList from "./pages/student/StudentList";
import PendingListDelivery from "./pages/delivery/pendingList/PendingListDelivery";
import ClassList from "./pages/class/ClassList";
import PendingListRequest from "./pages/request/pendingList/PendingListRequest";
import PendingListTask from "./pages/taskManager/pendingList/PendingListTask";
import NotificationList from "./pages/notification/NotificationList";
import EnquiryDownload from "./pages/download/enquiry/EnquiryDownload";
import OverdueListEnquiry from "./pages/enquiry/overdueList/OverdueListEnquiry";
import CloseListEnquiry from "./pages/enquiry/closeList/CloseListEnquiry";
import DeliveredListDelivery from "./pages/delivery/deliveredList/DeliveredListDelivery";
import ApprovedListRequest from "./pages/request/approvedList/ApprovedListRequest";
import CompletedListRequest from "./pages/request/completedList/CompletedListRequest";
import InspectionListTask from "./pages/taskManager/inspectionList/InspectionListTask";
import CompletedListTask from "./pages/taskManager/completedList/CompletedListTask";
import AddCountry from "./pages/country/AddCountry";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SIgnUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/maintenance" element={<Maintenance />} />
        {/* country  */}
        <Route path="/country" element={<CountryList />} />
        <Route path="/add-country" element={<AddCountry />} />
        courses
        <Route path="/courses" element={<CoursesList />} />
        {/* enquiry  */}
        <Route path="/openList-enquiry" element={<OpenListEnquiry />} />
        <Route path="/overdueList-enquiry" element={<OverdueListEnquiry />} />
        <Route path="/closeList-enquiry" element={<CloseListEnquiry />} />
        {/* student  */}
        <Route path="/student" element={<StudentList />} />
        {/* delivery  */}
        <Route path="/pending-delivery" element={<PendingListDelivery />} />
        <Route path="/deliverd-delivery" element={<DeliveredListDelivery />} />
        {/* class  */}
        <Route path="/class" element={<ClassList />} />
        {/* request  */}
        <Route path="/request-pending" element={<PendingListRequest />} />
        <Route path="/request-approved" element={<ApprovedListRequest />} />
        <Route path="/request-completed" element={<CompletedListRequest />} />
        {/* task Manager  */}
        <Route path="/task-pending" element={<PendingListTask />} />
        <Route path="/task-inspection" element={<InspectionListTask />} />
        <Route path="/task-completed" element={<CompletedListTask />} />
        <Route path="/notification" element={<NotificationList />} />
        <Route path="/download-enquiry" element={<EnquiryDownload />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/change-password"
          element={<ProtectedRoute element={<ChangePassword />} />}
        />
        {/* <Route
          path="*"
          element={<ProtectedRoute element={<Navigate to="/" />} />}
        /> */}
      </Routes>
    </>
  );
};

export default App;
