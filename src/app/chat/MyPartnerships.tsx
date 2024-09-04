"use client";
import React, { useState,useEffect } from "react";
import { TextInput } from "../components/shared/text-input.component";
import { Block, MessageIcon, Search } from "@/app/assets/svg";
import { ChatCard } from "./ChatCard";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { format } from 'date-fns';  
import Cookie from 'js-cookie';

import {
  Note
} from "../assets/svg";
import { FaRegUserCircle } from "react-icons/fa";
const message = [
  {
    count: 2,
    subtitle: "هذا النص هو مثال لنص.....",
    title: "ارض سكنية - قطعة رقم 1234 (رقم الطلب 2022)",
    time: "8:53AM",
    image: <Block />,
  },
  {
    count: 5,
    subtitle: "هذا النص هو مثال لنص.....",
    title: "ارض سكنية - قطعة رقم 1234 (رقم الطلب 2022)",
    time: "8:53AM",
    image: <Block />,
  },
  {
    count: 8,
    subtitle: "هذا النص هو مثال لنص.....",
    title: "ارض سكنية - قطعة رقم 1234 (رقم الطلب 2022)",
    time: "8:53AM",
    image: <Block />,
  },
  {
    count: 1,
    subtitle: "هذا النص هو مثال لنص.....",
    title: "ارض سكنية - قطعة رقم 1234 (رقم الطلب 2022)",
    time: "8:53AM",
    image: <Block />,
  },
  {
    count: 1,
    subtitle: "هذا النص هو مثال لنص.....",
    title: "ارض سكنية - قطعة رقم 1234 (رقم الطلب 2022)",
    time: "8:53AM",
    image: <Block />,
  },
  {
    count: 1,
    subtitle: "هذا النص هو مثال لنص.....",
    title: "ارض سكنية - قطعة رقم 1234 (رقم الطلب 2022)",
    time: "8:53AM",
    image: <Block />,
  },
];

export const MyPartnerships = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const OnClick = () => {
    router.push("/ChatPage");
  };
  let{loading,message:messagePartners,data}=useSelector<RootState>((state)=>state.messagePartners) as {
    loading:boolean,
    message:string,
    data:any
  }
  useEffect(() => {
   
      const storedToken = Cookie.get("token");
      if(storedToken){
        setToken(storedToken);
      }
    
  }, []);
  return (
    <div className="p-4 bg-white">
      <div>
        <TextInput inputProps={{ placeholder: "بحث" }} icon={<Search />} />
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

        ) :data?.length > 0 ? (
          data?.map(((message:any, index:number) => (
            <ChatCard
              key={message?.id}
              count={1}
              subtitle={message.lastMessage.message}
              title={message?.property?.propertyTypeDetails?.title?`${message?.property?.propertyTypeDetails?.title} ${message?.property?.propertyType?.title}`:`${message?.property?.propertyType?.title} قطعة رقم ${message?.landDetails?.plan_number}`}
              time={format(message.lastMessage?.createdAt, 'hh:mm a')}
              image={<Block />}
              onClick={OnClick}
            />
          )))
        ) : (
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
};
