"use client"
import { BackButtonOutline } from "../assets/svg";
import { useRouter } from "next/navigation";
import { TextInput } from "@/app/components/shared/text-input.component";
import { Button } from "@/app/components/shared/button.component";
import {useState,useEffect,useMemo} from "react"
import { FaCheckCircle } from "react-icons/fa";
import FilterPart from "./component/filterPart"
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {getSaves} from "@/redux/features/mySave"
import { OfferCard } from "./component/offerCard";
import { format } from "date-fns";
import {
  Note
} from "@/app/assets/svg";
const MySavePage=()=>{
    const router = useRouter();
    let [user,setUser]=useState("")
    let [send,setSend]=useState(false)
    const dispatch = useDispatch<AppDispatch>();
    let {loading,message,data}=useSelector<RootState>((state)=>state?.save) as {
      loading:boolean,
      message:string,
      data:any
    }
    const handleBack = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        router.push("/my-account");
      };
      let dataSaves = useMemo(() => {
    return data?.map((dataSave: any) => ({
      id:dataSave?.id,
      title:
        dataSave?.propertyTypeDetails?.title ||
        dataSave?.propertyType?.title,
      inProgress: true,
      date: dataSave?.createdAt
        ? format(new Date(dataSave?.createdAt), "yyyy-MM-dd")
        : "",
      requestNumber: dataSave?.id,
      count: 8,
      city: dataSave?.propertyLocation?.city,

      district: dataSave?.propertyLocation?.district?.replace(/[\[\]\\"]/g, ''),
      house: true,
      budget:
        dataSave?.details && dataSave?.details?.length > 0
          ? `${dataSave?.details[0]?.min_price} ريال -${dataSave?.details[0]?.price} ريال`
          : dataSave?.landDetails &&
            dataSave?.landDetails?.length > 0 &&
            `${dataSave?.landDetails[0]?.min_price} ريال -${dataSave?.landDetails[0]?.price} ريال`,
      type:
        dataSave?.details && dataSave?.details?.length > 0
          ? `${dataSave?.details[0]?.status}`
          : dataSave?.landDetails &&
            dataSave?.landDetails?.length > 0 &&
            `${dataSave?.landDetails[0]?.status}`,
      lisNumber: dataSave?.license_number,
      details:
        dataSave?.details && dataSave?.details?.length > 0
          ? dataSave?.details
          : dataSave?.landDetails &&
            dataSave?.landDetails?.length > 0 &&
            dataSave?.landDetails,
    }));
  }, [data]);
  
      useEffect(()=>{
        dispatch(getSaves())
      },[dispatch])
      // getSaves
    return (
         <>
            <div className="flex items-center justify-center m-2">
                 <div>
                   <button onClick={handleBack}>
                     <BackButtonOutline />
                   </button>
                 </div>
                 <div className="flex flex-1  items-center justify-center border-b-2 border-gray-200">
                   <p className="flex items-center justify-center text-[#36343B] font-bold text-xl pb-2">
                     محفوظاتي
                   </p>
                 </div>
               </div>
               <div style={{direction:"ltr"}} className="m-5">
                  <FilterPart/>
               </div>
              {dataSaves?.length>0?dataSaves?.map((offer:any,index:number)=> <OfferCard
              key={offer?.id}
                 offer={offer}
                />): (
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
           </>
      
    )
}
export default MySavePage