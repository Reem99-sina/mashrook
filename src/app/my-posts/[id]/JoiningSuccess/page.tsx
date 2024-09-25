"use client";
import React from "react";

import Link from "next/link"
import { Check } from "@/app/assets/svg";

export default function JoiningSuccess() {
  return (
    <div className="flex justify-center w-dvh h-max  ">
      <div className="w-full bg-white rounded text-black shadow ">

        <div className="flex">
          <main className="container mx-auto ">
            <section className=" rounded text-center">
              <div className="flex flex-col border-2 shadow-lg p-2 rounded-lg justify-around items-center py-10">
                <Check />

                <h2 className="my-4 font-bold text-xl">
                  تم الاشتراك في العقار بنجاح
                </h2>

                <div className="flex bg-gray-100 items-center justify-center py-2 px-2 rounded-2xl my-4 ">
                  <span className="mr-2 ml-2 text-lg font-bold">
                    <h4>2024</h4>
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