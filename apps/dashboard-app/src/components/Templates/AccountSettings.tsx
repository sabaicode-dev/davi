import React, { useState, ChangeEvent, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";

const AccountSettings: React.FC = () => {
  // State for input values and errors
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
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

  // Regex for validating name fields
  const nameRegex = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;

  // Validate inputs when they change
  const validateInputs = () => {
    const newErrors = {
      firstName: user.firstName
        ? nameRegex.test(user.firstName)
          ? ""
          : "First name must start with a capital letter and contain valid characters."
        : "First name is required.",
      lastName: user.lastName
        ? nameRegex.test(user.lastName)
          ? ""
          : "Last name must start with a capital letter and contain valid characters."
        : "Last name is required.",
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

  // Revalidate inputs whenever user data changes
  useEffect(() => {
    validateInputs();
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched to trigger validation on all fields
    setTouched({
      firstName: true,
      lastName: true,
    });

    // If form is valid, perform the save and reset
    if (isButtonEnabled) {
      console.log("Form submitted successfully:", user);
      // Reset form and touched state after successful submission
      setUser({
        firstName: "",
        lastName: "",
      });
      setTouched({
        firstName: false,
        lastName: false,
      });
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
                First name
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
                placeholder="Enter first name"
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
                placeholder="Enter last name"
              />
              {errors.lastName && touched.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>
            <p className="text-sm text-gray-500">Created on 12/12/2024</p>
          </div>
        </div>
      </form>

      {/* Email Section */}
      <div className="bg-gray-50 shadow-sm rounded-lg pt-3 mb-9 border-2 border-gray-200">
        <h3 className="text-lg font-medium text-gray-700 mb-2 px-5">Email</h3>
        <div className="bg-white px-5 py-4 border-t-2 rounded-br-lg rounded-bl-lg border-gray-200">
          <p className="text-gray-800 mb-1">KImkim@gmail.com</p>
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
          <button className="bg-[#443DFF] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center hover:bg-blue-600 transition">
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
