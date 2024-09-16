import {
    Badge1,
    Badge2,
    Butwhatsapp,
    Frame563,
    Mashrooklogotextlarge,
  } from "@/app/assets/svg";
  import Image from "next/image";
  import Link from "next/link"
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
  
        <Link href={`whatsapp://send?phone=+9660000130244`}><Butwhatsapp className="rounded-xl mt-4 mb-4" /></Link>
        <Image
          src={Badge1}
          alt="image"
          style={{ objectFit: "cover" }}
          className="rounded-xl mt-4"
        />
        
        <div className="bg-[#f5faee] rounded-lg p-3 color-gray-500 text-xs my-5">
            <span className="color-gray-500">رقم الترخيص</span>
            <span className="color-gray-500">  0000130244 </span>
        </div>
      </div>
    );
  }
  
  //last modified by Omar Marei 22/7/2024