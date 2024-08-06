"use client";

import React from "react";
// import "./styleOrder.css"
import { Pattern } from "../assets/svg";
import Image from "next/image";
import StyleForm from "./components/StyleForm"
import ResidentialLand from "./components/ResidentialLand"
import { RadioInput } from "../components/shared/radio-input.component";
import {useState} from "react"
export default function AddOrder() {
    let [type,setType]=useState("residential_land")
  return (
    <>
      <div className="flex">
        <main className={`container mx-auto  h-100vh`}>
        <section className="text-center p-3 bg-gray-50">
          <Image src={Pattern} width={250} height={100} className="absolute" alt="pattern"/>
          <h3 className="text-3xl my-6">أضف طلبك</h3>
          <StyleForm title="نوع العقار">
               
                    <RadioInput
                  label="أرض سكنية"
                  inputProps={{ placeholder: "أرض سكنية" }}
                  type="radio"
                  id="residential_land"
                 name="realstate"
                 onChange={()=>setType("residential_land")}
                />
                 <RadioInput
                  label="أرض تجارية"
                  inputProps={{ placeholder: "أرض تجارية" }}
                  type="radio"
                 name="realstate"
                 id="commercial_land"
                 onChange={()=>setType("commercial_land")}
                />
                 <RadioInput
                  label="فيلا"
                  inputProps={{ placeholder: "فيلا" }}
                  type="radio"
                 name="realstate"
                  id="villa"
                  onChange={()=>setType("villa")}
                />
                 <RadioInput
                  label="دور"
                  inputProps={{ placeholder: "دور" }}
                  type="radio"
                 name="realstate"
                  id="role"
                  onChange={()=>setType("role")}
                />
                 <RadioInput
                  label="شقة"
                  inputProps={{ placeholder: "شقة" }}
                  type="radio"
                 name="realstate"
                 id="apartment"
                 onChange={()=>setType("apartment")}
                />
          </StyleForm>
            {type=="residential_land"&&<ResidentialLand/>}
          </section>
        </main>
      </div>
    </>
  );
}
