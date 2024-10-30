import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6 mt-10">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
