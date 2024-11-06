"use client";

import React, { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

// Type for each FAQ item
type FAQItem = {
  question: string;
  answer: string;
};

// Sample FAQ data
const faqData: FAQItem[] = [
  {
    question: "What is DAVI?",
    answer:
      "DAVI is a powerful data integration and visualization platform designed to simplify complex data tasks.",
  },
  {
    question: "Can I upgrade my plan at any time?",
    answer:
      "Yes, you can easily upgrade your plan at any time through your account settings. Changes will take effect at the end of your current billing cycle.",
  },
  {
    question: "What types of data sources can I integrate with DAVI?",
    answer:
      "You can integrate various data sources including databases, cloud storage, APIs, and more.",
  },
  {
    question: "How do I access customer support?",
    answer: "Customer support is accessible through your account portal.",
  },
  {
    question: "What happens if I exceed my data limits?",
    answer: "Additional charges may apply if data limits are exceeded.",
  },
  {
    question: "How many users can I add to my account?",
    answer: "The number of users depends on your subscription plan.",
  },
];

// Props type for AccordionItem
type AccordionItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  toggle: () => void;
};

const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  answer,
  isOpen,
  toggle,
}) => {
  return (
    <div className="border border-gray-200 shadow-md rounded-lg mb-2 bg-white">
      <div
        onClick={toggle}
        className="flex justify-between items-center p-4 cursor-pointer"
      >
        <h3 className={`text-lg ${isOpen ? "text-blue-600" : "text-black"}`}>
          {question}
        </h3>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {isOpen && (
        <div className="p-4 pt-0 text-gray-700">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto mt-8 space-y-4">
      {faqData.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          toggle={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
};

export default FAQAccordion;
