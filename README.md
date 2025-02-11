# AIA-CRM

## Overview

AIA-CRM is a Customer Relationship Management (CRM) system designed for managing business operations such as inquiries, class follow-ups, student management, task tracking, notifications, and more. The system is built using React with Vite, Tailwind CSS, and Material UI for the frontend.

## Project Structure

└── ag-solutions-bangalore-aia-crm/
├── README.md
├── index.html
├── package.json
├── postcss.config.cjs
├── tailwind.config.cjs
├── vite.config.js
├── public/
│ └── img/
└── src/
├── App.css
├── App.jsx
├── index.css
├── main.jsx
├── assets/
├── base/
│ └── BaseUrl.jsx
├── components/
│ ├── ClassFollowupFilter.jsx
│ ├── DashboardNavbar.jsx
│ ├── DeliveryFilter.jsx
│ ├── EnquiryFilter.jsx
│ ├── Footer.jsx
│ ├── Logout.jsx
│ ├── ProtectedRoute.jsx
│ ├── RequestFilter.jsx
│ ├── SideNav.jsx
│ ├── TaskManagerFilter.jsx
│ ├── buttonIndex/
│ │ ├── ButtonComponents.jsx
│ │ └── checkPermission.js
│ └── common/
│ ├── ButtonCss.jsx
│ ├── DropDown.jsx
│ ├── PageTitle.jsx
│ ├── TextField/
│ │ ├── TextField.jsx
│ │ └── textfield.module.css
│ ├── dataCard/
│ │ ├── CommonCard.jsx
│ │ └── DetailsCard.jsx
│ ├── popup/
│ │ └── SelectPopup.jsx
│ └── table/
│ ├── ClassFollowUpTable.jsx
│ ├── CourseTable.jsx
│ ├── DeliveryTable.jsx
│ ├── ExamTable.jsx
│ ├── FollowUp.jsx
│ ├── FollowUpTable.jsx
│ ├── RequestTable.jsx
│ └── ResultTable.jsx
├── layout/
│ └── Layout.jsx
├── pages/
│ ├── Dowloads/
│ │ ├── Attendance/
│ │ │ ├── Attendance.jsx
│ │ │ ├── AttendanceNotReport.jsx
│ │ │ └── AttendanceReport.jsx
│ │ ├── Delivery/
│ │ │ ├── Delivery.jsx
│ │ │ └── DeliveryReport.jsx
│ │ ├── Enquiry/
│ │ │ ├── Enquiry.jsx
│ │ │ └── EnquiryReport.jsx
│ │ ├── Exam/
│ │ │ ├── Exam.jsx
│ │ │ └── ExamReport.jsx
│ │ └── Students/
│ │ ├── Students.jsx
│ │ └── StudentsReport.jsx
│ ├── UserType/
│ │ ├── EditUserType.jsx
│ │ └── UserTypeList.jsx
│ ├── auth/
│ │ ├── ForgetPassword.jsx
│ │ ├── SIgnUp.jsx
│ │ └── SignIn.jsx
│ ├── class/
│ │ ├── AddAttendence.jsx
│ │ ├── AddClass.jsx
│ │ ├── ClassList.jsx
│ │ ├── Extra.jsx
│ │ └── ViewClass.jsx
│ ├── classFollowup/
│ │ ├── ClassFollowUp.jsx
│ │ ├── ClassFollowUpCount.jsx
│ │ ├── CompletedFollowUp.jsx
│ │ ├── EditClassFollowUp.jsx
│ │ └── ViewCompleted.jsx
│ ├── country/
│ │ ├── AddCountry.jsx
│ │ ├── CountryList.jsx
│ │ └── EditCountry.jsx
│ ├── courses/
│ │ ├── AddCourse.jsx
│ │ ├── CoursesList.jsx
│ │ └── EditCourse.jsx
│ ├── dashboard/
│ │ └── Home.jsx
│ ├── delivery/
│ │ ├── AddDelivery.jsx
│ │ ├── EditDelivery.jsx
│ │ ├── View.jsx
│ │ ├── deliveredList/
│ │ │ └── DeliveredListDelivery.jsx
│ │ └── pendingList/
│ │ └── PendingListDelivery.jsx
│ ├── download/
│ │ ├── attendance/
│ │ │ └── AttendanceDownload.jsx
│ │ ├── delivery/
│ │ │ └── DeliveryDownload.jsx
│ │ ├── enquiry/
│ │ │ └── EnquiryDownload.jsx
│ │ ├── exam/
│ │ │ └── ExamDownload.jsx
│ │ └── student/
│ │ └── StudentDownload.jsx
│ ├── enquiry/
│ │ ├── AddEnquiry.jsx
│ │ ├── Edit.jsx
│ │ ├── EditEnquiry.jsx
│ │ ├── EditPersonalDetails.jsx
│ │ ├── ViewEnquiry.jsx
│ │ ├── closeList/
│ │ │ └── CloseListEnquiry.jsx
│ │ ├── openList/
│ │ │ └── OpenListEnquiry.jsx
│ │ └── overdueList/
│ │ └── OverdueListEnquiry.jsx
│ ├── enquiryNow/
│ │ ├── EnquiryNow.jsx
│ │ └── enquiry.module.css
│ ├── maintenance/
│ │ └── Maintenance.jsx
│ ├── notification/
│ │ ├── AddNotification.jsx
│ │ └── NotificationList.jsx
│ ├── profile/
│ │ ├── ChangePassword.jsx
│ │ └── Profile.jsx
│ ├── request/
│ │ ├── AddRequest.jsx
│ │ ├── EditRequest.jsx
│ │ ├── ViewRequest.jsx
│ │ ├── approvedList/
│ │ │ └── ApprovedListRequest.jsx
│ │ ├── completedList/
│ │ │ └── CompletedListRequest.jsx
│ │ └── pendingList/
│ │ └── PendingListRequest.jsx
│ ├── student/
│ │ ├── AddExam.jsx
│ │ ├── EditCourse.jsx
│ │ ├── EditDelivery.jsx
│ │ ├── EditExam.jsx
│ │ ├── EditResult.jsx
│ │ ├── EditStudent.jsx
│ │ ├── ExamPendingList.jsx
│ │ ├── PendingInterview.jsx
│ │ ├── PendingOffboarding.jsx
│ │ ├── PendingOnboarding.jsx
│ │ ├── StudentAddCourse.jsx
│ │ ├── StudentAddDelivery.jsx
│ │ ├── StudentCourseDue.jsx
│ │ ├── StudentList.jsx
│ │ ├── ViewCourse.jsx
│ │ ├── ViewDelivery.jsx
│ │ ├── ViewEquiry.jsx
│ │ ├── ViewExam.jsx
│ │ ├── ViewResult.jsx
│ │ └── ViewStudent.jsx
│ ├── taskManager/
│ │ ├── AddTask.jsx
│ │ ├── EditTask.jsx
│ │ ├── completedList/
│ │ │ └── CompletedListTask.jsx
│ │ ├── inspectionList/
│ │ │ └── InspectionListTask.jsx
│ │ ├── overdueList/
│ │ │ └── OverDueList.jsx
│ │ ├── pendingList/
│ │ │ └── PendingListTask.jsx
│ │ └── repetitive/
│ │ ├── AddRepetitive.jsx
│ │ └── RepetitiveList.jsx
│ └── userManagement/
│ ├── CreateButton.jsx
│ ├── CreatePage.jsx
│ ├── ManagementDashboard.jsx
│ └── UserPage.jsx
└── utils/
└── ContextPanel.jsx

## Features

- User Authentication (Sign In, Sign Up, Forgot Password)
- Dashboard with business insights
- Enquiry Management
- Class Follow-Up Tracking
- Task Manager for task assignments
- Student & Course Management
- Notifications & Requests Handling
- Downloadable Reports (Attendance, Exams, Deliveries, Enquiries, Students)
- User Management Dashboard
- Protected Routes using Authentication

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (>=14.x)
- npm or yarn

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repository/aia-crm.git
   ```
2. Navigate to the project directory:
   ```sh
   cd aia-crm
   ```
3. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
4. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

## Configuration

- API Base URL is managed in `src/base/BaseUrl.jsx`
- Tailwind CSS configuration is located in `tailwind.config.cjs`
- Environment variables should be added in a `.env` file

## Build for Production

To create a production build, run:

```sh
npm run build
# or
yarn build
```

## Deployment

1. After building, deploy the `dist/` folder to your preferred hosting service.
2. Make sure API endpoints are correctly set in production mode.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any queries, reach out to the development team at Ag solutions.
