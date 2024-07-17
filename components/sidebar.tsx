"use client";

import { Whatsapp } from "@/app/assets/svg";
import Link from "next/link";

interface SideBarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function SideBar({ sidebarOpen, toggleSidebar }: SideBarProps) {
  return (
    <div>
      {sidebarOpen && (
        <div className="flex  rtl items-start justify-end p-6 items w-dvh h-dvh  ">
          <div className=" w-full">
            <div className="text-right text-bold text-3xl ">
              <ul>
                <li className="mb-4 hover:text-gray-800 ">
                  <Link href="/login" className=" text-[#3B73B9] ">
                    تسجيل الدخول
                  </Link>
                </li>
                <li className="mb-4 hover:text-gray-800 text-[#6B7280] ">
                  <Link href="/sign-up" className="">
                    إنشاء حساب
                  </Link>
                </li>
                <li className="mb-4 hover:bg-gray-800">
                  <Link href="/" className=" ">
                    طلباتي
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/" className=" ">
                    محادثاتي
                  </Link>
                </li>
                <li className="mb-4 ">
                  <Link href="/" className=" ">
                    الأسئلة الشائعة
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/" className="">
                    عن مشروك
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/" className="">
                    تواصل معنا
                  </Link>
                </li>
              </ul>
            </div>
            <div className=" justify-center items-center flex flex-col w-full">
              <p className="text-[#6B7280] text-base">
                {" "}
                تحتاج اي مساعدة او عندك استفسار؟
              </p>
              <button className="mt-4 bg-green-500 py-2 px-4 rounded-lg text-white flex flex-row gap-2 items-center ">
                تواصل معنا
                <Whatsapp />
              </button>{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
