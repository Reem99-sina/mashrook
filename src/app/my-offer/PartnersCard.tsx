"use client";
import React from "react";
import {
  PartnerDeveloperNoSellStage,
  PartnerDeveloperStage,
  PartnerOwnStage,
  steps,
} from "@/type/addrealestate";
import {
  Accreditation,
  ChatIconSmall,
  Realestatagenteal,
  Sell,
  Undo,
} from "../assets/svg";
import { Button } from "../components/shared/button.component";
import Cookie from "js-cookie";
import Stepper from "../components/shared/Stepper";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Link from "next/link";
interface PartnersCardProps {
  title?: string;
  date: string;
  count: number;
  onShow?: () => void;
  onRetreat?: () => void;
  inProgress?: boolean;
  active?: boolean;
  expired?: boolean;
  requestNumber: number;
  city: string;
  district: string;
  propertyOwnerType: string;
  budget: string;
  PartnershipNumber: number;
  realEstate: string;
  bidRequestNumber: number;
  partnershipRatio: number;
  purpose: string;
  details_id: number;
  land_details_id: number;
  room_id: number;
  sender_id: number;
  receiver_id: number;
  currentStep: number;
}

export const PartnersCard: React.FC<PartnersCardProps> = ({
  onShow,
  onRetreat,
  title,
  inProgress,
  active,
  expired,
  date,
  requestNumber,
  count,
  city,
  district,
  propertyOwnerType,
  budget,
  PartnershipNumber,
  realEstate,
  bidRequestNumber,
  partnershipRatio,
  purpose,
  details_id,
  land_details_id,
  room_id,
  sender_id,
  receiver_id,
  currentStep,
}) => {
  return (
    <div className="mt-4 w-full border-2  rounded-lg mb-4 flex flex-col p-4">
      <div className="items-center justify-between  flex-row flex relative ">
        <p className="text-xl font-bold text-[#374151] flex-1">{title} </p>

        <Link
          className="items-center justify-center flex border border-[#E5E7EB] p-2 rounded-md gap-1 "
          href={`/ChatPage/${room_id}`}
          onClick={() => {
            if (title) {
              Cookie.set("title", title);
              Cookie.set("senderId", String(sender_id));
              Cookie.set("receiver_id", String(receiver_id));
            }
          }}
        >
          <p className="font-medium text-sm text-[#3B73B9]">عرض المحادثات </p>
          <ChatIconSmall />
          {/* <span className=" flex items-center justify-center p-1 w-4 h-4 absolute left-[-9px] top-[-2px] text-[11px] text-white bg-[#F05252] rounded-full">
            {count}
          </span> */}
        </Link>
      </div>

      <div className="flex gap-2 mt-2">
        <span
          className={`rounded-xl ${
            purpose === "بيع" ? "bg-green-450" : "bg-orange-450"
          }  px-2 py-2 text-xs font-normal text-white`}
        >
          {purpose === "بيع" ? "للبيع" : "للتطوير"}
        </span>
        <span className="rounded-xl bg-[#F3F4F6] px-2 py-2 text-xs font-normaltext-[#6B7280]">
          {propertyOwnerType}
        </span>

        <span className="rounded-xl bg-[#F3F4F6] px-2 py-2 text-xs font-normal text-[#6B7280]">
          {date}
        </span>

        {partnershipRatio != 100 ? (
          <span className="rounded-xl bg-[#F3F4F6] px-2 py-2 text-xs font-normal text-[#6B7280]">
            تحت التقدم{" "}
          </span>
        ) : (
          <span className="rounded-xl bg-[#EAFDE8] px-2 py-2 text-xs font-normal text-[#5CB053]">
            مكتمل
          </span>
        )}
      </div>

      <div className=" mt-2">
        <p className="text-xs text-[#6B7280] font-normal">
          رقم الشراكة : {requestNumber}
        </p>
      </div>

      <div className="gap-1 mt-2 flex flex-col">
        <div className=" flex items-center justify-between bg-[#F3F4F6] rounded-lg p-2">
          <p className="font-normal text-[#6B7280] text-sm">العقار المشروك</p>
          <p className="font-semibold text-sm text-[#374151]">{realEstate}</p>
        </div>

        <div className=" flex items-center justify-between bg-[#F3F4F6] rounded-lg p-2">
          <p className="font-normal text-[#6B7280] text-sm">المدينة</p>
          <p className="font-semibold text-sm text-[#374151]">{city}</p>
        </div>

        <div className=" flex items-center justify-between bg-[#F3F4F6] rounded-lg p-2">
          <p className="font-normal text-[#6B7280] text-sm">الحي </p>
          <p className="font-semibold text-sm text-[#374151]">{district}</p>
        </div>

        <div className=" flex items-center justify-between bg-[#F3F4F6] rounded-lg p-2">
          <p className="font-normal text-[#6B7280] text-sm">
            مبلغ الشراكة المحدد
          </p>
          <span className="bg-[#E5E7EB] flex flex-row gap-1 items-center justify-center p-1 rounded-lg border border-[#F3F4F6]">
            <Sell />
            <p className="font-normal text-xs text-[#6B7280] p-1">{budget}</p>
          </span>
        </div>

        {/* <div className=" flex items-center justify-between bg-[#F3F4F6] rounded-lg p-2">
          <p className="font-normal text-[#6B7280] text-sm">
            أرغب في تمويل عقاري
          </p>
          {finance ? <Accreditation /> : <IoMdCloseCircleOutline color="red" />}
        </div> */}

        <div className=" flex items-center justify-between bg-[#F3F4F6] rounded-lg p-2">
          <p className="font-normal text-[#6B7280] text-sm">نسبة الشراكة </p>
          <span className="rounded-lg bg-[#98CC5D] text-white font-normal text-xs pl-2 pr-2 pt-1 pb-1">
            {" "}
            {partnershipRatio}% من العقار
          </span>
        </div>

        {/* <div className=" flex items-center justify-between bg-[#F3F4F6] rounded-lg p-2">
          <p className="font-normal text-[#6B7280] text-sm">رقم طلب الشراكة </p>
          <p className="font-semibold text-sm text-[#374151]">
            {PartnershipNumber}
          </p>
        </div> */}

        {/* <div className=" flex items-center justify-between bg-[#F3F4F6] rounded-lg p-2">
          <p className="font-normal text-[#6B7280] text-sm"> رقم طلب العرض </p>
          <p className="font-semibold text-sm text-[#374151]">
            {bidRequestNumber}
          </p>
        </div> */}
      </div>

      <div className="p-4">
        <Stepper
          steps={
            purpose === "بيع"
              ? propertyOwnerType == "مالك"
                ? PartnerOwnStage.map((step) => step?.label)
                : PartnerDeveloperStage.map((step) => step?.label)
              : PartnerDeveloperNoSellStage.map((step) => step?.label)
          }
          currentStep={currentStep >= 0 ? currentStep : 0}
        />
      </div>
      <div className="flex items-center justify-center ">
        <p className="text-xs text-[#6B7280] font-semibold">مراحل الشراكة</p>
      </div>

      <div className="flex flex-row items-center justify-center border-t-2 mt-5 border-[#E5E7EB]">
        <Button
          startIcon={<Realestatagenteal />}
          text="عرض العقار"
          className="!bg-white !flex !flex-row-reverse !text-[#3B73B9] !text-sm !font-medium !gap-1 "
          onClick={onShow}
        />
        <span className="text-[#D1D5DB]">|</span>
        <Button
          startIcon={<Undo />}
          text="انسحاب"
          className="!bg-white !flex !flex-row-reverse !text-[#3B73B9] !text-sm !font-medium !gap-1 "
          onClick={onRetreat}
        />
      </div>
    </div>
  );
};
