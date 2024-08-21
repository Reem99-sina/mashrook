"use client";
import React, { forwardRef } from "react";

type SortPopupProps = {
  onClose: () => void;
  onSort: (option: string) => void;
  style?: React.CSSProperties;
  option:string
};

const SortPopup = forwardRef<HTMLDivElement, SortPopupProps>(({ onClose, onSort, style,option }, ref) => {
  return (
    <div
      ref={ref}
      className="absolute bg-white p-4 rounded-lg shadow-lg"
      style={style}
    >
      <h2 className="text-base text-gray-500 mb-4">ترتيب حسب</h2>
      <ul>
        <li>
          <button
           className={` w-full rounded-lg text-start ${option=="latest"?"bg-[#3B73B9] bg-opacity-25 text-blue-450":"bg-gray-100"} p-2 mb-2`}
            onClick={() => onSort("latest")}>الأحدث إلى الأقدم</button></li>
        <li><button
         className={` w-full rounded-lg text-start p-2 ${option=="latest"?"bg-[#3B73B9] bg-opacity-25 text-blue-450":"bg-gray-100"} mb-2`} 
         onClick={() => onSort("oldest")}>الأقدم إلى الأحدث</button></li>
        <li><button
         className={`w-full rounded-lg text-start ${option=="latest"?"bg-[#3B73B9] bg-opacity-25 text-blue-450":"bg-gray-100"} p-2 mb-2`}
          onClick={() => onSort("priceLowToHigh")}>الميزانية (الأدنى إلى الأعلى)</button></li>
        <li><button 
        className={` w-full rounded-lg text-start p-2 mb-2 ${option=="latest"?"bg-[#3B73B9] bg-opacity-25 text-blue-450":"bg-gray-100"}`}
        onClick={() => onSort("priceHighToLow")}>الميزانية (الأعلى إلى الأدنى)</button></li>
      </ul>
      
    </div>
  );
});

SortPopup.displayName = 'SortPopup';

export default SortPopup;


//last modified by Omar Marei 2/8/2024