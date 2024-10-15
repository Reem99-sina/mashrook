"use client";
import React, { useEffect } from "react";
import MainHeader from "../components/header/MainHeader";
import Footer from "../components/header/Footer2";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { dataReturn } from "@/redux/features/getRequest"


import Script from 'next/script';
const AboutLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  
  let { selectData } = useSelector<RootState>(
    (state) => state.getRequest
  ) as {
    loading: boolean; message: string; data: dataReturn[], selectData: {
      id: number, detail_id?: number, title: string, numberPiece: number,
      type: boolean,
      propertyOwnerType: string,
      propertyPurpose: string
    }
  };
  useEffect(() => {
    if (typeof window?.Moyasar !== 'undefined') {
      window?.Moyasar.init({
        element: ".mysr",
        amount: selectData?.propertyOwnerType == "مالك" ? 100 : 500,
        currency: "SAR",
        description: "Test API",
        publishable_api_key: "pk_test_piTjfJ4VGnL6BHKARNCNBfm2bu9EhfgoTrbEDz6x",
        callback_url: `https://mashrook.sa/JoiningSuccess?property_id=${selectData?.id}&details_id=${selectData?.detail_id}&type=${selectData?.type}`,
        methods: ["creditcard", "stcpay"],
        language: "ar",
        credit_card: {
          save_card: false,
        },
        on_completed: function (payment:any) {
          return new Promise(function (resolve, reject) {
            if ((payment?.status == "failed")) {
              reject();
            } else {
               resolve({})
            }
          });
        }
      });
    }
  }, []);

  
  return (
    <div dir="" >
      <div className="bg-white">

        <div dir="ltr" className="relative">
          <MainHeader />
        </div>
        {children}
        <Footer />
      </div>
      <Script
        src="https://cdn.moyasar.com/mpf/1.7.3/moyasar.js"
        onLoad={() => {
          if (typeof  window?.Moyasar !== 'undefined') {
             window?.Moyasar.init({
              element: ".mysr",
              amount: selectData?.propertyOwnerType == "مالك" ? 100 : 500,
              currency: "SAR",
              description: "Test API",
              publishable_api_key: "pk_test_piTjfJ4VGnL6BHKARNCNBfm2bu9EhfgoTrbEDz6x",
              callback_url: `https://mashrook.sa/JoiningSuccess?property_id=${selectData?.id}&details_id=${selectData?.detail_id}&type=${selectData?.type}`,
              methods: ["creditcard", "stcpay"],
              language: "ar",
              credit_card: {
                save_card: false,
              },
              on_completed: (payment:any) => {
                return new Promise(function (resolve, reject) {
                  // savePayment is just an example, your usage may vary.
                  if ((payment?.status == "failed")) {
                    reject();
                  } else {
                    // dispatch(postPaymentType({
                    //   property_id: selectData?.id,
                    //   details_id: selectData?.detail_id,
                    //   // land_details_id: selectData?.detail_id,
                    //   amount: Number(sessionStorage.getItem("amount"))
                    // }))
                    resolve({})
                  }

                });
              }
            });
          }
        }}

      />
    </div>
  );
};
export default AboutLayout;