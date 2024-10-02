"use client";

import React, { useState, useMemo, useEffect } from "react";
import { CloseButton, MashrookLogo } from "@/app/assets/svg";
import { Button } from "../components/shared/button.component";
import { ResetPassword } from "./Resetpassword";
import { useRouter } from "next/navigation";
import { validateForm } from "../hooks/validate";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { ForgetSchema, ResetSchema } from "@/typeSchema/schema";
import { forget, removeForget, reset } from "@/redux/features/loginSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
interface forgetPasswordInfo {
  new_password: string;
  repeate_new_password: string;
}

const ForgetPassword: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [activeStep, setActiveStep] = useState<number>(1);
  let [email, setEmail] = useState<string>("");
  let [data, setData] = useState<forgetPasswordInfo>({
    new_password: "",
    repeate_new_password: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  let { messageRest, dataRest } = useSelector<RootState>(
    (state) => state.login
  ) as {
    messageForget: string;
    dataForget: any;
    messageRest: string;
    dataRest: any;
  };
  const [errors, setErrors] = useState<any>();

  const onReset = async () => {
    let status = await validateForm(data, ResetSchema, setErrors);
    if (status == true && token) {
      setErrors({});
      dispatch(reset({ ...data, token: token }));
      // setActiveStep(activeStep + 1);
    }
  };
  const router = useRouter();
  const steps = useMemo(() => {
    return [
      // {
      //   title: "نسيت كلمة المرور",
      //   component: <ForgetNewPassword email={email} onChange={(email)=>setEmail(email)} error={errors?.email}/>,
      // },
      {
        title: "إعادة تعيين كلمة المرور",
        component: (
          <ResetPassword data={data} setData={setData} error={errors} />
        ),
      },
    ];
  }, [errors, data]);
  useEffect(() => {
    if (messageRest == "Password is updated successfully.") {
      toast.success(messageRest);
      router.push("/");
      // setActiveStep(activeStep + 1)
      // setSentYourRequest(true);
    } else if (messageRest) {
      toast.error(messageRest);
    }

    return () => {
      dispatch(removeForget());
    };
  }, [messageRest, dispatch, router]);
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
            <Button text="إعادة تعيين" onClick={onReset} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
