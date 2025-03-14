"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Succeeded } from "../assets/svg";
import { Button } from "../components/shared/button.component";
import Footer from "../components/header/Footer2";
import MainHeader from "../components/header/MainHeader";

interface OnSuccessProps {
  datarealEstateRequest: { id: string | number };
}

const OnSuccess: React.FC<OnSuccessProps> = ({ datarealEstateRequest }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center min-h-screen h-full w-full bg-white">
      <MainHeader />
      <div className="flex items-center justify-center flex-col border border-[#F3F4F6] rounded-lg p-3 mb-6 w-4/5 shadow-sm">
        <Succeeded />
        <p className="font-bold text-xl text-[#1F2A37] mt-4 mb-4">
          تم بنجاح إضافة  عقار
        </p>
        <div className="flex mb-auto bg-[#F3F4F6] rounded-lg justify-center items-center w-24 h-6">
          <p className="text-[#6B7280] text-xs font-normal">
            رقم الطلب: {datarealEstateRequest?.id}
          </p>
        </div>
      </div>
      <div className="w-4/5 mb-28">
        <Button
          text="الذهاب الى عروضي"
          onClick={() => {
            router.push(`/my-offer?title=عروضي`);
          }}
        />
        <Button
          text="العودة الى الرئيسية"
          className="!text-[#3B73B9] !bg-white !border !border-[#3B73B9] rounded !mt-5"
          onClick={() => {
            router.push("/");
          }}
        />
      </div>
      <Footer />
    </div>
  );
};

export default OnSuccess;
