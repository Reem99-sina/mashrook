"use client";
import React, { useRef } from "react";
import { TextInput } from "../components/shared/text-input.component";
import {
  CloseIconSmall,
  Filter,
  InfoOutLine,
  PartnersIcon,
  Search,
} from "../assets/svg";
import Pagination from "../components/shared/pagination";

import FilterDropdown from "../components/shared/FilterDropdown";
import { PartnersCard } from "./PartnersCard";
import { Modal, ModalRef } from "../components/shared/modal.component";
import { Button } from "../components/shared/button.component";

const data = [
  {
    title: "ارض سكنية - قطعة رقم 1256",
    inProgress: true,
    date: "2024-4-23",
    requestNumber: 2020,
    count: 8,
    city: "الرياض",
    district: "المروج,البطحاء",
    budget: "300,000 ريال",
    PartnershipNumber: 2020,
    realEstate: "قطعة رقم 1256",
    bidRequestNumber: 2020,
    partnershipRatio: 50,
  },
  {
    title: "ارض سكنية - قطعة رقم 1256",
    date: "2024-4-23",
    requestNumber: 2020,
    count: 8,
    city: "الرياض",
    district: "المروج,البطحاء",
    budget: "300,000 ريال",
    PartnershipNumber: 2020,
    realEstate: "قطعة رقم 1256",
    bidRequestNumber: 2020,
    partnershipRatio: 50,
  },
];

export const GitMyPartners = () => {
  const handleSelect = (option: string) => {
    console.log("Selected:", option);
  };

  const modalRef = useRef<ModalRef>(null);

  return (
    <div className="p-4 bg-white">
      <div className="flex flex-row items-center justify-center gap-2">
        <TextInput inputProps={{ placeholder: "بحث" }} icon={<Search />} />
        <span className="border border-[#E5E7EB] rounded-lg p-3">
          <Filter />
        </span>
        <span>
          <FilterDropdown
            options={[
              "الأحدث الى الأقدم",
              "الأقدم الى الأحدث",
              " الميزانية ( الأدنى الى الأعلى)",
              "الميزانية ( الأعلى الى الأدنى)",
            ]}
            onSelect={handleSelect}
          />
        </span>
      </div>

      <div className="mt-5 mb-5 flex flex-row gap-2">
        <span className="rounded-md border border-[#E5E7EB] text-sm font-normal text-[#6B7280] pl-3 pr-3 pt-1 pb-1">
          تحت التقدم
        </span>

        <span className="rounded-md border border-[#E5E7EB] text-sm font-normal text-[#6B7280] pl-3 pr-3 pt-1 pb-1">
          مكتملة
        </span>
      </div>

      <div>
        {data.length > 0 ? (
          <div>
            <div>
              {data.map((offer, index) => (
                <PartnersCard
                  key={index}
                  title={offer.title}
                  count={offer.count}
                  date={offer.date}
                  requestNumber={offer.requestNumber}
                  city={offer.city}
                  district={offer.district}
                  budget={offer.budget}
                  PartnershipNumber={offer.PartnershipNumber}
                  inProgress={offer.inProgress}
                  realEstate={offer.realEstate}
                  bidRequestNumber={offer.bidRequestNumber}
                  partnershipRatio={offer.partnershipRatio}
                  onRetreat={() => modalRef.current?.open()}
                />
              ))}
            </div>

            <Modal ref={modalRef} size="xs">
              <div
                className="items-start flex justify-center flex-col p-4 "
                style={{ direction: "rtl" }}
              >
                <div className="flex flex-row items-center justify-center mb-3  w-full">
                  <div className="flex flex-1">
                    <CloseIconSmall />{" "}
                  </div>
                  <div className="flex  w-full items-center justify-center">
                    <p className="font-bold text-base text-[#374151]">تحذير!</p>
                  </div>
                </div>

                <div className="border border-[#E5E7EB] w-full mb-4" />

                <div>
                  <span>
                    <p className="text-base font-normal text-[#4B5563]">
                      هل أنت متأكد من رغبتك في تنفيذ الانسحاب من الطلب رقم
                      (2022)؟
                    </p>
                  </span>
                  <div className="bg-[#FDE8E8] rounded-md mt-5 mb-5 flex items-center justify-start p-1 flex-row gap-1 ">
                    <InfoOutLine />
                    <p className="font-medium text-[10px] text-[#4B5563]">
                      في حال قمت بالانسحاب من الطلب لن يتم ارجاع رسوم الخدمة
                      المدفوعة
                    </p>
                  </div>
                </div>

                <div className="border border-[#E5E7EB] w-full mb-4" />

                <div className="flex flex-row items-center justify-center gap-3  w-full">
                  <Button
                    text="تأكيد الانسحاب"
                    onClick={() => modalRef.current?.close()}
                    className="!text-xs !font-medium"
                  />
                  <Button
                    text="الغاء"
                    onClick={() => modalRef.current?.close()}
                    className="!bg-[#E5E7EB] !text-[#1F2A37] !text-xs !font-medium"
                  />
                </div>
              </div>
            </Modal>

            <div>
              <Pagination pageCount={4} onPageChange={() => {}} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-9 w-full">
            <PartnersIcon />
            <p className="font-medium text-3xl text-[#6B7280] mt-6">
              لا شيء هنا!
            </p>
            <p className="text-base font-normal text-[#9CA3AF] mt-3">
              لا توجد لديك شراكات لعرضها{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
