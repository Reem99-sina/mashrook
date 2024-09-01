"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import toast from "react-hot-toast"
import { TextInput } from "../components/shared/text-input.component";
import {
  CloseIconSmall,
  Filter,
  InfoOutLine,
  Note,
  Search,
} from "../assets/svg";
import { useRouter } from "next/navigation";
import Pagination from "../components/shared/pagination";
import FilterDropdown from "../components/shared/FilterDropdown";
import { OfferCard } from "./offerCard";
import { format } from "date-fns";
import { Tune, MenuWhite } from "@/app/assets/svg";
import FilterModalOffer from "./filterModalOffer";
import { FaRegUserCircle } from "react-icons/fa";
import { Modal, ModalRef } from "../components/shared/modal.component";
import { Button } from "../components/shared/button.component";
import { getOffer,deleteOffer } from "@/redux/features/getOffers";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { RealEstateTypeInter } from "@/redux/features/postRealEstate";
import {deleteProperty,removeDelete} from "@/redux/features/getPartners"
const data = [
  {
    title: "أرض تجارية",
    inProgress: true,
    date: "2024-4-23",
    requestNumber: 2020,
    count: 8,
    city: "الرياض",
    district: "المروج,البطحاء",
    budget: "300,000 ريال - 500,000 ريال",
    type: "مشاع (صك مشترك)",
    purpose: "للبيع",
    lisNumber: "45678",
    details: [
      {
        piece_number: "5644347",
        price: "45672",
        area: "456728",
        stage: "finished",
        available_price: "45637",
        available_percentage: "98",
        currentStep: 2,
      },
    ],
  },
  {
    title: "شقة (داخل فيلا) ",
    expired: true,
    date: "2024-4-23",
    requestNumber: 2020,
    count: 8,
    city: "الرياض",
    district: "المروج,البطحاء",
    budget: "300,000 ريال - 500,000 ريال",
    type: "مشاع (صك مشترك)",
    purpose: "للبيع",
    lisNumber: "45678",

    house: true,

    details: [
      {
        piece_number: "",
        price: "45672",
        area: "456728",
        stage: "pending",
        available_price: "45637",
        available_percentage: "98",
        title: "دور ارضي",
        currentStep: 1,
      },
      {
        piece_number: "",
        price: "45672",
        area: "456728",
        stage: "pending",
        available_price: "45637",
        available_percentage: "98",
        title: "دور علوي",
        currentStep: 1,
      },
      {
        piece_number: "",
        price: "45672",
        area: "456728",
        stage: "pending",
        available_price: "45637",
        available_percentage: "98",
        title: "شقة",
        currentStep: 2,
      },
    ],
  },
  {
    title: "أرض تجارية",
    active: true,
    date: "2024-4-23",
    requestNumber: 2020,
    count: 8,
    city: "الرياض",
    district: "المروج,البطحاء",
    budget: "300,000 ريال - 500,000 ريال",
    type: "مشاع (صك مشترك)",
    purpose: "للبيع",
    lisNumber: "45678",
    details: [
      {
        piece_number: "5644347",
        price: "45672",
        area: "456728",
        stage: "pending",
        available_price: "45637",
        available_percentage: "98",
        currentStep: 2,
      },
    ],
  },
];

