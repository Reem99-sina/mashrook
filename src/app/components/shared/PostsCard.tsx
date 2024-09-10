import React from "react";
import { Button } from "./button.component";
import { RotateRealEstate, RotateRight } from "@/app/assets/svg";

interface PostsCardProps {
  type: string;
  status: string;
  id: number;
  requestNumber: number;
  announcementDate: string;
  announcementStatus: string;
  active?: string;
  onRenew: () => void;
  onViewProperty: () => void;
}

const PostsCard: React.FC<PostsCardProps> = ({
  type,
  status,
  active,
  id,
  requestNumber,
  announcementDate,
  announcementStatus,
  onRenew,
  onViewProperty,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-sm border border-[#E5E7EB] mb-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">{type}</h3>
      </div>

      <div className="flex flex-row  items-center gap-2">
        <span
          className={`px-3 py-1 rounded-xl text-xs font-normal text-white ${
            status === "للبيع" ? "bg-[#98CC5D]" : "bg-gray-400"
          }`}
        >
          {status}
        </span>
        <span
          className={`px-3 py-1 rounded-xl text-xs font-normal text-white ${
            active === "تمت الشراكة"
              ? "!bg-[#EAFDE8] !text-[#5CB053] !text-xs !font-normal"
              : "!bg-[#F3F4F6] !text-[#6B7280] !text-xs !font-normal"
          }`}
        >
          {active}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between  bg-[#F3F4F6] rounded-lg p-2">
          <span className="text-gray-600">رقم الإعلان</span>
          <span className="text-[#374151]">{id}</span>
        </div>
        <div className="flex justify-between  bg-[#F3F4F6] rounded-lg p-2">
          <span className="text-gray-600">رقم الطلب</span>
          <span className="text-[#374151]">{requestNumber}</span>
        </div>
        <div className="flex justify-between  bg-[#F3F4F6] rounded-lg p-2">
          <span className="text-gray-600">تاريخ الإعلان</span>
          <span className="text-[#374151]">{announcementDate}</span>
        </div>
        <div className="flex justify-between  bg-[#F3F4F6] rounded-lg p-2">
          <span className="text-gray-600">حالة الإعلان</span>
          <span
            className={
              announcementStatus === "سند دفع غير مقبول" ||
              announcementStatus === "منتهي"
                ? "text-[#F05252] bg-[#FDE8E8] rounded-xl px-3 text-xs font-normal items-center flex"
                : "text-[#FF8A4C] bg-[#FEECDC] rounded-xl px-3 text-xs font-normal "
            }
          >
            {announcementStatus}
          </span>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center  border-t">
        <Button
          text="عرض العقار"
          onClick={onRenew}
          startIcon={<RotateRealEstate />}
          className="!bg-white !text-[#3B73B9] !flex-row-reverse !flex !gap-2"
        />
        <p className="text-[#9CA3AF]">|</p>
        <Button
          text="تجديد"
          startIcon={<RotateRight />}
          onClick={onViewProperty}
          className="bg-white !text-[#9CA3AF] !flex-row-reverse !flex !gap-2"
        />
      </div>
    </div>
  );
};

export default PostsCard;
