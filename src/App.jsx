import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import Enquiry from "./pages/Dowloads/Enquiry/Enquiry";
import Students from "../src/pages/Dowloads/Students/Students";
import Delivery from "./pages/Dowloads/Delivery/Delivery";
import Exam from "./pages/Dowloads/Exam/Exam";
import Attendance from "./pages/Dowloads/Attendance/Attendance";
import EnquiryReport from "./pages/Dowloads/Enquiry/EnquiryReport";
import StudentReport from "./pages/Dowloads/Students/StudentsReport";
import DeliveryReport from "./pages/Dowloads/Delivery/DeliveryReport";
import ExamReport from "./pages/Dowloads/Exam/ExamReport";
import AttendanceReport from "./pages/Dowloads/Attendance/AttendanceReport";
import NotAttendanceReport from "./pages/Dowloads/Attendance/AttendanceNotReport";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCountry from "./pages/country/AddCountry";
import EditCountry from "./pages/country/EditCountry";
import AddCourse from "./pages/courses/AddCourse";
import EditCourse from "./pages/courses/EditCourse";
import AddEnquiry from "./pages/enquiry/AddEnquiry";
import AddDelivery from "./pages/delivery/AddDelivery";
import EditDelivery from "./pages/delivery/EditDelivery";
import AddClass from "./pages/class/AddClass";
import EditEnquiry from "./pages/enquiry/EditEnquiry";
import AddRequest from "./pages/request/AddRequest";
import EditPersonalDetails from "./pages/enquiry/EditPersonalDetails";
import ViewEnquiry from "./pages/enquiry/ViewEnquiry";
import ViewStudent from "./pages/student/ViewStudent";
import StudentAddCourse from "./pages/student/StudentAddCourse";
import StudentAddDelivery from "./pages/student/StudentAddDelivery";
import AddExam from "./pages/student/AddExam";
import EditStudent from "./pages/student/EditStudent";
import ViewEquiry from "./pages/student/ViewEquiry";
import ViewStudentEquiry from "./pages/student/ViewEquiry";
import EditStudentCourse from "./pages/student/EditCourse";
import ViewCourse from "./pages/student/ViewCourse";
import EditStudentDelivery from "./pages/student/EditDelivery";
import ViewDelivery from "./pages/student/ViewDelivery";
import EditExam from "./pages/student/EditExam";
import ViewExam from "./pages/student/ViewExam";
import EditResult from "./pages/student/EditResult";
import ViewResult from "./pages/student/ViewResult";
import View from "./pages/delivery/View";
import AddNotification from "./pages/notification/AddNotification";
import AddTask from "./pages/taskManager/AddTask";
import EditTask from "./pages/taskManager/EditTask";
import PendingOnboarding from "./pages/student/PendingOnboarding";
import ExamPendingList from "./pages/student/ExamPendingList";
import PendingOffboarding from "./pages/student/PendingOffboarding";
import PendingInterview from "./pages/student/PendingInterview";
import StudentCourseDue from "./pages/student/StudentCourseDue";
import OverDueTaskList from "./pages/taskManager/overdueList/OverDueList";
import EnquiryNow from "./pages/enquiryNow/EnquiryNow";
import ViewClass from "./pages/class/ViewClass";
import EditRequest from "./pages/request/EditRequest";
import AddAttendence from "./pages/class/AddAttendence";
import ClassFollowUp from "./pages/classFollowup/ClassFollowUp";
import DeliveryFollowUp from "./pages/classFollowup/CompletedFollowUp";
import CompletedFollowUp from "./pages/classFollowup/CompletedFollowUp";
import EditClassFollowUp from "./pages/classFollowup/EditClassFollowUp";
import ViewCompleted from "./pages/classFollowup/ViewCompleted";
import ClassFollowUpCount from "./pages/classFollowup/ClassFollowUpCount";
import RepetitiveList from "./pages/taskManager/repetitive/RepetitiveList";
import AddRepetitive from "./pages/taskManager/repetitive/AddRepetitive";
import UserPage from "./pages/userManagement/UserPage";
import ManagementDashboard from "./pages/userManagement/ManagementDashboard";
import CreatePage from "./pages/userManagement/CreatePage";
import CreateButton from "./pages/userManagement/CreateButton";
import UserTypeList from "./pages/UserType/UserTypeList";
import EditUserType from "./pages/UserType/EditUserType";
const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<SIgnUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/enquiry-now" element={<EnquiryNow />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/maintenance" element={<Maintenance />} />
          {/* country  */}
          <Route path="/country" element={<CountryList />} />
          <Route path="/add-country" element={<AddCountry />} />
          <Route path="/edit-country/:id" element={<EditCountry />} />
          courses
          <Route path="/courses" element={<CoursesList />} />
          <Route path="/add-courses" element={<AddCourse />} />
          <Route path="/add-courses/:id" element={<EditCourse />} />
          {/* enquiry  */}
          <Route path="/openList-enquiry" element={<OpenListEnquiry />} />
          <Route path="/add-enquiry" element={<AddEnquiry />} />
          <Route path="/edit-enquiry/:id" element={<EditEnquiry />} />
          <Route path="/edit-personal/:id" element={<EditPersonalDetails />} />
          <Route path="/view-enquiry/:id" element={<ViewEnquiry />} />
          <Route path="/overdueList-enquiry" element={<OverdueListEnquiry />} />
          <Route path="/closeList-enquiry" element={<CloseListEnquiry />} />
          {/* student  */}
          <Route path="/student" element={<StudentList />} />
          <Route path="/view-student/:id" element={<ViewStudent />} />
          <Route
            path="/add-student-course/:id"
            element={<StudentAddCourse />}
          />
          <Route
            path="/add-student-delivery/:id"
            element={<StudentAddDelivery />}
          />
          <Route path="/add-exam/:id" element={<AddExam />} />
          <Route path="/edit-exam/:id" element={<EditExam />} />
          <Route path="/view-exam/:id" element={<ViewExam />} />
          <Route path="/exam-pending-list" element={<ExamPendingList />} />
          <Route path="/edit-result/:id" element={<EditResult />} />
          <Route path="/view-result/:id" element={<ViewResult />} />
          <Route path="/edit-student/:id" element={<EditStudent />} />
          <Route
            path="/view-student-enquiry/:id"
            element={<ViewStudentEquiry />}
          />
          <Route
            path="/edit-student-course/:id"
            element={<EditStudentCourse />}
          />
          <Route path="/view-course/:id" element={<ViewCourse />} />
          <Route
            path="/edit-student-delivery/:id"
            element={<EditStudentDelivery />}
          />
          <Route path="/view-delivery/:id" element={<ViewDelivery />} />
          <Route path="/pending-onboard" element={<PendingOnboarding />} />
          <Route path="/pending-offboard" element={<PendingOffboarding />} />
          <Route path="/pending-interview" element={<PendingInterview />} />
          <Route path="/course-due" element={<StudentCourseDue />} />
          <Route path="/over-due-task-list" element={<OverDueTaskList />} />
          {/* delivery  */}
          <Route path="/pending-delivery" element={<PendingListDelivery />} />
          <Route path="/add-delivery" element={<AddDelivery />} />
          <Route path="/edit-delivery/:id" element={<EditDelivery />} />
          <Route
            path="/deliverd-delivery"
            element={<DeliveredListDelivery />}
          />
          <Route path="/view-student-delivery/:id" element={<View />} />
          {/* class  */}
          <Route path="/class" element={<ClassList />} />
          <Route path="/add-class" element={<AddClass />} />
          <Route path="/view-class/:id" element={<ViewClass />} />
          <Route path="/add-attendence/:id" element={<AddAttendence />} />
          {/* request  */}
          <Route path="/request-pending" element={<PendingListRequest />} />
          <Route path="/add-request" element={<AddRequest />} />
          <Route path="/request-approved" element={<ApprovedListRequest />} />
          <Route path="/request-completed" element={<CompletedListRequest />} />
          <Route path="/edit-request/:id" element={<EditRequest />} />
          {/* task Manager  */}
          <Route path="/task-inspection" element={<InspectionListTask />} />
          <Route path="/repetitive-list" element={<RepetitiveList />} />
          <Route path="/add-repetitive" element={<AddRepetitive />} />
          <Route path="/task-pending" element={<PendingListTask />} />
          <Route path="/task-completed" element={<CompletedListTask />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
          <Route path="/notification" element={<NotificationList />} />
          <Route path="/add-notification" element={<AddNotification />} />
          <Route path="/download-enquiry" element={<EnquiryDownload />} />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route
            path="/change-password"
            element={<ProtectedRoute element={<ChangePassword />} />}
          />
          {/* Class Follow Up  */}
          <Route
            path="/class-followup-count"
            element={<ProtectedRoute element={<ClassFollowUpCount />} />}
          />
          <Route
            path="/class-followup"
            element={<ProtectedRoute element={<ClassFollowUp />} />}
          />
          <Route
            path="/class-completed-followup"
            element={<ProtectedRoute element={<CompletedFollowUp />} />}
          />
          <Route
            path="/view-completed-followup/:id"
            element={<ProtectedRoute element={<ViewCompleted />} />}
          />
          <Route
            path="/edit-class-followup/:id"
            element={<ProtectedRoute element={<EditClassFollowUp />} />}
          />
          {/* Download  */}
          <Route
            path="/enquiry"
            element={<ProtectedRoute element={<Enquiry />} />}
          />
          <Route
            path="/students"
            element={<ProtectedRoute element={<Students />} />}
          />
          <Route
            path="/delivery"
            element={<ProtectedRoute element={<Delivery />} />}
          />
          <Route path="/exam" element={<ProtectedRoute element={<Exam />} />} />
          <Route
            path="/attendance"
            element={<ProtectedRoute element={<Attendance />} />}
          />
          <Route
            path="/enquiryreport"
            element={<ProtectedRoute element={<EnquiryReport />} />}
          />
          <Route
            path="/studentreport"
            element={<ProtectedRoute element={<StudentReport />} />}
          />
          <Route
            path="/deliveryreport"
            element={<ProtectedRoute element={<DeliveryReport />} />}
          />
          <Route
            path="/examreport"
            element={<ProtectedRoute element={<ExamReport />} />}
          />
          <Route
            path="/attendancereport"
            element={<ProtectedRoute element={<AttendanceReport />} />}
          />
          <Route
            path="/notattend"
            element={<ProtectedRoute element={<NotAttendanceReport />} />}
          />
          <Route path="/userManagement" element={<UserPage />} />
          <Route
            path="/management-dashboard/:id"
            element={<ManagementDashboard />}
          />
          <Route path="/page-management" element={<CreatePage />} />
          <Route path="/button-management" element={<CreateButton />} />
          {/* ///UserTypeList */}
          <Route path="/userType" element={<UserTypeList />} />
          <Route path="/edit-user-type/:id" element={<EditUserType />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
};

export default App;
