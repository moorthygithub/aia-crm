import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Students from "../src/pages/Dowloads/Students/Students";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgetPassword from "./pages/auth/ForgetPassword";
import SignIn from "./pages/auth/SignIn";
import SIgnUp from "./pages/auth/SIgnUp";
import BirthdayHoliday from "./pages/birthday/BirthdayHoliday";
import AddAttendence from "./pages/class/AddAttendence";
import AddClass from "./pages/class/AddClass";
import ClassList from "./pages/class/ClassList";
import ViewClass from "./pages/class/ViewClass";
import ClassFollowUp from "./pages/classFollowup/ClassFollowUp";
import ClassFollowUpCount from "./pages/classFollowup/ClassFollowUpCount";
import CompletedFollowUp from "./pages/classFollowup/CompletedFollowUp";
import EditClassFollowUp from "./pages/classFollowup/EditClassFollowUp";
import ViewCompleted from "./pages/classFollowup/ViewCompleted";
import AddCountry from "./pages/country/AddCountry";
import CountryList from "./pages/country/CountryList";
import EditCountry from "./pages/country/EditCountry";
import AddCourse from "./pages/courses/AddCourse";
import CoursesList from "./pages/courses/CoursesList";
import EditCourse from "./pages/courses/EditCourse";
import Home from "./pages/dashboard/Home";
import AddDelivery from "./pages/delivery/AddDelivery";
import DeliveredListDelivery from "./pages/delivery/deliveredList/DeliveredListDelivery";
import EditDelivery from "./pages/delivery/EditDelivery";
import PendingListDelivery from "./pages/delivery/pendingList/PendingListDelivery";
import View from "./pages/delivery/View";
import Attendance from "./pages/Dowloads/Attendance/Attendance";
import NotAttendanceReport from "./pages/Dowloads/Attendance/AttendanceNotReport";
import AttendanceReport from "./pages/Dowloads/Attendance/AttendanceReport";
import Delivery from "./pages/Dowloads/Delivery/Delivery";
import DeliveryReport from "./pages/Dowloads/Delivery/DeliveryReport";
import Enquiry from "./pages/Dowloads/Enquiry/Enquiry";
import EnquiryReport from "./pages/Dowloads/Enquiry/EnquiryReport";
import Exam from "./pages/Dowloads/Exam/Exam";
import ExamReport from "./pages/Dowloads/Exam/ExamReport";
import StudentReport from "./pages/Dowloads/Students/StudentsReport";
import EnquiryDownload from "./pages/download/enquiry/EnquiryDownload";
import AddEnquiry from "./pages/enquiry/AddEnquiry";
import CloseListEnquiry from "./pages/enquiry/closeList/CloseListEnquiry";
import EditEnquiry from "./pages/enquiry/EditEnquiry";
import EditPersonalDetails from "./pages/enquiry/EditPersonalDetails";
import OpenListEnquiry from "./pages/enquiry/openList/OpenListEnquiry";
import OverdueListEnquiry from "./pages/enquiry/overdueList/OverdueListEnquiry";
import ViewEnquiry from "./pages/enquiry/ViewEnquiry";
import EnquiryNow from "./pages/enquiryNow/EnquiryNow";
import Maintenance from "./pages/maintenance/Maintenance";
import AddNotification from "./pages/notification/AddNotification";
import NotificationList from "./pages/notification/NotificationList";
import ChangePassword from "./pages/profile/ChangePassword";
import Profile from "./pages/profile/Profile";
import AddRequest from "./pages/request/AddRequest";
import ApprovedListRequest from "./pages/request/approvedList/ApprovedListRequest";
import CompletedListRequest from "./pages/request/completedList/CompletedListRequest";
import EditRequest from "./pages/request/EditRequest";
import PendingListRequest from "./pages/request/pendingList/PendingListRequest";
import AddExam from "./pages/student/AddExam";
import EditStudentCourse from "./pages/student/EditCourse";
import EditStudentDelivery from "./pages/student/EditDelivery";
import EditExam from "./pages/student/EditExam";
import EditResult from "./pages/student/EditResult";
import EditStudent from "./pages/student/EditStudent";
import ExamPendingList from "./pages/student/ExamPendingList";
import PendingInterview from "./pages/student/PendingInterview";
import PendingOffboarding from "./pages/student/PendingOffboarding";
import PendingOnboarding from "./pages/student/PendingOnboarding";
import StudentAddCourse from "./pages/student/StudentAddCourse";
import StudentAddDelivery from "./pages/student/StudentAddDelivery";
import StudentCourseDue from "./pages/student/StudentCourseDue";
import StudentList from "./pages/student/StudentList";
import ViewCourse from "./pages/student/ViewCourse";
import ViewDelivery from "./pages/student/ViewDelivery";
import ViewStudentEquiry from "./pages/student/ViewEquiry";
import ViewExam from "./pages/student/ViewExam";
import ViewResult from "./pages/student/ViewResult";
import ViewStudent from "./pages/student/ViewStudent";
import AddTask from "./pages/taskManager/AddTask";
import CompletedListTask from "./pages/taskManager/completedList/CompletedListTask";
import EditTask from "./pages/taskManager/EditTask";
import InspectionListTask from "./pages/taskManager/inspectionList/InspectionListTask";
import OverDueTaskList from "./pages/taskManager/overdueList/OverDueList";
import PendingListTask from "./pages/taskManager/pendingList/PendingListTask";
import AddRepetitive from "./pages/taskManager/repetitive/AddRepetitive";
import RepetitiveList from "./pages/taskManager/repetitive/RepetitiveList";
import CreateButton from "./pages/userManagement/CreateButton";
import CreatePage from "./pages/userManagement/CreatePage";
import ManagementDashboard from "./pages/userManagement/ManagementDashboard";
import UserPage from "./pages/userManagement/UserPage";
import EditUserType from "./pages/UserType/EditUserType";
import UserTypeList from "./pages/UserType/UserTypeList";
import WebsiteEnquiry from "./pages/websiteEnquiry/WebsiteEnquiry";
import WebsiteEnquiryClose from "./pages/websiteEnquiry/WebsiteEnquiryClose";
import CreateEnquiry from "./pages/websiteEnquiry/CreateEnquiry";
import DownloadWebsiteEnquiry from "./pages/Dowloads/WebsiteEnquiry/DownloadWebsiteEnquiry";
import WebsiteEnquiryReport from "./pages/Dowloads/WebsiteEnquiry/WebsiteEnquiryReport";
import EditRepetitive from "./pages/taskManager/repetitive/EditRepetitive";
import NotFound from "./components/common/NotFound";
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
          <Route path="/update-repetitive/:id" element={<EditRepetitive />} />
          <Route path="/task-pending" element={<PendingListTask />} />
          <Route path="/task-completed" element={<CompletedListTask />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
          <Route path="/notification" element={<NotificationList />} />
          <Route path="/add-notification" element={<AddNotification />} />
          <Route path="/download-enquiry" element={<EnquiryDownload />} />
          <Route path="/website-enquiry" element={<WebsiteEnquiry />} />
          <Route
            path="/website-enquiry-close"
            element={<WebsiteEnquiryClose />}
          />
          <Route path="/create-enquiry/:id" element={<CreateEnquiry />} />
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
            path="/download-website-enquiry"
            element={<ProtectedRoute element={<DownloadWebsiteEnquiry />} />}
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
            path="/websiteenquiryreport"
            element={<ProtectedRoute element={<WebsiteEnquiryReport />} />}
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
          <Route path="/birthdaylist" element={<BirthdayHoliday />} />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
};

export default App;
