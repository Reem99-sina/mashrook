"use client";

import React from "react";
import Footer from "../components/header/Footer2";
import MainHeader from "../components/header/MainHeader";
import { Tabs } from "../components/shared/tabs";
import { MyOffer } from "./MyOffer";
import { MyPartnerships } from "./MyPartnerships";

const Chat: React.FC = () => {
  return (
    <>
      <form className="flex flex-col items-center min-h-screen h-full w-full bg-white">
        <MainHeader />
        <div style={{ direction: "rtl" }} className=" w-full">
          <div>
            {/* elpo */}
            <div className="flex items-center justify-center">
              <p className="flex items-center justify-center text-[#36343B] font-bold text-xl">
                محادثاتي
              </p>
            </div>

            <div className=" w-full">
              <Tabs
                tabs={[
                  {
                    Component: <MyOffer />,
                    title: "عروضي",
                  },

                  {
                    Component: <MyPartnerships />,
                    title: "شراكاتي",
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
      )
    </>
  );
};

export default Chat;
