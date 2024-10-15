"use client";
import React,{useEffect,useState} from "react";
import Link from "next/link"
import { Check } from "@/app/assets/svg";
import toast from "react-hot-toast"
import { IoMdCloseCircleOutline } from "react-icons/io";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from 'next/navigation'
import { postPaymentType, removeStatePayment, postPaymentFileType } from "@/redux/features/postRequest"

export default function JoiningSuccess() {
  const dispatch = useDispatch<AppDispatch>()
    const searchParams = useSearchParams()
  const [success,setSucces]=useState(false)
  const [message,setMessage]=useState("")

  const search = searchParams.get('status')
  const property_id=searchParams.get('property_id')
  const details_id=searchParams.get('details_id')
  const type=searchParams.get('type')

  useEffect(()=>{
    if(search=="paid"){
      if(type=="false"){
dispatch(postPaymentType({
                      property_id: Number(property_id),
                      details_id: Number(details_id),
                      
                      amount: Number(sessionStorage.getItem("amount"))
      })).then((res: any) => {
        if (res.payload.data) {
          setSucces(true)
          setMessage(res.payload.message)
          toast.success(res.payload.message);
        } else if (res.payload.status) {
          setSucces(false)
          setMessage(res.payload.message)
          toast.error(res.payload.message);
        }
      })
      }else if(type=="true"){
dispatch(postPaymentType({
                      property_id: Number(property_id),
                      land_details_id: Number(details_id),
                      
                      amount: Number(sessionStorage.getItem("amount"))
      })).then((res: any) => {
        if (res.payload.data) {
          setSucces(true)
          setMessage(res.payload.message)
          toast.success(res.payload.message);
          
        } else if (res.payload.status) {
          setSucces(false)
          setMessage(res.payload.message)
          toast.error(res.payload.message);
         
        }
      })
      }
    }
  },[search])

  return (
    <div className="flex justify-center w-dvh h-max  ">
      <div className="w-full bg-white rounded text-black shadow ">
        <div className="flex">
          <main className="container mx-auto ">
            <section className=" rounded text-center">
              <div className="flex flex-col border-2 shadow-lg p-2 rounded-lg justify-around items-center py-10">
               {success? <Check />:<IoMdCloseCircleOutline className="text-[9rem] text-red-500"/>}

                <h2 className="my-4 font-bold text-xl">
                 {success? "تم الاشتراك في العقار بنجاح":"لم يتم الاشتراك في العقار"}
                </h2>
                <p className="my-4 font-bold text-xl ">{message}</p>
                <div className="flex bg-gray-100 items-center justify-center py-2 px-2 rounded-2xl my-4 ">
                  <span className="mr-2 ml-2 text-lg font-bold">
                    <h4>{property_id}</h4>
                  </span>
                  <p>رقم الشراكة</p>
                </div>
              </div>
              <div className=" p-4 py-6 flex flex-col justify-center">
                <Link
                  href="/chat"
                  className="bg-blue-450 text-white border-blue-500  font-medium rounded-lg text-sm px-5 py-2.5 mx-4 flex justify-center"

                 >
                  عرض المحادثات
                </Link>
                <Link
                  href={`/my-offer?title=شراكاتي`}
                  className=" text-blue-450 border-2 border-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 mx-4 my-4 flex justify-center"
                  
                >
                  الذهاب الى شراكاتي
                </Link>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}


//last modified by Omar Marei 2/8/2024