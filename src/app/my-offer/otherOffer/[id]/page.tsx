"use client"
import MainHeader from "@/app/components/header/MainHeader";
import { BackButtonOutline } from "@/app/assets/svg";
import { useRouter,useParams } from "next/navigation";
import {OtherOfferCard} from "../myOtherOfferCrd"

function OtherOffer() {
  const router = useRouter();
  const params = useParams(); 
  const handleBack = () => {
    router.push("/my-offer");
  };
  console.log(params,"params")
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
         {data.map((offer, index) => (<>
                <OtherOfferCard
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
               

                </>
              ))}
        </div>

        </div>
    </div>

  )
}
export default OtherOffer
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