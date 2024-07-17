"use client";

import React, { useState } from "react";
import { CloseButton, MashrookLogo } from "../assets/svg";
import { Button } from "../components/shared/button.component";
import { ResetPassword } from "./Resetpassword";
import { ForgetNewPassword } from "./ForgetNewPassword";
import { useRouter } from "next/navigation";

const steps = [
  {
    title: "نسيت كلمة المرور",
    component: <ForgetNewPassword />,
  },
  {
    title: "إعادة تعيين كلمة المرور",
    component: <ResetPassword />,
  },
];
const ForgetPassword: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const nextStep = async () => {
    setActiveStep(activeStep + 1);
  };
  const router = useRouter();

  return (
    <div className="flex items-center lg:justify-center min-h-screen h-full  w-full flex-col">
      <div className="flex items-end justify-start p-4 w-full h-full lg:hidden bg-white ">
        <CloseButton
          onClick={() => {
            router.push("/");
          }}
          className="cursor-pointer"
        />
      </div>
      <div className="w-full max-w-md  space-y-8 bg-white   md:max-w-lg lg:max-w-xl ">
        <div className=" items-end justify-start ml-4 mt-4 hidden sm:flex ">
          <CloseButton
            onClick={() => {
              router.push("/");
            }}
            className="cursor-pointer"
          />
        </div>
        <div className="text-center flex items-center justify-center flex-col  h-full p-6 ">
          <MashrookLogo />
          <p className="mt-6 text-2xl font-bold text-[#374151]">
            {steps[activeStep - 1].title}
          </p>
          <div>
            <p>
              يرجى توفير عنوان البريد الإلكتروني الذي استخدمته للتسجيل وسنرسل لك
              عبر البريد الإلكتروني خطوات إعادة ضبط كلمة المرور الخاصة بك.
            </p>
          </div>
        </div>
        <form style={{ margin: "0px" }} className=" m-0 space-y-6 p-8 ">
          <div className="rounded-md shadow-sm">
            {steps[activeStep - 1].component}
          </div>

          <div>
            {activeStep === 1 ? (
              <Button text="التحقق  " onClick={nextStep} />
            ) : (
              <Button text="إعادة تعيين" />
            )}
          </div>
        </form>
        {activeStep === 1 ? (
          <div className="mt-auto bg-[#3B73B9] text-center w-full h-[271px] mb-0 lg:h-[40px] flex items-center  lg:gap-2 justify-center flex-col lg:flex-row-reverse">
            <p className="lg:text-base text-3xl font-medium text-white">
              لم تسجل بعد؟
            </p>
            <a
              href="sign-up"
              className="font-medium text-base text-white hover:cursor-pointer lg:text-base"
            >
              قم بإنشاء حساب لاستخدام مزايا مشروك
            </a>
            <div>
              <a
                href="sign-up"
                className="relative text-sm flex justify-center w-full px-14 mt-9 lg:hidden py-2 font-medium text-white bg-[#3B73B9] border border-transparent border-white rounded-md group  focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                إنشاء حساب
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ForgetPassword;
