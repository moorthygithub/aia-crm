# AIA-CRM

## Overview

AIA-CRM is a Customer Relationship Management (CRM) system designed for managing business operations such as inquiries, class follow-ups, student management, task tracking, notifications, and more. The system is built using React with Vite, Tailwind CSS, and Material UI for the frontend.

## Project Structure

```
ag-solutions-bangalore-aia-crm/
│-- README.md
│-- index.html
│-- package.json
│-- vite.config.js
│-- postcss.config.cjs
│-- tailwind.config.cjs
│-- test.jsx
│-- test2.jsx
│-- public/
│   └── img/
│-- src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   ├── assets/
│   ├── base/
│   │   └── BaseUrl.jsx
│   ├── components/
│   │   ├── ClassFollowupFilter.jsx
│   │   ├── DashboardNavbar.jsx
│   │   ├── DeliveryFilter.jsx
│   │   ├── EnquiryFilter.jsx
│   │   ├── Footer.jsx
│   │   ├── Logout.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── RequestFilter.jsx
│   │   ├── SideNav.jsx
│   │   ├── TaskManagerFilter.jsx
│   │   ├── buttonIndex/
│   │   │   ├── ButtonComponents.jsx
│   │   │   ├── checkPermission.js
│   │   ├── common/
│   │       ├── ButtonCss.jsx
│   │       ├── DropDown.jsx
│   │       ├── PageTitle.jsx
│   │       ├── TextField/
│   │       ├── dataCard/
│   │       ├── popup/
│   │       ├── table/
│   ├── layout/
│   │   └── Layout.jsx
│   ├── pages/
│   │   ├── auth/
│   │   ├── class/
│   │   ├── classFollowup/
│   │   ├── country/
│   │   ├── courses/
│   │   ├── dashboard/
│   │   ├── delivery/
│   │   ├── download/
│   │   ├── enquiry/
│   │   ├── enquiryNow/
│   │   ├── maintenance/
│   │   ├── notification/
│   │   ├── profile/
│   │   ├── request/
│   │   ├── student/
│   │   ├── taskManager/
│   │   ├── userManagement/
│   ├── utils/
│   │   └── ContextPanel.jsx
```

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
