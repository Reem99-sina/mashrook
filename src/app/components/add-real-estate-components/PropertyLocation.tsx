/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { Add } from "@/app/assets/svg";

interface PropertyLocationProps {
  dataSend: {
    city: string;
    district: string;
    address: string;
    lat: number;
    long: number;
  };
  setDataSend: React.Dispatch<
    React.SetStateAction<{
      city: string;
      district: string;
      address: string;
      lat: number;
      long: number;
    }>
  >;
  city: Array<{ id: number; nameAr: string }>;
  district: Array<{ id: number; name: string }>;
  errors: {
    city?: string;
    district?: string;
    address?: string;
    lat?: string;
    long?: string;
  };
  modalRef: React.RefObject<any>;
}

const PropertyLocation: React.FC<PropertyLocationProps> = ({
  dataSend,
  setDataSend,
  city,
  district,
  errors,
  modalRef,
}) => {
  return (
    <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
      <div className="flex items-center justify-end">
        <p className="text-base font-bold text-[#4B5563]">موقع العقار</p>
      </div>
      <div className="flex items-end gap-2 justify-end flex-row mt-5">
        <div className="flex flex-col items-end gap-2 justify-end w-full">
          <p className="text-base font-medium text-[#4B5563]">الحي</p>
          <select
            className="border w-full text-right  border-[#D1D5DB] rounded-lg "
            onChange={(event) =>
              setDataSend({
                ...dataSend,
                district: event?.target?.value,
              })
            }
          >
            {district?.map((cityItem) => (
              <option key={cityItem?.id} value={cityItem?.name}>
                {cityItem?.name}
              </option>
            ))}
          </select>
          {errors?.district && (
            <p className="text-xs text-red-600 dark:text-red-500 text-right">
              {errors?.district}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2 justify-end  w-full">
          <p className="text-base font-medium text-[#4B5563]">المدينة</p>
          <select
            className="border w-full text-right  border-[#D1D5DB] rounded-lg"
            onChange={(event) =>
              setDataSend({ ...dataSend, city: event?.target?.value })
            }
          >
            {city?.map((cit) => (
              <option key={cit.id} value={cit?.nameAr}>
                {cit?.nameAr}
              </option>
            ))}
          </select>
          {errors?.city && (
            <p className="text-xs text-red-600 dark:text-red-500 text-right">
              {errors?.city}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-end gap-2 justify-end flex-row mt-5">
        <p className="text-sm text-[#3B73B9] font-bold">إضافة الموقع</p>
        <div
          onClick={() => modalRef.current?.open()}
          className="cursor-pointer bg-[#3B73B9]"
        >
          <Image src={Add} width={21} height={21} alt={"add"} />
        </div>
      </div>
      {(errors?.address || errors?.lat || errors?.long) && (
        <p className="text-xs text-red-600 dark:text-red-500 text-right">
          {errors?.address || errors?.lat || errors?.long}
        </p>
      )}
    </div>
  );
};

export default PropertyLocation;
