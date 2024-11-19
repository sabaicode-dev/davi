import React, { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { AiOutlineLogout } from "react-icons/ai";

const AccountSettings: React.FC = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "", // Add lastName field
    email: "",
    createdAt: "", // For displaying the creation date
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
  });
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
  });
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:4001/v1/auth/me", {
          withCredentials: true, // Include cookies
        });

        console.log("Userdatail", response);

        // Assuming backend returns createdAt as a string
        setUser({
          firstName: response.data.username || "",
          lastName: response.data.lastName || "",
          email: response.data.email || "",
          createdAt: response.data.createdAt || "", // Set creation date
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Validate inputs when they change
  const validateInputs = () => {
    const newErrors = {
      firstName: user.firstName ? "" : "First name is required.",
      lastName: user.lastName ? "" : "Last name is required.",
    };
    setErrors(newErrors);

    // Enable button if there are no errors and fields are not empty
    setIsButtonEnabled(newErrors.firstName === "" && newErrors.lastName === "");
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
  }, [user.firstName, user.lastName]);

  // Function to update user name on the backend
  const updateUser = async () => {
    try {
      const response = await axios.put(
        "http://localhost:4001/v1/auth/updateUsername",
        {
          email: user.email,
          newUsername: user.firstName,
          lastName: user.lastName, // Add last name to the update request
        },
        { withCredentials: true } // Include cookies
      );
      console.log("User updated successfully:", response.data);
      setUser((prev) => ({
        ...prev,
        firstName: response.data.firstName || prev.firstName,
        lastName: response.data.lastName || prev.lastName,
      }));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched to trigger validation
    setTouched({ firstName: true, lastName: true });

    // If form is valid, update the user
    if (isButtonEnabled) {
      updateUser();
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      const response = await axios.put(
        "http://localhost:4001/v1/auth/logout",
        { refreshToken: "dummyRefreshToken" }, // Replace with actual refresh token if needed
        { withCredentials: true } // Include cookies
      );

      if (response.status === 200) {
        console.log("User logged out successfully");
        window.location.href = "http://localhost:3000/login"; // Redirect to login page
      } else {
        console.error("Failed to log out:", response.data);
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

      {/* Profile Details Section */}
      <form onSubmit={handleSubmit}>
        <div className="bg-gray-50 shadow-sm rounded-lg pt-3 mb-9 border-2 border-gray-200">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 rounded-br-lg rounded-bl-lg gap-4 bg-white border-t-2 border-gray-200 py-4 px-5">
            {/* First Name Field */}
            <div>
              <label className="block text-base font-normal text-gray-600 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChanged}
                className={`mt-1 w-full text-gray-700 py-2 px-4 border rounded-md focus:outline-none focus:bg-white ${
                  errors.firstName && touched.firstName
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter your first name"
              />
              {errors.firstName && touched.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name Field */}
            <div>
              <label className="block text-base font-normal text-gray-600 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChanged}
                className={`mt-1 w-full text-gray-700 py-2 px-4 border rounded-md focus:outline-none focus:bg-white ${
                  errors.lastName && touched.lastName
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter your last name"
              />
              {errors.lastName && touched.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>

            <p className="text-sm text-gray-500">Created on {user.createdAt}</p>
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
