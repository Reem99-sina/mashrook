"use client";

import React from "react";
import { CloseButton, MashrookLogo } from "@/app/assets/svg";
import { TextInput } from "../components/shared/text-input.component";
import { Button } from "../components/shared/button.component";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { login, removeLogin } from "@/redux/features/loginSlice";
import toast from "react-hot-toast";
import { loginSchema } from "@/typeSchema/schema";
import { validateForm } from "@/app/hooks/validate";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import useFcmToken from "@/utils/hooks/useFcmToken";
export interface userLogin {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [remember, setRemember] = useState(false);
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  // Use the token as needed
  const [user, setUser] = useState<userLogin>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    | {
        email: string;
        password: string;
      }
    | undefined
  >();
  let { loading, message, data } = useSelector<RootState>(
    (state) => state.login
  ) as { loading: boolean; message: string; data: any };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const status = await validateForm(user, loginSchema, setErrors);
    let { email, password } = user;
    if (status == true) {
      dispatch(login({ ...user, device_token: fcmToken })).then((res: any) => {
        if (res.payload.message && !res.payload.status) {
          toast.success(res.payload.message);
          router.push(`/`);
        } else if (res.payload.status) {
          toast.error(res.payload.message);
        }
      });
      if (remember == true) {
        const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000; // 7 days in a week
        const currentTime = new Date().getTime();
        const timeForWeek = currentTime + oneWeekInMillis;
        Cookie.set("tokenTime", String(timeForWeek));
      } else {
        Cookie.remove("tokenTime");
      }
      setErrors({ email: "", password: "" });
    }
  };
  // useEffect(() => {
  //   const currentTime = new Date().getTime();
  //    if (Boolean(data) == true) {
  //     toast.success(message);
  //     // sessionStorage.setItem("token", data?.token);
  //     Cookie.set("user", JSON.stringify(data?.user));

  //   }else if(message&&Boolean(data) == false){
  //     toast.error(message);
  //   }
  // }, [data, message, router]);
  useEffect(() => {
    return () => {
      dispatch(removeLogin());
    };
  }, [dispatch]);
  return (
    <div className="flex items-center justify-center min-h-screen h-full min-w-screen lg:w-full bg-white  w-screen flex-col">
      {/* <div className="flex items-end justify-start p-4 w-full h-full lg:hidden bg-white ">
        <CloseButton
          onClick={() => {
            router.push("/");
          }}
          className="cursor-pointer"
        />
      </div> */}
      <div className="w-full   space-y-8 bg-white  shadow-md  ">
        <div className=" items-end justify-start ml-4 mt-4 flex ">
          <CloseButton
            onClick={() => {
              router.push("/");
            }}
            className="cursor-pointer"
          />
        </div>
        <div className="text-center flex items-center justify-center flex-col  h-full">
          <MashrookLogo />
          <p className="mt-6 text-2xl font-bold text-[#374151]">تسجيل الدخول</p>
        </div>

        <form
          className="mt-8 space-y-6 p-8 "
          onSubmit={onSubmit}
          autoComplete={remember ? "on" : "off"}
        >
          <div className="rounded-md shadow-sm">
            <div className="mb-4 gap-4">
              <div className="!mb-2">
                <TextInput
                  label="البريد الإلكتروني "
                  inputProps={{ placeholder: "البريد الإلكتروني" }}
                  type="email"
                  value={user.email}
                  onChange={(event) =>
                    setUser({ ...user, email: event.target.value })
                  }
                  disabled={loading}
                  autoComplete={remember ? "email" : ""}
                />
                {errors?.email && (
                  <p className="text-xs text-red-600 dark:text-red-500 text-right">
                    {errors?.email}
                  </p>
                )}
              </div>
              <div>
                <TextInput
                  label="كلمة المرور"
                  type="password"
                  inputProps={{ placeholder: "ادخل كلمة المرور" }}
                  value={user.password}
                  onChange={(event) =>
                    setUser({ ...user, password: event.target.value })
                  }
                  disabled={loading}
                  autoComplete={"password"}
                />
                {errors?.password && (
                  <p className="text-xs text-red-600 dark:text-red-500 text-right">
                    {errors?.password}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="forget-password" className=" text-sm text-[#3B73B9]">
                نسيت كلمة المرور؟
              </a>
            </div>
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setRemember(event?.target?.checked)
                }
                checked={remember}
              />
              <label
                htmlFor="remember-me"
                className="block ml-2 text-sm text-gray-900"
              >
                تذكرني
              </label>
            </div>
          </div>

          <div>
            {loading ? (
              <button
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#3B73B9] border border-transparent rounded-md group  focus:outline-none focus:ring-2 focus:ring-offset-2 "
                disabled={loading}
              >
                <AiOutlineLoading3Quarters className="rotate-90 text-gray-500" />
              </button>
            ) : (
              <>
                <Button
                  type="submit"
                  text="تسجيل الدخول"
                  disabled={loading}
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#3B73B9] border border-transparent rounded-md group  focus:outline-none focus:ring-2 focus:ring-offset-2 "
                ></Button>
              </>
            )}
          </div>
          <div className="text-right">
            <Link href="/login-otp" className="text-blue-450 text-right">
              عن طريق OTP تسجيل الدخول
            </Link>
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

export default Login;
