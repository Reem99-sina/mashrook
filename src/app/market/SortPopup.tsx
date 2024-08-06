"use client";
import React, { forwardRef } from "react";

type SortPopupProps = {
  onClose: () => void;
  onSort: (option: string) => void;
  style?: React.CSSProperties;
};

const SortPopup = forwardRef<HTMLDivElement, SortPopupProps>(({ onClose, onSort, style }, ref) => {
  return (
    <div
      ref={ref}
      className="absolute bg-white p-4 rounded-lg shadow-lg"
      style={style}
    >
      <h2 className="text-base text-gray-500 mb-4">ترتيب حسب</h2>
      <ul>
        <li><button className="bg-gray-100 w-full rounded-lg text-start px-2 mb-2" onClick={() => onSort("latest")}>الأحدث إلى الأقدم</button></li>
        <li><button className="bg-gray-100 w-full rounded-lg text-start px-2 mb-2" onClick={() => onSort("oldest")}>الأقدم إلى الأحدث</button></li>
        <li><button className="bg-gray-100 w-full rounded-lg text-start px-2 mb-2" onClick={() => onSort("priceLowToHigh")}>الميزانية (الأدنى إلى الأعلى)</button></li>
        <li><button className="bg-gray-100 w-full rounded-lg text-start px-2 mb-2" onClick={() => onSort("priceHighToLow")}>الميزانية (الأعلى إلى الأدنى)</button></li>
      </ul>
      
    </div>
  );
});

SortPopup.displayName = 'SortPopup';

export default SortPopup;


//last modified by Omar Marei 2/8/2024