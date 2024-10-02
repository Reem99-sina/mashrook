"use client";

import React, { useState } from "react";
import {faqs}from "@/type/chatinterface"
type FAQItem = {
  question: string;
  answer: string;
};


export default function FAQCollapse() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [len,setLen]=useState<number>(5)
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <h2 className="text-center text-2xl font-bold mb-8">الأسئلة الشائعة</h2>
      <div dir="rtl">
        <div className="w-full  rounded-3xl p-4 text-right">
          {faqs.slice(0,len).map((faq, index) => (
            <div key={index} className="mb-4">
              <div
                className="flex justify-between items-center p-4 rounded-2xl bg-white cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-md font-bold">{faq.question}</h3>
                {openIndex === index ? (
                  <p className="w-6 h-6 text-gray-500">-</p>
                ) : (
                  <p className="w-6 h-6 text-gray-500">+</p>
                )}
              </div>
              {openIndex === index && (
                <div className="p-4 bg-white border-t">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-center">
            <button
              type="button"
              className="text-blue-700 hover:bg-blue-800 hover:text-white border-2 border-blue-500 w-3/4 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center rtl:flex-row-reverse dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={()=>{
              if(len>=faqs.length){
                setLen(5)
              }else{
                setLen((prev)=>prev+5)
              }
              }}
           >
              المزيد
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

//last modified by Omar Marei 18/7