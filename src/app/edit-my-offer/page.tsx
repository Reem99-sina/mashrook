"use client";

import React, { useRef, useState, useEffect } from "react";
import MainHeader from "../components/header/MainHeader";
import { Button } from "../components/shared/button.component";
import Footer from "../components/header/Footer2";
import InputAreaPrice from "../add-your-real-estate/components/InputAreaPrice";
import NumberRoom from "../add-your-real-estate/components/NumberRoom";
import CheckFeature from "../add-your-real-estate/components/CheckFeature";
import { Modal, ModalRef } from "../components/shared/modal.component";
import { BackButtonOutline, CloseIconSmall, InfoOutLine } from "../assets/svg";
import { useRouter } from "next/navigation";

const cities = [
  {
    id: 1,
    name: "الرياض",
  },
  {
    id: 2,
    name: "الدمام",
  },
  {
    id: 3,
    name: "جدة",
  },
  {
    id: 4,
    name: "تبوك",
  },
  {
    id: 5,
    name: "الطائف",
  },
];

const EditMyOffer = () => {
  const modalRef = useRef<ModalRef>(null);

  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <form className="bg-white flex w-full h-full min-h-screen  flex-col p-5">
      <MainHeader />

      <div
        className="flex items-center justify-center"
        style={{ direction: "rtl" }}
      >
        <div>
          <button onClick={handleBack}>
            <BackButtonOutline />
          </button>
        </div>
        <div className="flex flex-1  items-center justify-center">
          <p className="font-bold text-xl text-[#36343B]">
            تعديل طلب رقم (2022) - دور أرضي
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-5 mt-6">
        <InputAreaPrice title="المساحة" onChange={() => {}} measurement="متر" />

        <InputAreaPrice
          title="السعر"
          onChange={() => {}}
          measurement="ريال"
          desc="(بدون القيمة المضافة والسعي)"
        />

        <NumberRoom
          value={1}
          onChange={() => {}}
          name="rooms_number"
          title={"عدد الغرف"}
          firstNumber={"غرفة"}
          secondNumber={"+10 غرف"}
          max={10}
        />
        <NumberRoom
          value={1}
          onChange={() => {}}
          name="halls_number"
          title={"عدد الصالات"}
          firstNumber={"صالة"}
          secondNumber={"3+ صالات "}
          max={3}
        />
        <NumberRoom
          value={1}
          onChange={() => {}}
          name="bathrooms_number"
          title={"عدد دورات المياه"}
          firstNumber={"دورة مياه"}
          secondNumber={"3+ دورة مياه "}
          max={3}
        />
        <NumberRoom
          value={1}
          onChange={() => {}}
          name="kitchens_number"
          title={" عدد المطابخ"}
          firstNumber={"مطبخ"}
          secondNumber={"3+ مطابخ"}
          max={3}
        />

        <div className="mt-2">
          <div
            className="flex justify-between text-sm mt-2"
            style={{ direction: "rtl" }}
          >
            <p className="font-medium text-base text-[#4B5563]">
              مزايا إضافية:
            </p>
          </div>
          <div
            className=" flex flex-row flex-wrap gap-8"
            style={{ direction: "rtl" }}
          >
            <CheckFeature title="مكيفة" onChange={() => {}} />
            <CheckFeature title="مدخل سيارة" onChange={() => {}} />
            <CheckFeature title="مطبخ راكب" onChange={() => {}} />
            <CheckFeature title="مؤثثة" onChange={() => {}} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4 mt-6">
        <div className="flex items-center justify-end gap-2">
          <p className="text-xs text-[#6B7280] font-bold">
            أوافق على <span className="text-[#98CC5D]">الشروط</span> و
            <span className="text-[#98CC5D]">الأحكام</span> الخاصة بمشروك
          </p>
          <input
            type="checkbox"
            className="h-4 w-4 rounded-2xl accent-[#3B73B9]"
          />
        </div>
        <div className="p-7">
          <Button
            text="حفظ التعديلات"
            onClick={() => modalRef.current?.open()}
          />
        </div>
      </div>

      <Modal ref={modalRef} size="xs">
        <div
          className="items-start flex justify-center flex-col p-4 "
          style={{ direction: "rtl" }}
        >
          <div className="flex flex-row items-center justify-center mb-3  w-full">
            <div
              className="flex flex-1 cursor-pointer "
              onClick={() => modalRef.current?.close()}
            >
              <CloseIconSmall />
            </div>
            <div className="flex  w-full items-center justify-center">
              <p className="font-bold text-base text-[#374151]">تحذير!</p>
            </div>
          </div>

          <div className="border border-[#E5E7EB] w-full mb-4" />

          <div>
            <span>
              <p className="text-base font-normal text-[#4B5563]">
                هل أنت متأكد من رغبتك في تنفيذ اجراء تعديل الطلب رقم (2022) ؟
              </p>
            </span>
            <div className="bg-[#FDE8E8] rounded-md mt-5 mb-5 flex items-center justify-start p-1 flex-row gap-1 ">
              <InfoOutLine />
              <p className="font-medium text-[10px] text-[#4B5563]">
                في حال قمت بتعديل الطلب سيتم حذف البيانات المتعلقة بالطلب بما في
                ذلك شراكة قد قمت بها من خلال الطلب و مراحل الطلب
              </p>
            </div>
          </div>

          <div className="border border-[#E5E7EB] w-full mb-4" />

          <div className="flex flex-row items-center justify-center gap-3  w-full">
            <Button
              text=" تعديل"
              onClick={() => modalRef.current?.close()}
              className="!text-xs !font-medium"
            />
            <Button
              text="الغاء"
              onClick={() => modalRef.current?.close()}
              className="!bg-white !text-[#1F2A37] !border !border-[#E5E7EB] !rounded-lg !text-xs !font-medium"
            />
          </div>
        </div>
      </Modal>

      <footer className="w-full bg-white p-5">
        <Footer />
      </footer>
    </form>
  );
};
export default EditMyOffer;
