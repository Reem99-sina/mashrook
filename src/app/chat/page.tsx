"use client";

import React, { useEffect } from "react";
import Footer from "../components/header/Footer2";
import MainHeader from "../components/header/MainHeader";
import { Tabs } from "../components/shared/tabs";
import { MyOffer } from "./MyOffer";
import { MyPartnerships } from "./MyPartnerships";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getMessageOrders } from "@/redux/features/getMessages";
import { getMessagePartners } from "@/redux/features/getMessagePartner";
import { BackButtonOutline } from "@/app/assets/svg";
import { useRouter, useSearchParams } from "next/navigation";
const Chat: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useSearchParams()
  const title = params.get('title')
  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push("/");
  };
  useEffect(() => {
    dispatch(getMessageOrders());
    dispatch(getMessagePartners());
  }, [dispatch]);
  return (
    <>
      <form className="flex flex-col items-center min-h-screen h-full w-full bg-white">
        <MainHeader />
        <div style={{ direction: "rtl" }} className=" w-full">
          <div>
            {/* elpo */}

            <div className="flex items-center justify-center w-full" style={{ direction: "rtl" }}>
              <div className="justify-start">
                <button onClick={handleBack}>
                  <BackButtonOutline />
                </button>
              </div>
              <div className="flex flex-1  items-center justify-center">
                <p className="flex items-center justify-center text-[#36343B] font-bold text-xl">
                  محادثاتي </p>
              </div>
            </div>

            <div className=" w-full">
              <Tabs
                tabs={[
                  {
                    Component: <MyOffer />,
                    title: "عروضي",
                    active: (Boolean(title) ? title == "عروضي" : true)
                  },

                  {
                    Component: <MyPartnerships />,
                    title: "شراكاتي",
                    active: (Boolean(title) ? title == "شراكاتي" : false)
                  },
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
