"use client";

import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";

type FilterModalProps = {
  onClose: () => void;
  onFilter: (criteria: any) => void;
};

const FilterModal: React.FC<FilterModalProps> = ({ onClose, onFilter }) => {
  const [criteria, setCriteria] = useState<any>({
    dealStatus: "",
    city: "",
    district: "",
    unitType: "",
    unitStatus: "",
    priceRange: [0, 20000000],
    shareRange: [10, 90],
  });

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
  const dealStatuses = ["متاح", "تم الاشتراك", "محجوز", "تمت الشراكة"];

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

  return (
    <div className="flex items-start justify-center p-6 items w-dvh h-auto z-100 bg-gray-800 opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl opacity-100" style={{ direction: "rtl" }}>
        <h2 className="text-xl font-bold mb-4 text-center border-b-2 pb-4">عوامل التصفية</h2>

        {/* Deal Status */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">حالة العقار</h3>
          <div className="flex flex-wrap">
            {dealStatuses.map((status) => (
              <button
                key={status}
                className={`px-4 py-2 m-1 rounded-md border ${
                  criteria.dealStatus === status ? "bg-blue-500 text-white" : "bg-white text-gray-900"
                }`}
                onClick={() => setCriteria({ ...criteria, dealStatus: status })}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Unit Status */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">الغرض من عرض العقار</h3>
          <div className="flex">
            {unitStatuses.map((status) => (
              <button
                key={status}
                className={`px-4 py-2 m-1 rounded-md border ${
                  criteria.unitStatus === status ? "bg-blue-500 text-white" : "bg-white text-gray-900"
                }`}
                onClick={() => setCriteria({ ...criteria, unitStatus: status })}
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
            className="border rounded p-2 w-full"
          >
            <option value="">اختيار المدينة</option>
            {cities.map((city) => (
              <option key={city} value={city}>
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
            className="border rounded p-2 w-full"
          >
            <option value="">اختيار الحي</option>
            {districts.map((district) => (
              <option key={district} value={district}>
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
                className={`px-4 py-2 m-1 rounded-md border ${
                  criteria.unitType === type ? "bg-blue-500 text-white" : "bg-white text-gray-900"
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
          <h3 className="font-semibold mb-2">مبلغ الشراكة أو السعر</h3>
          <div className="flex flex-col">
            <div className="flex justify-between mb-2 text-sm text-gray-500">
              <span>0</span>
              <span>5 مليون</span>
              <span>10 مليون</span>
              <span>15 مليون</span>
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

        {/* Share Range */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">نسبة الشراكة</h3>
          <div className="flex flex-col">
            <div className="flex justify-between mb-2 text-sm text-gray-500">
              <span>10%</span>
              <span>20%</span>
              <span>30%</span>
              <span>40%</span>
              <span>50%</span>
              <span>60%</span>
              <span>70%</span>
              <span>80%</span>
              <span>90%</span>
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
    </div>
  );
};

export default FilterModal;

//last modified by Omar Marei 3/8/2024
