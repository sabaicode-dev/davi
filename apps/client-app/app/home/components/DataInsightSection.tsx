import Image from "next/image";
import Link from "next/link";
import React from "react";
import CTAImg from "@/public/images/home/CTAImg.png";
import IconTick from "@/public/images/home/iconTick.png";

// Interface for feature data
interface Feature {
  id: number;
  name: string;
}

// Mock data for features
const features: Feature[] = [
  { id: 1, name: "Data Integration" },
  { id: 2, name: "Data Cleaning" },
  { id: 3, name: "Real-Time Analytics" },
  { id: 4, name: "Data Visualization" },
  { id: 5, name: "AI-Powered Insights" },
  { id: 6, name: "Visual Dashboards" },
];

export default function DataInsightSection() {
  return (
    <section className="py-12 relative bg-gray-100 md:bg-transparent">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center hidden md:block"
        style={{
          backgroundImage: "url('/images/home/CTAbg.png')",
        }}
      ></div>

      {/* Content */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-36 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Image Section */}
          <div className="flex justify-center order-1 md:order-2">
            <Image
              src={CTAImg}
              alt="CTA Image"
              width={400}
              height={400}
              className="w-full max-w-md"
            />
          </div>

          {/* Text Section */}
          <div className="text-center md:text-left order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Unlock Powerful Data Insights with a<br /> 14-Day Free Trial
            </h2>
            <ul
              data-aos="flip-down"
              className="flex flex-wrap justify-center md:justify-start font-medium mb-6 gap-4 text-black"
            >
              {features.map((feature) => (
                <li key={feature.id} className="flex items-center space-x-2">
                  <Image src={IconTick} alt="tick" width={16} height={16} />
                  <span>{feature.name}</span>
                </li>
              ))}
            </ul>
            <Link href="/signup">
              <button className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">
                Request Demo
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
