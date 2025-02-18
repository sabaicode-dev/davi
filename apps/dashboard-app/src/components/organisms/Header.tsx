import React, { useEffect, useState } from "react";
import Logo from "@/public/images/header/logo.png";
import FileImg from "@/public/images/header/status-up.png";
import { AiOutlineLogout } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/src/contexts/AuthContext";
import { API_ENDPOINTS } from "@/src/utils/const/apiEndpoint";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { setUsername, username, setEmail, email, setProfile, profile } =
    useAuth();

  const navigate = useNavigate();

  // Fetch notifications from the API
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.API_URL}/notifications/list/`
      );
      if (response.status === 200) {
        setNotifications(response.data.results || []);
        const unread = response.data.results.filter(
          (notif: any) => !notif.is_read
        ).length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Mark a notification as read
  const markAsRead = async (id: string) => {
    try {
      await axios.patch(
        `${API_ENDPOINTS.API_URL}/notifications/mark-as-read/${id}/`
      );
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, is_read: true } : notif
        )
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications(); 
  }, []); 

  const formatDate = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const handleProfileClick = () => {
    navigate("/accountsetting");
    closeDropdown();
  };

  const handleLogout = async () => {
    try {
      // Call the logout API with the refresh token
      const response = await fetch(API_ENDPOINTS.SIGN_OUT, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        console.log("User logged out successfully");

        // Clear any additional user-related state (if necessary)
        setUsername && setUsername(null);
        setEmail && setEmail(null);
        setProfile && setProfile(null);
      } else {
        const errorData = await response.json();
        console.error("Failed to log out:", errorData);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
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
        {/* Notification Button */}
        <button className="relative mr-6" onClick={toggleDropdown}>
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.84844 8.99844C6.84844 7.67955 7.28903 6.38845 8.13374 5.43815C8.96455 4.50349 10.2291 3.84844 11.9984 3.84844C13.7678 3.84844 15.0323 4.50349 15.8631 5.43815C16.7078 6.38845 17.1484 7.67955 17.1484 8.99844C17.1484 10.258 17.775 11.1966 18.2526 11.9122L18.2912 11.9699C18.8095 12.7474 19.1484 13.2922 19.1484 13.9984C19.1484 14.9727 18.4547 15.7562 17.0149 16.3347C15.5974 16.9042 13.7169 17.1484 11.9984 17.1484C10.28 17.1484 8.39943 16.9042 6.982 16.3347C5.54217 15.7562 4.84844 14.9727 4.84844 13.9984C4.84844 13.305 5.17265 12.8281 5.69655 12.0739C6.20017 11.3488 6.84844 10.4063 6.84844 8.99844ZM11.9984 2.14844C9.76779 2.14844 8.03234 2.99338 6.86314 4.30873C5.70785 5.60843 5.14844 7.31733 5.14844 8.99844C5.14844 9.83197 4.7967 10.3894 4.30033 11.104L4.23059 11.2041C3.761 11.8769 3.14844 12.7545 3.14844 13.9984C3.14844 16.0242 4.67693 17.2407 6.34821 17.9122C8.0419 18.5927 10.1614 18.8484 11.9984 18.8484C13.8355 18.8484 15.955 18.5927 17.6487 17.9122C19.3199 17.2407 20.8484 16.0242 20.8484 13.9984C20.8484 12.7388 20.2219 11.8002 19.7442 11.0847L19.7057 11.0269C19.1874 10.2495 18.8484 9.70466 18.8484 8.99844C18.8484 7.31733 18.289 5.60843 17.1337 4.30873C15.9645 2.99338 14.2291 2.14844 11.9984 2.14844ZM9.52694 19.2912C9.91446 19.0328 10.437 19.1347 10.6995 19.5178L10.7058 19.5263C10.7149 19.5382 10.7326 19.5605 10.7587 19.59C10.8116 19.6495 10.8954 19.7337 11.0084 19.8184C11.232 19.9861 11.5574 20.1484 11.9984 20.1484C12.4394 20.1484 12.7649 19.9861 12.9884 19.8184C13.1015 19.7337 13.1852 19.6495 13.2381 19.59C13.2643 19.5605 13.282 19.5382 13.2911 19.5263L13.2974 19.5178C13.5599 19.1347 14.0824 19.0328 14.4699 19.2912C14.8605 19.5516 14.9661 20.0793 14.7057 20.4699L13.9984 19.9984C14.7057 20.4699 14.7055 20.4703 14.7052 20.4706L14.7048 20.4713L14.7038 20.4727L14.7017 20.4758L14.6967 20.4832L14.6833 20.5023C14.673 20.5168 14.6596 20.5351 14.6433 20.5565C14.6107 20.5993 14.5659 20.6551 14.5087 20.7194C14.395 20.8474 14.2287 21.0132 14.0084 21.1784C13.5653 21.5108 12.8908 21.8484 11.9984 21.8484C11.1061 21.8484 10.4316 21.5108 9.98844 21.1784C9.76815 21.0132 9.60189 20.8474 9.48814 20.7194C9.43097 20.6551 9.38616 20.5993 9.35357 20.5565C9.33725 20.5351 9.32391 20.5168 9.31354 20.5023L9.30017 20.4832L9.29514 20.4758L9.29303 20.4727L9.29208 20.4713L9.29163 20.4706C9.29141 20.4703 9.29119 20.4699 9.99844 19.9984L9.29119 20.4699C9.0308 20.0793 9.13634 19.5516 9.52694 19.2912Z"
              fill="black"
            />
          </svg>
          {/* Notification Badge */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Notification Dropdown */}
        {isDropdownOpen && (
          <div className="absolute right-4 mt-[250px] w-80 bg-white shadow-lg rounded-md z-50 p-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Notification</span>
              <button
                onClick={closeDropdown}
                className="text-lg text-gray-500 font-medium"
              >
                &#x2715;
              </button>
            </div>
            <div className="pb-1 border-b border-[#BDBBCB] mt-3">
              <span className="text-xs font-medium text-[#3F4655]">Today</span>
            </div>
            {notifications.length > 0 ? (
              notifications.map((notif: any) => (
                <div
                  key={notif.id}
                  className="flex flex-row justify-between items-center mt-4 cursor-pointer"
                  onClick={() => markAsRead(notif.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`relative bg-purple-100 rounded-full p-2 ${
                        notif.is_read ? "" : "border-red-500 border"
                      }`}
                    >
                      {!notif.is_read && (
                        <span className="absolute top-1 left-1 w-2 h-2 bg-red-600 rounded-full"></span>
                      )}
                      <img
                        src={FileImg}
                        alt="fileImage"
                        width={26}
                        height={26}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {notif.file_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {notif.is_read ? "Read" : "Unread"}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {formatDate(notif.created_at)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm mt-4">
                No notifications available.
              </p>
            )}
          </div>
        )}

        {/* Profile */}
        <div
          className="flex items-center justify-center flex-row gap-3 cursor-pointer"
          onClick={toggleProfileDropdown}
        >
          <img
            src={profile || undefined}
            height={200}
            alt="Profile"
            className="size-8 rounded-full"
          />
          <span className="mr-1 text-lg font-medium">
            {username || "UserName"}
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

        {/* Profile Dropdown */}
        {isProfileDropdownOpen && (
          <div className="absolute right-4 mt-[290px] w-80 bg-white shadow-lg rounded-sm z-10 p-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <div className="flex items-center">
                <img
                  src={profile || undefined}
                  alt="Profile"
                  className="w-14 h-14 rounded-full"
                />
                <div className="ml-3">
                  <p className="font-normal">{username}</p>
                  <p className="text-sm text-gray-500">{email}</p>
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
              <button
                onClick={handleLogout}
                className="w-full flex items-center p-3 text-red-500 hover:bg-gray-100 rounded-sm mt-2 space-x-3"
              >
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
