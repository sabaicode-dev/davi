import React from "react";
import FAQAccordion from "./AccordionItem";

export const Questions = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[100%] md:w-[60%] p-4 mx-auto overflow-hidde">
      <h1 className="text-[20px] font-semibold">Frequently asked questions</h1>
      <FAQAccordion />
    </div>
  );
};
