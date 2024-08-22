"use client";


import MarketPage from "./Marketpage";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getRequest } from "@/redux/features/getRequest";
import {useEffect} from "react"
export default function Market() {
  let dispatch=useDispatch<AppDispatch>()
  useEffect(()=>{
    dispatch(getRequest())
  },[dispatch])
  return (
    <div dir="rtl">


<MarketPage />


    </div>
  );
}

//last modified by Omar Marei 2/8/2024