export const GitMyOffers = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [optionFilter, setOption] = useState<string>("");
  const [idDelete, setId] = useState<number>();
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
  let {
    messageDelete
  } = useSelector<RootState>((state) => state.partners) as {
   
    messageDelete: string;
  
  };
  const handleSelect = (option: string) => {
    setOption(option);
  };
  const [token, setToken] = useState<string | null>(null);
  let dataOffers = useMemo(() => {
    return dataOffer?.map((dataOrderOne: RealEstateTypeInter) => ({
      id:dataOrderOne?.id,
      title:
        dataOrderOne?.propertyTypeDetails?.title ||
        dataOrderOne?.propertyType?.title,
      inProgress: true,
      date: dataOrderOne?.createdAt
        ? format(new Date(dataOrderOne?.createdAt), "yyyy-MM-dd")
        : "",
      requestNumber: dataOrderOne?.id,
      count: 8,
      city: dataOrderOne?.propertyLocation?.city,

      district: dataOrderOne?.propertyLocation?.district?.replace(/[\[\]\\"]/g, ''),
      house: true,
      budget:
        dataOrderOne?.details && dataOrderOne?.details?.length > 0
          ? `${dataOrderOne?.details[0]?.min_price} ريال -${dataOrderOne?.details[0]?.price} ريال`
          : dataOrderOne?.landDetails &&
            dataOrderOne?.landDetails?.length > 0 &&
            `${dataOrderOne?.landDetails[0]?.min_price} ريال -${dataOrderOne?.landDetails[0]?.price} ريال`,
      type:
        dataOrderOne?.details && dataOrderOne?.details?.length > 0
          ? `${dataOrderOne?.details[0]?.status}`
          : dataOrderOne?.landDetails &&
            dataOrderOne?.landDetails?.length > 0 &&
            `${dataOrderOne?.landDetails[0]?.status}`,
      lisNumber: dataOrderOne?.license_number,
      details:
        dataOrderOne?.details && dataOrderOne?.details?.length > 0
          ? dataOrderOne?.details
          : dataOrderOne?.landDetails &&
            dataOrderOne?.landDetails?.length > 0 &&
            dataOrderOne?.landDetails,
    }));
  }, [dataOffer]);
  let dataPagination = useMemo(() => {
    return dataOffers?.slice((currentPage - 1) * 3, currentPage * 3);
  }, [dataOffers, currentPage]);
  const onDelete=()=>{
    if(idDelete){
      dispatch(deleteProperty({id:idDelete}))
      modalRef.current?.close()
    }
  
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = sessionStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);
  const modalRef = useRef<ModalRef>(null);
  useEffect(()=>{
    if(messageDelete=="تم حذف العقار بنجاح"){
      toast.success(messageDelete)
      dispatch(deleteOffer({data:dataOffer?.filter((dataOrderOne:any)=>dataOrderOne?.id!==idDelete)}))
    }else if(messageDelete){
      toast.error(messageDelete)
    }
    return ()=>{
      dispatch(removeDelete())
    }
  },[messageDelete,dataOffer,idDelete,dispatch])
  useEffect(() => {
    if (token) {
      dispatch(getOffer());
    }
  }, [token, dispatch]);

  return (
    <div className="p-4 bg-white">
      {isFilterModalOpen && (
        <FilterModalOffer
          onClose={() => setIsFilterModalOpen(false)}
          onFilter={(criteria) => {
            // Filter logic to be added later
            setIsFilterModalOpen(false);
          }}
          open={isFilterModalOpen}
        />
      )}
      <div className="flex flex-row items-center justify-center gap-2">
        <TextInput inputProps={{ placeholder: "بحث" }} icon={<Search />} />
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setIsFilterModalOpen(!isFilterModalOpen);
          }}
          className="flex items-center"
        >
          <div
            className={`py-1 rounded-md border-2 border-blue-500 ${
              isFilterModalOpen ? "bg-blue-450" : "bg-white"
            }`}
          >
            {isFilterModalOpen ? (
              <MenuWhite className={`text-xl mx-2 my-1`} />
            ) : (
              <Tune className={`text-xl mx-2`} />
            )}
          </div>
        </button>
        <span>
          <FilterDropdown
            options={[
              "الأحدث الى الأقدم",
              "الأقدم الى الأحدث",
              "الميزانية ( الأدنى الى الأعلى)",
              "الميزانية ( الأعلى الى الأدنى)",
            ]}
            onSelect={handleSelect}
            optionFilter={optionFilter}
          />
        </span>
      </div>

      <div className="mt-5 mb-5 flex flex-row gap-2">
        <span className="rounded-md border border-[#E5E7EB] text-sm font-normal text-[#6B7280] pl-3 pr-3 pt-1 pb-1">
          متاحة
        </span>

        <span className="rounded-md border border-[#E5E7EB] text-sm font-normal text-[#6B7280] pl-3 pr-3 pt-1 pb-1">
          المنتهية
        </span>
        <span className="rounded-md border border-[#E5E7EB] text-sm font-normal text-[#6B7280] pl-3 pr-3 pt-1 pb-1">
          مكتملة
        </span>
      </div>

      <div>
        {!token ? (
          <>
            <div className="flex flex-col items-center justify-center p-9 w-full gap-y-3">
              <Note />
              <p className="font-medium text-3xl text-[#6B7280] mt-6">
                قم بمتابعة طلباتك هنا
              </p>
              <p className="text-base font-normal text-[#9CA3AF] mt-3">
                قم بتسجيل الدخول لعرض طلباتي
              </p>
              <button
                type="button"
                className={`${"bg-blue-450 text-white hover:bg-blue-800 border-2 border-blue-500"}  font-medium rounded-lg text-sm px-5 py-2.5 flex justify-center  rtl:flex-row-reverse dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                onClick={() => router.push("/login")}
              >
                تسجيل الدخول
                <FaRegUserCircle className={`mr-4 text-xl ${"text-white"}`} />
              </button>
              <button></button>
            </div>
          </>

        ) : dataPagination?.length > 0 ? (
          <div>
            <div>
              {dataPagination?.map((offer: any, index: number) => (

                <OfferCard
                  key={offer.title+index}
                  title={offer.title}
                  count={offer.count}
                  date={offer.date}
                  requestNumber={offer.requestNumber}
                  city={offer.city}
                  district={offer.district}
                  budget={offer.budget}
                  type={offer.type}
                  inProgress={offer.inProgress}
                  active={offer.active}
                  expired={offer.expired}
                  purpose={offer.purpose}
                  lisNumber={offer.lisNumber}
                  details={offer.details}
                  onDelete={() => {modalRef.current?.open();setId(offer?.id)}}
                  house={offer.house}
                  id={offer.id}
                />
              ))}
            </div>
            <div>
              <Pagination   pageCount={Math.ceil(dataOffers?.length / 3)}
                  onPageChange={(p) => setCurrentPage(p)}/>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-9 w-full">
            <Note />
            <p className="font-medium text-3xl text-[#6B7280] mt-6">
              لا شيء هنا!
            </p>
            <p className="text-base font-normal text-[#9CA3AF] mt-3">
              لا توجد لديك طلبات لعرضها
            </p>
          </div>
        )}
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
                هل أنت متأكد من رغبتك في تنفيذ اجراء حذف العرض رقم ({idDelete}) ؟
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
              onClick={onDelete}
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
    </div>
  );
};
