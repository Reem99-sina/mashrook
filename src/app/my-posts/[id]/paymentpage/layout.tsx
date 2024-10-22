"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { dataReturn } from "@/redux/features/getRequest"


import Script from 'next/script';
const AboutLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const params = useParams()
  useEffect(() => {
    if (typeof window?.Moyasar !== 'undefined') {
      window?.Moyasar.init({
        element: ".mysr",
        amount:  50000,
        currency: "SAR",
        description: "Test API",
        publishable_api_key: process.env.NEXT_PUBLIC_PUBLICKEY!,
        callback_url: `${process.env.NEXT_PUBLIC_BASEURL}/my-posts/${params?.id}/JoiningSuccess?property_id=${params?.id}`,
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
        {children}
      </div>
      <Script
        src="https://cdn.moyasar.com/mpf/1.7.3/moyasar.js"
        onLoad={() => {
          if (typeof  window?.Moyasar !== 'undefined') {
             window?.Moyasar.init({
              element: ".mysr",
              amount:  50000,
              currency: "SAR",
              description: "Test API",
              publishable_api_key: process.env.NEXT_PUBLIC_PUBLICKEY!,
              callback_url: `${process.env.NEXT_PUBLIC_BASEURL}/my-posts/${params?.id}/JoiningSuccess?property_id=${params?.id}`,
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
                    //   property_id: params?.id,
                    //   details_id: params?.detail_id,
                    //   // land_details_id: params?.detail_id,
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