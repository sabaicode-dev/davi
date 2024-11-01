import React from "react";
import { PricingHeroSection } from "@/app/price/components/blog/PricingHeroSection";
import PricingInform from "@/app/price/components/blog/PricingInform";
import CTASection from "../home/components/CTASection";
import PricingCart_Blog from "./components/blog/PricingCart-Blog";

export default function Pricing() {
  return (
    <div className="w-full">
      <div className="relative">
        {/* Hero Section */}
        <PricingHeroSection />

        {/* Card Section */}
        <PricingCart_Blog />

        {/* Block 1 Solutions Section */}
        <div className="pt-0 md:pt-[30%]">
          <PricingInform />
        </div>
      </div>
      {/* request for demo  */}
      <CTASection />
    </div>
  );
}
