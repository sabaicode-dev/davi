import Image from "next/image";
import React from "react";
import SideIntergrate from "@/public/images/home/sideIntergrateSection.png";
import ScanImg from "@/public/images/home/span.png";

export default function IntergrationSection() {
  return (
    <>
      <section className="bg-gray-100">
        <div className="container mx-auto flex flex-col md:flex-row items-center md:-space-x-16 space-y-8 md:space-y-0">
          {/* Left Side - Image List */}
          <div className="w-full md:w-[40%] flex justify-center">
            <div className="relative">
              {/* <MarqueeDemo/> */}
            </div>
          </div>

          {/* Right Side - Text and Curved Image */}
          <div className="w-full md:w-[60%] p-4 md:p-8 flex flex-col items-start relative">
            <h2 className="text-6xl md:text-8xl font-medium mb-8 md:mb-16">
              Integrate
              <br />
              <span className="block md:inline">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              your data
            </h2>

            <div className="relative w-full flex justify-center mb-4 md:absolute md:mt-28 md:right-1/3">
              <Image
                src={ScanImg}
                alt="Dashboard example"
                objectFit="cover"
                width={200}
                height={200}
              />
            </div>
            <p className="text-black text-center text-base md:text-xl font w-full md:w-[70%]">
              Seamlessly integrate, clean, and visualize data with automated
              ETL, turning raw sources like CSV and MySQL into meaningful
              insights for smarter decisions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
