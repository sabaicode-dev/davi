import React, { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "@/src/contexts/AuthContext";
import { API_ENDPOINTS } from "@/src/utils/const/apiEndpoint";

const AccountSettings: React.FC = () => {
  const [user, setUser] = useState({
    userName: "",
    // Add lastName field
    email: "",
    createdAt: "", // For displaying the creation date
  });
  const [initialUser, setInitialUser] = useState({
    userName: "",
    email: "",
    createdAt: "",
  });
  const [errors, setErrors] = useState({
    userName: "",
  });
  const [touched, setTouched] = useState({
    userName: false,
  });
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const { setUsername, setEmail } = useAuth();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.USER_PROFILE, {
          withCredentials: true,
        });

        console.log("User data", response);

        const fetchedUser = {
          userName: response.data.username || "",
          email: response.data.email || "",
          createdAt: response.data.createdAt || "",
        };
        setUsername(fetchedUser.userName);
        setEmail(fetchedUser.email);

        setUser(fetchedUser);
        setInitialUser(fetchedUser);
        // Store the initial fetched values
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Validate inputs when they change
  const validateInputs = () => {
    const newErrors = {
      userName: user.userName ? "" : "Username is required.",
    };
    setErrors(newErrors);

    // Enable button only if the current values differ from the initial one..
    const hasChanges = user.userName !== initialUser.userName;
    setIsButtonEnabled(hasChanges && newErrors.userName === "");
  };

  // Handle changes in input fields
  const handleChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    // Mark field as touched when the user interacts with it
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
  };

  useEffect(() => {
    validateInputs();
  }, [user.userName]);

  // Function to update user name on the backend
  const updateUser = async () => {
    try {
      const response = await axios.put(
        API_ENDPOINTS.UPDATE_USER_NAME,
        {
          email: user.email,
          newUsername: user.userName, // Add last name to the update request
        },
        { withCredentials: true } // Include cookies
      );
      console.log("User updated successfully:", response.data);
      setUser((prev) => ({
        ...prev,
        userName: response.data.result.username || prev.userName,
      }));
      setUsername(response.data.result.username);
      setEmail(response.data.result.email);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all fields as touched to trigger validation
    setTouched({ userName: true });

    // If form is valid, update the user
    if (isButtonEnabled) {
      updateUser();
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      // Retrieve tokens from localStorage
      const authToken = localStorage.getItem("authToken");
      const refreshToken = localStorage.getItem("refreshToken"); // Replace "dummyRefreshToken" with the real token

      // Check if tokens are available
      if (!authToken || !refreshToken) {
        console.warn("No tokens found. Redirecting to login...");
        window.location.href = "http://localhost:3000/login";
        return;
      }

      // Call the logout API with the refresh token
      const response = await fetch(API_ENDPOINTS.SIGN_OUT, {
        method: "PUT",
        credentials: "include", // Include cookies if necessary
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Include authToken in the header
        },
        body: JSON.stringify({
          refreshToken, // Send the refreshToken in the body
        }),
      });

      if (response.ok) {
        console.log("User logged out successfully");

        // Clear tokens and user state from the frontend
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");

        // Clear any additional user-related state (if necessary)
        setUsername && setUsername(null);
        setEmail && setEmail(null);

        // Redirect to the login or signup page
        window.location.href = "http://localhost:3000/login";
      } else {
        const errorData = await response.json();
        console.error("Failed to log out:", errorData);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="p-8 ml-4 bg-white min-h-screen w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Account Setting
      </h2>

      {/* Profile Details Section uu*/}
      <form onSubmit={handleSubmit}>
        <div className="bg-gray-50 shadow-sm rounded-lg pt-3 mb-9 border-2 border-gray-200">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4 px-5">
            <h3 className="text-lg font-medium text-gray-700">
              Profile Details
            </h3>
            <button
              type="submit"
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                isButtonEnabled
                  ? "bg-[#443DFF] text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isButtonEnabled}
            >
              Save Change
            </button>
          </div>

          {/* Content Section */}
          <div className="bg-white border-t rounded-br-lg rounded-bl-lg border-gray-200 py-4 px-5">
            <div className="grid grid-cols-1 gap-4">
              {/* Username Field */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="userName"
                  value={user.userName}
                  onChange={handleChanged}
                  className={`w-full py-2 px-4 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:bg-white ${
                    errors.userName && touched.userName
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your username"
                />
                {errors.userName && touched.userName && (
                  <p className="text-red-500 text-xs mt-1">{errors.userName}</p>
                )}
              </div>

              {/* Created Date */}
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Created on {user.createdAt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Dynamic Email Display */}
      <div className="bg-gray-50 shadow-sm rounded-lg pt-3 mb-9 border-2 border-gray-200">
        <h3 className="text-lg font-medium text-gray-700 mb-2 px-5">Email</h3>
        <div className="bg-white px-5 py-4 border-t-2 rounded-br-lg rounded-bl-lg border-gray-200">
          <p className="text-gray-800 mb-1">{user.email}</p>
          <p className="text-sm text-gray-500 mb-1">
            Your account is authenticated through Google.
          </p>
        </div>
      </div>

      {/* Login Management Section */}
      <div className="bg-gray-50 shadow-sm rounded-lg pt-3 mb-9 border-2 border-gray-200">
        <div className="flex justify-between items-center mb-2 px-5">
          <h3 className="text-lg font-medium text-gray-700">
            Login Management
          </h3>
          <button
            onClick={handleLogout}
            className="bg-[#F21616] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center hover:bg-red-600 transition"
          >
            <AiOutlineLogout size={16} className="mt-[3px] mr-1" />
            Log Out
          </button>
        </div>
        <p className="bg-white border-t-2 border-gray-200 rounded-br-lg rounded-bl-lg text-sm text-gray-500 py-5 px-5">
          Sign out across all browsers. You will need to sign back in anywhere
          you’d like to use DAVI.
        </p>
      </div>
    </div>
  );
};

export default AccountSettings;
