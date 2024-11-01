import React from "react";
import bgBanner from "@/public/images/about/background/bg-Banner.png";

export const PricingHeroSection = () => {
  return (
    <section
      className="relative text-white px-9 pt-10 h-auto md:h-[600px] w-full"
      style={{
        backgroundImage: `url(${bgBanner.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full h-full mt-[8%] flex justify-center">
        {/* Text Content */}
        <div className="md:w-1/2 text-center">
          <h2 className="text-5x sm:text-[38px] font-bold mb-4">
            Choose the Right Plan to Unlock the Power of Your Data
          </h2>
          <p className="text-base sm:text-lg leading-relaxed w-full sm:pr-10 sm:w-full">
            Flexible plans designed to grow with your business. From exploring
            data insights to advanced analytics, select the perfect fit to
            accelerate your data journey.
          </p>
        </div>
      </div>
    </section>
  );
};
