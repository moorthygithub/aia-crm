import React, { useState, useEffect, useContext } from "react";

import { Plus } from "lucide-react";

import { toast } from "sonner";
import { useQuery, useMutation } from "@tanstack/react-query";



import { useNavigate } from "react-router-dom";
import { ContextPanel } from "../../utils/ContextPanel";
import ButtonComponents from "../../components/buttonIndex/ButtonComponents";
import Layout from "../../layout/Layout";
import BASE_URL from "../../base/BaseUrl";

const CreateButton = () => {
  const [selectedPage, setSelectedPage] = useState("");
  const [selectedButton, setSelectedButton] = useState("");
    const [userIds, setUserIds] = useState("1,2,3,4,5,6");
  const [status, setStatus] = useState("Active");
  const [selectedItems, setSelectedItems] = useState([]);
  const [availablePages, setAvailablePages] = useState([]);
  const { fetchPermissions } = useContext(ContextPanel);
    const navigate= useNavigate()
  useEffect(() => {
  
    const existingControls = JSON.parse(
      localStorage.getItem("buttonControl") || "[]"
    );

  
    const existingPageButtonMap = new Map(
      existingControls.map(control => [`${control.pages}-${control.button}`, true])
    );
    const allButtons = Object.entries(ButtonComponents).map(
      ([key, component]) => ({
        name: key,
        page: component.page,
      })
    );

    const filteredButtons = allButtons.filter(button => 
      !existingPageButtonMap.has(`${button.page}-${button.name}`)
    );

    const uniquePages = [...new Set(filteredButtons.map(button => button.page))];
    
    setAvailablePages(uniquePages.length > 0 ? ["All", ...uniquePages] : []);
  }, []);

  const handlePageChange = (e) => {
    const page = e.target.value;
    setSelectedPage(page);
    setSelectedButton("");
    setSelectedItems([]);

    if (page === "All") {
      const existingControls = JSON.parse(
        localStorage.getItem("buttonControl") || "[]"
      );
      
      const existingPageButtonMap = new Map(
        existingControls.map(control => [`${control.pages}-${control.button}`, true])
      );

      const allButtons = Object.entries(ButtonComponents).map(
        ([key, component]) => ({
          name: key,
          page: component.page,
        })
      );

      const filteredButtons = allButtons.filter(button => 
        !existingPageButtonMap.has(`${button.page}-${button.name}`)
      );

      setSelectedItems(filteredButtons);
    }
  };

  const getAvailableButtons = () => {
    if (!selectedPage || selectedPage === "All") return [];
    
    const existingControls = JSON.parse(
      localStorage.getItem("buttonControl") || "[]"
    );

    const existingPageButtonMap = new Map(
      existingControls.map(control => [`${control.pages}-${control.button}`, true])
    );

    return Object.entries(ButtonComponents)
      .filter(([key, component]) => {
        return component.page === selectedPage && 
          !existingPageButtonMap.has(`${selectedPage}-${key}`);
      })
      .map(([key]) => key);
  };


  const handleButtonChange = (e) => {
    const buttonName = e.target.value;
    setSelectedButton(buttonName);

    if (buttonName === "all") {
      const buttons = Object.entries(ButtonComponents)
        .filter(([_, component]) => component.page === selectedPage)
        .map(([key, component]) => ({
          name: key,
          page: component.page,
        }));
      setSelectedItems(buttons);
    } else if (buttonName) {
      setSelectedItems([
        {
          name: buttonName,
          page: ButtonComponents[buttonName].page,
        },
      ]);
    } else {
      setSelectedItems([]);
    }
  };

  const createMutation = useMutation({
    mutationFn: async (data) => {
    
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BASE_URL}/api/panel-create-usercontrol`,
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
      await fetchPermissions();
      toast.success("Button control created successfully!");
      navigate('/userManagement')
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleSubmit = () => {
    let payloadData;

    if (selectedPage === "All") {
      payloadData = selectedItems.map((item) => ({
        pages: item.page,
        button: item.name,
        userIds,
        status,
      }));
    } else {
      payloadData = selectedItems.map((item) => ({
        pages: selectedPage,
        button: item.name,
        userIds,
        status,
      }));
    }

    const payload = {
      usercontrol_data: payloadData,
    };

    createMutation.mutate(payload);
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Create Button Control</h2>

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

            {selectedPage && selectedPage !== "All" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button
                </label>
                <select
                  value={selectedButton}
                  onChange={handleButtonChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Button</option>
                  <option value="all">All</option>
                  {getAvailableButtons().map((button) => (
                    <option key={button} value={button}>
                      {button}
                    </option>
                  ))}
                </select>
              </div>
            )}
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
                className="w-full cursor-not-allowed px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
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
                        Button
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
                          {item.page}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border-b">
                          {item.name}
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

          <button
            onClick={handleSubmit}
            disabled={!selectedItems.length || createMutation.isLoading}
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
        </div>
      </div>
    </Layout>
  );
};

export default CreateButton;