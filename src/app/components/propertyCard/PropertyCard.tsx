"use client";

import React, { useState } from "react";
import {
  FaRegCalendarAlt,
  FaBookmark,
  FaEllipsisH,
  FaAngleDoubleLeft,
} from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import CircularProgressBar from "./RadialProgressBar";
import { GoLocation } from "react-icons/go";
import { CgSmartphoneShake } from "react-icons/cg";
import { RxArrowLeft } from "react-icons/rx";
import { CiLocationOn } from "react-icons/ci";
import { LuTag } from "react-icons/lu";
import { BiArea } from "react-icons/bi";
import { FinishedShares } from "@/app/assets/svg";
import Link from "next/link";

type PropertyCardProps = {
  offerId: string[];
  offersCount: number[];
  date: string[];
  seller: string[];
  unitStatus: string[];
  requestId: string[];
  licenseNumber: string[];
  city: string[];
  district: string[];
  offeredShare: number[][];
  area: number[][];
  price: number[][];
  currency: string[];
  unitCategory: string[];
  unitType?: string[][];
  dealStatus?: string[][];
};

const PropertyCard: React.FC<PropertyCardProps> = ({
  offerId,
  offersCount,
  date,
  seller,
  unitStatus,
  requestId,
  licenseNumber,
  city,
  district,
  offeredShare,
  area,
  price,
  currency,
  unitCategory,
  unitType,
  dealStatus,
}) => {
  const [saved, setSaved] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const handleSaveClick = () => {
    if (!saved) {
      setNotificationMessage("تم الحفظ");
    } else {
      setNotificationMessage("تم الغاء الحفظ");
    }
    setSaved(!saved);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  const renderCards = (offerIndex: number) => {
    const cards = [];

    const unitsToShow = Math.min(2, offersCount[offerIndex]); // Limit to 2 units

    for (let i = 0; i < unitsToShow; i++) {
      const unit = unitType
        ? unitType[offerIndex][i]
        : unitCategory[offerIndex];
      const currentDealStatus = dealStatus
        ? dealStatus[offerIndex][i]
        : unitStatus[offerIndex];
      const currentPrice = price[offerIndex][i]?.toLocaleString() || "N/A";
      const currentCurrency = currency[offerIndex] || "N/A";
      const currentArea = area[offerIndex][i] || "N/A";
      const currentSharePercentage = offeredShare[offerIndex][i] || 0;

      cards.push(
        <div
          key={`${offerIndex}-${i}`}
          className="bg-white shadow rounded-lg p-2 mb-4"
        >
          <div className="flex flex-row flex-wrap items-center justify-center md:flex-row sm:flex-col ">
            <div className="ml-auto text-right py-2">
              <div className="flex flex-row">
                <p className="text-2xl px-4 text-black">{unit}</p>
              </div>
              <div className="flex flex-row px-2 pt-4">
                <div className="bg-gray-200 rounded-xl px-2 flex items-center">
                  <LuTag />
                  <p className="text-lg mx-2">
                    {currentPrice} {currentCurrency}
                  </p>
                </div>
                <div className="bg-gray-200 rounded-xl px-2 mr-4 flex items-center">
                  <BiArea />
                  <p className="text-lg mx-2">
                    {currentArea} م<sup>2</sup>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center  rounded-full p-2">
              {currentDealStatus === "تمت الشراكة" ? (
                <>
                  <FinishedShares />
                  <div className="w-12">
                    <p className="text-center text-sm text-gray-900">
                      اكتمال الشراكة
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-xl font-bold text-blue-500 mb-2">
                    <CircularProgressBar
                      percentage={currentSharePercentage}
                      size={50}
                      strokeWidth={5}
                    />
                  </span>
                  <div className="">
                    <p className="text-sm text-gray-500">متاح</p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div id="joinStatus" className="py-4">
            {currentDealStatus === "محجوز" ? (
              <div className="flex flex-row items-center justify-between">
                <button
                  type="button"
                  className="bg-blue-450 text-white border-blue-500 w-3/4 font-medium rounded-lg text-sm px-5 py-2.5 mx-4 flex justify-center"
                >
                  عرض المحادثات
                </button>
                <button
                  type="button"
                  className="bg-green-450 text-white border-blue-500 w-3/4 font-medium rounded-lg text-sm px-5 py-2.5 mx-4 flex justify-center"
                >
                  عرض الطلب
                </button>
              </div>
            ) : (
              <div className="flex justify-center">
                <button
                  type="button"
                  className={`${
                    currentDealStatus === "تمت الشراكة"
                      ? "bg-gray-300 text-gray-800"
                      : "bg-blue-450 text-white hover:bg-blue-800 border-2 border-blue-500"
                  } w-3/4 font-medium rounded-lg text-sm px-5 py-2.5 flex justify-center rtl:flex-row-reverse dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                  disabled={currentDealStatus === "تمت الشراكة"}
                >
                  انضم كشريك
                  <RxArrowLeft
                    className={`mr-4 text-xl ${
                      currentDealStatus === "تمت الشراكة"
                        ? "text-gray-600"
                        : "text-white"
                    }`}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }
    return cards;
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      {offerId.map((id, offerIndex) => (
        <div key={id} id="offerCard" className="flex flex-col p-2">
          <div className="flex flex-col mt-4 border-2 rounded-xl p-4">
            <div className="flex justify-between py-2 container items-center">
              <div className="flex flex-col justify-between h-full">
                <div className="mt-4">
                  <p className="text-2xl px-4 text-black mb-4">
                    {unitCategory[offerIndex]}
                  </p>
                  <span
                    className={`text-white px-4 py-1 rounded-2xl ${
                      unitStatus[offerIndex] === "للبيع"
                        ? "bg-green-450"
                        : "bg-orange-450"
                    }`}
                  >
                    {unitStatus[offerIndex]}
                  </span>
                </div>
                <div className="pt-4 text-sm text-gray-500 mt-2">
                  <p>رقم الطلب: {requestId[offerIndex]}</p>
                </div>
                <div className="pt-1 mr-4 text-sm text-gray-700 mt-2">
                  <div className="flex">
                    <CgSmartphoneShake />
                    <p className="px-2">
                      ترخيص رقم: {licenseNumber[offerIndex]}
                    </p>
                  </div>
                  <div className="flex">
                    <GoLocation />
                    <p className="px-2">
                      مدينة {city[offerIndex]}، {district[offerIndex]}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-15 h-12 border-2 rounded-full">
                <CiLocationOn className="text-5xl" />
              </div>
            </div>
            {renderCards(offerIndex)}
            <div className="flex justify-start items-center mt-4">
              <div className="flex items-center">
                <div className="flex items-center ml-2 text-sm text-white bg-gray-500 px-2 py-1 rounded-lg">
                  <BsPerson className="text-white ml-2" />
                  {seller[offerIndex]}
                </div>
              </div>
              <div className="flex items-center ml-2 text-sm bg-gray-500 px-2 py-1 rounded-lg">
                <FaRegCalendarAlt className="text-white ml-2" />
                <span className="mr-2 text-sm text-white">
                  {date[offerIndex]}
                </span>
              </div>
            </div>

            {offersCount[offerIndex] > 2 && (
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  className="text-blue-500 w-3/4 font-bold text-xl px-5 py-4 flex justify-center"
                >
                  عرض كل العقارات
                  <FaAngleDoubleLeft className="mr-4 text-xl text-blue-500" />
                </button>
              </div>
            )}
            <hr className="h-px mt-6 bg-gray-200 border-0" />
            <div className="flex justify-around items-center mt-4">
              <div className="flex flex-row pt-4 py-4 items-center justify-center">
                <Link href="/showproperty">
                  <button className="text-blue-500 mx-4 align-middle">
                    عرض التفاصيل
                  </button>
                </Link>
                <FaEllipsisH className="text-blue-500 mx-2 align-middle" />
              </div>
              <div className="bg-gray-300 inline-block h-10 w-0.5 self-stretch"></div>

              <div className="flex flex-row py-4 items-center justify-center">
                <button
                  onClick={handleSaveClick}
                  className="text-blue-500 mx-2 align-middle"
                >
                  {saved ? "إلغاء الحفظ" : "حفظ"}
                </button>
                <FaBookmark className="text-blue-500 mx-2 text-xl align-middle" />
              </div>

              {showNotification && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 text-white px-4 py-2 rounded-full">
                  {notificationMessage}
                </div>
              )}

              {/* <div className="flex flex-row pt-4">
                <button className="text-blue-500 mx-4 align-middle">حفظ</button>
                <FaBookmark className="text-blue-500 mx-2 align-middle" />
              </div> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyCard;
