import React, { useState, useEffect, useContext } from "react";

import { useQuery, useMutation } from "@tanstack/react-query";
import { Table, ChevronDown, Plus } from "lucide-react";

import { toast } from "sonner";

import { useNavigate } from "react-router-dom";
import BASE_URL from "../../base/BaseUrl";
import { ContextPanel } from "../../utils/ContextPanel";
import Layout from "../../layout/Layout";

const CreatePage = () => {
  const [selectedPage, setSelectedPage] = useState("");
  const [selectedUrl, setSelectedUrl] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [userIds, setUserIds] = useState("1,2,3,4,5,6");
  const [status, setStatus] = useState("Active");
  const [availablePages, setAvailablePages] = useState([]);
  const navigate = useNavigate();
  const { fetchPagePermission } = useContext(ContextPanel);

  const getAllPages = () => {
    const pages = [];

    const extractPages = (items) => {
      items.forEach((item) => {
        if (item.url && item.url !== "#") {
          pages.push({
            title: item.title || item.name,
            url: item.url,
          });
        }
        if (item.items) {
          extractPages(item.items);
        }
      });
    };

    const sidebarData = {
      navMain: [
        { title: "Dashboard", url: "/home" },
        { title: "Country", url: "/country" },
        { title: "Courses", url: "/courses" },
        { title: "Enquiry", url: "/openList-enquiry" },
        { title: "Student", url: "/student" },
        { title: "Delivery", url: "/pending-delivery" },
        { title: "Class", url: "/class" },
        { title: "Class Follow Up", url: "/class-followup-count" },
        { title: "Request", url: "/request-pending" },
        { title: "Task Manager", url: "/task-pending" },
        { title: "Notification", url: "/notification" },
        { title: "Download", url: "/enquiry" },
        { title: "User Management", url: "/userManagement" },
        { title: "User Type", url: "/userType" },
        { title: "BirthDay", url: "/birthdaylist" },
        { title: "Webiste Enquiry", url: "/website-enquiry" },
      ],
    };

    // Extract pages from all sections
    extractPages(sidebarData.navMain);

    return pages;
  };

  useEffect(() => {
    const existingControls = JSON.parse(
      localStorage.getItem("pageControl") || "[]"
    );
    const allPages = getAllPages();

    const filteredPages = allPages.filter(
      (page) =>
        !existingControls.some(
          (control) =>
            control.page === page.title ||
            control.url === page.url.replace("/", "")
        )
    );

    setAvailablePages(["All", ...filteredPages.map((page) => page.title)]);
  }, []);

  const handlePageChange = (e) => {
    const page = e.target.value;
    setSelectedPage(page);

    if (page === "All") {
      const existingControls = JSON.parse(
        localStorage.getItem("pageControl") || "[]"
      );
      const allPages = getAllPages();

      const filteredPages = allPages.filter(
        (menuItem) =>
          !existingControls.some(
            (control) =>
              control.page === menuItem.title ||
              control.url === menuItem.url.replace("/", "")
          )
      );

      setSelectedItems(filteredPages);
      setSelectedUrl("");
    } else {
      const item = getAllPages().find((i) => i.title === page);
      if (item) {
        setSelectedUrl(item.url.replace("/", ""));
        setSelectedItems([item]);
      }
    }
  };

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BASE_URL}/api/panel-create-usercontrol-new`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    },
    onSuccess: async () => {
      await fetchPagePermission();
      toast("Page control created successfully!");
      navigate("/userManagement");
    },
    onError: (error) => {
      toast(`${error.message}`);
    },
  });

  const handleSubmit = () => {
    let payloadData;

    if (selectedPage === "All") {
      payloadData = selectedItems.map((item) => ({
        page: item.title,
        url: item.url.replace("/", ""),
        userIds,
        status,
      }));
    } else {
      payloadData = [
        {
          page: selectedPage,
          url: selectedUrl,
          userIds,
          status,
        },
      ];
    }

    createMutation.mutate({ usercontrol_data: payloadData });
  };
  return (
    <Layout>
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Create Page Control</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Page
              </label>
              <select
                value={selectedPage}
                onChange={handlePageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Page</option>
                {availablePages.map((page) => (
                  <option key={page} value={page}>
                    {page}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL
              </label>
              <input
                type="text"
                value={selectedUrl}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User IDs
              </label>
              <input
                type="text"
                value={userIds}
                onChange={(e) => setUserIds(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <input
                type="text"
                value={status}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>

          {selectedItems.length > 0 && (
            <div className="mt-8">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Page
                      </th>
                      <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        URL
                      </th>
                      <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User IDs
                      </th>
                      <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedItems.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap border-b">
                          {item.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border-b">
                          {item.url.replace("/", "")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border-b">
                          {userIds}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border-b">
                          {status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              disabled={!selectedPage || createMutation.isLoading}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2 disabled:opacity-50"
            >
              <Plus size={20} />
              Create
            </button>

            {createMutation.isLoading && (
              <div className="mt-4 text-blue-600">Creating...</div>
            )}
            {createMutation.isError && (
              <div className="mt-4 text-red-600">
                Error: {createMutation.error.message}
              </div>
            )}
            {createMutation.isSuccess && (
              <div className="mt-4 text-green-600">
                Successfully created page control!
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePage;
