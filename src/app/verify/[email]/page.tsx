"use client";

import React from "react";
import { CloseButton, InfoOutLine, MashrookLogo } from "@/app/assets/svg";
import { TextInput } from "../../components/shared/text-input.component";
import { Button } from "../../components/shared/button.component";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { verifyRequest,resendCodeRequest } from "@/redux/features/vierfySlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const Verify: React.FC = () => {
  const router = useParams();
  const links = useRouter();
  const { email } = router;
  const [code, setCode] = useState(Array(4).fill(""));
  let dispatch = useDispatch<AppDispatch>();
  let { loading, message, data } = useSelector<RootState>(
    (state) => state.verify
  ) as { loading: boolean; message: string; data: any };
  const handleChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      dispatch(
        verifyRequest({
          email: String(email)?.replace("%40", "@"),
          code: code.join(""),
        })
      );
    } else {
      toast.error("you need email and code");
    }
  };
  const onResend=()=>{
    dispatch(resendCodeRequest({email:String(email)?.replace("%40", "@")}))
  }
  useEffect(() => {
    if (message && Boolean(data) == false&&message!="تم إرسال الكود اللي الايميل.") {
      toast.error(message);
    } else if (Boolean(data) == true) {
      toast.success(message);
      sessionStorage.setItem("token", data?.token);
      links.push(`/`);
    }else if(message=="تم إرسال الكود اللي الايميل." && Boolean(data) == false){
      toast.success(message)
    }
  }, [message, links, data]);

  return (
    <div className="flex items-center  min-h-screen h-full  w-full flex-col bg-white">
      <div className="w-full max-w-md h-full   space-y-8 bg-white p-8  lg:p-16 md:max-w-lg lg:max-w-xl ">
        <div className="text-center flex items-center justify-center flex-col p-4  h-full">
          <MashrookLogo />
          <p className="mt-6 text-2xl font-bold text-[#374151]">
            التحقق من البريد الالكتروني
          </p>
        </div>
        <form className="mt-8 space-y-6 p-8">
          <div>
            <p className="text-center mb-4">
              لقد قمنا بإرسال رمز التحقق إلى بريدك الإلكتروني
              <br />
              {String(email)?.replace("%40", "@") || "name@domain.com"}
              <br />
              الرجاء قم بإدخال رمز التحقق لإنشاء حسابك
            </p>
            <div className="flex justify-center mb-4">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 m-1 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                />
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 mb-4">
              لم يصلك الرمز؟{" "}
              <button className="text-[#98CC5D]" onClick={onResend} type="button">
                إعادة إرسال الرمز خلال 60 ثانية
              </button>
            </p>
          </div>
          <div className="flex items-center justify-center text-center gap-1">
            <p className=" text-[8px] font-semibold text-red-400 ">
              الرجاء التأكد من صندوق الرسائل غير المرغوبة قبل الضغط على اعادة
              ارسال الرمز
            </p>
            <InfoOutLine />
          </div>
          <div>
            <Button
              text="تسجيل جديد"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#3B73B9] border border-transparent rounded-md group  focus:outline-none focus:ring-2 focus:ring-offset-2 "
              type="submit"
              onClick={onSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verify;
