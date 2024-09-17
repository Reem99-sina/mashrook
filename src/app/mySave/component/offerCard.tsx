"use client";
import React,{useState,useEffect} from "react";
import {
  Accreditation,
  Dots,
  DeleteIcon,
  EditIcon,
  OtherOffer,
  UpdateIcon,
  Rebuild,
  ChatIconSmall,
} from "@/app/assets/svg";
import {postSave,deleteSave,deleteSaves,deleteSaveId} from "@/redux/features/mySave"
import {
  FaRegCalendarAlt,
  FaBookmark,
  FaEllipsisH,
  FaAngleDoubleLeft,
} from "react-icons/fa";
import { BsChatSquareText } from "react-icons/bs";
import Link from "next/link"
import { Button } from "@/app/components/shared/button.component";
import Stepper from "@/app/components/shared/Stepper";
import { CgSmartphoneShake } from "react-icons/cg";
import CircularProgressBar from "@/app/components/propertyCard/RadialProgressBar";
import { FinishedShares } from "@/app/assets/svg";
import { GoLocation } from "react-icons/go";
import { LuTag } from "react-icons/lu";
import { BiArea } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
interface ChatCardProps {
  offer:any
}

export const OfferCard: React.FC<ChatCardProps> = ({
offer
}) => {
  const steps = ["الانتهاء", "السعي", "دفع الرسوم", "انضمام الشركاء"];
  const currentStep = 1;
  const [showNotification, setShowNotification] = useState(false);
  let dispatch = useDispatch<AppDispatch>();
  const [notificationMessage, setNotificationMessage] = useState("");
  const [saved, setSaved] = useState(false);
  let { loading:loadingSave, message:messageSave, data:dataSave } = useSelector<RootState>(
    (state) => state.save
  ) as { loading: boolean; message: string; data: any };
  let router = useRouter();
  const handleSaveClick = (id:number) => {
 
    if(id){
    
        dispatch(deleteSaves({id:id}))
      
    }
  };
  useEffect(()=>{
    if (messageSave=="Properties removed successfully"){
      
      setNotificationMessage("تم الغاء الحفظ");
      setShowNotification(true);
      dispatch(deleteSaveId({data:dataSave?.filter((ele:any)=>ele?.property?.id!=offer?.requestNumber)}))
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
    return ()=>{
      dispatch(deleteSave())
    }
  },[messageSave,dataSave,dispatch,offer?.requestNumber])
  return (
    <div className="mt-4 w-full border-2 border-[#E5E7EB] rounded-lg mb-4 flex flex-col p-4" key={offer?.requestNumber}>
      <div className="items-center justify-between  flex-row flex relative">
        <p className="text-xl font-bold text-[#374151]">{offer?.title} </p>

        <Link className="items-center justify-center flex border border-[#E5E7EB] p-2 rounded-md gap-1 " href={`/showproperty/${offer?.requestNumber}`}>
          <p className="font-medium text-sm text-[#3B73B9]">عرض التفاصيل </p>
          <Dots />
        </Link>
      </div>
      <div className="flex gap-2 mt-2">
        <div className="flex flex-row gap-x-2 text-xs">
          <span
            className={`text-white text-right px-4 py-1 rounded-2xl ${
              offer?.purpose === "للبيع" ? "bg-green-450" : "bg-orange-450"
            }`}
          >
            {offer?.purpose === "للبيع" ? offer?.purpose : "تطوير"}
          </span>
         
          <span
            className={`text-black text-right px-4 py-1 rounded-2xl ${"bg-gray-200"}`}
          >
            {offer?.date}
          </span>
        </div>
      </div>

      <div className=" mt-2">
        <p className="text-xs text-[#6B7280] font-normal">
          رقم الطلب: {offer?.requestNumber}
        </p>
      </div>
      <div className="pt-1 mr-4 text-sm text-gray-700 mt-2">
        <div className="flex items-center justify-start">
          <CgSmartphoneShake className="w-[16px]" />
          <p className="px-2">ترخيص رقم: {offer?.lisNumber}</p>
        </div>
        <div className="flex items-center  justify-start">
          <GoLocation />
          <p className="px-2">
            مدينة {offer?.city}، {offer?.district}
          </p>
        </div>
      </div>
      <div className="gap-1 mt-2 flex flex-col">
        {offer?.details?.map((detail:any, index:number) => (
          <>
            <div
              key={`detail-${index}`}
              className="bg-white shadow-lg rounded-lg p-2 mb-4"
            >
              <div className="flex flex-row flex-no-wrap items-center justify-center md:flex-row sm:flex-col ">
                <div className="ml-auto text-right py-1 ">
                  <div className="flex flex-row">
                    <p className="text-2xl px-4 text-black font-bold">
                      {detail?.type
                        ? detail?.type
                        : detail?.piece_number &&
                          `قطعة رقم  ${detail?.piece_number}`}
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-2 my-2 flex-wrap items-start">
                    <div className="bg-gray-200 rounded-xl px-2 flex items-center">
                      <LuTag />
                      <p className="text-base  md:text-xs lg:text-sm mx-2">
                        {detail?.price} {"ريال"}
                        <span className="text-[#3B73B9]">
                          {" "}
                          (بدون القيمة المضافة أو السعي)
                        </span>
                      </p>
                    </div>
                    <div className="bg-gray-200 rounded-xl px-2 mr-4 flex items-center">
                      <BiArea />
                      <p className="text-base md:text-xs lg:text-sm mx-2 ">
                        {detail?.area} م<sup>2</sup>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center  rounded-full p-2">
                  {detail?.stage == "finished" ? (
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
                          percentage={Number(detail?.available_percentage)}
                          size={50}
                          strokeWidth={5}
                        />
                      </span>
                      <div className="">
                        <p className="text-xs text-gray-500">متاح</p>
                        <p className="text-xs text-gray-500">
                          {detail?.available_price}ريال
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <hr className="border-gray-200 dark:border-white my-2" />
        
              {/* <button
                type="button"
                className={`${
                  detail?.stage === "finished"
                    ? "bg-gray-300 text-gray-800"
                    : "bg-blue-450 text-white hover:bg-blue-800 border-2 border-blue-500"
                }  font-medium rounded-lg text-sm px-5 py-2.5 flex justify-center w-full rtl:flex-row-reverse dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                disabled={detail?.stage === "finished"}
                //   onClick={handleDialogToggle}
              >
                
                عرض المحادثات
                <BsChatSquareText
                  className={`mr-4 text-xl ${
                    detail?.stage === "finished"
                      ? "text-gray-600"
                      : "text-white"
                  }`}
                />
              </button> */}
            </div>
          </>
        ))}
      </div>

      <div className="flex justify-around items-center mt-4">
              <div className="flex flex-row  py-1 items-center justify-center">
                <Link href={`/showproperty/${offer?.requestNumber}`} onClick={() => {}}>
                  <button className="text-blue-500 mx-4 align-middle">
                    عرض التفاصيل
                  </button>
                </Link>
                <FaEllipsisH className="text-blue-500 mx-2 align-middle" />
              </div>
              <div className="bg-gray-300 inline-block h-12 w-0.5 self-stretch"></div>

              <div className="flex flex-row py-1 items-center justify-center">
                {/* {   console.log(offer,"id")} */}
                <div
                  onClick={()=>handleSaveClick(offer?.property_id)}
                 
                  className={`text-blue-500 mx-2 align-middle cursor-pointer`}
                  // disabled={ele?.user?.email==user?.email}
                >
                  { "إلغاء الحفظ" }
                </div>
                <FaBookmark
                 className={`
                 ${
                  // ele?.user?.email==user?.email?
                //   true?
                //  "text-gray-500"
                //  :
                 "text-blue-500"} mx-2 text-xl align-middle`} />
              </div>

              {showNotification && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 text-white px-4 py-2 rounded-full">
                  {notificationMessage}
                </div>
              )}
            </div>
    </div>
  );
};
