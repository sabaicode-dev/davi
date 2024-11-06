import ParticlesComponent from "@/app/components/ParticlesComponent";
import Link from "next/link";
import React from "react";

export default function HeroSection() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative text-white text-left h-[730px] flex items-center justify-center"
        style={{
          backgroundImage: `url('/images/home/hero.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center left",
        }}
      >
        {/* Particle Container */}
        <div className="w-full h-full absolute top-0 right-0">
          <ParticlesComponent id="tsparticles" />
        </div>

        {/* Hero Text and Content new */}
        <div className="container mx-auto px-8 lg:px-36 relative z-10 flex flex-col items-start justify-center h-full">
          <h1 className="text-[38px] sm:text-[42px] md:text-[48px] lg:text-[60px] font-bold mt-10 sm:mt-12 mb-4 leading-tight sm:leading-[48px] md:leading-[60px] lg:leading-[72px]">
            Unlock the Full
            <br /> Potential of Your <br /> Data with{" "}
            <span className="text-[#407BFF] font-bold">DAVI</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg mb-8 leading-relaxed">
            An all-in-one platform for data analysis, visualization, and
            <br />
            integration. Empower your team to make data-driven
            <br /> decisions faster and smarter.
          </p>

          {/* Link wrapping span with AOS here*/}
          <Link href="/signup">
            <button className="mt-6 bg-[#443DFF] text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition">
              Request Demo
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
