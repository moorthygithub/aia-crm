import React, { useContext, useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Checkbox } from "@material-tailwind/react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { ChevronDown, ChevronUp } from "lucide-react";
import { ContextPanel } from "../../utils/ContextPanel";
import BASE_URL from "../../base/BaseUrl";
import Layout from "../../layout/Layout";

const StatsCard = ({ title, value, bgColor }) => (
  <div className={`${bgColor} rounded-lg p-2 shadow-sm`}>
    <h3 className="text-sm font-medium text-gray-700">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

const PageSection = ({
  page,
  permissions,
  buttonPermissions,
  userId,
  onPagePermissionChange,
  onButtonPermissionChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border rounded-lg mb-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors "
      >
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">{page}</h3>
          <p className="text-sm text-gray-600">
            {permissions.find((p) => p.page === page)?.url}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox
            color="blue"
            checked={permissions
              .find((p) => p.page === page)
              ?.userIds.includes(userId.toString())}
            onChange={(e) => onPagePermissionChange(page, e.target.checked)}
            className="h-5 w-5"
          />
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {buttonPermissions
              .filter((p) => p.pages === page)
              .map((permission) => (
                <div
                  key={permission.id}
                  className="flex  items-center justify-between p-1 bg-blue-50 border rounded-lg"
                >
                  <span className="text-gray-900">{permission.button}</span>
                  <Checkbox
                    color="blue"
                    checked={permission.userIds.includes(userId.toString())}
                    onChange={(e) =>
                      onButtonPermissionChange(
                        permission.button,
                        e.target.checked,
                        permission.id
                      )
                    }
                    className="h-5 w-5 bg-white"
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
const ManagementDashboard = () => {
  const { id } = useParams();
  const userId = id;
  const queryClient = useQueryClient();
  const { getStaticUsers, fetchPagePermission, fetchPermissions } =
    useContext(ContextPanel);
  const staticUsers = getStaticUsers();
  const [buttonPermissions, setButtonPermissions] = useState([]);
  const [pagePermissions, setPagePermissions] = useState([]);

  // Fetch button permissions
  const {
    data: buttonControlData,
    isLoading: isLoadingButtons,
    isError: isErrorButtons,
  } = useQuery({
    queryKey: ["usercontrol"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-usercontrol`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.buttonPermissions;
    },
  });

  // Mutation for updating button permissions
  const updateButtonPermissionMutation = useMutation({
    mutationFn: async ({ permissionId, updatedData }) => {
      console.log("updted data and permissionid", updatedData, permissionId);
      console.log("permissionId", permissionId);
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/panel-update-usercontrol/${permissionId}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["usercontrol"]);
      fetchPermissions();
    },
    onError: (error) => {
      console.error("Error updating button permissions:", error);
      setButtonPermissions(buttonControlData);
    },
  });

  // Mutation for updating page permissions
  const updatePagePermissionMutation = useMutation({
    mutationFn: async ({ permissionId, updatedData }) => {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/panel-update-usercontrol-new/${permissionId}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["usercontrol-pages"]);
      fetchPagePermission();
    },
    onError: (error) => {
      console.error("Error updating page permissions:", error);
      setPagePermissions(pageControlData);
    },
  });

  // Fetch page permissions
  const {
    data: pageControlData,
    isLoading: isLoadingPages,
    isError: isErrorPages,
  } = useQuery({
    queryKey: ["usercontrol-pages"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-usercontrol-new`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.pagePermissions;
    },
  });

  useEffect(() => {
    if (buttonControlData) {
      setButtonPermissions(buttonControlData);
    }
  }, [buttonControlData]);

  useEffect(() => {
    if (pageControlData) {
      setPagePermissions(pageControlData);
    }
  }, [pageControlData]);

  const user = staticUsers.find((u) => u.user_type === userId);
  console.log("statuic user", staticUsers);
  console.log("user", user);
  console.log("userId", userId);

  const pages = useMemo(
    () => [...new Set(pagePermissions.map((p) => p.page))],
    [pagePermissions]
  );

  // Calculate stats
  const stats = useMemo(
    () => ({
      totalPages: pages.length,
      totalButtons: buttonPermissions.length,
      activePages: pagePermissions.filter((p) =>
        p.userIds.includes(userId.toString())
      ).length,
      activeButtons: buttonPermissions.filter((p) =>
        p.userIds.includes(userId.toString())
      ).length,
    }),
    [pages, buttonPermissions, pagePermissions, userId]
  );

  const handleButtonPermissionChange = async (
    button,
    isChecked,
    permissionId
  ) => {
    try {
      const currentPermission = buttonPermissions.find(
        (permission) => permission.id === permissionId
      );
      if (!currentPermission) return;

      const newUserIds = isChecked
        ? [...currentPermission.userIds, userId.toString()]
        : currentPermission.userIds.filter((id) => id !== userId.toString());

      const userIdsAsString = newUserIds.join(",");

      const updatedData = {
        pages: currentPermission.pages,
        button: currentPermission.button,
        status: "Active",
        userIds: userIdsAsString,
      };

      const updatedPermissions = buttonPermissions.map((permission) => {
        if (permission.id === permissionId) {
          return { ...permission, userIds: newUserIds };
        }
        return permission;
      });
      setButtonPermissions(updatedPermissions);

      await updateButtonPermissionMutation.mutateAsync({
        permissionId,
        updatedData,
      });
    } catch (error) {
      console.error("Error updating button permissions:", error);
    }
  };

  const handlePagePermissionChange = async (page, isChecked) => {
    try {
      const currentPermission = pagePermissions.find(
        (permission) => permission.page === page
      );
      if (!currentPermission) return;

      const newUserIds = isChecked
        ? [...currentPermission.userIds, userId.toString()]
        : currentPermission.userIds.filter((id) => id !== userId.toString());

      const userIdsAsString = newUserIds.join(",");

      const updatedData = {
        page: currentPermission.page,
        url: currentPermission.url,
        status: "Active",
        userIds: userIdsAsString,
      };

      const updatedPermissions = pagePermissions.map((permission) => {
        if (permission.page === page) {
          return { ...permission, userIds: newUserIds };
        }
        return permission;
      });
      setPagePermissions(updatedPermissions);

      await updatePagePermissionMutation.mutateAsync({
        permissionId: currentPermission.id,
        updatedData,
      });
    } catch (error) {
      console.error("Error updating page permissions:", error);
    }
  };

  if (
    !user ||
    isLoadingButtons ||
    isLoadingPages ||
    isErrorPages ||
    isErrorButtons
  ) {
    return (
      <Layout>
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">
              {!user
                ? "No User Found"
                : isLoadingButtons || isLoadingPages
                ? "Loading..."
                : "Error loading user management"}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const getUserTypeInfo = (userTypeId) => {
    const types = {
      1: { label: "User", classes: "bg-red-100 text-red-800" },
      2: { label: "Sales", classes: "bg-blue-100 text-blue-800" },
      3: { label: "Marketing", classes: "bg-green-100 text-green-800" },
      4: { label: "Admin", classes: "bg-yellow-100 text-yellow-800" },
      5: { label: "Service or Support", classes: "bg-teal-100 text-teal-800" },
      6: { label: "Superadmin", classes: "bg-purple-100 text-purple-800" },
    };
    return (
      types[userTypeId] || {
        label: "N/A",
        classes: "bg-gray-100 text-gray-800",
      }
    );
  };
  const userType = getUserTypeInfo(user.user_type);
  return (
    <Layout>
      <div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-100 p-6 border-b">
            <div className="flex items-center justify-between mb-6">
              <div className="flex w-full items-center justify-between">
                <h2 className="text-2xl font-bold uppercase">{user.name}</h2>
                <span
                  className={`px-3 py-1 rounded-lg text-xs capitalize mt-2 inline-block ${userType.classes}`}
                >
                  {userType.label}
                </span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatsCard
                title="Total Pages"
                value={stats.totalPages}
                bgColor="bg-blue-50"
              />
              <StatsCard
                title="Active Pages"
                value={stats.activePages}
                bgColor="bg-green-50"
              />
              <StatsCard
                title="Total Buttons"
                value={stats.totalButtons}
                bgColor="bg-purple-50"
              />
              <StatsCard
                title="Active Buttons"
                value={stats.activeButtons}
                bgColor="bg-yellow-50"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {pages.map((page) => (
              <PageSection
                key={page}
                page={page}
                permissions={pagePermissions}
                buttonPermissions={buttonPermissions}
                userId={userId}
                onPagePermissionChange={handlePagePermissionChange}
                onButtonPermissionChange={handleButtonPermissionChange}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManagementDashboard;

