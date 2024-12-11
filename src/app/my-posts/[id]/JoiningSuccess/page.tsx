"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { CiNoWaitingSign } from "react-icons/ci";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { postMyAdvertise } from "@/redux/features/getMyAdvertise";
import { Check } from "@/app/assets/svg";
import { eventAnalistic } from "@/utils/event-analistic";

export default function JoiningSuccess() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [success, setSucces] = useState(true);
  const [message, setMessage] = useState("");
  const hasSentRequest = useRef(false);
  const search = searchParams.get("status");
  const property_id = searchParams.get("property_id");
  const amount = searchParams.get("amount");

  const onSend = async () => {
    dispatch(
      postMyAdvertise({ property_id: Number(property_id), amount: 500 })
    ).then((res: any) => {
      if (res?.payload?.data) {
        eventAnalistic({
          action: "payment_advertise",
          category: "advertisement",
          label: "Item added to payment advertise",
          value: "add payment advertise",
        });
        setSucces(true);
        setMessage(res.payload.message);
        toast.success(res.payload.message);
      } else if (res?.payload?.status) {
        setSucces(false);
        setMessage(res.payload.message);
        toast.error(res.payload.message);
      }
    });
  };
  useEffect(() => {
    if (
      !hasSentRequest.current &&
      search == "paid" &&
      property_id != "undefined" &&
      amount != "undefined"
    ) {
      hasSentRequest.current = true;
      onSend();
    }
  }, []);

  return (
    <div className="flex justify-center w-dvh h-max  ">
      <div className="w-full bg-white rounded text-black shadow ">
        <div className="flex">
          <main className="container mx-auto ">
            <section className=" rounded text-center">
              <div className="flex flex-col border-2 shadow-lg p-2 rounded-lg justify-around items-center py-10">
                {success && search == "paid" ? (
                  <Check />
                ) : search == "failed" ? (
                  <IoMdCloseCircleOutline className="text-[9rem] text-red-500" />
                ) : search == "pending" ? (
                  <CiNoWaitingSign className="text-[9rem] text-blue-450" />
                ) : (
                  ""
                )}

                <h2 className="my-4 font-bold text-xl">
                  {success && search == "paid"
                    ? "تم اضافة  الاعلان بنجاح"
                    : search == "failed"
                    ? "لم يتم اضافة الاعلان"
                    : search == "pending"
                    ? " سيتم الموافقة بعد التاكد من وصول التحويل البنكي"
                    : ""}
                </h2>

                <div className="flex bg-gray-100 items-center justify-center py-2 px-2 rounded-2xl my-4 ">
                  <span className="mr-2 ml-2 text-lg font-bold">
                    <h4>{property_id != "undefined" && property_id}</h4>
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
