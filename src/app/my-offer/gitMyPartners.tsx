"use client";
import React, { useRef,useState ,useEffect,useMemo} from "react";
import { TextInput } from "../components/shared/text-input.component";
import { FaRegUserCircle } from "react-icons/fa";
import { format } from "date-fns";
import {
  CloseIconSmall,
  Filter,
  InfoOutLine,
  PartnersIcon,
  Search,
  Note
} from "../assets/svg";
import Pagination from "../components/shared/pagination";
import {getPartner }from "@/redux/features/getPartners"
import { useRouter } from "next/navigation";
import FilterDropdown from "../components/shared/FilterDropdown";
import { PartnersCard } from "./PartnersCard";
import { Modal, ModalRef } from "../components/shared/modal.component";
import { Button } from "../components/shared/button.component";
import {Tune,MenuWhite} from "@/app/assets/svg"
import FilterModalPartner from "./filterModalPartner"
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  RealEstateTypeInter
} from "@/redux/features/postRealEstate";
const data = [
  {
    title: "ارض سكنية - قطعة رقم 1256",
    inProgress: true,
    date: "2024-4-23",
    requestNumber: 2020,
    count: 8,
    city: "الرياض",
    district: "المروج,البطحاء",
    budget: "300,000 ريال",
    PartnershipNumber: 2020,
    realEstate: "قطعة رقم 1256",
    bidRequestNumber: 2020,
    partnershipRatio: 50,
    purpose:"للبيع"
  },
  {
    title: "ارض سكنية - قطعة رقم 1256",
    date: "2024-4-23",
    requestNumber: 2020,
    count: 8,
    city: "الرياض",
    district: "المروج,البطحاء",
    budget: "300,000 ريال",
    PartnershipNumber: 2020,
    realEstate: "قطعة رقم 1256",
    bidRequestNumber: 2020,
    partnershipRatio: 50,
    purpose:"للبيع"
  },
];

