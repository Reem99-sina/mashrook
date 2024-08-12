"use client";

import React, { useRef, useState } from "react";
import { AddButton, CloseIconSmall, Succeeded } from "../assets/svg";
import { RadioInput } from "../components/shared/radio.component";
import { Button } from "../components/shared/button.component";
import { Modal, ModalRef } from "../components/shared/modal.component";
import Footer from "../components/header/Footer2";
import MainHeader from "../components/header/MainHeader";
import { useRouter } from "next/navigation";
import { TextInput } from "../components/shared/text-input.component";

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

const dataa = [
  {
    id: 1,
    tattle: "صفة مقدم العرض",
    option: ["مالك", "مطور عقاري", "وسيط عقاري"],
  },
  {
    id: 2,
    tattle: "الغرض من عرض العقار",
    option: ["بيع", "تطوير (شراكة برأس المال أو البناء)"],
  },
  {
    id: 3,
    tattle: "نوع العقار",
    option: ["أرض سكنية", "أرض تجارية", "فيلا", "دور", "شقة"],
  },
];
const AddYourRealEstate: React.FC = () => {
  const modalRef = useRef<ModalRef>(null);

  const [sentYourRequest, setSentYourRequest] = useState<boolean>(false);

  const [selectedPropertyType, setSelectedPropertyType] = useState("");

  const handleOptionChange = (option: any) => {
    setSelectedPropertyType(option);
  };

  const onSubmit = () => {
    setSentYourRequest(true);
  };
  const router = useRouter();

  const [partnershipPercentage, setPartnershipPercentage] = useState(0);

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPartnershipPercentage(Number(e.target.value));
  };
  const tooltipRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {!sentYourRequest ? (
        <form className="flex flex-col items-center min-h-screen h-full w-full bg-[url('/background-cover.png')] bg-cover">
          <MainHeader />
          <div className="p-4">
            <p className="text-2xl font-medium text-[#374151]">أضف عقارك</p>
          </div>
          <div className="p-4 w-full flex gap-4 flex-col">
            <div>
              {dataa.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4"
                >
                  <div className="flex items-center justify-end">
                    <p className="text-base font-bold text-[#4B5563]">
                      {item.tattle}
                    </p>
                  </div>
                  <div className="flex flex-row flex-wrap justify-end mt-6 gap-8">
                    {item.option.map((option, index) => (
                      <RadioInput
                        key={index}
                        name={`ownershipType_${item.id}`}
                        onChange={() => handleOptionChange(option)}
                        value={option}
                        label={option}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {selectedPropertyType === "شقة" && (
              <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4 mt-4">
                <div className="flex items-center justify-end">
                  <p className="text-base font-bold text-[#4B5563]">
                    نوع الشقة
                  </p>
                </div>
                <div className="flex flex-row flex-wrap justify-end mt-6 gap-8">
                  <div className="mb-4">
                    <RadioInput
                      name="ownershipType"
                      onChange={() => {}}
                      value="شقة (داخل عمارة سكنية)"
                      label="شقة (داخل عمارة سكنية) "
                    />
                    <RadioInput
                      name="ownershipType"
                      onChange={() => {}}
                      value="شقة (داخل فيلا) "
                      label=" شقة (داخل فيلا)"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedPropertyType === "دور" && (
              <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4 mt-4">
                <div className="flex items-center justify-end">
                  <p className="text-base font-bold text-[#4B5563]">
                    نوع الدور
                  </p>
                </div>
                <div className="flex flex-row flex-wrap justify-end mt-6 gap-8">
                  <div className="mb-4">
                    <RadioInput
                      name="ownershipType"
                      onChange={() => {}}
                      value="دور أرضي"
                      label="دور أرضي"
                    />
                    <RadioInput
                      name="ownershipType"
                      onChange={() => {}}
                      value="دور علوي"
                      label=" دور علوي"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedPropertyType === "فيلا" && (
              <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4 mt-4">
                <div className="flex items-center justify-end">
                  <p className="text-base font-bold text-[#4B5563]">
                    نوع الفيلا
                  </p>
                </div>
                <div className="flex flex-row flex-wrap justify-end mt-6 gap-8">
                  <div className="mb-4">
                    <RadioInput
                      name="ownershipType"
                      onChange={() => {}}
                      value="فيلا (درج داخلي + شقة) "
                      label="فيلا (درج داخلي + شقة) "
                    />
                    <RadioInput
                      name="ownershipType"
                      onChange={() => {}}
                      value="فيلا (وحدات تمليك) "
                      label=" فيلا (وحدات تمليك) "
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
              <div className="flex items-center justify-end">
                <p className="text-base font-bold text-[#4B5563]">
                  {" "}
                  موقع العقار{" "}
                </p>
              </div>
              <div className="flex items-end gap-2 justify-end flex-row mt-5">
                <div className="flex flex-col items-end gap-2 justify-end w-full">
                  <p className="text-base font-medium text-[#4B5563]">الحي</p>
                  <select className="border w-full text-right  border-[#D1D5DB] rounded-lg">
                    {cities.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col items-end gap-2 justify-end  w-full">
                  <p className="text-base font-medium text-[#4B5563]">
                    المدينة
                  </p>
                  <select className="border w-full text-right  border-[#D1D5DB] rounded-lg">
                    {cities.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-end gap-2 justify-end flex-row mt-5">
                <p className="text-sm text-[#3B73B9] font-bold">إضافة الموقع</p>
                <AddButton
                  onClick={() => modalRef.current?.open()}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex items-end gap-2 justify-end flex-col mt-5">
                <p className="text-base text-[#4B5563] font-medium">
                  رقم المخطط{" "}
                </p>
                <TextInput
                  inputProps={{ placeholder: "-- الرجاء الادخال --" }}
                />
              </div>
            </div>
            <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
              <div className="flex items-center justify-end">
                <p className="text-base font-bold text-[#4B5563]">
                  تفاصيل وسعر العقار{" "}
                </p>
              </div>
              {selectedPropertyType === "فيلا" && (
                <>
                  <div>
                    <div
                      className="flex justify-between text-sm mt-2"
                      style={{ direction: "rtl" }}
                    >
                      <p className="font-medium text-base text-[#4B5563]">
                        عدد الغرف
                      </p>
                    </div>
                    <div
                      className="flex justify-between text-sm mt-2"
                      style={{ direction: "rtl" }}
                    >
                      <span>غرفة</span>
                      <span>+10 غرف</span>
                    </div>

                    <div className="relative" style={{ direction: "rtl" }}>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={partnershipPercentage}
                        onChange={handlePercentageChange}
                        className="w-full"
                        dir="rtl"
                      />
                      <div
                        ref={tooltipRef}
                        className="absolute -top-6 left-0 bg-blue-450 text-white text-xs px-3 py-1 rounded-full"
                      >
                        {partnershipPercentage}غرف
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <div
                      className="flex justify-between text-sm mt-2"
                      style={{ direction: "rtl" }}
                    >
                      <p className="font-medium text-base text-[#4B5563]">
                        عدد الصالات
                      </p>
                    </div>
                    <div
                      className="flex justify-between text-sm mt-2"
                      style={{ direction: "rtl" }}
                    >
                      <span>صالة</span>
                      <span>3+ صالات </span>
                    </div>

                    <div className="relative" style={{ direction: "rtl" }}>
                      <input
                        type="range"
                        min="1"
                        max="3"
                        // value={partnershipPercentage}
                        onChange={handlePercentageChange}
                        className="w-full"
                        dir="rtl"
                      />
                      <div
                        ref={tooltipRef}
                        className="absolute -top-6 left-0 bg-blue-450 text-white text-xs px-3 py-1 rounded-full"
                      >
                        {partnershipPercentage}صالات
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <div
                      className="flex justify-between text-sm mt-2"
                      style={{ direction: "rtl" }}
                    >
                      <p className="font-medium text-base text-[#4B5563]">
                        عدد دورات المياه
                      </p>
                    </div>
                    <div
                      className="flex justify-between text-sm mt-2"
                      style={{ direction: "rtl" }}
                    >
                      <span>دورة مياه</span>
                      <span>+5 دورة مياه </span>
                    </div>

                    <div className="relative" style={{ direction: "rtl" }}>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        // value={partnershipPercentage}
                        onChange={handlePercentageChange}
                        className="w-full"
                        dir="rtl"
                      />
                      <div
                        ref={tooltipRef}
                        className="absolute -top-6 left-0 bg-blue-450 text-white text-xs px-3 py-1 rounded-full"
                      >
                        {partnershipPercentage}دورة مياه
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <div
                      className="flex justify-between text-sm mt-2"
                      style={{ direction: "rtl" }}
                    >
                      <p className="font-medium text-base text-[#4B5563]">
                        عدد المطابخ
                      </p>
                    </div>
                    <div
                      className="flex justify-between text-sm mt-2"
                      style={{ direction: "rtl" }}
                    >
                      <span>مطبخ </span>
                      <span>+3 مطابخ </span>
                    </div>

                    <div className="relative" style={{ direction: "rtl" }}>
                      <input
                        type="range"
                        min="1"
                        max="3"
                        // value={partnershipPercentage}
                        onChange={handlePercentageChange}
                        className="w-full"
                        dir="rtl"
                      />
                      <div
                        ref={tooltipRef}
                        className="absolute -top-6 left-0 bg-blue-450 text-white text-xs px-3 py-1 rounded-full"
                      >
                        {partnershipPercentage}مطبخ
                      </div>
                    </div>
                  </div>

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
                      <div
                        style={{ direction: "rtl" }}
                        className="flex flex-row gap-2 items-center mt-2 mb-2"
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded-2xl accent-[#3B73B9]"
                        />
                        <p>مسبح</p>
                      </div>

                      <div
                        style={{ direction: "rtl" }}
                        className="flex flex-row gap-2 items-center mt-2 mb-2"
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded-2xl accent-[#3B73B9]"
                        />
                        <p>كراج للسيارات</p>
                      </div>

                      <div
                        style={{ direction: "rtl" }}
                        className="flex flex-row gap-2 items-center mt-2 mb-2"
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded-2xl accent-[#3B73B9]"
                        />
                        <p>غرفة خدم</p>
                      </div>

                      <div
                        style={{ direction: "rtl" }}
                        className="flex flex-row gap-2 items-center mt-2 mb-2"
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded-2xl accent-[#3B73B9]"
                        />
                        <p>مؤثثة</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="mb-4" style={{ direction: "rtl" }}>
                <div className="mb-4">
                  <label className="block mb-2 font-medium mt-2">
                    رقم القطعة{" "}
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="-- الرجاء الادخال --"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">المساحة </label>
                  <div className="flex items-center ">
                    <input
                      type="text"
                      className="  p-2 border border-gray-300 rounded-r-lg w-full "
                      placeholder="-- الرجاء الادخال --"
                    />
                    <span className="bg-blue-450 text-white  py-2 px-4  rounded-l-lg border-2 border-r-0">
                      متر
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">
                    السعر (بدون القيمة المضافة والسعي){" "}
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-r-lg"
                      placeholder="-- الرجاء الادخال --"
                    />
                    <span className="bg-blue-450 text-white py-2 px-4 rounded-l-lg border-2 border-r-0">
                      ريال
                    </span>
                  </div>
                </div>
                <div className="flex gap-2  flex-row mt-5">
                  <AddButton className="cursor-pointer" />
                  <p className="text-sm text-[#3B73B9] font-bold">
                    إضافة عقار اخر
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
              <div className="flex items-center justify-end">
                <p className="text-base font-bold text-[#4B5563]">
                  هل العقار قابل للتجزئة؟
                </p>
              </div>
              <div className="flex flex-row justify-end mt-6 gap-8">
                <RadioInput
                  name="ownershipType"
                  onChange={() => {}}
                  value="نعم"
                  label="نعم"
                />
                <RadioInput
                  name="ownershipType"
                  onChange={() => {}}
                  value="لا"
                  label="لا"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
              <div className="flex items-center justify-end">
                <p className="text-base font-bold text-[#4B5563]">المرفقات</p>
              </div>
              <div className="flex flex-row justify-end mt-6 gap-8">
                <div className="flex gap-2  flex-row mt-5">
                  <p className="text-sm text-[#3B73B9] font-bold">
                    أضف صورة / صور
                  </p>
                  <AddButton className="cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
              <div className="flex items-center justify-end">
                <p className="text-base font-bold text-[#4B5563]">
                  هل تملك رقم معلن؟
                </p>
              </div>
              <div className="flex flex-row justify-end mt-6 gap-8">
                <RadioInput
                  name="mortgage"
                  onChange={() => {}}
                  value="نعم"
                  label="نعم"
                />
                <RadioInput
                  name="mortgage"
                  onChange={() => {}}
                  value="لا"
                  label="لا"
                />
              </div>
              <div className="mb-4" style={{ direction: "rtl" }}>
                <label className="block mb-2 font-medium mt-2">
                  رقم الإعلان{" "}
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="-- الرجاء الادخال --"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
              <div className="flex items-center justify-end gap-2">
                <p className="text-xs text-[#6B7280] font-bold">
                  أوافق على{" "}
                  <span
                    className="text-[#98CC5D]"
                    onClick={() => modalRef.current?.open()}
                  >
                    الشروط
                  </span>{" "}
                  و<span className="text-[#98CC5D]">الأحكام</span> الخاصة بمشروك
                </p>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded-2xl accent-[#3B73B9]"
                />
              </div>
              <div className="p-7">
                <Button text="إضافة العقار" onClick={onSubmit} />
              </div>
            </div>
          </div>

          <div>
            <Modal ref={modalRef} size="xl">
              <div className="items-start flex justify-center flex-col p-4">
                <div className="flex flex-row items-center justify-center gap-3  w-full">
                  <Button
                    text="الغاء"
                    onClick={() => modalRef.current?.close()}
                    className="!bg-[#E5E7EB] !text-[#1F2A37]"
                  />
                  <Button
                    text="حفظ"
                    onClick={() => modalRef.current?.close()}
                  />
                </div>
              </div>
            </Modal>
          </div>

          <footer className="w-full bg-white p-5">
            <Footer />
          </footer>
        </form>
      ) : (
        <div className="flex flex-col items-center min-h-screen h-full w-full bg-white">
          <MainHeader />
          <div className="flex items-center justify-center flex-col border border-[#F3F4F6] rounded-lg p-3 mb-6 w-4/5 shadow-sm">
            <Succeeded />
            <p className="font-bold text-xl text-[#1F2A37] mt-4 mb-4">
              تم بنجاح إضافة طلب شراكة عقار
            </p>
            <div className=" flex mb-auto bg-[#F3F4F6] rounded-lg justify-center items-center w-24 h-6">
              <p className="text-[#6B7280] text-xs font-normal">
                رقم الطلب: 2022
              </p>
            </div>
          </div>
          <div className="w-4/5 mb-28  ">
            <Button text="الذهاب الى طلباتي" />
            <Button
              text="العودة الى الرئيسية"
              className="!text-[#3B73B9] !bg-white !border !border-[#3B73B9] rounded !mt-5"
              onClick={() => {
                router.push("/");
              }}
            />
          </div>
          <Footer />
          {/*  */}
        </div>
      )}
    </>
  );
};

export default AddYourRealEstate;
