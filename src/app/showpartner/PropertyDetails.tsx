"use client";

import React, { useEffect, useMemo } from "react";
import MainHeader from "../components/header/MainHeader";
import Footer from "../components/header/Footer2";
import { useState } from "react";
import { postReport } from "@/redux/features/getRequest";
import { CarouselDefault } from "./Carousel3";
import { GoLocation } from "react-icons/go";
import { BsPerson } from "react-icons/bs";
import { format } from "date-fns";
import Cookie from "js-cookie";
import { FaBookmark, FaChevronRight, FaRegCalendarAlt } from "react-icons/fa";
import { CgSmartphoneShake } from "react-icons/cg";
import {
  IoIosCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { BiArea, BiShareAlt } from "react-icons/bi";
import { LuTag } from "react-icons/lu";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { dataReturn } from "@/redux/features/getRequest";
import { useRouter } from "next/navigation";
import {
  Vector,
  Money,
  Diagram,
  Dance,
  Shower,
  Kitchen,
  CheckOut,
} from "@/app/assets/svg";
import { realEstatePartner, landInfo, userInfo } from "@/type/addrealestate";
import { fetchuser } from "@/redux/features/userSlice";
import dynamic from "next/dynamic";
import { FormatNumber } from "../hooks/formatNumber";
const Map = dynamic(() => import("@/app/components/shared/map"), {
  ssr: false,
});
const PropertyDetails: React.FC<{ id: any }> = ({ id }: { id: any }) => {
  const [activeTab, setActiveTab] = useState<"location" | "details">("details");
  let router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector<RootState>((state) => state.register) as {
    user: userInfo;
    message: string;
  };
  let { selectData } = useSelector<RootState>((state) => state.getRequest) as {
    selectData: dataReturn;
  };

  const userOwnerShipArray = useMemo(() => {
    return selectData?.propertyDetailsOwnership?.filter(
      (ele: realEstatePartner) => ele?.user_id == user?.id
    );
  }, [user, selectData]);
  const userOwnerShip = useMemo(() => {
    return (detail: landInfo) =>
      userOwnerShipArray?.find(
        (ele: realEstatePartner) =>
          ele?.land_details_id == detail?.id || ele?.details_id == detail?.id
      );
  }, [userOwnerShipArray]);

  useEffect(() => {
    dispatch(fetchuser());
  }, [dispatch]);

  const detailsContent = (
    <div className="mt-4">
      <div className="border-2 rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">تفاصيل العقار</h2>
        {selectData?.landDetails?.map((ele) => (
          <div className="mt-2" key={ele?.id}>
            <div className="border-2 rounded-lg p-4">
              {/* <h3 className="text-xl font-bold">قطعة {selectData?.landDetails?.piece_number}</h3> */}
              <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
                <span>حالة العقار</span>
                <span
                  className={`${
                    ele?.available_percentage == 100
                      ? "bg-[#98CC5D]"
                      : "bg-blue-450"
                  } rounded-lg p-2 text-white`}
                >
                  {ele?.available_percentage}٪ متاح
                </span>
              </div>
              <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
                <span>رقم القطعة</span>
                <div className="flex justify-center items-center border-2 rounded-lg p-2">
                  <span>
                    <HiOutlineSquare3Stack3D className="text-xl mx-2" />
                  </span>
                  <span>{ele?.piece_number}</span>
                </div>
              </div>
              <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
                <span>المساحة</span>
                <div className="flex justify-center items-center border-2 rounded-lg p-2 ">
                  <span>
                    <BiArea className="text-xl mx-2" />{" "}
                  </span>
                  <span>
                    {ele?.area} م<sup>2</sup>
                  </span>
                </div>
              </div>
              <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
                <span>
                  {" "}
                  {selectData?.propertyPurpose?.id == 2
                    ? "مبلغ التطوير"
                    : "مبلغ الشراكة"}
                </span>
                <div className="flex justify-center items-center border-2 rounded-lg p-2 ">
                  <LuTag className="text-xl mx-2" />
                  <span>{FormatNumber(ele?.price * ele?.area)} ريال</span>
                </div>
              </div>
              {userOwnerShip(ele)?.land_details_id == ele?.id && (
                <>
                  <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
                    <span>نسبة شراكتك</span>
                    <span
                      className={`${
                        userOwnerShip(ele)?.percentage == 100
                          ? "bg-[#98CC5D]"
                          : "bg-blue-450"
                      } rounded-lg p-2 text-white`}
                    >
                      {userOwnerShip(ele)?.percentage}٪ متاح
                    </span>
                  </div>
                  <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
                    <span>مبلغ شراكتك</span>
                    <div className="flex justify-center items-center border-2 rounded-lg p-2 ">
                      <LuTag className="text-xl mx-2" />
                      <span>
                        {FormatNumber(userOwnerShip(ele)?.amount)} ريال
                      </span>
                    </div>
                  </div>
                </>
              )}
              {/* <JoinStatusButtons currentDealStatus={ele?.stage=="finished"} data={ele} dataMain={selectData}/>  */}
            </div>
          </div>
        ))}
        {selectData?.details?.length > 0 && (
          <>
            {/* <h3 className="text-xl font-bold">قطعة {selectData?.landDetails?.piece_number}</h3> */}
            <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
              <span>العمر</span>
              <span>
                {" "}
                {Boolean(selectData?.age) &&
                  selectData?.age != 0 &&
                  selectData?.age}{" "}
                {selectData?.age && selectData?.age > 1
                  ? "سنين"
                  : selectData?.age && selectData?.age == 1
                  ? "سنة"
                  : "جديد"}
              </span>
            </div>
            {Boolean(selectData?.area) && (
              <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
                <span>المساحة</span>
                <div className="flex justify-center items-center border-2 rounded-lg p-2">
                  <span>
                    <Vector className="text-xl mx-2" />
                  </span>
                  <span>
                    {selectData?.area} م<sup>2</sup>
                  </span>
                </div>
              </div>
            )}
          </>
        )}
        {selectData?.details?.map((ele) => (
          <div className="mt-2" key={ele?.id}>
            <div className="border-2 rounded-lg my-4 p-2">
              <h3 className="text-xl font-bold"> {ele?.type}</h3>

              <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-2 px-2  py-1">
                <span className="text-sm">المساحة</span>
                <div className="flex justify-center items-center border-2 rounded-lg p-2">
                  <span>
                    <Vector className="text-xl mx-2" />
                  </span>
                  <span>
                    {ele?.area} م<sup>2</sup>
                  </span>
                </div>
              </div>
              <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-2 px-2  py-1 ">
                <span className="text-sm">السعر</span>
                <span className="text-blue-450 text-xs">
                  (بدون القيمة المضافة أو السعي)
                </span>
                <div className="flex justify-center items-center border-2 rounded-lg p-2 ">
                  <span>
                    <Money className="text-xl mx-2" />{" "}
                  </span>
                  <span>{ele?.price} ريال</span>
                </div>
              </div>
              <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-2 px-2  py-1">
                <span className="text-sm">عدد الغرف</span>
                <div className="flex justify-center items-center border-2 rounded-lg p-2 ">
                  <Diagram className="text-xl mx-2" />
                  <span>{ele?.rooms_number}</span>
                </div>
              </div>
              <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-2 px-2  py-1">
                <span className="text-sm">عدد الصالات</span>
                <div className="flex justify-center items-center border-2 rounded-lg p-2 ">
                  <Dance className="text-xl mx-2" />
                  <span>{ele?.halls_number}</span>
                </div>
              </div>
              <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-2 px-2  py-2">
                <span className="text-sm">عدد دورات المياه</span>
                <div className="flex justify-center items-center border-2 rounded-lg p-2 ">
                  <Shower className="text-xl mx-2" />
                  <span>{ele?.bathrooms_number}</span>
                </div>
              </div>
              <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-2 px-2  py-2">
                <span className="text-sm">عدد المطابخ</span>
                <div className="flex justify-center items-center border-2 rounded-lg p-2 ">
                  <Kitchen className="text-xl mx-2" />
                  <span>{ele?.kitchens_number}</span>
                </div>
              </div>
              <div className="flex flex-col justify-start bg-gray-100 w-full items-start rounded-lg ml-2 mt-2 px-2  py-2">
                <p>مزايا اضافية</p>
                <div className="flex flex-wrap items-center gap-3">
                  {ele?.amenities?.pool}
                  <div className="flex flex-wrap items-center gap-2 my-3">
                    {ele?.amenities?.pool ? (
                      <CheckOut />
                    ) : (
                      <IoMdCloseCircleOutline />
                    )}
                    <p>مسبح </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 my-3">
                    {ele?.amenities?.car_entrance ? (
                      <CheckOut />
                    ) : (
                      <IoMdCloseCircleOutline className="text-red" />
                    )}
                    <p>مدخل سيارة </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 my-3">
                    {ele?.amenities?.ac ? (
                      <CheckOut />
                    ) : (
                      <IoMdCloseCircleOutline className="text-red" />
                    )}
                    <p>مكيفة </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 my-3">
                    {ele?.amenities?.kitchen ? (
                      <CheckOut />
                    ) : (
                      <IoMdCloseCircleOutline className="text-red" />
                    )}
                    <p>مطبخ راكب </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 my-3">
                    {ele?.amenities?.furnished ? (
                      <CheckOut />
                    ) : (
                      <IoMdCloseCircleOutline className="text-red" />
                    )}
                    <p> مؤنثة </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 my-3">
                    {ele?.amenities?.servants_room ? (
                      <CheckOut />
                    ) : (
                      <IoMdCloseCircleOutline className="text-red" />
                    )}
                    <p> غرف الخدم </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 my-3">
                    {ele?.amenities?.garage ? (
                      <CheckOut />
                    ) : (
                      <IoMdCloseCircleOutline className="text-red" />
                    )}
                    <p> كراج </p>
                  </div>
                </div>
              </div>
              {userOwnerShip(ele)?.details_id == ele?.id && (
                <>
                  <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
                    <span>نسبة شراكتك</span>
                    <span
                      className={`${
                        userOwnerShip(ele)?.percentage == 100
                          ? "bg-[#98CC5D]"
                          : "bg-blue-450"
                      } rounded-lg p-2 text-white`}
                    >
                      {userOwnerShip(ele)?.percentage}٪ متاح
                    </span>
                  </div>
                  <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
                    <span>مبلغ شراكتك</span>
                    <div className="flex justify-center items-center border-2 rounded-lg p-2 ">
                      <LuTag className="text-xl mx-2" />
                      <span>
                        {FormatNumber(userOwnerShip(ele)?.amount)} ريال
                      </span>
                    </div>
                  </div>
                </>
              )}
              {/* <JoinStatusButtons currentDealStatus={ele?.stage=="finished"} data={ele} dataMain={selectData}/>  */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  const locationContent = (
    <div className="mt-4">
      <div className="border-2 rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">موقع العقار</h2>

        <div className="mt-2">
          {selectData?.landDetails
            ?.map((ele: any) => ele?.piece_number)
            ?.join(",") && (
            <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
              <span>رقم المخطط</span>
              {/* <span>{selectData?.landDetails?.plan_number}</span> */}
              <span>
                {selectData?.landDetails
                  ?.map((ele: any) => ele?.piece_number)
                  ?.join(",")}
              </span>
            </div>
          )}
          <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
            <span>المدينة</span>
            <span>{selectData?.propertyLocation?.city}</span>
          </div>
          <div className="flex justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
            <span>الحي</span>
            <span>
              {" "}
              {selectData?.propertyLocation?.district?.replace(
                /[\[\]\\"]/g,
                ""
              )}
            </span>
          </div>
          <div className="flex-col justify-between bg-gray-100 w-full items-center rounded-lg ml-2 mt-4 px-2  py-2">
            <div> الموقع</div>
            <div>العنوان التفصيلي {selectData?.propertyLocation?.address}</div>
          </div>
        </div>
        <div className="mt-4">
          {selectData?.propertyLocation?.lat &&
            selectData?.propertyLocation?.long && (
              <Map
                latitude={selectData?.propertyLocation?.lat}
                longitude={selectData?.propertyLocation?.long}
              />
            )}
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
          <CarouselDefault images={selectData?.propertyMedia} />
          <BiShareAlt className="absolute top-10 left-10 text-4xl bg-white text-gray-700  rounded-full m-4 p-1 shadow-md " />
          <FaChevronRight
            className="absolute top-10 right-10 text-4xl bg-white text-gray-700 rounded-full m-4 p-1 shadow-md "
            onClick={() => router.back()}
          />
        </div>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex w-full justify-between items-center">
            <h1 className="text-2xl font-bold mt-4">
              {" "}
              {
                // selectData?.details?.type||
                selectData?.propertyType?.title
              }
            </h1>
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
              {selectData?.propertyOwnerType?.title}
            </div>
          </div>
          <div className="flex bg-gray-100 w-full justify-between items-center py-2  px-2 rounded-lg ml-2 mt-4">
            <div>
              <p>تاريخ اخر تحديث</p>
            </div>
            <div className="flex items-center ml-2 text-sm bg-green-450 px-2 py-1 rounded-lg">
              <FaRegCalendarAlt className="text-white ml-2" />
              <span className="mr-2 text-sm text-white">
                <p>
                  {" "}
                  {selectData?.updatedAt &&
                    format(new Date(selectData?.updatedAt), "yyyy-MM-dd")}
                </p>
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
                <p>
                  {selectData?.createdAt &&
                    format(new Date(selectData?.createdAt), "yyyy-MM-dd")}
                </p>
              </span>
            </div>
          </div>
          {selectData?.license_number && (
            <div className="flex bg-gray-100 w-full justify-between items-center py-2  px-2 rounded-lg ml-2 mt-4">
              <div>
                <p>رقم ترخيص الإعلان</p>
              </div>
              <div className="flex items-center ml-2 text-sm bg-gray-100 border-2  px-2 py-1 rounded-lg">
                <CgSmartphoneShake className=" ml-2" />
                <span className="mr-2 text-lg ">
                  <p>{selectData?.license_number}</p>
                </span>
              </div>
            </div>
          )}
          {selectData?.propertyOwnerType?.title == "وسيط عقاري" &&
            selectData?.user?.val_license && (
              <div className="flex bg-gray-100 w-full justify-between items-center py-2  px-2 rounded-lg ml-2 mt-4">
                <div>
                  <p>رقم رخصة فال</p>
                </div>
                <p>{selectData?.user?.val_license}</p>
              </div>
            )}
          <div className="flex bg-gray-100 w-full justify-between items-center py-2  px-2 rounded-lg ml-2 mt-4">
            <div>
              <p>رقم الطلب</p>
            </div>
            <span className="mr-2 ml-2  text-lg font-bold ">
              <h4>{selectData?.id}</h4>
            </span>
          </div>
          <div className="flex bg-gray-100 w-full justify-between items-center py-2  px-2 rounded-lg ml-2 mt-4">
            <div>
              <p>نوع العقار</p>
            </div>
            <span className="mr-2 ml-2  text-lg font-bold ">
              <h4>
                {" "}
                {
                  // selectData?.details?.type||
                  selectData?.propertyType?.title
                }
              </h4>
            </span>
          </div>
          <div className="flex bg-gray-100 w-full justify-between items-center py-2  px-2 rounded-lg ml-2 mt-4">
            <div>
              <p>الغرض من عرض العقار</p>
            </div>
            <span className="mr-2 ml-2  text-lg font-bold ">
              <h4> {selectData?.propertyPurpose?.title}</h4>
            </span>
          </div>
          {selectData?.landDetails?.length > 0 ? (
            <div className="flex bg-gray-100 w-full justify-between items-center py-2  px-2 rounded-lg ml-2 mt-4">
              <div>
                <p>العقار قابل للتجزئة</p>
              </div>
              <span>
                {selectData?.is_divisible == false ? (
                  <IoMdCloseCircleOutline className="mr-2 ml-2 bg-red-450 text-white text-2xl font-bold rounded-full " />
                ) : (
                  <IoIosCheckmarkCircleOutline className="mr-2 ml-2 bg-green-450 text-white text-2xl font-bold rounded-full " />
                )}
              </span>
            </div>
          ) : null}

          <div
            id="detailsLocation"
            className="flex w-full justify-center mt-4 mb-4 rounded-xl"
          >
            <button
              onClick={() => setActiveTab("details")}
              className={`flex-grow border-2 border-r-0  z-1 ${
                activeTab === "details"
                  ? "bg-blue-450 text-white px-8 rounded-xl"
                  : "bg-white px-8 py-4 rounded-xl"
              }`}
            >
              تفاصيل العقار
            </button>
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
          </div>
          {activeTab === "details" ? detailsContent : locationContent}
        </div>
      </div>
      <div dir="ltr">
        <Footer />
      </div>
    </div>
  );
};

export default PropertyDetails;

//last modified by Omar Marei 2/8/2024
