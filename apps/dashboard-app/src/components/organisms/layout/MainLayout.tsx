import React from "react";
import Header from "@/src/components/organisms/Header";
import Sidebar from "@/src/components/organisms/Sidebar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden lg:overflow-auto">
      <Sidebar />
      <div className="w-full">
        <Header />
        <main className="px-6 mt-[70px] ml-28">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
