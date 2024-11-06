"use client";
import HeroSection from "@/app/home/components/HeroSection";
import FeaturesSection from "@/app/home/components/FeatureSection";
import SolutionSection from "@/app/home/components/SolutionSection";
import IntergrationSection from "@/app/home/components/IntergrationSection";
import ServiceSection from "@/app/home/components/ServiceSection";
import DataInsightSection from "@/app/home/components/DataInsightSection";
import CTASection from "@/app/home/components/CTASection";

import DataSolution from "./components/DataSolution";
import Qoute from "./components/Qoute";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      <Qoute />

      {/* Solutions Section */}
      <SolutionSection />

      {/* Integration Section */}
      <IntergrationSection />

      {/* Data Solution */}
      <DataSolution />

      {/* Services Section */}
      <ServiceSection />

      {/* Powerful Data Insights Section */}
      <DataInsightSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
    </>
  );
}
