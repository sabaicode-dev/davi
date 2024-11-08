import React, { useState } from "react";
import Sidebar from "./organisms/Sidebar";
import Content from "./organisms/Content";

const DocumentationSection = () => {
  const [section, setSection] = useState<string>("learn-about-davi");
  return (
    <section className="relative">
      <div className="py-14 my-8 px-4 w-full flex flex-col md:flex-row md:justify-between">
        {/* Sidebar with fixed positioning within DocumentationSection */}
        <div className="w-full md:w-1/3 md:relative lg:sticky lg:top-0">
          <Sidebar onSelect={setSection} selectedSection={section} />
        </div>

        {/* Main content area with 100% width on mobile, 70% width on desktop */}
        <div className="w-full md:w-2/3 px-6 lg:pr-40 lg:pl-8">
          <Content section={section} />
        </div>
      </div>
    </section>
  );
};

export default DocumentationSection;
