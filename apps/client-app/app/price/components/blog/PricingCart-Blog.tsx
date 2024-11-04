import React from "react";
import PricingCard from "../molecules/PricingCard";

const PricingCart_Blog = () => {
  return (
    <div className="relative md:absolute md:top-[33%] md:transform md:-translate-y-1/2 w-full flex flex-col items-center px-4 py-6 sm:px-5 md:px-[15%] lg:px-2 xl:px-36">
      <div className="flex flex-col md:flex-row justify-center space-y-5 md:space-y-0 md:space-x-5">
        {/* Free Trial - Bg-white */}
        <PricingCard
          type="Free Trial 14-Day"
          price="$0"
          subscription="Free Trial 14-Day"
          description="Basic analytics, limited dashboard views, essential data tools"
          buttonText="Get Started Now"
          features={[
            "Basic data integration tools",
            "Limited dashboard views",
            "Essential analytics capabilities",
            "Instant access to our design system",
          ]}
        />
        {/* Monthly Plan - Bg-blue with active prop */}
        <PricingCard
          type="Monthly Plan"
          price="$10"
          subscription="Month"
          description="Flexible access to DAVI’s advanced tools for ongoing insights"
          buttonText="Get Started Monthly"
          active={true} // Highlights this card
          features={[
            "Full access to advanced data integration and analysis tools",
            "Customizable dashboards for deeper insights",
            "Enhanced data cleaning and visualization capabilities",
            "AI-driven insights for better decision-making",
            "Unlimited projects and collaboration tools",
          ]}
        />
        {/* Yearly Plan - Bg-white */}
        <PricingCard
          type="Yearly Plan"
          price="$100"
          subscription="Year"
          description="Full premium access at a discounted rate for long-term strategy."
          buttonText="Go Yearly & Save"
          features={[
            "All features from the Monthly Plan",
            "Additional premium analytics and reporting tools",
            "Advanced security and compliance features",
            "Dedicated support for implementation and strategy",
            "Priority access to new features as they are released",
          ]}
        />
      </div>
    </div>
  );
};

export default PricingCart_Blog;
