"use client";

import { Whatsapp } from "@/app/assets/svg";
import Link from "next/link";
import {useEffect,useState} from "react"
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {removeLogin} from "@/redux/features/loginSlice"
interface SideBarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function SideBar({ sidebarOpen, toggleSidebar }: SideBarProps) {
  const [token, setToken] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = sessionStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);
  
  return (
    <div>
      {sidebarOpen && (
        <div className="flex  rtl items-start justify-end p-6 items w-dvh h-screen  ">
          <div className=" w-full">
            <div className="text-right text-bold text-2xl ">
              <ul>
                {!token&&<>
                  <li className="mb-4 text-xl hover:text-gray-800 ">
                  <Link
                    href="/login"
                    className=" text-gray-500 hover:text-[#3B73B9] "
                  >
                    تسجيل الدخول
                  </Link>
                </li>

                <li className="mb-4 text-xl text-gray-500 hover:text-[#3B73B9]">
                  <Link href="/sign-up" className=" ">
                    إنشاء حساب
                  </Link>
                </li>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                </>}
                <li className="mb-4 mt-4  hover:bg-gray-200">
                  <Link href="/market" className=" ">
                    السوق
                  </Link>
                </li>

                <li className="mb-4 hover:bg-gray-800">
                  <Link href="/my-offer" className=" ">

                    طلباتي
                  </Link>
                </li>
                <li className="mb-4 hover:bg-gray-200">
                  <Link href="/chat" className=" ">
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
                {token&&<>
                  <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                  <li className="mb-4 text-xl hover:text-gray-800 ">
                  <Link
                    href="/"
                    className=" text-blue-450 hover:text-[#3B73B9] "
                  >
                    حسابي
                  </Link>
                  </li>
                  <li className="mb-4 text-xl hover:text-gray-800 ">
                  <Link
                    href="/"
                    className=" text-blue-450 hover:text-[#3B73B9] "
                  >
                    الاشعارات
                  </Link>
                </li>
                <li className="mb-4 text-xl hover:text-gray-800 ">
                  <Link
                    href="/"
                    className=" text-black hover:text-[#3B73B9] "
                    onClick={()=>{sessionStorage.removeItem("token"); setToken("");sessionStorage.removeItem("user");dispatch(removeLogin())}}
                  >
                    تسجيل خروج
                  </Link>
                </li>
                </>}
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
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

//last modified by Omar Marei 21/7/2024
