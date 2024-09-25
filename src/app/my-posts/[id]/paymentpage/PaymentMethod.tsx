import Image from "next/image";
import { useState } from "react";
import { BankT, Mada, Visa } from "@/app/assets/svg";

function ImageRadioButtons({ setData, data }: {
  setData: (prev: any) => any, data: {
    method: string,
    name: string,
    numCard: number,
    endDate: string,
    cvv: string
  }
}) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    { id: "bank", imageSrc: BankT },
    { id: "mada", imageSrc: Mada },
    { id: "visa", imageSrc: Visa },
  ];

  return (
    <div className="flex flex-row gap-2 justify-center items-center my-3  flex-wrap">
      {options.map((option) => (
        <label
          key={option.id}
          className={`flex flex-col items-center cursor-pointer shadow-md  rounded-md 
          `}
        >
          <div dir="rtl" className={`flex items-center gap-2 p-3 border-2 rounded ${selectedOption === option.id
              ? "border-[#3B73B9]"
              : "border-transparent"
            }`}>
            <input
              type="radio"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={(e) => {
                setSelectedOption(e.target.value); setData((prev: {
                  method: string,
                  name: string,
                  numCard: number,
                  endDate: string,
                  cvv: string
                }) => ({ ...prev, method: e.target.value }))
              }}
              className="cursor-pointer"
            />
            <Image
              src={option.imageSrc}
              alt={`Option ${option.id}`}
              width={100}
              height={100}
              className={``}
            />
          </div>
        </label>
      ))}
    </div>
  );
}

export default ImageRadioButtons;


//last modified by Omar Marei 2/8/2024
