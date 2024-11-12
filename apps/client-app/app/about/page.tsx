import React from "react";
import { HeroSection } from "@/app/about/components/blockCode/HeroSection";
import { OurTeam } from "@/app/about/components/blockCode/OurTeam";
import { BackgroundBeamsWithCollision } from "@/app/about/components/ui/background-animations";
import { CardSection } from "@/app/about/components/blockCode/CardSection";
import { Solutions } from "@/app/about/components/blockCode/Solutions";
import { Quick } from "@/app/about/components/blockCode/Quick";

export default function AboutPage() {
  return (
    <div className="w-full">
      <div className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* Card Section */}
        <CardSection />

        {/* Block 1 Solutions Section */}
        <Solutions />
      </div>
      {/* Block 2 */}
      <BackgroundBeamsWithCollision>
        <Quick />
      </BackgroundBeamsWithCollision>

      {/* Block 3 our Team */}
      <OurTeam />
    </div>
  );
}
