"use client";

import React, { useRef, useState } from "react";
import MainHeader from "../components/header/MainHeader";
import { Button } from "../components/shared/button.component";
import Footer from "../components/header/Footer2";
import { RadioInput } from "../components/shared/radio.component";
import { AddButton, CloseIconSmall, InfoOutLine } from "../assets/svg";
import { Range, getTrackBackground } from "react-range";
import { Modal, ModalRef } from "../components/shared/modal.component";

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

const EditMyOrderBadge = () => {
  const [criteria, setCriteria] = useState<any>({
    dealStatus: "",
    city: "",
    district: null,
    unitType: 0,
    unitStatus: "",
    priceRange: [500000, 20000000],
    shareRange: [1000000, 2000000],
    desiredRow: [1, 1],
    floorType: "",
  });

  const handleShareRangeChange = (values: number[]) => {
    setCriteria({ ...criteria, shareRange: values });
  };
  const modalRef = useRef<ModalRef>(null);

  const data = [
    {
      id: 1,
      title: "نوع العقار",
      option: ["أرض سكنية", "أرض تجارية", "فيلا", "دور", "شقة"],
    },
    {
      id: 2,
      title: "نوع الفيلا",
      option: [
        "فيلا ( درج داخلي+ شقة)",
        "فيلا (وحدات تمليك)",
        "فيلا ( درج داخلي)",
      ],
    },
    {
      id: 3,
      title: "موقع العقار",
      copmonent: (
        <div style={{ direction: "rtl" }}>
          <div className="mt-5 mb-2">
            <p>المدينة</p>
            <select className="border w-full text-right  border-[#D1D5DB] rounded-lg">
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            <div className="flex flex-row gap-1 mt-4">
              <AddButton fill="#3B73B9" />
              <p className="text-[#3B73B9] font-bold text-sm">
                إضافة حي/ أحياء
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: "حالة العقار ",
      option: ["جديد", "مستخدم", "أي"],
      copmonent: (
        <>
          <div className="flex items-center justify-end">
            <p className="text-base font-bold text-[#4B5563]">ميزانيتك </p>
          </div>
          <div className="mb-4" style={{ direction: "rtl" }}>
            <div className="flex flex-col">
              <div className="flex justify-between mb-2 text-sm text-gray-500 w-full p-4">
                <span>500,000 ريال</span>
                <span>+20,000,000 ريال </span>
              </div>
              <Range
                step={500000}
                min={500000}
                max={20000000}
                values={criteria.shareRange}
                onChange={handleShareRangeChange}
                rtl
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: "36px",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: "5px",
                        width: "100%",
                        borderRadius: "4px",
                        background: getTrackBackground({
                          values: criteria.shareRange,
                          colors: ["#ccc", "#548BF4", "#ccc"],
                          min: 1000000,
                          max: 20000000,
                          rtl: true,
                        }),
                        alignSelf: "center",
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ index, props }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "20px",
                      width: "20px",
                      borderRadius: "50%",
                      backgroundColor: "#548BF4",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 2px 6px #AAA",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-28px",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "12px",
                        fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
                        padding: "4px",
                        borderRadius: "4px",
                        backgroundColor: "#548BF4",
                      }}
                    >
                      {criteria.shareRange[index]}ريال
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </>
      ),
    },
    {
      id: 5,
      title: "هل ترغب في تمويل عقاري؟",
      option: ["نعم", "لا"],
    },
  ];

  return (
    <form className="bg-white flex w-full h-full min-h-screen  flex-col p-5">
      <MainHeader />
      <div className="flex items-center justify-center">
        <p className="text-xl font-bold text-[#36343B]">تعديل طلب رقم (2022)</p>
      </div>

      <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4 mt-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4 mt-6"
          >
            <h2 className="text-lg font-bold text-[#333] mb-2 flex justify-end">
              {item.title}
            </h2>
            {item.option && (
              <div className="flex flex-row justify-end  flex-wrap">
                {item.option.map((option, index) => (
                  <RadioInput key={index} label={option} />
                ))}
              </div>
            )}
            {item.copmonent}
          </div>
        ))}
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
export default EditMyOrderBadge;
