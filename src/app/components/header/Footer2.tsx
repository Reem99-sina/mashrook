import {
    Badge1,
    Badge2,
    Butwhatsapp,
    Frame563,
    Mashrooklogotextlarge,
  } from "@/app/assets/svg";
  import Image from "next/image";
  
  export default function Footer() {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full  border-2  bg-white ">
        <h2 className="text-xl font-bold mt-8 mb-4 text-center">تابعونا</h2>
        <button><Image
          src={Frame563}
          alt="image"
          style={{ objectFit: "cover" }}
          className="rounded-xl mt-4"
        /></button>
        <Image
          src={Mashrooklogotextlarge}
          alt="image"
          style={{ objectFit: "cover" }}
          className="rounded-xl mt-4"
        />
  
        <button><Butwhatsapp className="rounded-xl mt-4 mb-4" /></button>
        <Image
          src={Badge1}
          alt="image"
          style={{ objectFit: "cover" }}
          className="rounded-xl mt-4"
        />
        <Image
          src={Badge2}
          alt="image"
          style={{ objectFit: "cover" }}
          className="rounded-xl mt-4"
        />
      </div>
    );
  }
  
  //last modified by Omar Marei 22/7/2024