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
  if (token && location.pathname !== "/") {
    localStorage.setItem("lastRoute", location.pathname);
  }
}, [location.pathname, token]);


  useEffect(() => {
    if (token && location.pathname == "/") {
      const lastRoute = localStorage.getItem("lastRoute");
      if (lastRoute && lastRoute !== "/") {
        navigate(lastRoute, { replace: true });
      }
    }
  }, [token, location.pathname, navigate]);

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
