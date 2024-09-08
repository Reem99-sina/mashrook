import React, { useRef, useState, useEffect } from "react";
interface NumberRoomInter {
  errors?: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  firstNumber: string;
  secondNumber: string;
  name: string;
  max: number;
}
const NumberRoom: React.FC<NumberRoomInter> = ({
  errors,
  value,
  onChange,
  title,
  firstNumber,
  secondNumber,
  max,
  name,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState(0);

  useEffect(() => {
    const rangeWidth = 100; // Assuming the range input is 100% of its container

    // Calculate the value's proportional position
    const position = (value / 10) * rangeWidth; // Change '10' to your max value

    // Update tooltip position
    setTooltipPosition(position);
  }, [value]);
  return (
    <div>
      <div
        className="flex justify-between text-sm mt-2"
        style={{ direction: "rtl" }}
      >
        <p className="font-medium text-base text-[#4B5563]">{title}</p>
        {errors && errors != "undefined" && (
          <p className="text-xs text-red-600 dark:text-red-500 text-right">
            {errors}
          </p>
        )}
      </div>

      <div
        className="flex justify-between text-sm mt-2"
        style={{ direction: "rtl" }}
      >
        <span>{firstNumber}</span>
        <span>{secondNumber}</span>
      </div>

      <div className="relative" style={{ direction: "rtl" }}>
        <input
          type="range"
          min="0"
          max={max}
          value={value}
          onChange={onChange}
          className="w-full accent-[#3B73B9]"
          dir="rtl"
          name={name}
        />
        <div
          ref={tooltipRef}
          className="absolute  bg-gray-200 text-black text-xs px-3 py-1 rounded-md"
          style={{
            left: `${100 - tooltipPosition}%`, // Position the tooltip based on the calculated position
            // transform: `translateX(100%)`, // Center the tooltip above the thumb
            top: "-30px",
            direction: "rtl", // Adjust this value to set the vertical position above the range
          }}
        >
          {value}
          {firstNumber}
        </div>
      </div>
    </div>
  );
};
export default NumberRoom;