export const GitMyPartners = () => {
  const handleSelect = (option: string) => {
   
  };
  const dispatch = useDispatch<AppDispatch>();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const modalRef = useRef<ModalRef>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  let [newData,setNewData]=useState<any>([])
  let { loading, message, data:dataPartner } =
  useSelector<RootState>((state) => state.partners) as {
    loading: boolean;
    message: string;
    data: any;   
  };
  useEffect(()=>{
     dataPartner?.map((dataPartnerOne:RealEstateTypeInter)=>(
      (dataPartnerOne?.propertyDetailsOwnership?.map((ele:any)=>{
        let id=ele?.details_id
        let idLand=ele?.land_details_id
        let title=(dataPartnerOne?.propertyTypeDetails?.title||dataPartnerOne?.propertyType?.title)+" "+(ele?.details?.type||ele?.landDetails?.type||ele?.landDetails?.piece_number)
       
        setNewData((prev:any)=>[...prev,{ id:dataPartnerOne?.id,title: title?title:"",
        date:dataPartnerOne?.createdAt?format(new Date( dataPartnerOne?.createdAt), "yyyy-MM-dd"):"",
        requestNumber: ele?.id,
        count: 8,
        city: dataPartnerOne?.propertyLocation?.city,
        district: dataPartnerOne?.propertyLocation?.district?.replace(/[\[\]\\"]/g, ''),
        budget: `${ele?.amount} ريال`,
        PartnershipNumber: ele?.id,
        realEstate: (ele?.details?.type)||(ele?.landDetails?.type?ele?.landDetails?.type:"قطعة رقم "+ele?.landDetails?.piece_number),
        bidRequestNumber: dataPartnerOne?.id,
        partnershipRatio: ele?.percentage,
        purpose:dataPartnerOne?.propertyPurpose?.title,
        finance:dataPartnerOne?.finance
      }])
      }
      ))))
      return ()=>{
        setNewData([])
      }
  },[dataPartner])
  let dataNew=useMemo(()=>{
    console.log(newData,"newData")
  },[
    newData
  ])
  
  let dataPagination=useMemo(()=>{
    return newData?.slice(
      (currentPage - 1) * 3,
      currentPage * 3
    )
      
  },[newData,currentPage])
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = sessionStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);
  useEffect(()=>{
    if(token){
      dispatch(getPartner())
    }
  },[token,dispatch])
  return (
    <div className="p-4 bg-white">
      {isFilterModalOpen && (
            <FilterModalPartner
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
              onClick={(e:React.MouseEvent<HTMLButtonElement>) => {e.preventDefault();setIsFilterModalOpen(!isFilterModalOpen)}}
              className="flex items-center"
            >
              <div className={`py-1 rounded-md border-2 border-blue-500 ${isFilterModalOpen?"bg-blue-450":"bg-white"}`}>
                {isFilterModalOpen?<MenuWhite  className={`text-xl mx-2 my-1`}/>:<Tune className={`text-xl mx-2`} />}
              </div>
            </button>
        <span>
          <FilterDropdown
            options={[
              "الأحدث الى الأقدم",
              "الأقدم الى الأحدث",
              " الميزانية ( الأدنى الى الأعلى)",
              "الميزانية ( الأعلى الى الأدنى)",
            ]}
            onSelect={handleSelect}
          />
        </span>
      </div>

      <div className="mt-5 mb-5 flex flex-row gap-2">
        <span className="rounded-md border border-[#E5E7EB] text-sm font-normal text-[#6B7280] pl-3 pr-3 pt-1 pb-1">
          تحت التقدم
        </span>

        <span className="rounded-md border border-[#E5E7EB] text-sm font-normal text-[#6B7280] pl-3 pr-3 pt-1 pb-1">
          مكتملة
        </span>
      </div>

      <div>

        {!token? <>
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
                className={`${"bg-blue-450 text-white hover:bg-blue-800 border-2 border-blue-500"
                }  font-medium rounded-lg text-sm px-5 py-2.5 flex justify-center  rtl:flex-row-reverse dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                
                  onClick={()=>router.push("/login")}
              >
                تسجيل الدخول
                <FaRegUserCircle
                  className={`mr-4 text-xl ${
                  
                       "text-white"
                  }`}
                />
              </button>
            <button>
              
            </button>
          </div>
  
</>:dataPagination?.length > 0 ? (
          <div>
            <div>
              {dataPagination?.map((offer:any, index:number) => (
                <PartnersCard
                  key={index}
                  title={offer?.title}
                  count={offer.count}
                  date={offer.date}
                  requestNumber={offer.requestNumber}
                  city={offer.city}
                  district={offer.district}
                  budget={offer.budget}
                  purpose={offer.purpose}
                  finance={offer.finance}
                  PartnershipNumber={offer.PartnershipNumber}
                  inProgress={offer.inProgress}
                  realEstate={offer.realEstate}
                  bidRequestNumber={offer.bidRequestNumber}
                  partnershipRatio={offer.partnershipRatio}
                  onRetreat={() => modalRef.current?.open()}
                  onShow={()=>router.push(`/showpartner/${offer?.id}`)}
                />
              ))}
            </div>

            <Modal ref={modalRef} size="xs">
              <div
                className="items-start flex justify-center flex-col p-4 "
                style={{ direction: "rtl" }}
              >
                <div className="flex flex-row items-center justify-center mb-3  w-full">
                  <div className="flex flex-1">
                    <CloseIconSmall />{" "}
                  </div>
                  <div className="flex  w-full items-center justify-center">
                    <p className="font-bold text-base text-[#374151]">تحذير!</p>
                  </div>
                </div>

                <div className="border border-[#E5E7EB] w-full mb-4" />

                <div>
                  <span>
                    <p className="text-base font-normal text-[#4B5563]">
                      هل أنت متأكد من رغبتك في تنفيذ الانسحاب من الطلب رقم
                      (2022)؟
                    </p>
                  </span>
                  <div className="bg-[#FDE8E8] rounded-md mt-5 mb-5 flex items-center justify-start p-1 flex-row gap-1 ">
                    <InfoOutLine />
                    <p className="font-medium text-[10px] text-[#4B5563]">
                      في حال قمت بالانسحاب من الطلب لن يتم ارجاع رسوم الخدمة
                      المدفوعة
                    </p>
                  </div>
                </div>

                <div className="border border-[#E5E7EB] w-full mb-4" />

                <div className="flex flex-row items-center justify-center gap-3  w-full">
                  <Button
                    text="تأكيد الانسحاب"
                    onClick={() => modalRef.current?.close()}
                    className="!text-xs !font-medium"
                  />
                  <Button
                    text="الغاء"
                    onClick={() => modalRef.current?.close()}
                    className="!bg-[#E5E7EB] !text-[#1F2A37] !text-xs !font-medium"
                  />
                </div>
              </div>
            </Modal>

            <div>
            <Pagination pageCount={Math.ceil(newData?.length/3)} onPageChange={(p) =>setCurrentPage(p)} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-9 w-full">
            <PartnersIcon />
            <p className="font-medium text-3xl text-[#6B7280] mt-6">
              لا شيء هنا!
            </p>
            <p className="text-base font-normal text-[#9CA3AF] mt-3">
              لا توجد لديك شراكات لعرضها{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
