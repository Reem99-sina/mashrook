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
} from "../assets/svg";
import { BsChatSquareText } from "react-icons/bs";
import { Button } from "../components/shared/button.component";
import Stepper from "../components/shared/Stepper";
import { CgSmartphoneShake } from "react-icons/cg";
import CircularProgressBar from "../components/propertyCard/RadialProgressBar";
import { FinishedShares } from "@/app/assets/svg";
import { GoLocation } from "react-icons/go";
import { LuTag } from "react-icons/lu";
import { BiArea } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { useRouter } from "next/navigation";
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
  id:number;
  district: string;
  budget: string;
  type: string;
  purpose: string;
  lisNumber: string;
  house?: boolean;
  details: {
    piece_number: string;
    price: string;
    area: string;
    stage: string;
    available_price: string;
    available_percentage: string;
    type?: string;
    onUpdate?: () => void;
    onDelete?: () => void;
    onEdit?: () => void;
    currentStep: number;
  }[];
}

export const OfferCard: React.FC<ChatCardProps> = ({
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
  id,
  budget,
  type,
  purpose,
  lisNumber,
  details,
  house,
}) => {
  const steps = ["الانتهاء", "السعي", "دفع الرسوم", "انضمام الشركاء"];
  const currentStep = 1;
  let router = useRouter();
  return (
    <div className="mt-4 w-full border-2 border-[#E5E7EB] rounded-lg mb-4 flex flex-col p-4">
      <div className="items-center justify-between  flex-row flex relative">
        <p className="text-xl font-bold text-[#374151]">{title} </p>

        <span className="items-center justify-center flex border border-[#E5E7EB] p-2 rounded-md gap-1 ">
          <p className="font-medium text-sm text-[#3B73B9]">عرض التفاصيل </p>
          <Dots />
        </span>
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
            {date}
          </span>
        </div>

        {inProgress ? (
          <span className="rounded-xl bg-[#FEECDC] pl-2 pr-2 pt-[2px] pb-[2px] text-xs font-normal text-[#FF8A4C]">
            تحت التقدم{" "}
          </span>
        ) : active ? (
          <span className="rounded-xl bg-[#F3F4F6] pl-2 pr-2 pt-[2px] pb-[2px] text-xs font-normal text-[#6B7280]">
            {count} ايام للانتهاء
          </span>
        ) : (
          <span className="rounded-xl bg-[#FDE8E8] pl-2 pr-2 pt-[2px] pb-[2px] text-xs font-normal text-[#F98080]">
            منتهي
          </span>
        )}
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
        {details.map((detail:any, index:number) => (
          <>
            <div
              key={`detail-${index}`}
              className="bg-white shadow-lg rounded-lg p-2 mb-4"
            >
              <div className="flex flex-row flex-no-wrap items-center justify-center md:flex-row sm:flex-col ">
                <div className="ml-auto text-right py-1 ">
                  <div className="flex flex-row">
                    <p className="text-2xl px-4 text-black font-bold">
                      {detail?.type
                        ? detail?.type
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
                          (بدون القيمة المضافة أو السعي)
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
              {/* {inProgress ? ( */}
              {/* <> */}
              <div className="p-4 w-full">
                <Stepper steps={steps} currentStep={detail?.currentStep} />
              </div>
              <div className="flex items-center justify-center ">
                <p className="text-xs text-[#6B7280] font-semibold">
                  مراحل الشراكة
                </p>
              </div>
              {/* </> */}
              {/* ) : null} */}
              <hr className="border-gray-200 dark:border-white my-2" />
              <div className="flex flex-row items-center justify-center   gap-3 border-[#E5E7EB] my-5">
                {house ? (
                  <Button
                    startIcon={<EditIcon />}
                    text="تعديل"
                    className="!bg-white disabled:!bg-gray-200 flex flex-row-reverse !text-[#3B73B9] disabled:!text-gray-500 !text-sm !font-medium !gap-1  !border-[#3B73B9] disabled:!border-gray-500 border-solid rounded-md border-2"
                    onClick={() => {router.push("/edit-my-offer");
                      sessionStorage.setItem("offer",JSON.stringify({...detail,title:title}))
                    }}
                    disabled={detail?.currentStep > 1}
                  />
                ) : (
                  <Button
                    startIcon={<EditIcon />}
                    text="تعديل"
                    className="!bg-white disabled:!bg-gray-200 flex flex-row-reverse !text-[#3B73B9] disabled:!text-gray-500 !text-sm !font-medium !gap-1  !border-[#3B73B9] disabled:!border-gray-500 border-solid rounded-md border-2"
                    onClick={detail?.onEdit}
                    disabled={detail?.currentStep > 1}
                  />
                )}

                <Button
                  startIcon={
                    <DeleteIcon className="disabled:!text-gray-500 !text-[#F05252]" />
                  }
                  text="حذف"
                  className="!bg-white disabled:!bg-gray-200 flex flex-row-reverse !text-[#F05252] disabled:!text-gray-500 !text-sm !font-medium !gap-1  !border-red-500 disabled:!border-gray-500 border-solid rounded-md border-2"
                  onClick={onDelete}
                  disabled={detail?.currentStep > 1}
                />
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
                عرض المحادثات
                <BsChatSquareText
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
      </div>

      <div className="flex flex-row items-center justify-center border-t-2 mt-5 border-[#E5E7EB]">
        <Button
          startIcon={<EditIcon />}
          text="تعديل"
          className="!bg-white !flex !flex-row-reverse !text-[#3B73B9] !text-sm !font-medium !gap-1 "
          onClick={() => router.push(`/edit-offer/${id}`)}
        />
        <span className="text-[#D1D5DB]">|</span>
        {inProgress ? (
          <Button
            startIcon={<Rebuild />}
            text="انسحاب"
            className="!bg-white !flex !flex-row-reverse !text-[#3B73B9] !text-sm !font-medium !gap-1 "
            onClick={onUpdate}
          />
        ) : (
          <Button
            startIcon={<UpdateIcon />}
            text="تحديث"
            className="!bg-white !flex !flex-row-reverse !text-[#3B73B9] !text-sm !font-medium !gap-1 "
            onClick={onUpdate}
          />
        )}

        <span className="text-[#D1D5DB]">|</span>

        <Button
          startIcon={<DeleteIcon />}
          text="حذف"
          className="!bg-white flex flex-row-reverse !text-[#F05252] !text-sm !font-medium gap-1 "
          onClick={onDelete}
        />
      </div>
    </div>
  );
};
