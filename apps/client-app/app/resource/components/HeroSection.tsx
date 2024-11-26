import React from "react";

import bgBanner from "@/public/images/about/background/bg-Banner.png";
import HeroGIF from "@/public/images/resource/HeroGIF.gif";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section
      className="text-white text-left px-6 pt-10 h-auto w-full"
      style={{
        backgroundImage: `url(${bgBanner.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto py-16 sm:px-6 md:px-10 lg:px-20 xl:px-28 flex flex-col items-center">
        {/* Text Content */}
        <div className="w-full md:w-3/4 lg:w-1/2 text-center mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-4">
            DAVI Documentation
          </h2>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed w-full">
            Explore our guides and application walkthroughs.
          </p>
        </div>

        {/* Image */}
        <div className="w-full md:w-3/4 lg:w-1/2 mt-8 flex justify-center">
          <Image
            src={HeroGIF}
            alt="Data"
            className="rounded-lg max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};
