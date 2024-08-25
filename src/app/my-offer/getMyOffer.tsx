"use client";
import React,{useState} from "react";
import { TextInput } from "../components/shared/text-input.component";
import { Filter, Note, Search } from "../assets/svg";
import { useRouter } from "next/navigation";
import Pagination from "../components/shared/pagination";
import FilterDropdown from "../components/shared/FilterDropdown";
import { OfferCard } from "./offerCard";
import {Tune,MenuWhite} from "@/app/assets/svg"
import FilterModal from "./filterModal";
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
    purpose:"للبيع",
    lisNumber:"45678",
    details:[{
        piece_number:"5644347",
        price:"45672",
        area:"456728",
        stage:"finished",
        available_price:"45637",
        available_percentage:"98",
        currentStep:2
    }]
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
     purpose:"للبيع",
     lisNumber:"45678",
     details:[{
        piece_number:"",
        price:"45672",
        area:"456728",
        stage:"pending",
        available_price:"45637",
        available_percentage:"98",
        title:"دور ارضي",
        currentStep:1

    },{
        piece_number:"",
        price:"45672",
        area:"456728",
        stage:"pending",
        available_price:"45637",
        available_percentage:"98",
        title:"دور علوي",
        currentStep:1
    },{
        piece_number:"",
        price:"45672",
        area:"456728",
        stage:"pending",
        available_price:"45637",
        available_percentage:"98",
        title:"شقة",
        currentStep:2

    }]
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
     purpose:"للبيع",
     lisNumber:"45678",
     details:[{
        piece_number:"5644347",
        price:"45672",
        area:"456728",
        stage:"pending",
        available_price:"45637",
        available_percentage:"98",
        currentStep:2

    }]
  },
];

export const GitMyOffers = () => {
  const router = useRouter();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [optionFilter, setOption] = useState<string>("");

  const handleSelect = (option: string) => {
    setOption(option)
    console.log("Selected:", option);
  };

  return (
    <div className="p-4 bg-white">
        {isFilterModalOpen && (
            <FilterModal
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
              onClick={(e) => {e.preventDefault();setIsFilterModalOpen(!isFilterModalOpen)}}
              className="flex items-center"
            >
              <div className={`py-1 rounded-md border-2 border-blue-500 ${isFilterModalOpen?"bg-blue-450":"bg-white"}`}>
                {isFilterModalOpen?<MenuWhite  className={`text-xl mx-2 my-1`}/>:<Tune className={`text-xl mx-2`} />}
              </div>
            </button>
        {/* <span className="border border-[#E5E7EB] rounded-lg p-3">
          <Filter />
        </span> */}
        
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
        {data.length > 0 ? (
          <div>
            <div>
              {data.map((offer, index) => (
                <OfferCard
                  key={index}
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
                />
              ))}
            </div>
            <div>
              <Pagination pageCount={4} onPageChange={() => {}} />
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
    </div>
  );
};
