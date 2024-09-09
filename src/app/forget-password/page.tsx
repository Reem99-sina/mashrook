"use client";

import React, { useState, useMemo, useEffect } from "react";
import { CloseButton, MashrookLogo } from "@/app/assets/svg";
import { Button } from "../components/shared/button.component";
import { ForgetNewPassword } from "./ForgetNewPassword";
import { useRouter } from "next/navigation";
import { validateForm } from "../hooks/validate";
import toast from "react-hot-toast";
import {
  ForgetSchema,
  ResetSchema
} from "@/typeSchema/schema";
import { forget, removeForget, reset } from "@/redux/features/loginSlice"
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
interface forgetPasswordInfo {
  new_password: "",
  repeate_new_password: ""
}
const ForgetPassword: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  let [email, setEmail] = useState<string>("")
  let [data, setData] = useState<forgetPasswordInfo>({

    new_password: "",
    repeate_new_password: ""
  })
  const dispatch = useDispatch<AppDispatch>();
  let { messageForget, dataForget } = useSelector<RootState>((state) => state.login) as {
    messageForget: string, dataForget: any, messageRest: string,
    dataRest: any
  }
  const [errors, setErrors] = useState<any>();
  const nextStep = async () => {
    let status = await validateForm({ email: email }, ForgetSchema, setErrors)
    if (status == true) {
      dispatch(forget({ email: email }))
      // setActiveStep(activeStep + 1);
    }
  };

  const router = useRouter();
  const steps = useMemo(() => {
    return [
      {
        title: "نسيت كلمة المرور",
        component: <ForgetNewPassword email={email} onChange={(email) => setEmail(email)} error={errors?.email} />,
      },
      // {
      //   title: "إعادة تعيين كلمة المرور",
      //   component: <ResetPassword data={data} setData={setData} error={errors}/>,
      // },
    ]
  }, [email, errors])
  useEffect(() => {
    if (messageForget && Boolean(dataForget) == true) {
      toast.success(messageForget);
      // setActiveStep(activeStep + 1)
      // setSentYourRequest(true);
    } else if (
      messageForget &&
      Boolean(dataForget) == false
    ) {
      toast.error(messageForget);
    }

    return () => {
      dispatch(removeForget())
    }
  }, [messageForget, dataForget, dispatch])
  return (
    <div className="flex items-center lg:justify-center min-h-screen h-full  w-full flex-col">

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

            <Button text="التحقق  " onClick={nextStep} />

          </div>
        </form>

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
      </div>
    </div>
  );
};

export default ForgetPassword;
