import React from "react";

interface StepperProps {
  currentStep: number;
  steps: string[];
}

const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
  return (
    <div className="flex items-center justify-between w-full  my-3">
      {steps.map((step, index) => (
        <div key={index} className={`${index < steps.length - 1 ? "flex-1" : ""} flex items-center `}>
          <div className="flex items-center relative">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentStep
                ? "bg-[#3B73B9] text-white"
                : "bg-gray-300 text-gray-600"
                }`}
            >
              {index + 1}
            </div>
            {index == currentStep && <div className="text-xs absolute top-[-25px] right-[-25px] border border-gray-300 rounded-md p-1 whitespace-nowrap">
              {step}
            </div>}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`${index < steps.length - 1 ? "flex-1" : ""} h-1 ${index < currentStep ? "bg-[#3B73B9]" : "bg-gray-300"
                }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
