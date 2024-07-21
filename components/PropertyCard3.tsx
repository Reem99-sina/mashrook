"use client";

import React from "react";
import { FaRegCalendarAlt, FaBookmark, FaEllipsisH } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import CircularProgressBar from "./RadialProgressBar";
import { GoLocation } from "react-icons/go";
import { CgSmartphoneShake } from "react-icons/cg";
import { RxArrowLeft } from "react-icons/rx";
import { CiLocationOn } from "react-icons/ci";
import { LuTag } from "react-icons/lu";
import { BiArea } from "react-icons/bi";
import { FaAngleDoubleLeft } from "react-icons/fa";

type PropertyCard3Props = {
  unitCount: number;
  date: string;
  categories: string;
  seller: string;
  statuses: string;
  requestIds: string;
  licenseNumbers: string;
  cities: string;
  districts: string;
  sharePercentages: number[];
  areas: number[];
  prices: number[];
  currencies: string[];
  units: string[];
  dealStatus: string[];
};

const PropertyCard3: React.FC<PropertyCard3Props> = ({
  unitCount,
  date,
  categories,
  seller,
  statuses,
  requestIds,
  licenseNumbers,
  cities,
  districts,
  sharePercentages,
  areas,
  prices,
  currencies,
  units,
  dealStatus,
}) => {
  const renderCards = () => {
    const cards = [];
    for (let i = 0; i < unitCount; i++) {
      cards.push(
        <div key={i} className="bg-white shadow rounded-lg p-2 mb-4">
          <div className="flex flex-col md:flex-row sm:flex-row container items-center">
            <div className="ml-auto text-right py-2">
              <div className="flex flex-row">
                <p className="text-2xl px-4 text-black">{units[i]}</p>
                <span
                  className={`text-white ${
                    dealStatus[i] === "تمت الشراكة"
                      ? "bg-red-500"
                      : "bg-green-500"
                  } px-4 py-1 rounded-2xl`}
                >
                  {dealStatus[i]}
                </span>
              </div>
              <div className="flex flex-row px-2 pt-4">
                <div className="bg-gray-200 rounded-xl px-2 flex items-center">
                  <LuTag />
                  <p className="text-lg mx-2">
                    {prices[i].toLocaleString()} {currencies[i]}
                  </p>
                </div>
                <div className="bg-gray-200 rounded-xl px-2 mr-4 flex items-center">
                  <BiArea />
                  <p className="text-lg mx-2">
                    {areas[i]} <sup>2</sup>م
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-16 h-16 bg-blue-100 rounded-full p-2">
              <span className="text-xl font-bold text-blue-500">
                <CircularProgressBar
                  percentage={sharePercentages[i]}
                  size={50}
                  strokeWidth={10}
                />
              </span>
              <div className="mt-4">
                <p className="text-sm text-gray-500">نسبة الشراكة</p>
              </div>
            </div>
          </div>
          {dealStatus[i] === "تم الاشتراك" ? (
            <div className="flex flex-row items-center justify-between">
              <button
                type="button"
                className="bg-blue-500 text-white  border-blue-500 w-3/4 font-medium rounded-lg text-sm px-5 py-2.5 mx-4 flex justify-center"
              >
                عرض المحادثات
              </button>
              <button
                type="button"
                className="bg-green-500 text-white  border-blue-500 w-3/4 font-medium rounded-lg text-sm px-5 py-2.5 mx-4 flex justify-center"
              >
                عرض الطلب
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                id="dealopen?"
                type="button"
                className={`${
                  dealStatus[i] === "تمت الشراكة"
                    ? "bg-gray-300 text-gray-800 "
                    : "bg-blue-500 text-white hover:bg-blue-800 border-2 border-blue-500"
                } w-3/4 font-medium rounded-lg text-sm px-5 py-2.5 flex justify-center rtl:flex-row-reverse dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                disabled={dealStatus[i] === "تمت الشراكة"}
              >
                انضم كشريك
                <RxArrowLeft
                  className={`mr-4 text-xl ${
                    dealStatus[i] === "تمت الشراكة"
                      ? "text-gray-600"
                      : "text-white"
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      );
    }
    return cards;
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="flex items-center ml-2 text-sm text-white bg-blue-500 px-2 py-1 rounded">
            <span>
              <BsPerson className="text-white ml-2" />
            </span>{" "}
            {seller}
          </div>
        </div>
        <div className="flex items-center ml-2 text-sm bg-blue-500 px-2 py-1 rounded">
          <FaRegCalendarAlt className="text-white" />
          <span className="ml-2 text-sm text-white">{date}</span>
        </div>
      </div>
      <hr className="h-px my-8 container bg-gray-200 border-0 dark:bg-gray-700" />
      <div className="flex flex-col mt-4 border-2 rounded-xl p-4 ">
        <div className="flex justify-between py-2  container items-center">
          <div className="flex flex-col justify-between h-full">
            <div className="mt-4">
              <p className="text-2xl px-4 text-black mb-4">{categories}</p>
              <span className="text-white bg-green-500 px-4 py-1 rounded-2xl">
                {statuses}
              </span>
            </div>
            <div className="pt-4 text-sm text-gray-500 mt-2">
              <p>رقم الطلب: {requestIds}</p>
            </div>
            <div className="pt-1 mr-4 text-sm text-gray-700 mt-2">
              <div className="flex">
                <CgSmartphoneShake />
                <p className="px-2">ترخيص رقم: {licenseNumbers}</p>
              </div>
              <div className="flex">
                <GoLocation />
                <p className="px-2">
                  مدينة {cities}، {districts}
                </p>
              </div>
            </div>
          </div>
          <div className="w-15 h-12 border-2 rounded-full">
            <CiLocationOn className="text-5xl" />
          </div>
        </div>
        {renderCards()}
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          className="text-blue-500 w-3/4 font-bold text-xl px-5 py-4 flex justify-center"
        >
          عرض كل العقارات
          <FaAngleDoubleLeft className="mr-4 text-xl text-blue-500" />
        </button>
      </div>
      <hr className="h-px mt-6 bg-gray-200 border-0" />
      <div className="flex justify-between items-center mt-4">
        <div className="flex flex-row pt-4">
          <p className="text-blue-500 mx-4 align-middle">عرض التفاصيل</p>
          <FaEllipsisH className="text-blue-500 mx-2 align-middle" />
        </div>
        <div className="bg-gray-200 inline-block h-10 w-0.5 self-stretch"></div>
        <div className="flex flex-row pt-4">
          <p className="text-blue-500 mx-4 align-middle">حفظ</p>
          <FaBookmark className="text-blue-500 mx-2 align-middle" />
        </div>
      </div>
    </div>
  );
};

export default PropertyCard3;

//obsolete version last modified by Omar Marei 18/7