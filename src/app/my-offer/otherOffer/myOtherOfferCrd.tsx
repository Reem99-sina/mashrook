"use client";
import React from "react";
import {
  Accreditation,
  Dots,
  DeleteIcon,
  EditIcon,
  OtherOffer,
  UpdateIcon,
  Rebuild,
  ChatIconSmall,
} from "@/app/assets/svg";
import Link from "next/link";
import {
  FaRegCalendarAlt,
  FaBookmark,
  FaEllipsisH,
  FaAngleDoubleLeft,
} from "react-icons/fa";

import { BsChatSquareText } from "react-icons/bs";
import { RxArrowLeft } from "react-icons/rx";
import { Button } from "@/app/components/shared/button.component";
import Stepper from "@/app/components/shared/Stepper";
import { CgSmartphoneShake } from "react-icons/cg";
import CircularProgressBar from "@/app/components/propertyCard/RadialProgressBar";
import { FinishedShares } from "@/app/assets/svg";
import { GoLocation } from "react-icons/go";
import { LuTag } from "react-icons/lu";
import { BiArea } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
interface ChatCardProps {
  title: string;
  date: string;
  count: number;
  onEdit?: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
  inProgress?: boolean;
  active?: boolean;
  expired?: boolean;
  requestNumber: number;
  city: string;
  district: string;
  budget: string;
  type: string;
  purpose: string;
  lisNumber: string;
  details: {
    piece_number: string;
    price: string;
    area: string;
    stage: string;
    available_price: string;
    available_percentage: string;
    title?: string;
    onUpdate?: () => void;
    onDelete?: () => void;
    onEdit?: () => void;
    currentStep: number;
  }[];
}

export const OtherOfferCard: React.FC<ChatCardProps> = ({
  onEdit,
  onUpdate,
  onDelete,
  title,
  inProgress,
  active,
  expired,
  date,
  requestNumber,
  count,
  city,
  district,
  budget,
  type,
  purpose,
  lisNumber,
  details,
}) => {
  const steps = ["الانتهاء", "السعي", "دفع الرسوم", "انضمام الشركاء"];
  const currentStep = 1;

  return (
    <div className="mt-4 w-full border-2 border-[#E5E7EB] rounded-lg mb-4 flex flex-col p-4">
      <div className="items-center justify-between  flex-row flex relative">
        <p className="text-xl font-bold text-[#374151]">{title} </p>

        <div className="w-[40px] h-[40px] border-2 rounded-full flex items-center justify-center">
                <CiLocationOn className="text-5xl w-[24px] h-[24px]" />
              </div>
      </div>
      <div className="flex gap-2 mt-2">
        <div className="flex flex-row gap-x-2 text-xs">
          <span
            className={`text-white text-right px-4 py-1 rounded-2xl ${
              purpose === "للبيع" ? "bg-green-450" : "bg-orange-450"
            }`}
          >
            {purpose === "للبيع" ? purpose : "تطوير"}
          </span>
          <span
            className={`text-black text-right px-4 py-1 rounded-2xl ${"bg-gray-200"}`}
          >
            {purpose}
          </span>
          <span
            className={`text-black text-right px-4 py-1 rounded-2xl ${"bg-gray-200"}`}
          >
            {date}
          </span>
        </div>

       
      </div>

      <div className=" mt-2">
        <p className="text-xs text-[#6B7280] font-normal">
          رقم الطلب: {requestNumber}
        </p>
      </div>
      <div className="pt-1 mr-4 text-sm text-gray-700 mt-2">
        <div className="flex items-center justify-start">
          <CgSmartphoneShake className="w-[16px]" />
          <p className="px-2">ترخيص رقم: {lisNumber}</p>
        </div>
        <div className="flex items-center  justify-start">
          <GoLocation />
          <p className="px-2">
            مدينة {city}، {district}
          </p>
        </div>
      </div>
      <div className="gap-1 mt-2 flex flex-col">
        {details.map((detail, index) => (
          <>
            <div
              key={`detail-${index}`}
              className="bg-white shadow-lg rounded-lg p-2 mb-4"
            >
              <div className="flex flex-row flex-no-wrap items-center justify-center md:flex-row sm:flex-col ">
                <div className="ml-auto text-right py-1 ">
                  <div className="flex flex-row">
                    <p className="text-2xl px-4 text-black font-bold">
                      {detail?.title
                        ? detail?.title
                        : detail?.piece_number &&
                          `قطعة رقم  ${detail?.piece_number}`}
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-2 my-2 flex-wrap items-start">
                    <div className="bg-gray-200 rounded-xl px-2 flex items-center">
                      <LuTag />
                      <p className="text-base  md:text-xs lg:text-sm mx-2">
                        {detail?.price} {"ريال"}
                        <span className="text-[#3B73B9]">
                          {" "}
                          (بدون ضريبة التصرفات العقارية أو السعي)
                        </span>
                      </p>
                    </div>
                    <div className="bg-gray-200 rounded-xl px-2 mr-4 flex items-center">
                      <BiArea />
                      <p className="text-base md:text-xs lg:text-sm mx-2 ">
                        {detail?.area} م<sup>2</sup>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center  rounded-full p-2">
                  {detail?.stage == "finished" ? (
                    <>
                      <FinishedShares />
                      <div className="w-12">
                        <p className="text-center text-sm text-gray-900">
                          اكتمال الشراكة
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-xl font-bold text-blue-500 mb-2">
                        <CircularProgressBar
                          percentage={Number(detail?.available_percentage)}
                          size={50}
                          strokeWidth={5}
                        />
                      </span>
                      <div className="">
                        <p className="text-xs text-gray-500">متاح</p>
                        <p className="text-xs text-gray-500">
                          {detail?.available_price}ريال
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <button
                type="button"
                className={`${
                  detail?.stage === "finished"
                    ? "bg-gray-300 text-gray-800"
                    : "bg-blue-450 text-white hover:bg-blue-800 border-2 border-blue-500"
                }  font-medium rounded-lg text-sm px-5 py-2.5 flex justify-center w-full rtl:flex-row-reverse dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                disabled={detail?.stage === "finished"}
                //   onClick={handleDialogToggle}
              >
               انظم كشريك
                <RxArrowLeft
                  className={`mr-4 text-xl ${
                    detail?.stage === "finished"
                      ? "text-gray-600"
                      : "text-white"
                  }`}
                />
              </button>
            </div>
          </>
        ))}
          <hr className="h-px  bg-gray-200 border-0" />
            <div className="flex justify-around items-center mt-2">
              <div className="flex flex-row   items-center justify-center">
                <Link href={`/showproperty/${1}`} onClick={() => {}}>
                  <button className="text-blue-500 mx-4 align-middle">
                    عرض التفاصيل
                  </button>
                </Link>
                <FaEllipsisH className="text-blue-500 mx-2 align-middle" />
              </div>
              <div className="bg-gray-300 inline-block h-12 w-0.5 self-stretch"></div>

              <div className="flex flex-row py-1 items-center justify-center">
                <button
                  // onClick={handleSaveClick}
                  className="text-blue-500 mx-2 align-middle"
                >
                  {"حفظ"}
                </button>
                <FaBookmark className="text-blue-500 mx-2 text-xl align-middle" />
              </div>
              </div>
      </div>

      
    </div>
  );
};
