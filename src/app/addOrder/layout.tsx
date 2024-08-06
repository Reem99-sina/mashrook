
"use client"
import React from "react";
import MainHeader from "../components/header/MainHeader";
import Footer from "../components/header/Footer2";
export default function AddOrderLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
return <>
    <div className="flex justify-center w-dvh h-max  ">
        <div className="w-full bg-white rounded text-black shadow ">
            <div className="w-full z-50">
                <MainHeader />
            </div>
            {children}
            <div className="pt-8">
                <Footer />
              </div>
         </div>
    </div>
</>
}
