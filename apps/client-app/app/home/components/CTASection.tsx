import Link from "next/link";
import React from "react";

export default function CTASection() {
  return (
    <>
      <section>
        <div className="relative scroll-parallax ">
          <div className="flex z-50 flex-col items-center justify-center text-white py-16 space-y-8 bg-memey ">
            {/* Header */}
            <h2 className="text-3xl md:text-4xl font-bold text-center animate-fade-in">
              {"Let’s Get You Started, Your Way!"}
            </h2>

            {/* Description here*/}
            <p className="text-gray-300 text-sm md:text-base text-center max-w-2xl mx-auto">
              Have questions? Our team is here to provide the answers you need.
            </p>

            {/* CTA Button */}
            <div className="space-x-3">
            <Link href="/signup">
              <button className="bg-white text-black font-bold py-2 px-5 rounded-lg hover:bg-gray-100">
                Try DAVI Now
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-[#443DFF] text-white font-bold py-2 px-9 rounded-lg hover:opacity-90">
                Contact Us
              </button>
            </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
