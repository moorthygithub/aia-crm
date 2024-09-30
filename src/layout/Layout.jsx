import { useState } from "react";
import Footer from "../components/Footer";
import DashboardNavbar from "../components/DashboardNavbar";
import SideNav from "../components/SideNav";
// xl:ml-80
const Layout = ({ children }) => {
  const [openSideNav, setOpenSideNav] = useState(false);
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <SideNav openSideNav={openSideNav} setOpenSideNav={setOpenSideNav} />
      <div className="p-4 xl:ml-72">
        <DashboardNavbar
          openSideNav={openSideNav}
          setOpenSideNav={setOpenSideNav}
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
