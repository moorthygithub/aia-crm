import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../base/BaseUrl";
import axios from "axios";

export const ContextPanel = createContext();

const AppProvider = ({ children }) => {
  const [isPanelUp, setIsPanelUp] = useState(true);
  const userTypeId = localStorage.getItem("user_type_id");
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const checkPanelStatus = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/panel-check-status`);
      const datas = await response.data;
      setIsPanelUp(datas);
      if (datas?.success) {
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentPath = location.pathname;

    if (error) {
      localStorage.clear();
      navigate("/maintenance");
    } else if (isPanelUp?.success) {
      if (token) {
        const allowedPaths = [
          "/home",
          "/profile",
          "/country",
          "/add-country",
          "/edit-country",
          "/courses",
          "/add-courses",
          "/edit-courses",
          "/openList-enquiry",
          "/add-enquiry",
          "/edit-enquiry",
          "/edit-exam",
          "/view-exam",
          "/view-enquiry",
          "/edit-personal",
          "/overdueList-enquiry",
          "/closeList-enquiry",
          "/student",
          "/view-result",
          "/view-student",
          "/edit-result",
          "/add-student-course",
          "/view-student-enquiry",
          "/add-student-delivery",
          "/edit-student-delivery",
          "/view-course",
          "/view-delivery",
          "/add-exam",
          "/edit-student",
          "/edit-student-course",
          "/pending-delivery",
          "/add-delivery",
          "/edit-delivery",
          "/deliverd-delivery",
          "/view-student-delivery",
          "/repetitive-list",
          "/add-repetitive",
          "/userManagement",
          "/management-dashboard",
          "/page-management",
          "/button-management",
          "/class",
          "/class-followup",
          "/class-completed-followup",
          "/view-completed-followup",
          "/class-followup-count",
          "/edit-class-followup",
          "/add-class",
          "/add-request",
          "/edit-request",
          "/add-attendence",
          "/request-pending",
          "/request-completed",
          "/request-approved",
          "/task-pending",
          "/course-due",
          "/task-inspection",
          "/task-completed",
          "/exam-pending-list",
          "/pending-onboard",
          "/pending-offboard",
          "/pending-interview",
          "/view-class",
          "/add-task",
          "/edit-task",
          "/over-due-task-list",
          "/notification",
          "/add-notification",
          "/download-enquiry",
          "/change-password",
          "/enquiry",
          "/students",
          "/delivery",
          "/exam",
          "/attendance",
          "/enquiryreport",
          "/studentreport",
          "/deliveryreport",
          "/examreport",
          "/attendancereport",
          "/notattend",
          "/userType",
          "/edit-user-type/",
          "/birthdaylist",
        ];
        const isAllowedPath = allowedPaths.some((path) =>
          currentPath.startsWith(path)
        );
        if (isAllowedPath) {
          navigate(currentPath);
        } else {
          navigate("/home");
        }
      } else {
        if (
          currentPath === "/" ||
          currentPath === "/register" ||
          currentPath === "/forget-password" ||
          currentPath === "/enquiry-now"
        ) {
          navigate(currentPath);
        } else {
          navigate("/"); // Redirect to login if no token
        }
      }
    }
  }, [error, navigate, isPanelUp, location.pathname]);

  useEffect(() => {
    checkPanelStatus();
    const intervalId = setInterval(checkPanelStatus, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchPagePermission = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-usercontrol-new`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // array in local storage
      localStorage.setItem(
        "pageControl",
        JSON.stringify(response.data?.pagePermissions)
      );
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPermissions = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-usercontrol`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Store the entire `usercontrol` array in localStorage
      localStorage.setItem(
        "buttonControl",
        JSON.stringify(response.data?.buttonPermissions)
      );
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const getStaticUsers = () => {
    try {
      const users = localStorage.getItem("allUsers");
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error("Error parsing allUsers from localStorage", error);
      return [];
    }
  };

  useEffect(() => {
    if (token) {
      getStaticUsers();
      fetchPagePermission();
      fetchPermissions();
    }
  }, []);

  return (
    <ContextPanel.Provider
      value={{
        isPanelUp,
        setIsPanelUp,
        fetchPagePermission,
        getStaticUsers,
        fetchPermissions,
      }}
    >
      {children}
    </ContextPanel.Provider>
  );
};

export default AppProvider;
