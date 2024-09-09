"use client";

import React from "react";
import Accordion from "../components/shared/Accordion";
import { BackButtonOutline, Search } from "../assets/svg";
import { TextInput } from "../components/shared/text-input.component";

const Questions = [
  {
    title: "ماهي منصة مشروك ؟",
    children: "هي منصة تشاركية لشراء الاراضي.",
  },
  {
    title: "كيف اشتري من مشروك ؟",
    children: "",
  },
  {
    title: "إذا كنت وسيط عقاري كيف تستفيد من مشروك ؟",
    children: "",
  },
  {
    title: "إذا كنت مالك ولديك عقار كيف تستفيد من مشروك ؟",
    children: "",
  },
  {
    title: "ماهي رخصة فال للوساطة العقارية من الهيئة العامة للعقار ؟",
    children: "",
  },
  {
    title: "كيف اشتري من مشروك ؟",
    children: "",
  },
  {
    title: "إذا كنت وسيط عقاري كيف تستفيد من مشروك ؟",
    children: "",
  },
  {
    title: "إذا كنت مالك ولديك عقار كيف تستفيد من مشروك ؟",
    children: "",
  },
  {
    title: "ماهي رخصة فال للوساطة العقارية من الهيئة العامة للعقار ؟",
    children: "",
  },
  {
    title: "ماهي منصة مشروك ؟",
    children: "",
  },
];

const FrequentlyAskedQuestions: React.FC = () => {
  return (
    <div className="container bg-white mx-auto ">
      <div className="flex items-center justify-center border-b-2 border-gray-200 ">
        <div>
          <button>
            <BackButtonOutline />
          </button>
        </div>
        <div className="flex flex-1  items-center justify-center  ">
          <p className="flex items-center justify-center text-[#36343B] font-bold text-xl pb-2">
            الأسئلة الشائعة
          </p>
        </div>
      </div>
      <div className="p-4">
        <TextInput inputProps={{ placeholder: "بحث" }} icon={<Search />} />
      </div>
      <div className="p-4">
        {Questions.map((question, index) => (
          <Accordion key={index} title={question.title}>
            <p>{question.children}</p>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;
