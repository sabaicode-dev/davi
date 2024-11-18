import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "@/public/images/header/logo.png";
import ProfileUser from "@/public/images/header/roem-reaksmey.jpeg";
import FileImg from "@/public/images/header/status-up.png";
import { AiOutlineLogout } from "react-icons/ai";
import { FiUser } from "react-icons/fi";

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<{
    username: string;
    email: string;
  }>({ username: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("/v1/auth/me", {
          withCredentials: true, // Send cookies for authentication
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleProfileClick = () => {
    navigate("/accountsetting");
    closeDropdown();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (isProfileDropdownOpen) {
      setIsProfileDropdownOpen(false);
    }
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-md flex items-center justify-between py-3 px-8 fixed top-0 left-0 w-full z-50">
      <div className="flex items-center cursor-pointer">
        <a href="/">
          <img src={Logo} alt="Logo" className="h-8 w-auto mr-4" />
        </a>
      </div>
      <div className="flex items-center">
        <button className="relative mr-6" onClick={toggleDropdown}>
          {/* Notification button */}
          {/* Add SVG and badge */}
        </button>

        {/* Profile Section */}
        <div
          className="flex items-center justify-center flex-row gap-3 cursor-pointer"
          onClick={toggleProfileDropdown}
        >
          <img
            src={ProfileUser}
            alt="Profile"
            className="size-8 rounded-full"
          />
          <span className="mr-1 font-medium">
            {userDetails.username || "UserName"}
          </span>
          <svg
            width="14"
            height="8"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.397397 0.397397C0.729342 0.0654511 1.26753 0.0654511 1.59948 0.397397L5.99844 4.79636L10.3974 0.397397C10.7293 0.0654511 11.2675 0.0654511 11.5995 0.397397C11.9314 0.729342 11.9314 1.26753 11.5995 1.59948L6.59948 6.59948C6.26753 6.93142 5.72934 6.93142 5.3974 6.59948L0.397397 1.59948C0.0654511 1.26753 0.0654511 0.729342 0.397397 0.397397Z"
              fill="#7C8DB5"
            />
          </svg>
        </div>

        {isProfileDropdownOpen && (
          <div className="absolute right-4 mt-[290px] w-80 bg-white shadow-lg rounded-sm z-10 p-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <div className="flex items-center">
                <img
                  src={ProfileUser}
                  alt="User"
                  className="w-14 h-14 rounded-full"
                />
                <div className="ml-3">
                  <p className="font-medium">{userDetails.username}</p>
                  <p className="text-sm text-gray-500">{userDetails.email}</p>
                </div>
              </div>
              <button onClick={closeDropdown} className="text-gray-500">
                &#x2715;
              </button>
            </div>
            <div className="mt-4">
              <button
                onClick={handleProfileClick}
                className="w-full flex items-center p-3 hover:bg-gray-100 rounded-sm space-x-3"
              >
                <FiUser size={22} />
                <span>My Profile</span>
              </button>
              <button className="w-full flex items-center p-3 text-red-500 hover:bg-gray-100 rounded-sm mt-2 space-x-3">
                <AiOutlineLogout size={22} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
