
import React from 'react';

interface StepProps {
  number: number;
  title: string;
  icon: React.ReactNode;
  showLine: boolean;
}

const Step: React.FC<StepProps> = ({ number, title, icon, showLine }) => {
  return (
    <div className="flex items-center mb-4 relative">
      <div className="flex flex-col items-center mr-4 justify-evenly relative">
        <div className="flex items-center justify-center w-10 h-10 border rounded-full bg-green-450 text-white z-10">
          {number}
        </div>
        {showLine && (
          <div className="step-line"></div>
        )}
      </div>
      <div className="flex w-full m-4 border-2 rounded-lg drop-shadow-md justify-between">
        <div className="inline-block align-middle p-4 text-center flex-auto">
          <p className="text-lg font-bold m-4">{title}</p>
        </div>
        <div className="flex items-center justify-center m-2 w-24 h-24 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Step;

//last modified by Omar Marei 19/7