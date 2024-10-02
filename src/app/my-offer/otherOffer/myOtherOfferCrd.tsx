"use client";
import React,{useState,useRef,useMemo,useEffect} from "react";
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
import { format } from "date-fns";
import Link from "next/link";
import JoinStatusButtons from "@/app/components/propertyCard/JoinButton";
import ModalMapComponent from "@/app/components/shared/ModalMap"
import {  ModalRef } from "@/app/components/shared/modal.component";
import {FormatNumber} from "@/app/hooks/formatNumber"
import {
  FaRegCalendarAlt,
  FaBookmark,
  FaEllipsisH,
  FaAngleDoubleLeft,
} from "react-icons/fa";
import { AppDispatch, RootState } from "@/redux/store";
import {addSave,removeSave} from "@/redux/features/getRequest"
import { useDispatch, useSelector } from "react-redux";
import { BsChatSquareText } from "react-icons/bs";
import { RxArrowLeft } from "react-icons/rx";
import { Button } from "@/app/components/shared/button.component";
import Stepper from "@/app/components/shared/Stepper";
import { CgSmartphoneShake } from "react-icons/cg";
import CircularProgressBar from "@/app/components/propertyCard/RadialProgressBar";
import { FinishedShares } from "@/app/assets/svg";
import { GoLocation } from "react-icons/go";
import { LuTag } from "react-icons/lu";
import { BiArea } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import {fetchuser} from "@/redux/features/userSlice"
import {postSave,deleteSave,deleteSaves} from "@/redux/features/mySave"
import {userInfo,saveElement,dataReturnType} from "@/type/addrealestate"
interface ChatCardProps {
 
  onEdit?: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
 otheroffer:dataReturnType
}

export const OtherOfferCard: React.FC<ChatCardProps> = ({
  onEdit,
  onUpdate,
  onDelete,
  otheroffer
}) => {
  const steps = ["الانتهاء", "السعي", "دفع الرسوم", "انضمام الشركاء"];
  const currentStep = 1;
  let dispatch = useDispatch<AppDispatch>();
  const {  user } = useSelector<RootState>(
    (state) => state.register
  ) as { user:userInfo,message:string };
  const save=useMemo(()=>{
    return (otheroffer:dataReturnType)=>{
     return otheroffer?.propertySaved?.map(({property_id}:saveElement)=>property_id).includes(otheroffer?.id)
    }
},[])
  const [location,setLocation]=useState({
    lat:0,
    long:0
  })
  const modalRef = useRef<ModalRef>(null);
  useEffect(() => {
    dispatch(fetchuser())
}, [dispatch]);
  useEffect(()=>{
    return ()=>{
      dispatch(deleteSave())
    }
  },[dispatch])
  return (
    <div className="mt-4 w-full border-2 border-[#E5E7EB] rounded-lg mb-4 flex flex-col p-4">
      <div className="items-center justify-between  flex-row flex relative">
        <p className="text-xl font-bold text-[#374151]">{otheroffer?.propertyType?.title} </p>

        <div className="w-[40px] h-[40px] border-2 rounded-full flex items-center justify-center cursor-pointer" onClick={()=>{
                  setLocation({
                    lat:otheroffer?.propertyLocation?.lat,
                    long:otheroffer?.propertyLocation?.long
                  })
                  modalRef?.current?.open()
              }}>
                <CiLocationOn className="text-5xl w-[24px] h-[24px]" />
              </div>
      </div>
      <div className="flex gap-2 mt-2">
        <div className="flex flex-row gap-x-2 text-xs">
          <span
            className={`text-white text-right px-4 py-1 rounded-2xl ${
              otheroffer?.propertyPurpose?.title === "بيع" ? "bg-green-450" : "bg-orange-450"
            }`}
          >
            {otheroffer?.propertyPurpose?.title === "بيع" ? "للبيع" : "للتطوير"}
          </span>
          <span
            className={`text-black text-right px-4 py-1 rounded-2xl ${"bg-gray-200"}`}
          >
            {otheroffer?.propertyOwnerType?.title}
          </span>
          <span
            className={`text-black text-right px-4 py-1 rounded-2xl ${"bg-gray-200"}`}
          >
            {format(otheroffer?.createdAt,"yyyy-MM-dd")}
          </span>
        </div>

       
      </div>

      <div className=" mt-2">
        <p className="text-xs text-[#6B7280] font-normal">
          رقم الطلب: {otheroffer?.id}
        </p>
      </div>
      <div className="pt-1 mr-4 text-sm text-gray-700 mt-2">
        <div className="flex items-center justify-start">
          <CgSmartphoneShake className="w-[16px]" />
          <p className="px-2">ترخيص رقم: {otheroffer?.license_number}</p>
        </div>
        <div className="flex items-center  justify-start">
          <GoLocation />
          <p className="px-2">
            مدينة {otheroffer?.propertyLocation?.city}، {otheroffer?.propertyLocation?.district?.replace(/[\[\]\\"]/g, '')}
          </p>
        </div>
      </div>
      <div className="gap-1 mt-2 flex flex-col">
        {otheroffer?.details?.map((detail, index) => (
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
                        {FormatNumber(detail?.price)} {"ريال"}
                        <span className="text-[#3B73B9]">
                          {" "}
                          (بدون ضريبة التصرفات العقارية و السعي)
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
                          {FormatNumber(detail?.available_price)}ريال
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <JoinStatusButtons
            currentDealStatus={detail?.stage == "finished"}
            data={detail}
            dataMain={otheroffer}
          />
            </div>
          </>
        ))}
          <hr className="h-px  bg-gray-200 border-0" />
            <div className="flex justify-around items-center mt-2">
              <div className="flex flex-row   items-center justify-center">
                <Link href={`/showproperty/${otheroffer?.id}`} onClick={() => {}}>
                  <button className="text-blue-500 mx-4 align-middle">
                    عرض التفاصيل
                  </button>
                </Link>
                <FaEllipsisH className="text-blue-500 mx-2 align-middle" />
              </div>
              {/* <div className="bg-gray-300 inline-block h-12 w-0.5 self-stretch"></div> */}

              {/* <div className="flex flex-row py-1 items-center justify-center">
                <button
                  // onClick={handleSaveClick}
                  className={`${(otheroffer?.user_id==user?.id||!user)?"text-gray-500":"text-blue-500"} mx-2 align-middle`}
                  disabled={(otheroffer?.user_id==user?.id||!user)}
                >
                  {save(otheroffer) ? "إلغاء الحفظ" : "حفظ"}
                </button>
                <FaBookmark className="text-blue-500 mx-2 text-xl align-middle" />
              </div> */}
              </div>
      </div>

      <ModalMapComponent refModel={modalRef} lat={location?.lat} long={location?.long}/>
    </div>
  );
};
