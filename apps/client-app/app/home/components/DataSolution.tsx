"use client";
import Image from "next/image";
import DataSulutionImg from "@/public/images/home/data-solution.png";
import DataAnalystImg from "@/public/images/home/dataAnalysis.jpg";
import BusinessLeaderImg from "@/public/images/home/businessLeader.png";
import ItAdminImg from "@/public/images/home/itAdministrator.jpg";
import DataScinetistImg from "@/public/images/home/dataScientist.jpg";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function DataSolution() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false); // Track hover state

  const handleTabClick = (index: number) => {
    setFade(true);
    setTimeout(() => {
      setActiveTab(index);
      setFade(false);
    }, 300);
  };

  const Data = [
    {
      title: "Data Engineer",
      subtitle: "Streamline data integration and ensure quality data flow.",
      description:
        "Davi automates the integration of data from multiple sources, standardizes data formats, and monitors data quality, allowing data engineers to focus on building robust data pipelines without manual intervention.",
      img: DataSulutionImg,
    },
    {
      title: "Data Analyst",
      subtitle: "Clean and prepare datasets for actionable insights.",
      description:
        "With Davi, data analysts can use intuitive tools to cleanse, transform, and enrich data, making it ready for analysis in minutes. The platform's smart suggestions simplify complex data preparation tasks, enabling quicker delivery of insights.",
      img: DataAnalystImg,
    },
    {
      title: "Business Leader",
      subtitle: "Gain real-time visibility with automated dashboards.",
      description:
        "Davi empowers business leaders by providing real-time dashboards that aggregate key performance indicators across departments. The platform's customizable views ensure that leaders have the information they need at their fingertips to make data-driven decisions.",
      img: BusinessLeaderImg,
    },
    {
      title: "IT Administrator",
      subtitle: "Manage data governance and ensure security compliance.",
      description:
        "Davi offers comprehensive data governance features that help IT administrators maintain data integrity, comply with regulatory requirements, and secure sensitive information through user access controls, data masking, and audit trails.",
      img: ItAdminImg,
    },
    {
      title: "Data Scientist",
      subtitle: "Transform raw data into predictive models efficiently.",
      description:
        "For data scientists, Davi accelerates the process of transforming raw data into machine learning-ready datasets. The platform supports advanced transformations, statistical analysis, and integration with popular modeling tools, allowing for a seamless flow from data preparation to predictive insights.",
      img: DataScinetistImg,
    },
  ];

  useEffect(() => {
    // Only start auto-rotate if not hovered
    if (!isHovered) {
      const interval = setInterval(() => {
        setFade(true);
        setTimeout(() => {
          setActiveTab((prevTab) => (prevTab + 1) % Data.length);
          setFade(false);
        }, 300);
      }, 4000);

      return () => clearInterval(interval); // Cleanup interval on hover or component unmount
    }
  }, [isHovered, Data.length]); // Restart effect on hover change

  return (
    <section
      className="pt-4 md:pt-16 pb-8 bg-white"
      onMouseEnter={() => setIsHovered(true)} // Stop auto-rotate on hover
      onMouseLeave={() => setIsHovered(false)} // Resume auto-rotate on leave
    >
      <div className="container mx-auto px-4 sm:px-8 lg:px-36 text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-8">
          Data Solutions for Every Role in Your Organization
        </h2>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-4 md:space-x-14 mb-4 md:mb-8 overflow-x-auto scrollbar-hide">
          {Data.map((item, index) => (
            <button
              key={index}
              className={`px-3 md:px-4 py-1 mx-1 border-[1.5px] ${
                activeTab === index
                  ? "border-black rounded-lg font-medium"
                  : "border-transparent font-medium"
              } whitespace-nowrap`}
              onClick={() => handleTabClick(index)}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left section - Content for active tab */}
          <div
            className={`bg-[#E6EDFF] p-4 md:p-8 flex flex-col h-auto md:h-96 lg:rounded-tl-lg lg:rounded-bl-lg transition-opacity duration-300 ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex items-center gap-2 md:gap-3 mb-4">
              <span className="bg-[#D9D9D9] w-5 h-5 md:w-6 md:h-6 rounded-full">
                {""}
              </span>
              <h1 className="text-[#8E8E93] text-sm md:text-base">
                {Data[activeTab].title}
              </h1>
            </div>
            <h2 className="text-lg md:text-xl font-medium text-left mb-4">
              {Data[activeTab].subtitle}
            </h2>
            <p className="text-black text-sm md:text-base text-left mb-6">
              {Data[activeTab].description}
            </p>

            <Link href="/signup" className="mt-auto self-start">
              <button className="bg-[#443DFF] text-white font-semibold py-2 md:py-3 px-6 md:px-8 rounded-lg hover:opacity-90 transition mb-6">
                Get Started
              </button>
            </Link>
          </div>

          {/* Right section - Image */}
          <div
            className={`flex justify-center transition-opacity duration-300 ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          >
            <Image
              src={Data[activeTab].img}
              alt={Data[activeTab].title}
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
