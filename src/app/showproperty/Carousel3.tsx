"use client";
import Image from "next/image";
import { Carousel } from "../components/shared/Mimport";
import { useState } from "react";
import EachImageComponent from "../components/shared/each-image.component";
interface imageInfo {
  id: number;
  name: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  property_id: number;
}
export function CarouselDefault({ images }: { images: imageInfo[] }) {
  
  return (
    <Carousel
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      className={`rounded-xl`}
      
    >
      {images?.map((ele) => (
        <EachImageComponent ele={ele} key={ele?.id} />
      ))}
    </Carousel>
  );
}

//last modified by Omar Marei 2/8/2024
