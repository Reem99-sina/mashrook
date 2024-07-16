"use client";

import { Menu } from "@/app/assets/svg";
import Link from "next/link";

interface SideBarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function SideBar({ sidebarOpen, toggleSidebar }: SideBarProps) {
  return (
    <div>
      {sidebarOpen && (
        <div className="flex  rtl justify-center items-top items w-dvh h-dvh ">
          <div>
            {/* <button onClick={toggleSidebar} className="mb-4">
              <Menu />
            </button> */}
            
            <div className="text-right text-bold text-3xl ">
              <ul>
                <li className="mb-4 hover:bg-gray-800 ">
                  <Link href="/" className="">
                    تسجيل الدخول
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
            <div className=" justify-center">
              <p> تحتاج اي مساعدة او عندك استفسار؟</p>
              <button className="mt-4 bg-green-500 py-2 px-4 rounded-full text-white ">
                تواصل معنا
              </button>{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
