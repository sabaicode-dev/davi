"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/public/images/navBar/logo.png";
import Link from "next/link";
import { MenuList, MenuListPhone } from "./menu";
import { usePathname } from "next/navigation";

// Importing icons from react-icons
import { AiOutlineHome, AiOutlineAppstore, AiOutlineDollarCircle } from "react-icons/ai";

// Define type for menu items to match with icon keys
type MenuItemName = "Service" | "Resource" | "Pricing";

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const pathname = usePathname();

  // Add scroll effect to change background color
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 90) {
        setNavBg(true);
      } else {
        setNavBg(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Mapping icons to menu items
  const icons: Record<MenuItemName, JSX.Element> = {
    Service: <AiOutlineAppstore />,
    Resource: <AiOutlineHome />,
    Pricing: <AiOutlineDollarCircle />,
  };

  return (
    <nav
      className={`text-white fixed top-0 left-0 w-full z-20 transition-all duration-300 ${
        navBg ? "bg-[#202A79] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-8 lg:px-36 flex justify-between items-center py-4">
        <div className="flex items-center space-x-4">
          {/* Logo - always visible */}
          <div className="text-xl font-bold">
            <Link href="/" className="flex items-center">
              <Image
                src={Logo}
                alt="logo"
                width={110}
                height={110}
                unoptimized
              />
            </Link>
          </div>
        </div>
        {/* Navigation Links */}
        <div className="hidden md:flex space-x-9">
          {MenuList.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`font-medium ${
                item.path === pathname
                  ? "bg-gray-100 text-blue-900 font-bold rounded-md py-1 px-2"
                  : "text-white"
              } hover:text-blue-200`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Right Sidebar Navigation for Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-blue-900 text-white transform rounded-xl ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-20`}
      >
        {/* Logo in Sidebar */}
        <div className="flex items-center justify-start mx-6 pt-8">
          <Link href="/" className="flex items-center">
            <Image 
              src={Logo}
              alt="logo"
              width={80} // Adjust width for smaller size on mobile
              height={80}
              unoptimized
            />
          </Link>
        </div>
        
        {/* Close Button */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-9 text-white"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        
        {/* Mobile Menu Links with Icons */}
        <div className="flex flex-col items-start space-y-6 mt-2 p-6">
          {MenuListPhone.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="flex items-center space-x-2 text-white hover:text-gray-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {/* Display icon if it exists */}
              {icons[item.name as MenuItemName] || <span />} 
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
