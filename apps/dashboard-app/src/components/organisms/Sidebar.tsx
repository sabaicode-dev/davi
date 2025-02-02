import React from "react";
import { NavLink } from "react-router-dom";
import {
  DatasetIcon,
  GraphIcon,
  HelpIcon,
  ProjectIcon,
} from "@/src/components/atoms/icons/Icon";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  link: string;
  comingSoon?: boolean;
}

// Update menuItems to include SVG components
const menuItems: MenuItem[] = [
  {
    name: "Project",
    icon: <ProjectIcon />,
    link: "/projects",
  },
  {
    name: "Visualize",
    icon: <GraphIcon />,
    link: "/visualize",
  },
  {
    name: "Dataset",
    icon: <DatasetIcon />,
    link: "dataset",
    comingSoon: true,
  },
  {
    name: "Helps",
    icon: <HelpIcon />,
    link: "helps",
  },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="w-[120px] h-full bg-white shadow-md text-currentColor fixed left-0 top-14 px-8">
      <nav className="mt-8">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-6 relative">
              {item.comingSoon ? (
                <div
                  className="flex flex-col items-center p-2 rounded text-gray-400 cursor-not-allowed relative group"
                  role="button" // Adds semantic meaning
                  aria-disabled="true" // Accessibility
                >
                  {item.icon}
                  <span className="mt-2 text-sm font-medium">{item.name}</span>
                  {/* Tooltip */}
                  <div className="absolute top-1/2 left-full ml-2 transform -translate-y-1/2 bg-black text-white font-bold px-3 py-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Coming Soon
                  </div>
                </div>
              ) : (
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `flex flex-col items-center p-2 rounded transition-colors duration-300 ${isActive
                      ? "text-[#443DFF]"
                      : "text-black hover:text-[#443DFF]"
                    }`
                  }
                >
                  {item.icon}
                  <span className="mt-2 text-sm font-medium">{item.name}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
