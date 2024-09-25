"use client";
import React from "react";
import {
  Accreditation,
  ChatIconSmall,
  DeleteIcon,
  EditIcon,
  OtherOffer,
  UpdateIcon,
  Rebuild,
} from "../assets/svg";
import {
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { Button } from "../components/shared/button.component";
import Stepper from "../components/shared/Stepper";
import Link from "next/link"
interface ChatCardProps {
  title: string;
  date: string;
  count: number;
  onEdit?: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
  onRetreating?: () => void;
  inProgress?: boolean;
  active?: boolean;
  expired?: boolean;
  requestNumber: number;
  city: string;
  district: string;
  budget: string;
  type: string;
  finance: boolean;
  alternativeCount: number
}

export const MyOrdersCard: React.FC<ChatCardProps> = ({
  onEdit,
  onUpdate,
  onDelete,
  onRetreating,
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
  finance,
  alternativeCount
}) => {
  const steps = ["التعبئة", "الإفراغ", "الإرسال"];
  const currentStep = 1;

  return (
    <div className="mt-4 w-full border-2  rounded-lg mb-4 flex flex-col p-4">
      <div className="items-center justify-between  flex-row flex relative">
        <p className="text-xl font-bold text-[#374151]">{title} </p>


        <Link className="items-center justify-center flex border border-[#E5E7EB] p-2 rounded-md gap-1 " href={`/my-offer/otherOffer/${requestNumber}`}>
          <p className="font-medium text-sm text-[#3B73B9]">عروض بديله</p>
          <OtherOffer />
          <span className=" flex items-center justify-center p-1 w-4 h-4 absolute left-[-9px] top-[-2px] text-[11px] text-white bg-[#F05252] rounded-full">
            {alternativeCount}
          </span>
        </Link>

      </div>
      <div className="flex gap-2 mt-2">
        <span className="rounded-xl bg-[#F3F4F6] pl-2 pr-2 pt-[2px] pb-[2px] text-xs font-normal text-[#6B7280]">
          {date}
        </span>

        {/* {inProgress ? (
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
        )} */}
      </div>

      <div className=" mt-2">
        <p className="text-xs text-[#6B7280] font-normal">
          رقم الطلب: {requestNumber}
        </p>
      </div>

      <div className="gap-1 mt-2 flex flex-col">
        <div className=" flex items-center justify-between bg-[#F3F4F6] rounded-lg p-2">
          <p className="font-normal text-[#6B7280] text-sm">المدينة</p>
          <p className="font-semibold text-sm text-[#374151]">{city}</p>
        </div>

        <div className=" flex items-center justify-between bg-[#F3F4F6] rounded-lg p-2">
          <p className="font-normal text-[#6B7280] text-sm">الاحياء </p>
          <p className="font-semibold text-sm text-[#374151]">{district}</p>
        </div>

        <div className=" flex items-center justify-between bg-[#F3F4F6] rounded-lg p-2">
          <p className="font-normal text-[#6B7280] text-sm">ميزانيتك</p>
          <p className="font-semibold text-sm text-[#374151]">{budget}</p>
        </div>

        <div className=" flex items-center justify-between bg-[#F3F4F6] rounded-lg p-2">
          <p className="font-normal text-[#6B7280] text-sm">نوع التملك</p>
          <p className="font-semibold text-sm text-[#374151]">{type}</p>
        </div>

        <div className=" flex items-center justify-between bg-[#F3F4F6] rounded-lg p-2">
          <p className="font-normal text-[#6B7280] text-sm">
            أرغب في تمويل عقاري
          </p>
          {finance ? <Accreditation /> : <IoMdCloseCircleOutline color="red" />}
        </div>
      </div>


      <div className="flex flex-row items-center justify-center border-t-2 mt-5 border-[#E5E7EB]">
        <Button
          startIcon={<EditIcon />}
          text="تعديل"
          className="!bg-white !flex !flex-row-reverse !text-[#3B73B9] !text-sm !font-medium !gap-1 "
          onClick={onEdit}
        />
        <span className="text-[#D1D5DB]">|</span>

        <Button
          startIcon={<UpdateIcon />}
          text="تحديث"
          className="!bg-white !flex !flex-row-reverse !text-[#3B73B9] !text-sm !font-medium !gap-1 "
          onClick={onUpdate}
        />


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
