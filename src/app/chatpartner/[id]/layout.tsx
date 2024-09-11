"use client";
import React from "react";
import MainHeader from "@/app/components/header/MainHeader";
const ChatLayout = ({
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
        
      </div>
    </div>
  );
};
export default ChatLayout;
