import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { Edit, ChevronDown, ChevronUp } from "lucide-react";

const UserTypeList = () => {
  const [userTypeData, setUserTypeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const navigate = useNavigate();

  const fetchUserTypeData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/panel-fetch-usertype`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserTypeData(response.data?.userType || []);
    } catch (error) {
      console.error("Error fetching userType data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserTypeData();
  }, []);

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatRoleList = (roles) => {
    if (!roles) return "N/A";
    return roles.split(",").map((role) => (
      <span
        key={role}
        className="inline-block bg-green-100 rounded px-2 py-1 m-1 text-sm"
      >
        {role.trim()}
      </span>
    ));
  };

  return (
    <Layout>
      <div className="max-w-screen p-4">
        <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold   pb-2 text-center md:text-left">
            User Type List
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-800"></div>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">User Type</th>
                  <th className="border p-2 text-left">Role</th>
                  <th className="border p-2 text-left">Default Button</th>
                  <th className="border p-2 text-left">Default Page</th>
                  <th className="border p-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {userTypeData.length > 0 ? (
                  userTypeData.map((user) => (
                    <React.Fragment key={user.id}>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="border p-2">{user.user_type}</td>
                        <td className="border p-2">{user.user_role}</td>
                        <td className="border p-2">
                          {user.default_button_role ? (
                            <div className="flex items-center space-x-2">
                              <span className="truncate max-w-xs">
                                {expandedRows[`button-${user.id}`]
                                  ? user.default_button_role
                                  : `${user.default_button_role.slice(
                                      0,
                                      50
                                    )}...`}
                              </span>
                              <button
                                onClick={() => toggleRow(`button-${user.id}`)}
                                className="text-gray-600 hover:text-gray-800"
                              >
                                {expandedRows[`button-${user.id}`] ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="border p-2">
                          {user.default_page_role ? (
                            <div className="flex items-center space-x-2">
                              <span className="truncate max-w-xs">
                                {expandedRows[`page-${user.id}`]
                                  ? user.default_page_role
                                  : `${user.default_page_role.slice(0, 50)}...`}
                              </span>
                              <button
                                onClick={() => toggleRow(`page-${user.id}`)}
                                className="text-gray-600 hover:text-gray-800"
                              >
                                {expandedRows[`page-${user.id}`] ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="border p-2 text-center">
                          <button
                            onClick={() =>
                              navigate(`/edit-user-type/${user.id}`)
                            }
                            className="text-blue-500 hover:text-blue-700 flex items-center justify-center"
                            title="Edit"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                      {expandedRows[`button-${user.id}`] &&
                        user.default_button_role && (
                          <tr>
                            <td colSpan="5" className="border p-4 bg-gray-50">
                              <div className="font-semibold mb-2">
                                Default Button Roles:
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {formatRoleList(user.default_button_role)}
                              </div>
                            </td>
                          </tr>
                        )}
                      {expandedRows[`page-${user.id}`] &&
                        user.default_page_role && (
                          <tr>
                            <td colSpan="5" className="border p-4 bg-gray-50">
                              <div className="font-semibold mb-2">
                                Default Page Roles:
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {formatRoleList(user.default_page_role)}
                              </div>
                            </td>
                          </tr>
                        )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="border p-2 text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserTypeList;
