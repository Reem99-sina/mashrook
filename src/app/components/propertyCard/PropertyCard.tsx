"use client";

import React, { useState, useMemo,useEffect,useRef } from "react";
import {
  FaRegCalendarAlt,
  FaBookmark,
  FaEllipsisH,
  FaAngleDoubleLeft,
} from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import toast from "react-hot-toast";
import { format } from "date-fns";
import CircularProgressBar from "./RadialProgressBar";
import { GoLocation } from "react-icons/go";
import { useRouter } from "next/navigation";
import { CgSmartphoneShake } from "react-icons/cg";
import { RxArrowLeft } from "react-icons/rx";
import { CiLocationOn } from "react-icons/ci";
import { LuTag } from "react-icons/lu";
import { BiArea } from "react-icons/bi";
import { FinishedShares } from "@/app/assets/svg";
import {postSave,deleteSave,deleteSaves} from "@/redux/features/mySave"
import Link from "next/link";
import JoinStatusButtons from "./JoinButton";
import { AppDispatch, RootState } from "@/redux/store";
import {addSave,removeSave} from "@/redux/features/getRequest"
import { useDispatch, useSelector } from "react-redux";
import { dataReturn, addUnqiue } from "@/redux/features/getRequest";
import Cookie from 'js-cookie';
import {userInfo,saveElement} from "@/type/addrealestate"
import ModalMapComponent from "@/app/components/shared/ModalMap"
import {  ModalRef } from "@/app/components/shared/modal.component";
type PropertyCardProps = {
  page?: number;
  limit?: number;
};

