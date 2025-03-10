import {
  Badge1,
  Badge2,
  Butwhatsapp,
  Frame563,
  Mashrooklogotextlarge,
} from "@/app/assets/svg";
import Image from "next/image";
import Link from "next/link";
import { formatPhoneNumber } from "@/app/hooks/formatNumber";
export default function Footer() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full  border-2  bg-white ">
      <h2 className="text-xl font-bold mt-8 mb-4 text-center">تابعونا</h2>
      <button>
        <Image
          src={Frame563}
          alt="image"
          style={{ objectFit: "cover" }}
          className="rounded-xl mt-4"
        />
      </button>
      <Image
        src={Mashrooklogotextlarge}
        alt="image"
        style={{ objectFit: "cover" }}
        className="rounded-xl mt-4"
      />
      <h2 className="text-xl font-bold mt-8 mb-4 text-center">للاتصال</h2>
      <p style={{ direction: "ltr" }}>{formatPhoneNumber(966550455855)}</p>
      <p>info@mashrook.sa</p>
      <Link href={`whatsapp://send?phone=+966550455855`}>
        <Butwhatsapp className="rounded-xl mt-4 mb-4" />
      </Link>
      <h2 className="text-xl font-bold mb-4 text-center">العنوان</h2>
      <p className="text-center">
        الرياض ,حي الحمراء , طريق الامام عبد الله بن سعود بن عبد العزيز ص.ب
        13241
      </p>
      <div className="flex flex-col"></div>
      <div className="flex items-center gap-x-2 flex-row-reverse bg-[#ecf0f7] rounded-lg p-3 text-sm mt-2">
        <div className="flex flex-col items-center">
          <Image
            src={"/logopremission.jpg"}
            width={50}
            height={50}
            alt="premission"
          />
          <span className="color-gray-500"> 0000130244 </span>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={"/logopermission.png"}
            width={50}
            height={50}
            alt="premission"
          />
        </div>

        <div className="flex flex-col items-center">
          <p>الرقم الضريبي</p>
          <span className="color-gray-500"> 302221955700003 </span>
        </div>
      </div>
      {/* <div className="bg-[#f5faee] rounded-lg p-3 color-gray-500 text-xs my-5">
        <span className="color-gray-500">رقم الترخيص</span>
        <span className="color-gray-500">   </span>
      </div> */}
    </div>
  );
}

//last modified by Omar Marei 22/7/2024
