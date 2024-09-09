"use client"
import React from "react"
import MainHeader from "@/app/components/header/MainHeader";
import Footer from "@/app/components/header/Footer2";
const MyAccountLayout=({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)=>{
    return  <div dir="" style={{direction:"rtl"}}>
    <div className="bg-white ">
     
      {
        children
      }
     
      </div>
      </div>
}
export default MyAccountLayout