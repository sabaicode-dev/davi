import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import Link from "next/link";

// TypeScript Props for PricingCard
interface PricingCardProps {
  type: string;
  price: string;
  subscription: string;
  description: string;
  buttonText: string;
  active?: boolean;
  features: string[];
}

// PricingCard Component
const PricingCard: React.FC<PricingCardProps> = ({
  type,
  price,
  subscription,
  description,
  buttonText,
  active = false,
  features,
}) => {
  return (
    <div
      className={`${
        active
          ? "bg-blue-700 border-blue-500 text-white"
          : "bg-white border-gray-300"
      } w-full px-4 py-6 md:w-1/2 lg:w-1/4 border shadow-md rounded-[10px] transition-transform transform hover:scale-105`}
    >
      <div className="relative overflow-hidden p-5 pt-8">
        <span className="text-lg font-semibold text-primary">{type}</span>
        <p
          className={`${
            active ? "text-sm text-white" : "text-sm text-gray-700"
          }`}
        >
          {description}
        </p>
        <h2 className="mb-5 text-[42px] font-extralight py-1">
          {price}
          <span
            className={`${
              active ? "text-sm text-white" : "text-sm text-gray-700"
            }`}
          >
            / {subscription}
          </span>
        </h2>
        <Link href="/signup">
          <div
            className={`border-2 bg-white text-blue-600 rounded-md py-2 shadow-sm flex text-[16px] text-center justify-center cursor-pointer transition duration-200 ease-in-out ${
              active
                ? "hover:bg-blue-600 hover:text-white"
                : "border-blue-500 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {buttonText}
          </div>
        </Link>

        <div className="flex flex-col gap-[14px] mt-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-row items-center space-x-2">
              <div className="flex items-center justify-center">
                <IoMdCheckmark
                  className={`${
                    active ? "text-blue-600" : "text-blue-500"
                  } w-6 h-6 rounded-full bg-blue-100 p-1`}
                />
              </div>
              <div>
                <p
                  className={`${
                    active ? "text-sm text-white" : "text-sm text-gray-700"
                  }`}
                >
                  {feature}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
