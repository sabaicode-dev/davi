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
}

// Update menuItems to include SVG components
const menuItems: MenuItem[] = [
  {
    name: "Project",
    icon: <ProjectIcon />,
    link: "/Project",
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
  },
  {
    name: "Helps",
    icon: <HelpIcon />,
    link: "helps",
  },
];

const Sidebar: React.FC = () => {
  return (
    // Change here
    <aside className="w-[120px] h-full bg-white shadow-md text-currentColor fixed left-0 top-14 px-8">
      <nav className="mt-8">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-6">
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `flex flex-col items-center p-2 rounded transition-colors duration-300 ${
                    isActive
                      ? "text-[#443DFF]"
                      : "text-black hover:text-[#443DFF]"
                  }`
                }
              >
                {item.icon}
                <span className="mt-2 text-sm font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
