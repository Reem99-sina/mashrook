"use client";

import React, { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "ماهي منصة مشروك ؟",
    answer: "هي منصة تشاركية لشراء الأراضي.",
  },
  {
    question: "كيف أشتري من مشروك ؟",
    answer: "تفاصيل كيفية الشراء...",
  },
  {
    question: "إذا كنت وسيط عقاري كيف تستفيد من مشروك ؟",
    answer: "تفاصيل كيفية استفادة الوسيط العقاري...",
  },
  {
    question: "إذا كنت مالك ولديك عقار كيف تستفيد من مشروك ؟",
    answer: "تفاصيل كيفية استفادة المالك...",
  },
  {
    question: "ماهي رخصة قابل للوساطة العقارية من الهيئة العامة للعقار ؟",
    answer: "تفاصيل عن الرخصة...",
  },
];

export default function FAQCollapse() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <h2 className="text-center text-2xl font-bold mb-8">الأسئلة الشائعة</h2>
      <div dir="rtl">
        <div className="w-full  rounded-3xl p-4">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <div
                className="flex justify-between items-center p-4 rounded-2xl bg-white cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-bold">{faq.question}</h3>
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
              className="text-blue-700 hover:bg-blue-800 border-2 border-blue-500 w-3/4 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center rtl:flex-row-reverse dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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