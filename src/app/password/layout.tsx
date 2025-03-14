"use client";
import React from "react";
import MainHeader from "../components/header/MainHeader";
import Footer from "../components/header/Footer2";
const MyAccountLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div dir="" style={{ direction: "rtl" }}>
      <div className="bg-white">
        <div dir="ltr" className="relative">
          <MainHeader />
        </div>
        {children}
        <div dir="ltr" >
        <Footer />
        </div>
      </div>
    </div>
  );
};
export default MyAccountLayout;
