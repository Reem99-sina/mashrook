"use client";

import React, { useRef, useState } from "react";
import { AddButton, CloseIconSmall, Succeeded } from "../assets/svg";
import { RadioInput } from "../components/shared/radio.component";
import { Button } from "../components/shared/button.component";
import { Modal, ModalRef } from "../components/shared/modal.component";
import Footer from "../components/header/Footer2";
import MainHeader from "../components/header/MainHeader";
import { Range, getTrackBackground } from "react-range";
import { useRouter } from "next/navigation";

const data = [
  {
    title: "نوع العقار",
    children: ["أرض سكنية", "أرض تجارية", "فيلا", "دور", "شقة"],
  },
];
const cites = [
  { id: 1, name: "حي النرجس" },
  { id: 2, name: "حي العليا" },
  { id: 3, name: "حي المروج" },
  { id: 4, name: "حي العارض" },
  { id: 5, name: "حي الصحافة" },
  { id: 6, name: "حي الندى" },
  {
    id: 7,
    name: "حي الندى ",
  },
  {
    id: 8,
    name: "حي النرجس",
  },
  {
    id: 9,
    name: "حي العليا",
  },
  {
    id: 10,
    name: "حي المروج",
  },
  {
    id: 11,
    name: "حي العارض",
  },
  {
    id: 12,
    name: "حي الصحافة ",
  },
  {
    id: 13,
    name: "حي الندى ",
  },
];
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
const AddYourRequest: React.FC = () => {
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("");
  const [selectedCites, setSelectedCites] = useState<
    { id: number; name: string }[]
  >([]);
  const modalRef = useRef<ModalRef>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [criteria, setCriteria] = useState<any>({
    dealStatus: "",
    city: "",
    district: "",
    unitType: "",
    unitStatus: "",
    priceRange: [500000, 20000000],
    shareRange: [1000000, 2000000],
  });

  const [sentYourRequest, setSentYourRequest] = useState<boolean>(false);

  const handlePropertyTypeChange = (value: string) => {
    setSelectedPropertyType(value);
  };

  const handleCiteChange = (cite: { id: number; name: string }) => {
    setSelectedCites((prevSelectedCites) => {
      if (prevSelectedCites.some((c) => c.id === cite.id)) {
        return prevSelectedCites.filter((c) => c.id !== cite.id);
      } else {
        return [...prevSelectedCites, cite];
      }
    });
  };

  const handleRemoveCite = (id: number) => {
    setSelectedCites(selectedCites.filter((cite) => cite.id !== id));
  };

  const filteredCites = cites.filter((cite) =>
    cite.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShareRangeChange = (values: number[]) => {
    setCriteria({ ...criteria, shareRange: values });
  };

  const onSubmit = () => {
    setSentYourRequest(true);
  };
  const router = useRouter();

  return (
    <>
      {!sentYourRequest ? (
        <form className="flex flex-col items-center min-h-screen h-full w-full bg-[url('/background-cover.png')] bg-cover">
          <MainHeader />
          <div className="p-4">
            <p className="text-2xl font-medium text-[#374151]">أضف طلبك</p>
          </div>
          <div className="p-4 w-full flex gap-4 flex-col">
            <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
              {data.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-end">
                    <p className="text-base font-bold text-[#4B5563]">
                      {item.title}
                    </p>
                  </div>
                  <div className="flex flex-row flex-wrap gap-8 items-center justify-end mt-6">
                    {item.children.map((child, id) => (
                      <RadioInput
                        key={id}
                        name="propertyType"
                        onChange={() => handlePropertyTypeChange(child)}
                        label={child}
                        value={child}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {selectedPropertyType === "فيلا" && (
              <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
                <div className="flex items-center justify-end">
                  <p className="text-base font-bold text-[#4B5563]">
                    نوع الفيلا
                  </p>
                </div>
                <div className="flex flex-row flex-wrap justify-end mt-6 gap-8">
                  <RadioInput
                    name="ownershipType"
                    onChange={() => {}}
                    value="فيلا ( درج داخلي+ شقة)"
                    label="فيلا ( درج داخلي+ شقة)"
                  />
                  <RadioInput
                    name="ownershipType"
                    onChange={() => {}}
                    value="فيلا (وحدات تمليك)"
                    label="فيلا (وحدات تمليك)"
                  />
                  <RadioInput
                    name="ownershipType"
                    onChange={() => {}}
                    value="فيلا ( درج داخلي)"
                    label="فيلا ( درج داخلي)"
                  />
                </div>
              </div>
            )}
            {selectedPropertyType === "دور" && (
              <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
                <div className="flex items-center justify-end">
                  <p className="text-base font-bold text-[#4B5563]">
                    نوع الدور
                  </p>
                </div>
                <div className="flex flex-row flex-wrap gap-8 items-center justify-end mt-6">
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
                    label="دور علوي"
                  />
                </div>
              </div>
            )}

            {selectedPropertyType === "شقة" && (
              <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
                <div className="flex items-center justify-end">
                  <p className="text-base font-bold text-[#4B5563]">
                    نوع الشقة{" "}
                  </p>
                </div>
                <div className="flex flex-col   justify-end mt-6">
                  <RadioInput
                    name="ownershipType"
                    onChange={() => {}}
                    value="شقة (داخل فيلا)"
                    label="شقة (داخل فيلا)"
                  />
                  <RadioInput
                    name="ownershipType"
                    onChange={() => {}}
                    value="شقة تمليك (في عمارة سكنية) "
                    label="شقة تمليك (في عمارة سكنية)"
                  />
                </div>{" "}
              </div>
            )}

            <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
              <div className="flex items-center justify-end">
                <p className="text-base font-bold text-[#4B5563]">
                  {" "}
                  موقع العقار{" "}
                </p>
              </div>
              <div className="flex items-end gap-2 justify-end flex-col mt-5">
                <p className="text-base font-medium text-[#4B5563]">المدينة</p>
                <div className=" w-full">
                  <select className="border w-full text-right border-[#D1D5DB] rounded-lg">
                    {cities.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-end gap-2 justify-end flex-row mt-5">
                <p
                  className={`cursor-pointer ${
                    selectedCites ? "" : "text-gray-500"
                  }`}
                >
                  إضافة حي/ أحياء
                </p>
                <AddButton
                  onClick={() => modalRef.current?.open()}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex flex-row gap-3 items-center justify-end flex-wrap ">
                {selectedCites.map((cite) => (
                  <div
                    key={cite.id}
                    className="flex items-center border-[#F3F4F6] w-32 h-11 p-3 rounded-md gap-2 justify-between border shadow-sm flex-row mt-5"
                  >
                    <CloseIconSmall
                      className="cursor-pointer w-4 h-4"
                      onClick={() => handleRemoveCite(cite.id)}
                    />
                    <p className="text-xs font-normal text-[#9CA3AF]">
                      {cite.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
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
                            fontFamily:
                              "Arial,Helvetica Neue,Helvetica,sans-serif",
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
            </div>
            <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
              <div className="flex items-center justify-end">
                <p className="text-base font-bold text-[#4B5563]">
                  حدد نوع التملك
                </p>
              </div>
              <div className="flex flex-row justify-end mt-6 gap-8">
                <RadioInput
                  name="ownershipType"
                  onChange={() => {}}
                  value="مشاع (صك مشترك)"
                  label="مشاع (صك مشترك)"
                />
                <RadioInput
                  name="ownershipType"
                  onChange={() => {}}
                  value="حر (صك مستقل)"
                  label="حر (صك مستقل)"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
              <div className="flex items-center justify-end">
                <p className="text-base font-bold text-[#4B5563]">
                  هل ترغب في تمويل عقاري؟
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
                <Button text="إضافة الطلب" onClick={onSubmit} />
              </div>
            </div>
          </div>
          <div>
            <Modal ref={modalRef} size="xl">
              <div className="items-start flex justify-center flex-col p-4">
                <div className="flex items-center   w-full">
                  <div className="flex-1 flex  items-center justify-center">
                    <p className="text-base text-[#374151] font-bold">
                      إضافة حي / أحياء
                    </p>
                  </div>
                  <div>
                    <CloseIconSmall
                      className="cursor-pointer"
                      onClick={() => modalRef.current?.close()}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="ابحث عن حي..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                  />
                </div>
                <div className="flex flex-col items-end h-[500px] overflow-scroll  w-full">
                  {filteredCites.map((cite) => (
                    <div
                      key={cite.id}
                      className="flex justify-end items-center w-full py-2"
                    >
                      <span className="mr-2">{cite.name}</span>
                      <input
                        type="checkbox"
                        checked={selectedCites.some((c) => c.id === cite.id)}
                        onChange={() => handleCiteChange(cite)}
                      />
                    </div>
                  ))}
                </div>
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
        </div>
      )}
    </>
  );
};

export default AddYourRequest;
