"use client";
import MainHeader from "@/app/components/header/MainHeader";
import { BackButtonOutline, MessageIcon } from "@/app/assets/svg";
import { useRouter, useParams } from "next/navigation";
import { OtherOfferCard } from "../myOtherOfferCrd";
import { useEffect, useMemo } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getOtherOrders } from "@/redux/features/getOrders";
function OtherOffer() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  let { loadingOther, messageOther, dataOther } = useSelector<RootState>(
    (state) => state.requests
  ) as {
    loadingOther: boolean;
    messageOther: string;
    dataOther: any;
  };
  const params = useParams();
  let { id } = params;
  const handleBack = () => {
    router.push(`/my-offer?title=طلباتي`);
  };
  useEffect(() => {
    if (id) {
      dispatch(getOtherOrders({ id: Number(id) }));
    }
  }, [id, dispatch]);
  return (
    <div className="flex flex-col items-center min-h-screen h-full w-full bg-white">
      <MainHeader />
      <div style={{ direction: "rtl" }} className=" w-full">
        <div>
          <div className="flex items-center justify-center">
            <div>
              <button onClick={handleBack}>
                <BackButtonOutline />
              </button>
            </div>
            <div className="flex flex-1  items-center justify-center">
              <p className="flex items-center justify-center text-[#36343B] font-bold text-xl">
                عروض بديلة للطلب ({params?.id})
              </p>
            </div>
          </div>
        </div>
        <hr className="h-px my-8 bg-gray-300 border-0 dark:bg-gray-700" />
        <div className="m-2">
          {dataOther?.map((offer: any, index: number) => (
            <>
              <OtherOfferCard key={index} otheroffer={offer} />
            </>
          ))}
        </div>
        {dataOther?.length == 0 && (
          <div className="flex flex-col items-center justify-center p-9 w-full">
            <MessageIcon />
            <p className="font-medium text-3xl text-[#6B7280] mt-6">
              لا شيء هنا!
            </p>
            <p className="text-base font-normal text-[#9CA3AF] mt-3">
              لا توجد اي محادثات هنا بعد
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
export default OtherOffer;
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
