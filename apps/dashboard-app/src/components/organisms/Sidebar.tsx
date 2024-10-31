import React, { useState } from "react";
import { Link } from "react-router-dom";
interface MenuItem {
  name: string;
  icon: React.ReactNode;
  link: string;
}

// Define the SVG icons as React components
const GraphIcon = () => (
  <svg
    width="31"
    height="30"
    viewBox="0 0 31 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.4 15.0019C26.65 15.0019 28 13.7519 26.8 9.65193C25.9875 6.88943 23.6125 4.51443 20.85 3.70193C16.75 2.50193 15.5 3.85193 15.5 7.10193V10.7019C15.5 13.7519 16.75 15.0019 19.25 15.0019H23.4Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M25.5017 18.3742C24.3392 24.1617 18.7892 28.3617 12.4767 27.3367C7.73924 26.5742 3.92674 22.7617 3.15174 18.0242C2.13924 11.7367 6.31424 6.18672 12.0767 5.01172"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const VisualizeIcon = () => (
  <svg
    width="31"
    height="30"
    viewBox="0 0 31 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 2.5V23.7539C3 25.8293 4.675 27.5046 6.75 27.5046H28"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.75 21.2523L12.4875 14.5511C13.4375 13.4509 15.125 13.3758 16.15 14.4135L17.3375 15.6013C18.3625 16.6265 20.05 16.5639 21 15.4637L26.75 8.75"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const DatasetIcon = () => (
  <svg
    width="31"
    height="30"
    viewBox="0 0 31 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.775 3.55576L5.0375 8.80673C3.9125 9.68189 3 11.5447 3 12.9575V22.2217C3 25.1222 5.3625 27.4977 8.2625 27.4977H22.7375C25.6375 27.4977 28 25.1222 28 22.2342V13.1325C28 11.6197 26.9875 9.68189 25.75 8.81923L18.025 3.40574C16.275 2.18051 13.4625 2.24302 11.775 3.55576Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13.625 22.5099H17.375C19.4375 22.5099 21.125 20.8221 21.125 18.7592V15.0085C21.125 12.9456 19.4375 11.2578 17.375 11.2578H13.625C11.5625 11.2578 9.875 12.9456 9.875 15.0085V18.7592C9.875 20.8221 11.5625 22.5099 13.625 22.5099Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.5 11.2578V22.5099"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.875 16.8828H21.125"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const HelpIcon = () => (
  <svg
    width="31"
    height="31"
    viewBox="0 0 31 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.5883 21.0526L24.0758 25.0033C24.2008 26.041 23.0883 26.7661 22.2008 26.2285L16.9633 23.1155C16.3883 23.1155 15.8258 23.078 15.2758 23.003C16.2008 21.9153 16.7508 20.54 16.7508 19.0522C16.7508 15.5016 13.6758 12.6261 9.87579 12.6261C8.42579 12.6261 7.08829 13.0387 5.97579 13.7638C5.93829 13.4512 5.92578 13.1387 5.92578 12.8136C5.92578 7.12505 10.8633 2.51172 16.9633 2.51172C23.0633 2.51172 28.0008 7.12505 28.0008 12.8136C28.0008 16.1892 26.2633 19.1773 23.5883 21.0526Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16.75 19.0511C16.75 20.5389 16.2 21.9142 15.275 23.0019C14.0375 24.5022 12.075 25.4648 9.875 25.4648L6.6125 27.4026C6.0625 27.7402 5.3625 27.2776 5.4375 26.64L5.75 24.1771C4.075 23.0144 3 21.1515 3 19.0511C3 16.8507 4.17501 14.9129 5.97501 13.7627C7.08751 13.0375 8.425 12.625 9.875 12.625C13.675 12.625 16.75 15.5005 16.75 19.0511Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

// Update menuItems to include SVG components
const menuItems: MenuItem[] = [
  {
    name: "Project",
    icon: <GraphIcon />,
    link: "/",
  },
  {
    name: "Visualize",
    icon: <VisualizeIcon />,
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
  const [activeItem, setActiveItem] = useState<string>("Project");

  return (
    <aside className="w-[120px] h-full bg-white shadow-md text-currentColor fixed left-0 top-14 px-8">
      <nav className="mt-8">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-6">
              <Link
                to={item.link}
                onClick={() => setActiveItem(item.name)}
                className={`flex flex-col items-center p-2 rounded transition-colors duration-300 ${
                  activeItem === item.name ? "text-[#443DFF]" : "text-black hover:text-[#443DFF]"
                }`}
              >
                {item.icon}
                <span className="mt-2 text-sm font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
