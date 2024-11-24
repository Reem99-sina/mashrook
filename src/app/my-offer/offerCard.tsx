"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  Accreditation,
  Dots,
  DeleteIcon,
  EditIcon,
  OtherOffer,
  UpdateIcon,
  InfoOutLine,
  CloseIconSmall,
} from "../assets/svg";
import toast from "react-hot-toast";
import {
  steps,
  PartnerStage,
  PartnerOwnStage,
  PartnerDeveloperStage,
  PartnerDeveloperNoSellStage,
} from "@/type/addrealestate";
import {
  RealEstateTypeInter,
  earthInter,
} from "@/redux/features/postRealEstate";
import { Modal, ModalRef } from "../components/shared/modal.component";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Stepper from "../components/shared/Stepper";
import { BsChatSquareText, BsDatabase } from "react-icons/bs";
import Link from "next/link";
import Cookie from "js-cookie";
import { Button } from "../components/shared/button.component";
import { CgSmartphoneShake } from "react-icons/cg";
import CircularProgressBar from "../components/propertyCard/RadialProgressBar";
import { FinishedShares } from "@/app/assets/svg";
import { GoLocation } from "react-icons/go";
import { LuTag } from "react-icons/lu";
import { BiArea } from "react-icons/bi";
import {
  deleteOfferDetailOrLand,
  deleteOfferDetail,
  deleteMessage,
} from "@/redux/features/getOffers";
import { useRouter } from "next/navigation";
import { FormatNumber } from "@/app/hooks/formatNumber";
import { detailOneInfo } from "@/type/addrealestate";
import { CiWallet } from "react-icons/ci";
interface ChatCardProps {
  title: string;
  date: string;
  count: number;
  status: string;
  onEdit?: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
  inProgress?: boolean;
  active?: boolean;
  expired?: boolean;
  requestNumber: number;
  city: string;
  id: number;
  district: string;
  budget: string;
  type: string;
  purpose: string;
  lisNumber: string;
  house?: boolean;
  currentStep: number;
  propertyOwnerType: string;
  details: {
    piece_number: string;
    price: string;
    area: string;
    stage: string;
    room: any;
    available_price: string;
    available_percentage: string;
    type?: string;
    onUpdate?: () => void;
    onDelete?: () => void;
    onEdit?: () => void;
    currentStep: number;
  }[];
}
interface detailType {
  detail_id?: number;
  land_detail_id?: number;
}
export const OfferCard: React.FC<ChatCardProps> = ({
  onEdit,
  onUpdate,
  onDelete,
  title,
  status,
  inProgress,
  active,
  expired,
  date,
  currentStep,
  requestNumber,
  count,
  city,
  district,
  id,
  budget,
  type,
  purpose,
  lisNumber,
  details,
  propertyOwnerType,
  house,
}) => {
  let router = useRouter();
  const modalRef = useRef<ModalRef>(null);
  const [idDelete, setId] = useState<detailType>();
  const dispatch = useDispatch<AppDispatch>();
  let {
    loading,
    message,
    data: dataOffer,
  } = useSelector<RootState>((state) => state.offers) as {
    loading: boolean;
    message: string;
    data: any;
  };

  const titleStatus = useMemo(() => {
    return PartnerStage?.find((partner) => partner?.data == status)?.label;
  }, [status, PartnerStage]);
  const userCard = useMemo(() => {
    if (dataOffer?.length > 0 && requestNumber && idDelete) {
      return dataOffer?.map((ele: RealEstateTypeInter) => {
        if (ele?.id == String(requestNumber)) {
          if (idDelete?.detail_id) {
            return {
              ...ele,
              details: ele?.details?.filter(
                (element: earthInter) => element?.id != idDelete?.detail_id
              ),
            };
          } else {
            return {
              ...ele,
              landDetails: ele?.landDetails?.filter(
                (element) => element?.id != idDelete?.land_detail_id
              ),
            };
          }
        }
        return ele;
      });
    }
  }, [requestNumber, idDelete, dataOffer]);
  const onDeleteDetail = () => {
    if (idDelete) {
      dispatch(deleteOfferDetailOrLand(idDelete)).then((res: any) => {
        if (res.payload.message && !res.payload.status) {
          toast.success(res.payload.message);
          if (
            idDelete?.detail_id ||
            (idDelete?.land_detail_id && userCard?.length > 0)
          ) {
            dispatch(deleteOfferDetail({ data: userCard }));
          }
        } else if (res.payload.status) {
          toast.error(res.payload.message);
        }
      });
      modalRef.current?.close();
    }
  };
  return (
    <div className="mt-4 w-full border-2  rounded-lg mb-4 flex flex-col p-4">
      <div className="items-center justify-between  flex-row flex relative">
        <p className="text-xl font-bold text-[#374151] ">{title} </p>

        <Link
          className="items-center justify-center flex border border-[#E5E7EB] p-2 rounded-md gap-1 "
          href={`/showproperty/${requestNumber}`}
        >
          <p className="font-medium text-sm text-[#3B73B9]">عرض التفاصيل </p>
          <Dots />
        </Link>
      </div>
      <div className="flex gap-2 mt-2">
        <div className="flex flex-row gap-[2px] text-xs items-center flex-wrap">
          <span
            className={`text-white text-right px-4 py-1 rounded-2xl ${
              purpose === "بيع" ? "bg-green-450" : "bg-orange-450"
            }`}
          >
            {purpose === "بيع" ? purpose : "تطوير"}
          </span>
          <span
            className={`text-black text-right px-4 py-1 rounded-2xl bg-gray-200 whitespace-nowrap`}
          >
            {propertyOwnerType}
          </span>

          {/* propertyOwnerType */}
          <span
            className={`text-black text-right px-4 py-1 rounded-2xl ${"bg-gray-200"} whitespace-nowrap`}
          >
            {date}
          </span>
          <span
            className={`text-black text-right px-4 py-1 rounded-2xl ${
              status == "rejected"
                ? "bg-[#F17EB8]"
                : status == "suspended"
                ? "bg-[#FDF6B2]"
                : "bg-gray-200"
            } whitespace-nowrap`}
          >
            {titleStatus}
          </span>
        </div>
      </div>
      <div className=" mt-2">
        <p className="text-xs text-[#6B7280] font-normal">
          رقم الطلب: {requestNumber}
        </p>
      </div>
      <div className="pt-1 mr-4 text-sm text-gray-700 mt-2">
        {lisNumber && (
          <div className="flex items-center justify-start">
            <CgSmartphoneShake className="w-[16px]" />
            <p className="px-2">رقم ترخيص الإعلان: {lisNumber}</p>
          </div>
        )}
        <div className="flex items-center  justify-start">
          <GoLocation />
          <p className="px-2">
            مدينة {city}، {district}
          </p>
        </div>
      </div>
      <Modal ref={modalRef} size="xs">
        <div
          className="items-start flex justify-center flex-col p-4 "
          style={{ direction: "rtl" }}
        >
          <div className="flex flex-row items-center justify-center mb-3  w-full">
            <div
              className="flex flex-1 cursor-pointer "
              onClick={() => modalRef.current?.close()}
            >
              <CloseIconSmall />
            </div>
            <div className="flex  w-full items-center justify-center">
              <p className="font-bold text-base text-[#374151]">تحذير!</p>
            </div>
          </div>

          <div className="border border-[#E5E7EB] w-full mb-4" />

          <div>
            <span>
              <p className="text-base font-normal text-[#4B5563]">
                هل أنت متأكد من رغبتك في تنفيذ اجراء حذف العرض رقم (
                {idDelete?.land_detail_id
                  ? idDelete?.land_detail_id
                  : idDelete?.detail_id}
                ) ؟
              </p>
            </span>
            <div className="bg-[#FDE8E8] rounded-md mt-5 mb-5 flex items-center justify-start p-1 flex-row gap-1 ">
              <InfoOutLine />
              <p className="font-medium text-[10px] text-[#4B5563]">
                في حال قمت بحذف الطلب سيتم حذف البيانات المتعلقة بالعرض ولن
                تتمكن من استرجاع الطلب
              </p>
            </div>
          </div>

          <div className="border border-[#E5E7EB] w-full mb-4" />

          <div className="flex flex-row items-center justify-center gap-3  w-full">
            <Button
              text=" حذف"
              onClick={onDeleteDetail}
              className="!text-xs !font-medium"
            />
            <Button
              text="الغاء"
              onClick={() => modalRef.current?.close()}
              className="!bg-white !text-[#1F2A37] !border !border-[#E5E7EB] !rounded-lg !text-xs !font-medium"
            />
          </div>
        </div>
      </Modal>
      <div className="gap-1 mt-2 flex flex-col">
        {details &&
          details?.length > 0 &&
          details?.map((detail: any, index: number) => (
            <div key={`detail-${index}`}>
              <div className="bg-white shadow-lg rounded-lg p-2 mb-4 border-2">
                <div className="flex flex-row flex-no-wrap items-center justify-center md:flex-row sm:flex-col ">
                  <div className="ml-auto text-right py-1 ">
                    <div className="flex flex-row">
                      <p className="text-2xl px-4 text-black font-bold">
                        {detail?.type
                          ? detail?.type
                          : detail?.plan_number &&
                            `قطعة رقم  ${detail?.plan_number}`}
                      </p>
                    </div>
                    <div className="flex flex-col gap-y-2 my-2 flex-wrap items-start">
                      <div className=" rounded-xl px-2  flex items-center gap-x-2">
                        <BiArea className="bg-gray-200 " />
                        <p> مساحة الارض</p>
                        <p className="text-base md:text-xs lg:text-sm mx-2 ">
                          {detail?.area} م<sup>2</sup>
                        </p>
                      </div>
                      <div className="rounded-xl px-2 flex items-center gap-x-2">
                        <LuTag className="bg-gray-200 " />
                        <p> سعر المتر  </p>
                        <p className="text-base  md:text-xs lg:text-sm mx-2">
                          {FormatNumber(detail?.price)} {"ريال"}
                        </p>
                      </div>
                      <div className=" rounded-xl px-2  flex items-center gap-x-2">
                        <BsDatabase className="bg-gray-200" />
                        <p>الاجمالي</p>
                        <p className="text-base mx-2 ">
                          {detail?.type
                            ? FormatNumber(detail?.price)
                            : FormatNumber(detail?.price * detail?.area)}{" "}
                          ريال
                        </p>
                      </div>
                      <div className=" rounded-xl px-2  flex items-center gap-x-2 ">
                        <CiWallet className="bg-gray-200" />
                        <p> المتاح</p>
                        <p className="text-base mx-2 ">
                          {FormatNumber(detail?.available_price)} ريال
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
                {/* {inProgress ? ( */}
                {/* <> */}
                <div className="p-4 w-full">
                  <Stepper
                    steps={
                      purpose === "بيع"
                        ? propertyOwnerType == "مالك"
                          ? PartnerOwnStage.map((step) => step?.label)
                          : PartnerDeveloperStage.map((step) => step?.label)
                        : PartnerDeveloperNoSellStage.map((step) => step?.label)
                    }
                    currentStep={currentStep >= 0 ? currentStep : 0}
                  />
                </div>
                <div className="flex items-center justify-center ">
                  <p className="text-xs text-[#6B7280] font-semibold">
                    مراحل الشراكة
                  </p>
                </div>
                {/* </> */}
                {/* ) : null} */}
                <hr className="border-gray-200 dark:border-white my-2" />
                <div className="flex flex-row items-center justify-center   gap-3 border-[#E5E7EB] my-5">
                  {house ? (
                    <Button
                      startIcon={<EditIcon />}
                      text="تعديل"
                      className="!bg-white disabled:!bg-gray-200 flex flex-row-reverse !text-[#3B73B9] disabled:!text-gray-500 !text-sm !font-medium !gap-1  !border-[#3B73B9] disabled:!border-gray-500 border-solid rounded-md border-2"
                      onClick={() => {
                        router.push("/edit-my-offer");
                        sessionStorage.setItem(
                          "offer",
                          JSON.stringify({ ...detail, title: title })
                        );
                      }}
                      disabled={detail?.currentStep > 1}
                    />
                  ) : (
                    <Button
                      startIcon={<EditIcon />}
                      text="تعديل"
                      className="!bg-white disabled:!bg-gray-200 flex flex-row-reverse !text-[#3B73B9] disabled:!text-gray-500 !text-sm !font-medium !gap-1  !border-[#3B73B9] disabled:!border-gray-500 border-solid rounded-md border-2"
                      onClick={detail?.onEdit}
                      disabled={detail?.currentStep > 1}
                    />
                  )}

                  <Button
                    startIcon={
                      <DeleteIcon className="disabled:!text-gray-500 !text-[#F05252]" />
                    }
                    text="حذف"
                    className="!bg-white disabled:!bg-gray-200 flex flex-row-reverse !text-[#F05252] disabled:!text-gray-500 !text-sm !font-medium !gap-1  !border-red-500 disabled:!border-gray-500 border-solid rounded-md border-2"
                    onClick={() => {
                      modalRef.current?.open();
                      setId(
                        detail?.type
                          ? { detail_id: detail?.id }
                          : { land_detail_id: detail?.id }
                      );
                    }}
                    disabled={detail?.currentStep > 1}
                  />
                </div>
                <Link
                  href={`/ChatPage/${detail?.room[0]?.id}`}
                  className={`${"bg-blue-450 text-white hover:bg-blue-800 border-2 border-blue-500"}  font-medium rounded-lg text-sm px-5 py-2.5 flex justify-center w-full rtl:flex-row-reverse dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                  onClick={() => {
                    Cookie.set(
                      "title",
                      detail?.type
                        ? `${title} ${detail?.type}`
                        : `${title} قطعة رقم ${detail?.plan_number}`
                    );
                    Cookie.set("senderId", String(detail?.room[0]?.sender_id));
                    Cookie.set(
                      "receiver_id",
                      String(detail?.room[0]?.receiver_id)
                    );
                  }}
                >
                  عرض المحادثات
                  <BsChatSquareText
                    className={`mr-4 text-xl ${
                      detail?.stage === "finished"
                        ? "text-gray-600"
                        : "text-white"
                    }`}
                  />
                </Link>
              </div>
            </div>
          ))}
      </div>

      <div className="flex flex-row items-center justify-center border-t-2 mt-5 border-[#E5E7EB]">
        <Button
          startIcon={<EditIcon />}
          text="تعديل"
          className="!bg-white !flex !flex-row-reverse !text-[#3B73B9] !text-sm !font-medium !gap-1 "
          onClick={() => router.push(`/edit-offer/${id}`)}
        />
        <span className="text-[#D1D5DB]">|</span>

        <Button
          startIcon={<UpdateIcon />}
          text="تحديث"
          className="!bg-white !flex !flex-row-reverse !text-[#3B73B9] !text-sm !font-medium !gap-1 "
          onClick={onUpdate}
        />

        <span className="text-[#D1D5DB]">|</span>

        <Button
          startIcon={<DeleteIcon />}
          text="حذف"
          className="!bg-white flex flex-row-reverse !text-[#F05252] !text-sm !font-medium gap-1 "
          onClick={onDelete}
        />
      </div>
    </div>
  );
};
