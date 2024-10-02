"use client";

import { BackButtonOutline } from "@/app/assets/svg";
import React from "react";
import { useRouter } from "next/navigation";

interface SharedHeaderComponentProps {
  text: string;
}

const SharedHeaderComponent: React.FC<SharedHeaderComponentProps> = ({
  text,
}) => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return (
    <div className="flex items-center justify-center border-b-2 border-gray-200">
      <div>
        <button onClick={handleBackClick}>
          <BackButtonOutline />
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <p className="flex items-center justify-center text-[#36343B] font-bold text-xl pb-2">
          {text}
        </p>
      </div>
    </div>
  );
};

export default SharedHeaderComponent;
