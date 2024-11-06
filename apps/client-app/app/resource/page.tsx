"use client";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import CTASection from "../home/components/CTASection";

const ResourcePage = () => {
  const [section, setSection] = useState<string>("learn-about-davi");

  return (
    <div>
      <div className="py-14 my-8 px-4">
        {/* Responsive layout: stacked on mobile, side-by-side on desktop */}
        <div className="flex flex-col md:flex-row md:justify-between">
          {/* Sidebar with 100% width on mobile, 30% width on desktop */}
          <div className="w-full md:w-1/3 my-8 md:mb-0 md:mr-4">
            <Sidebar onSelect={setSection} selectedSection={section} />
          </div>

          {/* Main content area with 100% width on mobile, 70% width on desktop screen*/}
          <div className="w-full md:w-2/3 px-6 lg:pr-40 lg:pl-8">
            <Content section={section} />
          </div>
        </div>
      </div>
      <div className="mt-12">
        <CTASection />
      </div>
    </div>
  );
};

export default ResourcePage;