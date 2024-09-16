"use client"
import React from "react"
import MainHeader from "../components/header/MainHeader";
import Footer from "../components/header/Footer2";
const ProfileLayout=({
    children
  }: Readonly<{
    children: React.ReactNode;
  }>)=>{
    return  <div dir="" style={{direction:"rtl"}}>
    <div className="bg-white">
      <div dir="ltr" className="relative">
        <MainHeader />
      </div>
      {
        children
      }
      <Footer />
      </div>
      </div>
}
export default ProfileLayout