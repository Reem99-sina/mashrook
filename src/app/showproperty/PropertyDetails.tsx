"use client";

import React from "react";
import MainHeader from "../components/header/MainHeader";
import Footer from "../components/header/Footer2";
import { useState } from "react";

import { CarouselDefault } from "./Carousel3";
import { GoLocation } from "react-icons/go";
import { BsPerson } from "react-icons/bs";
import { FaBookmark, FaChevronRight, FaRegCalendarAlt } from "react-icons/fa";
import { CgSmartphoneShake } from "react-icons/cg";
import {
  IoIosCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { BiArea, BiShareAlt } from "react-icons/bi";
import { LuTag } from "react-icons/lu";
import { RxArrowLeft } from "react-icons/rx";
import { MdOutlineFlag } from "react-icons/md";
import Image from "next/image";

const PropertyDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"location" | "details">(
    "location"
  );
  const isDivisible = true;
  const [saved, setSaved] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [reportText, setReportText] = useState("");
  const [showReportNotification, setShowReportNotification] = useState(false);
  const [reportNotificationMessage, setReportNotificationMessage] =
    useState("");
  const maxChars = 250;

  const handleReportClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseClick = () => {
    setIsDialogOpen(false);
    setReportText("");
  };

  const handleTextChange = (e: { target: { value: string } }) => {
    setReportText(e.target.value.slice(0, maxChars));
  };

  const handleReportSubmit = () => {
    setReportNotificationMessage("تم الابلاغ");
    showNotificationMessage();
    setIsDialogOpen(false);
    setReportText("");
  };

  const handleCancelClick = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    setReportNotificationMessage("تم الغاء البلاغ");
    showNotificationMessage();
    setIsConfirmDialogOpen(false);
    setIsDialogOpen(false);
    setReportText("");
  };

  const handleCancelConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
  };

  const showNotificationMessage = () => {
    setShowReportNotification(true);
    setTimeout(() => {
      setShowReportNotification(false);
    }, 5000);
  };

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

  const detailsContent = (
    <div className="mt-4">
      <div className="border-2 rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">تفاصيل العقار</h2>
        <div className="mt-2">
          <div className="border-2 rounded-lg p-4">
            <h3 className="text-xl font-bold">قطعة 1256</h3>
            <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
              <span>حالة العقار</span>
              <span className="bg-blue-450 rounded-lg p-2 text-white">
                50٪ متاح
              </span>
            </div>
            <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
              <span>رقم القطعة</span>
              <div className="flex justify-center items-center border-2 rounded-lg p-2">
                <span>
                  <HiOutlineSquare3Stack3D className="text-xl mx-2" />
                </span>
                <span>1256</span>
              </div>
            </div>
            <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
              <span>المساحة</span>
              <div className="flex justify-center items-center border-2 rounded-lg p-2 ">
                <span>
                  <BiArea className="text-xl mx-2" />{" "}
                </span>
                <span>
                  300 م<sup>2</sup>
                </span>
              </div>
            </div>
            <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
              <span>مبلغ الشراكة</span>
              <div className="flex justify-center items-center border-2 rounded-lg p-2 ">
                <LuTag className="text-xl mx-2" />
                <span>2,000,000 ريال</span>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="bg-blue-450 text-white hover:bg-blue-800 border-2 border-blue-500 w-3/4 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 flex justify-center rtl:flex-row-reverse"
              >
                انضم كشريك
                <RxArrowLeft className="mr-4 text-xl text-white" />
              </button>
            </div>
          </div>
          <div className="border-2 rounded-lg p-4 mt-4">
            <h3 className="text-xl font-bold">قطعة 1256</h3>
            <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
              <span>حالة العقار</span>
              <span className="bg-blue-450 rounded-lg p-2 text-white">
                50٪ متاح
              </span>
            </div>
            <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
              <span>رقم القطعة</span>
              <div className="flex justify-center items-center border-2 rounded-lg p-2">
                <span>
                  <HiOutlineSquare3Stack3D className="text-xl mx-2" />
                </span>
                <span>1256</span>
              </div>
            </div>
            <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
              <span>المساحة</span>
              <div className="flex justify-center items-center border-2 rounded-lg p-2 ">
                <span>
                  <BiArea className="text-xl mx-2" />{" "}
                </span>
                <span>
                  300 م<sup>2</sup>
                </span>
              </div>
            </div>
            <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
              <span>مبلغ الشراكة</span>
              <div className="flex justify-center items-center border-2 rounded-lg p-2 ">
                <LuTag className="text-xl mx-2" />
                <span>2,000,000 ريال</span>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="bg-blue-450 text-white hover:bg-blue-800 border-2 border-blue-500 w-3/4 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 flex justify-center rtl:flex-row-reverse"
              >
                انضم كشريك
                <RxArrowLeft className="mr-4 text-xl text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  const locationContent = (
    <div className="mt-4">
      <div className="border-2 rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">موقع العقار</h2>

        <div className="mt-2">
          <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
            <span>رقم المخطط</span>
            <span>1234</span>
          </div>
          <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
            <span>المدينة</span>
            <span>الرياض</span>
          </div>
          <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
            <span>الحي</span>
            <span>حي النرجس</span>
          </div>
          <div className="flex-col justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
            <div>الموقع</div>
            <div>العنوان التفصيلي</div>
          </div>
        </div>
        <div className="mt-4">
          <Image
            src="https://storage.googleapis.com/support-forums-api/attachment/thread-16305330-5132562364420730370.png"
            alt="Map"
            width={1024}
            height={1024}
            style={{ objectFit: "cover" }}
            className="rounded-xl"
            priority
          />
        </div>
      </div>
    </div>
  );
  return (
    <div className=" bg-white text-gray-800">
      <div dir="ltr">
        <MainHeader />
      </div>

      <div dir="ltr" className="flex justify-center">
        <div className="relative p-6 ">
          <CarouselDefault />
          <BiShareAlt className="absolute top-10 left-10 text-4xl bg-white text-gray-700  rounded-full m-4 p-1 shadow-md " />
          <FaChevronRight className="absolute top-10 right-10 text-4xl bg-white text-gray-700 rounded-full m-4 p-1 shadow-md " />
        </div>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex w-full justify-between items-center">
            <h1 className="text-2xl font-bold mt-4">أرض سكنية</h1>
            <div className=" border-2 rounded-full">
              <GoLocation className="m-2 text-3xl" />
            </div>
          </div>
        </div>
        <div className="mt-4 border-t">
          <div className="flex bg-gray-100 w-full justify-between items-center py-2 px-2 rounded-lg  ml-2">
            <div>
              <p>صفة مقدم الطلب</p>
            </div>
            <div className="flex items-center ml-2 text-sm text-white bg-blue-450 px-2 py-1 rounded-lg">
              <BsPerson className="text-white ml-2" />
              مالك
            </div>
          </div>
          <div className="flex bg-gray-100 w-full justify-between items-center py-2  px-2 rounded-lg ml-2 mt-4">
            <div>
              <p>تاريخ اخر تحديث</p>
            </div>
            <div className="flex items-center ml-2 text-sm bg-green-450 px-2 py-1 rounded-lg">
              <FaRegCalendarAlt className="text-white ml-2" />
              <span className="mr-2 text-sm text-white">
                <p>12-12-2024</p>
              </span>
            </div>
          </div>
          <div className="flex bg-gray-100 w-full justify-between items-center py-2  px-2 rounded-lg ml-2 mt-4">
            <div>
              <p>تاريخ انشاء الطلب</p>
            </div>
            <div className="flex items-center ml-2 text-sm bg-gray-100 border-2 px-2 py-1 rounded-lg">
              <FaRegCalendarAlt className=" ml-2" />
              <span className="mr-2 text-sm ">
                <p>12-12-2024</p>
              </span>
            </div>
          </div>
          <div className="flex bg-gray-100 w-full justify-between items-center py-2  px-2 rounded-lg ml-2 mt-4">
            <div>
              <p>رقم الترخيص للإعلان</p>
            </div>
            <div className="flex items-center ml-2 text-sm bg-gray-100 border-2  px-2 py-1 rounded-lg">
              <CgSmartphoneShake className=" ml-2" />
              <span className="mr-2 text-lg ">
                <p>1234422</p>
              </span>
            </div>
          </div>
          <div className="flex bg-gray-100 w-full justify-between items-center py-2  px-2 rounded-lg ml-2 mt-4">
            <div>
              <p>رقم الطلب</p>
            </div>
            <span className="mr-2 ml-2  text-lg font-bold ">
              <h4>2024</h4>
            </span>
          </div>
          <div className="flex bg-gray-100 w-full justify-between items-center py-2  px-2 rounded-lg ml-2 mt-4">
            <div>
              <p>نوع العقار</p>
            </div>
            <span className="mr-2 ml-2  text-lg font-bold ">
              <h4>أرض سكنية</h4>
            </span>
          </div>
          <div className="flex bg-gray-100 w-full justify-between items-center py-2  px-2 rounded-lg ml-2 mt-4">
            <div>
              <p>الغرض من عرض العقار</p>
            </div>
            <span className="mr-2 ml-2  text-lg font-bold ">
              <h4>استثمار (شراكة برأس المال او البناء)</h4>
            </span>
          </div>
          <div className="flex bg-gray-100 w-full justify-between items-center py-2  px-2 rounded-lg ml-2 mt-4">
            <div>
              <p>العقار قابل للتجزئة</p>
            </div>
            <span>
              {!isDivisible ? (
                <IoMdCloseCircleOutline className="mr-2 ml-2 bg-red-450 text-white text-2xl font-bold rounded-full " />
              ) : (
                <IoIosCheckmarkCircleOutline className="mr-2 ml-2 bg-green-450 text-white text-2xl font-bold rounded-full " />
              )}
            </span>
          </div>

          <div
            id="detailsLocation"
            className="flex w-full justify-center mt-4 mb-4 rounded-xl"
          >
            <button
              onClick={() => setActiveTab("location")}
              className={`flex-grow border-2 z-0 ${
                activeTab === "location"
                  ? "bg-blue-450 text-white px-8 rounded-xl"
                  : "bg-white px-8 py-4 rounded-xl"
              }`}
            >
              موقع العقار
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`flex-grow border-2 border-r-0 -mr-4 z-1 ${
                activeTab === "details"
                  ? "bg-blue-450 text-white px-8 rounded-xl"
                  : "bg-white px-8 py-4 rounded-xl"
              }`}
            >
              تفاصيل العقار
            </button>
          </div>
          {activeTab === "details" ? detailsContent : locationContent}
        </div>
      </div>
      <div
        id="bookmarkReport"
        className="flex justify-around items-center mt-4 text-lg border-2 rounded-t-xl z-50 bg-white"
      >
        <div className="flex flex-row py-4 items-center justify-center">
          <button
            onClick={handleSaveClick}
            className="text-blue-500 mx-2 align-middle"
          >
            {saved ? "إلغاء الحفظ" : "حفظ"}
          </button>
          <FaBookmark className="text-blue-500 mx-2 text-xl align-middle" />
        </div>

        <div className="bg-gray-300 inline-block h-10 w-0.5 align-bottom"></div>
        {showNotification && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 text-white px-4 py-2 rounded-full">
            {notificationMessage}
          </div>
        )}

        <div className="flex flex-row py-4 items-center justify-center">
          <button
            onClick={handleReportClick}
            className="text-red-500 mx-2 align-middle"
          >
            ابلاغ
          </button>
          <MdOutlineFlag className="text-red-500 mx-2 text-xl align-middle" />
        </div>

        {isDialogOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-96">
              <div className="flex justify-between items-center border-b pb-2">
                <button
                  className="text-xl font-semibold"
                  onClick={handleCloseClick}
                >
                  &times;
                </button>
                <h2 className="text-xl font-semibold">ابلاغ</h2>
                <p></p>
              </div>
              <div className="py-2">
                <p className="font-medium p-2">سبب الابلاغ</p>
                <textarea
                  className="w-full h-32 p-2 border rounded"
                  placeholder="اكتب سبب الابلاغ هنا..."
                  value={reportText}
                  onChange={handleTextChange}
                  maxLength={maxChars}
                ></textarea>
                <div className="text-right text-sm text-gray-500">
                  {reportText.length}/{maxChars}
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleReportSubmit}
                  className="bg-blue-450 text-white px-4 py-2 rounded-2xl p-2 m-2 flex-grow"
                >
                  ابلاغ
                </button>
                <button
                  onClick={handleCancelClick}
                  className="border-2 px-4 py-2 rounded-2xl p-2 m-2 flex-grow"
                >
                  الغاء
                </button>
              </div>
            </div>
          </div>
        )}

        {isConfirmDialogOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-96">
              <div className="flex justify-between items-center border-b pb-2">
                <button
                  className="text-xl font-semibold"
                  onClick={handleCancelConfirmDialog}
                >
                  &times;
                </button>
                <h2 className="text-xl font-semibold">الغاء البلاغ</h2>
                <p></p>
              </div>
              <div className="py-2">
                <p className="font-medium">
                  هل انت متأكد من رغبتك في إلغاء البلاغ ؟
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleConfirmCancel}
                  className="bg-blue-450 text-white px-4 py-2 rounded-2xl p-2 m-2 flex-grow"
                >
                  تأكيد
                </button>
                <button
                  onClick={handleCancelConfirmDialog}
                  className="border-2 px-4 py-2 rounded-2xl p-2 m-2 flex-grow"
                >
                  الغاء
                </button>
              </div>
            </div>
          </div>
        )}

        {showReportNotification && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 text-white px-4 py-2 rounded">
            {reportNotificationMessage}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetails;
