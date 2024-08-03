"use client";

import {
  ArrowLeft,
  Mobileapp,
  Onlinebooking9471687,
  Realestatagent,
  Truckicon,
} from "../../assets/svg";
import Step from './Step';

export default function HowItWorks2() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full border-2 rounded-2xl bg-white">
      <div className="w-full h-full border-2 rounded-2xl bg-white">
        <div dir="rtl">
          <div className="w-full text-center p-4 font-bold text-lg mb-4">
            كيف تشتري عقارك مع مشروك
          </div>
          <div className="flex flex-col">
            <Step number={1} title="سجل طلبك" icon={<Onlinebooking9471687 />} showLine={true} />
            <Step number={2} title="اطلع على اخر العروض" icon={<Mobileapp />} showLine={true} />
            <Step number={3} title="إنضم كشريك إذا ناسبك" icon={<Realestatagent />} showLine={true} />
            <Step number={4} title="خلي الباقي علينا" icon={<Truckicon />} showLine={false} />
          </div>
          <div className="flex justify-center p-3">
            <button
              type="button"
              className="text-blue-700 hover:bg-blue-800 border-2 border-blue-500 w-3/4 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center rtl:flex-row-reverse dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <ArrowLeft />
              سجل مجانا
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
//last modified by Omar Marei 21/7