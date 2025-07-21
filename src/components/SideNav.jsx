import { Link, NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  TableCellsIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useEffect, useRef } from "react";
import image from "../assets/logo.png";
import { MdDashboard } from "react-icons/md";
import { FaBirthdayCake, FaFlag } from "react-icons/fa";
import { MdClass } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";
import { FaTruckMoving } from "react-icons/fa6";
import { FaCodePullRequest } from "react-icons/fa6";
import { GrTasks } from "react-icons/gr";
import { MdNotificationsActive } from "react-icons/md";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { CgWebsite } from "react-icons/cg";

const SideNav = ({ openSideNav, setOpenSideNav }) => {
  const sidenavRef = useRef(null);
  const { pathname } = useLocation();
  const sidenavType = "dark";

  const pageControl = JSON.parse(localStorage.getItem("pageControl") || "[]");
  const userId = localStorage.getItem("id");

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white",
    transparent: "bg-transparent",
  };

  const navigationItems = [
    { icon: MdDashboard, label: "Dashboard", path: "/home" },
    { icon: FaFlag, label: "Country", path: "/country" },
    { icon: MdClass, label: "Courses", path: "/courses" },
    { icon: FaUserGroup, label: "Enquiry", path: "/openList-enquiry" },
    { icon: IoMdPersonAdd, label: "Student", path: "/student" },
    { icon: FaTruckMoving, label: "Delivery", path: "/pending-delivery" },
    { icon: TableCellsIcon, label: "Class", path: "/class" },
    { icon: FaBirthdayCake, label: "Birthday", path: "/birthdaylist" },
    {
      icon: TableCellsIcon,
      label: "Class Follow Up",
      path: "/class-followup-count",
    },
    { icon: FaCodePullRequest, label: "Request", path: "/request-pending" },
    { icon: GrTasks, label: "Task Manager", path: "/task-pending" },
    {
      icon: CgWebsite,
      label: "Website Enquiry",
      path: "/website-enquiry",
    },
    {
      icon: MdNotificationsActive,
      label: "Notification",
      path: "/notification",
    },
    { icon: PiDownloadSimpleBold, label: "Download", path: "/enquiry" },
    { icon: UserCircleIcon, label: "User Management", path: "/userManagement" },
    { icon: UserCircleIcon, label: "User Type", path: "/userType" },
  ];

  return (
    <aside
      ref={sidenavRef}
      className={`${sidenavTypes[sidenavType]} ${
        openSideNav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-[272px] rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100 overflow-y-auto`}
    >
      <div className="relative">
        <Link to="/home" className="flex items-center justify-center p-4">
          <div className="flex items-center text-white mt-4">
            <div className="bg-white p-2 rounded-md">
              <img src={image} alt="Logo" className="h-12 w-auto" />
            </div>
          </div>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSideNav(false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          {navigationItems.map((item, index) => {
            const control = pageControl.find(
              (p) => p.page === item.label && p.url === item.path.substring(1)
            );
            if (
              !control ||
              !control.userIds.includes(userId) ||
              control.status !== "Active"
            ) {
              return null;
            }

            return (
              <li key={index}>
                <NavLink to={item.path}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color="white"
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      <item.icon className="w-5 h-5 text-inherit" />
                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        {item.label}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default SideNav;
