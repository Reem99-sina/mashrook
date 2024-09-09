import React, { useState, ReactNode } from "react";

type AccordionProps = {
  title: string;
  children: ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={
        !isOpen ? "border-b border-gray-200" : "border border-gray-200  "
      }
    >
      <button
        className="flex justify-between items-center w-full p-4 text-start "
        onClick={toggleAccordion}
      >
        <span className="text-lg text-[#4B5563] font-semibold">{title}</span>
        <span className="bg-[#F7F7FA75] flex rounded-full items-center justify-center w-8 h-8">
          {isOpen ? "-" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="p-4 text-sm text-[#9CA3AF] font-normal">{children}</div>
      )}
    </div>
  );
};

export default Accordion;
