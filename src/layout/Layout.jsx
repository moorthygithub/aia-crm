import { useState } from "react";
import Footer from "../components/Footer";
import DashboardNavbar from "../components/DashboardNavbar";
import SideNav from "../components/SideNav";
// xl:ml-80
const Layout = ({ children }) => {
  const [openSideNav, setOpenSideNav] = useState(false);

   const [openSidebar , setOpenSidebar] = useState(true)
  return (
    <div className="bg-blue-gray-50/50">
      {openSidebar && 
      <SideNav openSideNav={openSideNav} setOpenSideNav={setOpenSideNav} />
    }
     <div className={openSidebar ? "p-4 xl:ml-72" : "w-full p-5"}>
        <DashboardNavbar
          openSideNav={openSideNav}
          setOpenSideNav={setOpenSideNav}
          setOpenSidebar={setOpenSidebar}
          openSidebar={openSidebar}
        />
        {children}
        {/* <div className="text-blue-gray-600">
          <Footer />
        </div> */}
      </div>
    </div>
  );
};

export default Layout;
