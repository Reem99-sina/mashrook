"use client";

import React, { useState, useEffect } from "react";
import Footer from "../components/header/Footer2";
import MainHeader from "../components/header/MainHeader";
import { Tabs } from "../components/shared/tabs";
import { useRouter } from "next/navigation";
import { BackButtonOutline, IconNoData } from "../assets/svg";
import { GitMyPartners } from "./gitMyPartners";
import { GitMyOrders } from "./gitMyOrders";
import { GitMyOffers } from "./getMyOffer"
import { useSearchParams } from 'next/navigation'
const Chat: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams()
  const title = params.get('title')
  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push("/");
  };

  return (
    <>
      <form className="flex flex-col items-center min-h-screen h-full w-full bg-white">
        <MainHeader />
        <div style={{ direction: "rtl" }} className=" w-full">
          <div>
            <div className="flex items-center justify-center">
              <div>
                <button onClick={handleBack}>
                  <BackButtonOutline />
                </button>
              </div>
              <div className="flex flex-1  items-center justify-center">
                <p className="flex items-center justify-center text-[#36343B] font-bold text-xl">

                </p>
              </div>
            </div>

            <div className="w-full">
              <Tabs
                tabs={[
                  {
                    Component: <GitMyOrders />,
                    title: "طلباتي",
                    active: (title == "طلباتي")
                  },
                  {
                    Component: <GitMyPartners />,
                    title: "شراكاتي",
                    active: (title == "شراكاتي")
                  },
                  {
                    Component: <GitMyOffers />,
                    title: "عروضي",
                    active: (title == "عروضي")
                  }
                ]}
              />
            </div>
          </div>
        </div>

        <footer className="w-full bg-white p-5 mt-auto">
          <Footer />
        </footer>
      </form>

    </>
  );
};

export default Chat;
