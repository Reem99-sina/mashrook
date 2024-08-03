"use client";

import React, { useState } from "react";

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
    shareRange: [10, 100],
  });

  // Example data for dropdowns
  const cities = ["الرياض", "الدمام", "City3"];
  const districts = ["District1", "District2", "District3"];
  const unitTypes = ["ارض سكنية", "ارض تجارية", "فيلا (وحدات تمليك)", "فيلا (درج داخلي)", "فيلا (درج داخلي + شقة)", "شقة (داخل فيلا)", "شقة (داخل عمارة سكنية)", "دور ارضي", "دور علوي"];
  const unitStatuses = ["للتطوير", "للبيع"];
  const dealStatuses = ["متاح", "تم الاشتراك", "محجوز", "تمت الشراكة"];

  const handleApplyFilters = () => {
    onFilter(criteria);
    onClose();
  };

  return (
    <div className="flex rtl items-start justify-center p-6 items w-dvh h-dvh z-100 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-3xl opacity-100">
        <h2 className="text-xl font-bold mb-4">خيارات التصفية</h2>

        {/* Deal Status */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">حالة العقار</h3>
          <div className="flex space-x-2">
            {dealStatuses.map(status => (
              <button
                key={status}
                className={`px-4 py-2 rounded-md border ${criteria.dealStatus === status ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setCriteria({ ...criteria, dealStatus: status })}
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
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
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
            {districts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>

        {/* Unit Type */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">نوع العقار</h3>
          <div className="flex flex-wrap space-x-2">
            {unitTypes.map(type => (
              <button
                key={type}
                className={`px-4 py-2 rounded-md border ${criteria.unitType === type ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setCriteria({ ...criteria, unitType: type })}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Unit Status */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">الغرض من عرض العقار</h3>
          <div className="flex space-x-2">
            {unitStatuses.map(status => (
              <button
                key={status}
                className={`px-4 py-2 rounded-md border ${criteria.unitStatus === status ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setCriteria({ ...criteria, unitStatus: status })}
              >
                {status}
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
              <span>5,000,000</span>
              <span>10,000,000</span>
              <span>15,000,000</span>
              <span>20,000,000</span>
            </div>
            <input
              type="range"
              min="0"
              max="20000000"
              step="100000"
              value={criteria.priceRange[0]}
              onChange={(e) => setCriteria({ ...criteria, priceRange: [Number(e.target.value), criteria.priceRange[1]] })}
              className="w-full"
            />

            <div className="flex justify-between">
              <span>{criteria.priceRange[0]}</span>

            </div>
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
              <span>100%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="10"
              value={criteria.shareRange[0]}
              onChange={(e) => setCriteria({ ...criteria, shareRange: [Number(e.target.value), criteria.shareRange[1]] })}
              className="w-full"
            />

            <div className="flex justify-between">
              <span>{criteria.shareRange[0]}%</span>

            </div>
          </div>
        </div>

        <div className="flex container justify-center space-x-2">
          <button
            onClick={handleApplyFilters}
            className="bg-blue-450 text-white mx-4 px-4 py-2 rounded-md"
          >
            تطبيق
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;

//last modified by Omar Marei 2/8/2024