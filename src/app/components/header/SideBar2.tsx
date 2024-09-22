"use client";

import { Whatsapp } from "@/app/assets/svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { removeLogin } from "@/redux/features/loginSlice";
import {removeTokenUser} from "@/redux/features/userSlice"
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import {fetchToken}from "@/redux/features/userSlice"
interface SideBarProps {
  sidebarOpen: boolean;
  toggleSidebar: (e:any) => void;
}

export default function SideBar({ sidebarOpen, toggleSidebar }: SideBarProps) {
  let router = useRouter();
  const {  token } = useSelector<RootState>(
    (state) => state.register
  ) as {  token:string };
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchToken())
  }, [dispatch])

  return (
    <div>
      {sidebarOpen && (
        <div className="flex  rtl items-start justify-end p-6 items w-dvh h-screen  ">
          <div className=" w-full">
            <div className="text-right text-bold text-2xl ">
              <ul>
                {!token && (
                  <>
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
                  </>
                )}
                <li className="mb-4 mt-4  hover:bg-gray-200">
                  <Link href="/market" className=" ">
                    السوق
                  </Link>
                </li>
                {token&&<>
                
                  <li className="mb-4 hover:bg-gray-200" >
                  <Link href="/my-offer?title=طلباتي" className="">
                 طلباتي
                  </Link>
                </li>
                <li className="mb-4 hover:bg-gray-200">
                  <Link href="/my-offer?title=شراكاتي" className=" ">
                  شراكاتي
                  </Link>
                </li>
                <li className="mb-4 hover:bg-gray-200">
                  <Link href="/my-offer?title=عروضي" className=" ">
                  عروضي
                  </Link>
                </li>
                <li className="mb-4 hover:bg-gray-200">
                  <Link href="/chat" className=" ">
                    محادثاتي
                  </Link>
                </li>
                <li className="mb-4 hover:bg-gray-200">
                        <Link
                          href="/my-posts"
                          className=""
                        >
                          إعلاناتي
                        </Link>
                      </li>
                </>}
                <li className="mb-4 hover:bg-gray-200">
                  <Link href="/frequently-asked-questions" className=" ">
                    الأسئلة الشائعة
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/about" className="">
                    عن مشروك
                  </Link>
                </li>
                <li className="mb-4">
                  <div className="cursor-pointer" onClick={()=>setOpen(!open)}>
                   السياسات والاحكام
                  </div>
                  {open&&<ol className="ms-3 list-decimal text-[18px]" style={{direction:"rtl"}}>
                    <li className="">
                  <Link href="/privacy-policy" className="text-[18px]">
                    سياسة الخصوصية
                  </Link>
                </li>
                <li className="">
                  <Link href="/terms-and-conditions" className="text-[18px]">
                    الشروط والاحكام 
                  </Link>
                </li>
                <li className="">
                  <Link href="/copy-right" className="text-[18px]">
                  حقوق الملكية الفكرية 
                  </Link>
                </li>
                <li className="">
                  <Link href="/payment-policy" className="text-[18px]">
                  سياسة الدفع
                  </Link>
                </li>
                {/* سياسة الدفع */}
                    </ol>}
                </li>
                {token && (
                  <>
                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                    <li className="mb-4 text-xl hover:text-gray-800 ">
                      <Link
                        href="/my-account"
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
                        onClick={(e) => {
                          Cookie.remove("token");
                          Cookie.remove("user");
                          Cookie.remove("tokenTime");
                          toggleSidebar(e)
                          router.push("/")
                          dispatch(removeLogin());
                          dispatch(removeTokenUser());
                        }}
                      >
                        تسجيل خروج
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className=" justify-center items-center flex flex-col w-full">
              <p className="text-[#6B7280] text-base">
                {" "}
                تحتاج اي مساعدة او عندك استفسار؟
              </p>
              <Link className="mt-4 bg-green-500 py-2 px-4 rounded-lg text-white flex flex-row gap-2 items-center " href={`whatsapp://send?phone=+9660000130244`}>
                تواصل معنا
                <Whatsapp />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

//last modified by Omar Marei 21/7/2024
