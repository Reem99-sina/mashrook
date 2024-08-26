"use client";

import React, { useState,useEffect,useRef } from "react";
import { Range, getTrackBackground } from "react-range";

import {CloseIconSmall } from "@/app/assets/svg";
import { Modal, ModalRef } from "../components/shared/modal.component";
type FilterModalProps = {
  onClose: () => void;
  onFilter: (criteria: any) => void;
  open:boolean
};

const FilterModalPartner: React.FC<FilterModalProps> = ({ onClose, onFilter,open }) => {
  let refFilter=useRef<ModalRef>(null)
  const [criteria, setCriteria] = useState<any>({
    dealStatus: "",
    city: "",
    district: "",
    unitType: "",
    unitStatus: "",
    purposeStatus: "",

    priceRange: [500000, 20000000],
    shareRange: [10, 90],
  });
  const [boolStatus, setbool] = useState<boolean>(false);
  // Example data for dropdowns
  const cities = ["الرياض", "الدمام", "جدة"];
  const districts = ["الياسمين", "البنفسج", "الورود"];
  const unitTypes = [
    "ارض سكنية",
    "ارض تجارية",
    "فيلا (وحدات تمليك)",
    "فيلا (درج داخلي)",
    "فيلا (درج داخلي + شقة)",
    "شقة (داخل فيلا)",
    "شقة (داخل عمارة سكنية)",
    "دور ارضي",
    "دور علوي",
  ];
  const unitStatuses = ["للتطوير", "للبيع"];
  const dealStatuses = ["متكامل", "تحت التقدم"];
 

  const formatNumber = (number: number) => {
    return number.toLocaleString();
  };

  const handlePriceRangeChange = (values: number[]) => {
    setCriteria({ ...criteria, priceRange: values });
  };

  const handleShareRangeChange = (values: number[]) => {
    setCriteria({ ...criteria, shareRange: values });
  };

  const handleApplyFilters = () => {
    onFilter(criteria);
    onClose();
  };
useEffect(()=>{
if(open==true){
  refFilter.current?.open()
}else{
  refFilter.current?.close()
}
},[open])
  return (
   
    <Modal ref={refFilter} className="flex rounded-lg items-start justify-center font-[Cairo] w-full " size="xs">
      <div className="bg-white p-2  opacity-100 h-auto   rounded-lg" style={{ direction: "rtl" }}>
        <div className="">
      <CloseIconSmall
                    className="cursor-pointer "
                    onClick={() => refFilter.current?.close()}
                    size="lg"
                  />
        <h2 className="text-xl font-bold mb-4 text-center border-b-2 pb-4 self-center">عوامل التصفية</h2>
        </div>
        {/* Deal Status */}
        <div className="h-[75vh] overflow-y-auto  overflow-x-hidden">
        <div className="mb-4  ">
          <h3 className="font-semibold mb-2">حالة الطلب</h3>
          <div className="flex flex-wrap">
            {dealStatuses.map((status) => (
              <button
                key={status}
                className={`px-4 py-2 m-1 rounded-md border text-sm ${
                  criteria.dealStatus === status ? "bg-blue-450 text-white" : "bg-white text-gray-900"
                }`}
                onClick={() => setCriteria({ ...criteria, dealStatus: status })}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Unit Status */}
        <div className="mb-4  ">
          <h3 className="font-semibold mb-2">الغرض من عرض العقار</h3>
          <div className="flex flex-wrap">
            {unitStatuses.map((status) => (
              <button
                key={status}
                className={`px-4 py-2 m-1 rounded-md border text-sm ${
                  criteria.purposeStatus === status ? "bg-blue-450 text-white" : "bg-white text-gray-900"
                }`}
                onClick={() => setCriteria({ ...criteria, purposeStatus: status })}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* City */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">المدينة</h3>
          <select
            value={criteria.city}
            onChange={(e) => setCriteria({ ...criteria, city: e.target.value })}
            className="border rounded p-1 w-full"
          >
            <option value="" className="text-sm">اختيار المدينة</option>
            {cities.map((city) => (
              <option key={city} value={city} className="text-sm">
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">الحي</h3>
          <select
            value={criteria.district}
            onChange={(e) => setCriteria({ ...criteria, district: e.target.value })}
            className="border rounded p-1 w-full"
          >
            <option value=""className="text-sm">اختيار الحي</option>
            {districts.map((district) => (
              <option key={district} value={district} className="text-sm">
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Unit Type */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">نوع العقار</h3>
          <div className="flex flex-wrap">
            {unitTypes.map((type) => (
              <button
                key={type}
                className={`px-4 py-2 m-1 text-sm rounded-md border ${
                  criteria.unitType === type ? "bg-blue-450 text-white" : "bg-white text-gray-900"
                }`}
                onClick={() => setCriteria({ ...criteria, unitType: type })}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">الميزانية</h3>
          <div className="flex flex-col">
            <div className="flex justify-between mb-2 text-sm text-gray-500 mx-5">
              <span> 500000 ريال</span>
              
              <span>20 مليون</span>
            </div>
            <Range
              step={100000}
              min={0}
              max={20000000}
              values={criteria.priceRange}
              onChange={handlePriceRangeChange}
              rtl
              renderTrack={({ props, children }) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    height: "36px",
                    display: "flex",
                    width: "90%",
                      margin:"auto"
                  }}
                  
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: "5px",
                      width: "100%",
                      borderRadius: "4px",
                      background: getTrackBackground({
                        values: criteria.priceRange,
                        colors: ["#ccc", "#548BF4", "#ccc"],
                        min: 0,
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
                    {formatNumber(criteria.priceRange[index])}
                  </div>
                </div>
              )}
            />
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">نسبة الشراكة</h3>
          <div className="flex flex-col">
            <div className="flex justify-between mb-2 text-sm text-gray-500 mx-5">
              <span>  10%</span>
              
              <span> 90%</span>
            </div>
            <Range
              step={5}
              min={10}
              max={90}
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
                    width: "90%",
                    margin:"auto"
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
                        min: 10,
                        max: 90,
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
                    {criteria.shareRange[index]}%
                  </div>
                </div>
              )}
            />
          </div>
        </div>
        {/* Share Range */}
        <div className="mb-4">
        <h3 className="font-semibold mb-2">الرغبة في التمويل العقاري</h3>
        <div>
        <button
                key={"yes"}
                className={`px-4 py-2 m-1 rounded-md border text-sm ${
                    boolStatus == true ? "bg-blue-450 text-white" : "bg-white text-gray-900"
                }`}
                onClick={() => setbool(true)}
              >
               نعم
              </button>
              <button
                key={"no"}
                className={`px-4 py-2 m-1 rounded-md border text-sm ${
                    boolStatus == false ? "bg-blue-450 text-white" : "bg-white text-gray-900"
                }`}
                onClick={() => setbool(false)}
              >
               لا
              </button>
        </div>
        </div>
        </div>
        <div className="flex container justify-center space-x-2">
          <button
            onClick={handleApplyFilters}
            className="bg-blue-450 text-white mx-4 px-4 py-2 rounded-md flex-grow"
          >
            تطبيق
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-900 px-4 py-2 rounded-md flex-grow"
          >
            إلغاء
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModalPartner;

//last modified by Omar Marei 3/8/2024
