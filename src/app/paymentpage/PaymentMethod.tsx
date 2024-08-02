import Image from "next/image";
import { useState } from "react";
import { BankT, Mada, Visa } from "../assets/svg";

function ImageRadioButtons() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    { id: "option1", imageSrc: BankT },
    { id: "option2", imageSrc: Mada },
    { id: "option3", imageSrc: Visa },
  ];

  return (
    <div className="flex flex-row gap-10 justify-between items-center  p-4">
      {options.map((option) => (
        <label
          key={option.id}
          className="flex flex-col items-center cursor-pointer"
        >
          <div dir="rtl" className="flex items-center gap-2">
            <input
              type="radio"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="cursor-pointer"
            />
            <Image
              src={option.imageSrc}
              alt={`Option ${option.id}`}
              width={100}
              height={100}
              className={`border-2 rounded ${
                selectedOption === option.id
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            />
          </div>
        </label>
      ))}
    </div>
  );
}

export default ImageRadioButtons;


//last modified by Omar Marei 2/8/2024
