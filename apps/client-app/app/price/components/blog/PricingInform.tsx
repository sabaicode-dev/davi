import React from "react";
import { PricingTable } from "@/app/price/components/molecules/PricingTable";
import { Questions } from "@/app/price/components/molecules/Questions";

const PricingInform = () => {
  return (
    <div className="w-full">
      <div className="space-y-5 py-10">
        <PricingTable />
        <Questions />
      </div>
    </div>
  );
};

export default PricingInform;
