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
import Cookie from 'js-cookie';
import {fetchToken}from "@/redux/features/userSlice"
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
import {deleteProperty,removeDelete,UpdataExpiredDateProperty} from "@/redux/features/getPartners"
interface criteriaInfo {
  dealStatus: string,
  city: string,
  district: string,
  unitType: string | number,
  unitStatus: boolean,
  realEstateStatus:string,
  purposeStatus:string,
  priceRange: number[],
  shareRange: number[],
}

let statuses=[{title:"متاح"},{title:"محجوز"},{title:"تحت الشراكة"}]
export const GitMyOffers = () => {
  const router = useRouter();
  const modalRef = useRef<ModalRef>(null);
  const modalRefDetail = useRef<ModalRef>(null);
  const modalRefUpdate = useRef<ModalRef>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [optionFilter, setOption] = useState<string>("");
  const [criteria, setCriteria] = useState<any>({
    dealStatus: "",
    city: "",
    district: "",
    unitType: "",
    realEstateStatus: "",
    purposeStatus:"",
    priceRange: [500000, 20000000],
    shareRange: [10, 90],
    unitStatus: false,
  });
  const [idDelete, setId] = useState<number>();
  const dispatch = useDispatch<AppDispatch>();
  let {
    loading,
    message,
    data: dataOffer,
  } = useSelector<RootState>((state) => state.offers) as {
    loading: boolean;
    message: string;
    data: RealEstateTypeInter[];
  };
  const handleSelect = (option: string) => {
    setOption(option);
  };
  const {  token } = useSelector<RootState>(
    (state) => state.register
  ) as {  token:string };
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
      purpose:dataOrderOne?.propertyPurpose?.title,
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
      propertyOwnerType:dataOrderOne?.propertyOwnerType?.title,
      details:
        dataOrderOne?.details && dataOrderOne?.details?.length > 0
          ? dataOrderOne?.details
          : dataOrderOne?.landDetails &&
            dataOrderOne?.landDetails?.length > 0 &&
            dataOrderOne?.landDetails,
    }));
  }, [dataOffer]);
  let fiterData = useMemo(() => {
    return {
      min_price: criteria?.priceRange[0] != 500000 ? criteria?.priceRange[0] : null,
      max_price: criteria?.priceRange[1] != 20000000 ? criteria?.priceRange[1] : null,
      min_percentage:criteria?.shareRange[0]!=10?criteria?.shareRange[0]:null,
      max_percentage:criteria?.shareRange[1]!=90?criteria?.shareRange[1]:null,
      city:criteria?.city,
      district:criteria?.district,
      property_type_details_id: criteria?.unitType!=0?criteria?.unitType:null
      ,property_purpose_id:criteria?.purposeStatus!=0?criteria?.purposeStatus:null
      ,status: (criteria?.dealStatus=="متكامل")?"complete":"available" ,
      sort: optionFilter == "الأحدث الى الأقدم" ? "created_desc" : optionFilter == "الأقدم الى الأحدث" ? "created_asc" : optionFilter == "الميزانية ( الأدنى الى الأعلى)" ? "price_asc" : optionFilter == "الميزانية ( الأعلى الى الأدنى)"?"price_decs":""
      ,finance:criteria?.unitStatus
      // option=="الأحدث إلى الأقدم"?handleSelect("latest"):option=="الأقدم الى الأحدث"?handleSelect("oldest"):option=="الميزانية ( الأدنى الى الأعلى)"?handleSelect("priceLowToHigh"):handleSelect("priceHighToLow")
    }
  }, [criteria,optionFilter])
  let dataPagination = useMemo(() => {
    return dataOffers?.slice((currentPage - 1) * 3, currentPage * 3);
  }, [dataOffers, currentPage]);
  const onDelete=()=>{
    if(idDelete){
      dispatch(deleteProperty({id:idDelete})).then((res:any)=>{
        if(res.payload.message&&!res.payload.status){
          toast.success(res.payload.message);
        dispatch(deleteOffer({data:dataOffer?.filter((dataOrderOne:RealEstateTypeInter)=>Number(dataOrderOne?.id)!==idDelete)}))
        }else if(res.payload.status){
          toast.error(res.payload.message);
        }
      })
      modalRef.current?.close()
    }
  }
  const onExpiredDate=()=>{
    if(idDelete){
      dispatch(UpdataExpiredDateProperty({id:idDelete})).then((res:any)=>{
        if(res.payload.data){
          toast.success(res.payload.message);
         
        }else if(res.payload.status){
          toast.error(res.payload.message);
        }
      })
      modalRefUpdate.current?.close()
    }
  }
  useEffect(() => {
    dispatch(fetchToken())
  }, [dispatch])
 
  useEffect(()=>{
   
    return ()=>{
      dispatch(removeDelete())
    }
  },[dispatch])
  useEffect(() => {
    if (token) {
      dispatch(getOffer({}));
    }
  }, [token, dispatch]);
  useEffect(() => {
    dispatch(getOffer({
      sort: optionFilter == "الأحدث الى الأقدم" ? "created_desc" : optionFilter == "الأقدم الى الأحدث" ? "created_asc" : optionFilter == "الميزانية ( الأدنى الى الأعلى)" ? "price_asc" : optionFilter == "الميزانية ( الأعلى الى الأدنى)"?"price_decs":""
    }))
  }, [ optionFilter, dispatch])
  return (
    <div className="p-4 bg-white">
      {isFilterModalOpen && (
        <FilterModalOffer
          onClose={() => setIsFilterModalOpen(false)}
          onFilter={(criteria) => {
            // Filter logic to be added later
            dispatch(getOffer(fiterData))
            setIsFilterModalOpen(false);
          }}
          onCloseRequest={()=>dispatch(getOffer({}))}
          open={isFilterModalOpen}
          setCriteria={setCriteria}
          criteria={criteria}
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
      {statuses?.map((status:any)=><span key={status?.title} className={`rounded-md border border-[#E5E7EB] text-sm font-normal text-[#6B7280] pl-3 pr-3 pt-1 pb-1 cursor-pointer 
            ${
                  criteria.realEstateStatus === status?.title ? "bg-blue-450 text-white" : "bg-white text-gray-900"
                }
            `}onClick={()=>setCriteria({...criteria,realEstateStatus:status?.title})}>
            {status?.title}
          </span>)}  
      
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
                  propertyOwnerType={offer.propertyOwnerType}
                  lisNumber={offer.lisNumber}
                  details={offer.details}
                  onDelete={() => {modalRef.current?.open();setId(offer?.id)}}
                  onUpdate={() => {modalRefUpdate.current?.open();setId(offer?.id)}}
                  house={offer.house}
                  id={offer.id}
                  // room_id={offer.details?.room[0]?.id}
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
      <Modal ref={modalRefUpdate} size="xs">
                <div
                  className="items-start flex justify-center flex-col p-4 "
                  style={{ direction: "rtl" }}
                >
                  <div className="flex flex-row items-center justify-center mb-3  w-full">
                    <div
                      className="flex flex-1 cursor-pointer"
                      onClick={() => modalRefUpdate.current?.close()}
                    >
                      <CloseIconSmall />
                    </div>
                    <div className="flex  w-full items-center justify-center">
                      <p className="font-bold text-base text-[#374151]">
                        تنويه
                      </p>
                    </div>
                  </div>

                  <div className="border border-[#E5E7EB] w-full mb-4" />

                  <div>
                    <span>
                      <p className="text-base font-normal text-[#4B5563] mb-2">
                        سيتم تحديث الطلب رقم ({idDelete}) لمدة 30 يوم من الان
                      </p>
                    </span>
                  </div>

                  <div className="border border-[#E5E7EB] w-full mb-4" />

                  <div className="flex flex-row items-center justify-center gap-3  w-full">
                    <Button
                      text="تحديث"
                      onClick={onExpiredDate}
                      className="!text-xs !font-medium"
                    />
                    <Button
                      text="الغاء"
                      onClick={() => modalRefUpdate.current?.close()}
                      className="!bg-white !text-[#1F2A37] !border !border-[#E5E7EB] !rounded-lg !text-xs !font-medium"
                    />
                  </div>
                </div>
              </Modal>
    </div>
  );
};
