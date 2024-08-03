"use client";
import React from "react";
import MainHeader from "../components/header/MainHeader";
import Footer from "../components/header/Footer2";
import ImageRadioButtons from "./PaymentMethod";
import BackButton from "./backButton";
import Link from "next/link";

export default function Payment() {
  return (
    <div className="flex justify-center w-dvh h-max  ">
      <div className="w-full bg-white rounded text-black shadow ">
        <div className="w-full z-50">
          <MainHeader />
        </div>
        <div className="flex">
          <main className="container mx-auto ">
            <section className=" rounded text-center">
              <div>
                <div className="flex items-center justify-between">
                  <p></p>
                  <h1 className="text-2xl font-bold">
                    دفع رسوم الخدمة للشراكة
                  </h1>
                  <BackButton />
                </div>

                <div className="text-right p-4 m-4 bg-gray-200">
                  <div className="flex flex-row justify-between">
                    <p className="text-xl text-green-500 font-bold">100 ريال</p>
                    <p className="text-xl text-blue-450 font-bold my-2">
                      رسوم خدمة شراكة
                    </p>
                  </div>
                  <p> ارض سكنية - قطعة رقم 1256</p>

                  <div className="flex bg-gray-100 items-center justify-center py-2 px-2 rounded-lg mt-4 w-1/3 ml-auto">
                    <span className="mr-2 ml-2 text-lg font-bold">
                      <h4>2024</h4>
                    </span>
                    <p>رقم الطلب</p>
                  </div>
                </div>

                <div className="text-right p-4 m-4 rounded-xl bg-gray-200">
                  <p className="text-xl font-bold">طريقة الدفع </p>
                </div>

                <div className="border-2 rounded-md p-4 shadow-md text-right ">
                  <div className="text-right p-4 m-4 ">
                    <ImageRadioButtons />{" "}
                  </div>

                  <div className="text-right p-4 mb-4 rounded-xl bg-gray-200">
                    <p className="text-xl font-bold">بيانات الدفع</p>
                  </div>
                  <div className="border-2 shadow-md p-4 rounded-xl">
                    <h3 className="my-2">اسم صاحب البطاقة</h3>
                    <input
                      type="text"
                      placeholder="الرجاء الادخال"
                      name=" الرجاء الادخال"
                      id="holderName"
                      className="bg-gray-200 rounded-xl flex-grow text-right mx-4 px-4"
                    />
                    <h3 className="my-2">رقم البطاقة</h3>
                    <input
                      type="number"
                      placeholder="الرجاء الادخال"
                      name=" الرجاء الادخال"
                      id="holderName"
                      className="bg-gray-200 rounded-xl flex-grow text-right mx-4 px-4"
                    />
                    <div className="flex flex-row justify-end flex-wrap mb-4">
                      <div>
                        <h3 className="my-2 mx-6">CVV</h3>
                        <input
                          type="number"
                          placeholder="الرجاء الادخال"
                          name=" الرجاء الادخال"
                          id="holderName"
                          className="bg-gray-200 rounded-xl flex-grow text-right mx-4 px-4"
                        />
                      </div>
                      <div>
                        <h3 className="my-2 mx-6">تاريخ الانتهاء</h3>
                        <input
                          type="date"
                          placeholder="الرجاء الادخال"
                          name=" الرجاء الادخال"
                          id="holderName"
                          className="bg-gray-200 rounded-xl flex-grow text-right mx-4 px-4"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row items-center align-middle justify-center  p-2 text-blue-450">
                    <Link href="/JoiningSuccess" className="bg-blue-450 text-white px-4 py-2 rounded-2xl p-2 m-2 flex-grow text-center">
                      الدفع
                    </Link>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Footer />
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

//last modified by Omar Marei 2/8/2024
