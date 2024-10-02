"use client";

import {
  Approve123,
  Deal,
  DocDeal,
  Onlinepayment117946931,
  Realestatagent,
} from "@/app/assets/svg";
import Step from './Step';

export default function ClientJourney2() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full border-2 rounded-2xl bg-white">
      <div className="w-full h-full border-2 rounded-2xl bg-white">
        <div dir="rtl">
          <div className="w-full text-center p-4 font-bold text-lg mb-4">
            رحلة العميل
          </div>
          <div className="flex flex-col">
            <Step number={1} title="انضم كشريك" icon={<Realestatagent />} showLine={true} />
            <Step number={2} title="دفع الرسوم" icon={<Onlinepayment117946931 />} showLine={true} />
            <Step number={3} title="الافراغ" icon={<DocDeal />} showLine={true} />
            <Step number={4} title="الانتهاء" icon={<Approve123 />} showLine={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
//last modified by Omar Marei 21/7