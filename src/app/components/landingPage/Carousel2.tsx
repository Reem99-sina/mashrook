"use client";

import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {bannerinfo} from "@/type/addrealestate"
import {getBanners}from "@/redux/features/getbanner"
import Image from "next/image";
import {
  Bcard1,
  Bcard2,
  Bcard3,
  Bcard4,
  Bcard5,
  Bcard6,
  Bcard7,
  Bcard8,
  Bcard9,
} from "@/app/assets/svg";

const images = [
  Bcard1,
  Bcard2,
  Bcard3,
  Bcard4,
  Bcard5,
  Bcard6,
  Bcard7,
  Bcard8,
  Bcard9,
];

export default function CarouselTransition() {
  const dispatch = useDispatch<AppDispatch>();
  const {  data } = useSelector<RootState>(
    (state) => state.banners
  ) as bannerinfo;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  useEffect(()=>{
     dispatch(getBanners())
  },[dispatch])
  
  return (
    <div className="relative w-full h-auto rounded-xl">
      {data?.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 w-full ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image?.link}
            alt={`image ${index + 1}`}
            style={{ objectFit: "cover" }}
            width={500}
            height={100}
            className="rounded-xl priority p2"
          />
        </div>
      ))}
    </div>
  );
}

//last modified by Omar Marei 18/7/2024