const PropertyCard: React.FC<PropertyCardProps> = ({ page, limit }) => {
  const [saved, setSaved] = useState<dataReturn|null>(null);
  let router = useRouter();
  let dispatch = useDispatch<AppDispatch>();
  const [showNotification, setShowNotification] = useState(false);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState<userInfo | null>(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  let save=useMemo(()=>{
      return (ele:dataReturn)=>{
       return ele?.propertySaved?.map(({property_id}:saveElement)=>property_id).includes(ele?.id)
      }
  },[])
  const [location,setLocation]=useState({
    lat:0,
    long:0
  })
  const modalRef = useRef<ModalRef>(null);
  let { loading, message, data } = useSelector<RootState>(
    (state) => state.getRequest
  ) as { loading: boolean; message: string; data: dataReturn[] };
  let { loading:loadingSave, message:messageSave, data:dataSave } = useSelector<RootState>(
    (state) => state.save
  ) as { loading: boolean; message: string; data: any };
  const handleSaveClick = (ele:any) => {
    setSaved(ele)
    if(ele?.id){
      if(save(ele)==false){
        dispatch(postSave({property_id:ele?.id}))
      }else{
        dispatch(deleteSaves({id:ele?.id}))
      }
    }
  };

  const renderCards = (ele: dataReturn, offerIndex: number) => {
    const cards = [];
    // landDetails

    for (let i = 0; i < ele?.details?.length; i++) {
      cards.push(
        <div
          key={`${ele?.details[i]?.id}-0`}
          className="bg-white shadow-lg rounded-lg p-2 mb-4"
        >
          <div className="flex flex-row flex-no-wrap items-center justify-center md:flex-row sm:flex-col ">
            <div className="ml-auto text-right py-1 ">
              <div className="flex flex-row">
                <p className="text-2xl px-4 text-black font-bold">
                  {ele?.details[i]
                    ? ele?.details[i]?.type
                    : ele?.propertyType?.title}
                </p>
              </div>
              <div className="flex flex-col gap-y-2 my-2 flex-wrap items-start">
                <div className="bg-gray-200 rounded-xl  flex items-center p-2">
                  <LuTag />
                  <p className="text-base  md:text-xs lg:text-sm mx-2">
                    {ele?.details[i]?.price || ele?.price} {"ريال"}
                    <span className="text-[#3B73B9]">
                      {" "}
                      (بدون القيمة المضافة أو السعي)
                    </span>
                  </p>
                </div>
                <div className="bg-gray-200 rounded-xl p-2 mr-4 flex items-center">
                  <BiArea />
                  <p className="text-base md:text-xs lg:text-sm mx-2 ">
                    {ele?.details[i]?.area || ele?.area} م<sup>2</sup>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center  rounded-full p-2">
              {ele?.details[i]?.stage == "finished" ? (
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
                      percentage={ele?.details[i]?.available_percentage}
                      size={50}
                      strokeWidth={5}
                    />
                  </span>
                  <div className="">
                    <p className="text-xs text-gray-500">متاح</p>
                    <p className="text-xs text-gray-500">
                      {ele?.details[i]?.available_price}ريال
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <JoinStatusButtons
            currentDealStatus={ele?.details[i]?.stage == "finished"}
            data={ele?.details[i]}
            dataMain={ele}
          />
        </div>
      );
    }
    if (ele?.details?.length == 0) {
      for (
        let i = 0;
        i <
        (ele?.landDetails?.length > 2 && show == false
          ? 2
          : ele?.landDetails?.length);
        i++
      ) {
        cards.push(
          <div
            key={`${ele?.landDetails[i]?.id}-`}
            className="bg-white shadow-lg rounded-lg p-2 mb-4"
          >
            <div className="flex flex-row flex-no-wrap items-center justify-center md:flex-row sm:flex-col ">
              <div className="ml-auto text-right py-1 ">
                <div className="flex flex-row">
                  <p className="text-2xl px-4 text-black font-bold">
                    {ele?.landDetails[i]?.plan_number &&
                      `قطعة رقم  ${ele?.landDetails[i]?.plan_number}`}
                  </p>
                </div>
                <div className="flex flex-col gap-y-2  my-2  items-start flex-wrap ">
                  <div className="bg-gray-200 rounded-xl px-2 flex items-center">
                    <LuTag />
                    <p className="text-base md:text-xs lg:text-sm mx-2">
                      {ele?.landDetails[i]?.price} {"ريال"}
                      <span className="text-[#3B73B9]">
                        {" "}
                        (بدون القيمة المضافة أو السعي)
                      </span>
                    </p>
                  </div>
                  <div className="bg-gray-200 rounded-xl px-2 mr-4 flex items-center">
                    <BiArea />
                    <p className="text-base md:text-xs lg:text-sm mx-2 ">
                      {ele?.landDetails[i]?.area} م<sup>2</sup>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center  rounded-full p-2">
                {ele?.landDetails[i]?.stage == "finished" ? (
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
                        percentage={ele?.landDetails[i]?.available_percentage}
                        size={50}
                        strokeWidth={5}
                      />
                    </span>
                    <div className="">
                      <p className="text-xs text-gray-500">متاح</p>
                      <p className="text-xs text-gray-500">
                        {ele?.landDetails[i]?.available_price}ريال
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <JoinStatusButtons
              currentDealStatus={ele?.landDetails[i]?.stage == "finished"}
              data={ele?.landDetails[i]}
              dataMain={ele}
            />
          </div>
        );
      }
    }

    return cards;
  };
  let dataPage = useMemo(() => {
    return page && limit ? data?.slice((page - 1) * limit, page * limit) : data;
  }, [data, page, limit]);
  useEffect(() => {
    const storedToken = Cookie.get("user");
    if(storedToken&&storedToken!="undefined" ){
      const makeObject=JSON.parse(storedToken)
      setUser(makeObject);
    }
}, []);
  useEffect(()=>{
    if(messageSave&&Boolean(dataSave)==true){
        setNotificationMessage("تم الحفظ");
        dispatch(addSave({id:dataSave?.property_id,data:dataSave}))
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
  
    }else if (messageSave=="Properties removed successfully"&&Boolean(dataSave)==false){
      setNotificationMessage("تم الغاء الحفظ");
      dispatch(removeSave({id:saved?.id}))
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
    return ()=>{
      dispatch(deleteSave())
    }
  },[messageSave,dataSave,dispatch,saved?.id])
  return (
    <div className="mb-4">
      {dataPage?.map((ele: dataReturn, offerIndex: number) => (
        <div key={ele?.id} id="offerCard" className="flex flex-col ">
          <div className="flex flex-col mt-4 mx-2 border-2 rounded-lg p-4 bg-white">
            <div className="flex justify-between py-2 container items-start">
              <div className="flex flex-col justify-between h-full items-start">
                <p className="text-2xl px-4 text-black mb-4 font-bold">
                  {ele?.propertyType?.title || ele?.propertyTypeDetails?.title}
                </p>
                <div className="flex flex-row gap-x-2">
                  <span
                    className={`text-white text-right px-4 py-1 rounded-2xl ${
                      ele?.propertyPurpose?.title === "بيع"
                        ? "bg-green-450"
                        : "bg-orange-450"
                    }`}
                  >
                    {ele?.propertyPurpose?.title === "بيع"
                      ? ele?.propertyPurpose?.title
                      : "تطوير"}
                  </span>
                  <span
                    className={`text-black text-right px-4 py-1 rounded-2xl ${"bg-gray-200"}`}
                  >
                    {ele?.propertyOwnerType?.title}
                  </span>
                  <span
                    className={`text-black text-right px-4 py-1 rounded-2xl ${"bg-gray-200"}`}
                  >
                    {format(new Date(ele?.createdAt), "yyyy-MM-dd")}
                  </span>
                </div>
                <div className="pt-2 text-sm text-gray-500 mt-2">
                  <p>رقم الطلب: {ele?.id}</p>
                </div>
                <div className="pt-1 mr-4 text-sm text-gray-700 mt-2">
                  {ele?.license_number && (
                    <div className="flex items-center justify-start">
                      <CgSmartphoneShake className="w-[16px]" />
                      <p className="px-2">ترخيص رقم: {ele?.license_number}</p>
                    </div>
                  )}

                  <div className="flex items-center  justify-start">
                    <GoLocation />
                    <p className="px-2">
                      مدينة {ele?.propertyLocation?.city}،{" "}
                      {ele?.propertyLocation?.district?.replace(
                        /[\[\]\\"]/g,
                        ""
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[40px] h-[40px] border-2 rounded-full flex items-center justify-center cursor-pointer" onClick={()=>{
                  setLocation({
                    lat:ele?.propertyLocation?.lat,
                    long:ele?.propertyLocation?.long
                  })
                  modalRef?.current?.open()
              }}>
                <CiLocationOn className="text-5xl w-[24px] h-[24px]" />
              </div>
            </div>
            {renderCards(ele, offerIndex)}
            {/* <div className="flex justify-start items-center mt-4">
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
            </div> */}

            {ele?.landDetails?.length > 2 && (
              <div className="flex justify-center mb-2 items-center">
                <button
                  type="button"
                  className="text-blue-500 w-3/4 font-bold text-xl px-5 py-2 flex justify-center items-center"
                  onClick={() => setShow(!show)}
                >
                  عرض كل العقارات
                  <FaAngleDoubleLeft className="mr-4 text-xl text-blue-500" />
                </button>
              </div>
            )}
            <hr className="h-px  bg-gray-200 border-0" />
            <div className="flex justify-around items-center mt-4">
              <div className="flex flex-row  py-1 items-center justify-center">
                <Link href={`/showproperty/${ele?.id}`} onClick={() => {}}>
                  <button className="text-blue-500 mx-4 align-middle">
                    عرض التفاصيل
                  </button>
                </Link>
                <FaEllipsisH className="text-blue-500 mx-2 align-middle" />
              </div>
              <div className="bg-gray-300 inline-block h-12 w-0.5 self-stretch"></div>

              <div className="flex flex-row py-1 items-center justify-center">
                <button
                  onClick={()=>handleSaveClick(ele)}
                  className={`${ele?.user_id==user?.id?"text-gray-500":"text-blue-500"} mx-2 align-middle`}
                  disabled={ele?.user_id==user?.id}
                >
                  {save(ele) ? "إلغاء الحفظ" : "حفظ"}
                </button>
                <FaBookmark className={`${ele?.user_id==user?.id?"text-gray-500":"text-blue-500"} mx-2 text-xl align-middle`} />
              </div>

              {showNotification && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 text-white px-4 py-2 rounded-full">
                  {notificationMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <ModalMapComponent refModel={modalRef} lat={location?.lat} long={location?.long}/>
    </div>
  );
};

export default PropertyCard;

//last modified by Omar Marei 3/8/2024
