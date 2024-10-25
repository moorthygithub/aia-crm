import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import Logout from "./Logout";
import { useState } from "react";
import { HiArrowRightStartOnRectangle } from "react-icons/hi2";

const DashboardNavbar = ({ openSideNav, openSidebar, setOpenSideNav , setOpenSidebar}) => {
  const { pathname } = useLocation();

  const [openModal, setOpenModal] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleOpenLogout = () => setOpenModal(!openModal);

  const pathSegments = pathname.split("/").filter((el) => el !== "");

  const breadcrumbs = [
    { name: "Home", link: "/home" },
    ...pathSegments.slice(0, 1).map((segment, index) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      link: `/home/${segment}`,  
    })),
  ];

  const pageTitle =
    pathSegments.length === 0
      ? "Home"
      : pathSegments[pathSegments.length - 1]?.charAt(0).toUpperCase() +
        pathSegments[pathSegments.length - 1]?.slice(1);

  // Hardcode fixedNavbar to true
  const fixedNavbar = true;

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 bg-gradient-to-br from-gray-800 text-white to-gray-700 "
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex  justify-between gap-6 flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            {breadcrumbs.map((breadcrumb, index) => (
              <Link key={index}>
                <Typography
                  variant="small"
                  color="white"
                  className="font-normal  transition-all text-white hover:text-blue-500 hover:opacity-100"
                >
                  {breadcrumb.name}
                </Typography>
              </Link>
            ))}
          </Breadcrumbs>
          {/* <Typography variant="h6" color="white">
            {pageTitle}
          </Typography> */}
        </div>
        <div className="flex items-center">
          {/* Search and other elements can be added here */}

          {/* Sidebar toggle button for mobile view */}
          <IconButton
            variant="text"
            color="white"
            className="grid "
            // onClick={() => setOpenSideNav(!openSideNav) }
            // onClick={() => {
            //   setOpenSideNav(!openSideNav);
            //   console.log( openSideNav, 'clicking');
            // }}
            // onClick={() => {
            //   setOpenSidebar(!openSidebar)
            //   setOpenSideNav((prevState) => {
            //     console.log(!prevState, 'clicking'); 
            //     return !prevState; 
            //   });
            // }}
            
            onClick={() => {
              const screenWidth = window.innerWidth;
            
              if (screenWidth >= 1024) {
                // For big screens (e.g., desktops, tablets in landscape)
                setOpenSidebar(!openSidebar);
              } else {
                // For small screens (e.g., mobile, tablets in portrait)
                setOpenSideNav((prevState) => {
                  console.log(!prevState, 'clicking');
                  return !prevState;
                });
              }
            }}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-white" />
          </IconButton>
          {/* profile icon  */}
          <Menu
            open={profileMenuOpen}
            handler={setProfileMenuOpen}
            placement="bottom-end"
          >
            <MenuHandler>
              <IconButton variant="text" color="orange">
                <UserCircleIcon className="h-5 w-5 text-red" />
              </IconButton>
            </MenuHandler>
            <MenuList className="bg-gray-700">
              <MenuItem>
                <Link to="/profile" className="text-black">
                  Profile
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/change-password" className="text-black">
                  Change Password
                </Link>
              </MenuItem>
            </MenuList>
          </Menu>
          {/* Settings icon */}
          <IconButton variant="text" color="red" onClick={handleOpenLogout}>
            <HiArrowRightStartOnRectangle className="h-5 w-5 text-red" />
          </IconButton>
        </div>
      </div>
      <Logout open={openModal} handleOpen={handleOpenLogout} />
    </Navbar>
  );
};

export default DashboardNavbar;
