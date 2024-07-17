"use client";

import React from "react";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
import { Bcard1, Bcard2, Bcard3, Bcard4, Bcard5, Bcard6, Bcard7, Bcard8, Bcard9 } from "../src/app/assets/svg";

export default function CarouselTransition() {
  return (
    <div>
      <Carousel transition={{ duration: 0.5 }} className="rounded-xl">
        <div className="h-full w-full relative">
          <Image
            src={Bcard1}
            alt="image 1"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
        <div className="h-full w-full relative">
          <Image
            src={Bcard2}
            alt="image 1"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
        <div className="h-full w-full relative">
          <Image
            src={Bcard3}
            alt="image 1"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
        <div className="h-full w-full relative">
          <Image
            src={Bcard4}
            alt="image 1"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
        <div className="h-full w-full relative">
          <Image
            src={Bcard5}
            alt="image 1"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
        <div className="h-full w-full relative">
          <Image
            src={Bcard6}
            alt="image 1"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
        <div className="h-full w-full relative">
          <Image
            src={Bcard7}
            alt="image 1"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
        <div className="h-full w-full relative">
          <Image
            src={Bcard8}
            alt="image 1"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
        <div className="h-full w-full relative">
          <Image
            src={Bcard9}
            alt="image 1"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>


      </Carousel>
    </div>
  );
}
