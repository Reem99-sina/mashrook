"use client";

import React, { useRef } from "react";
import { CloseButton, MashrookLogo } from "@/app/assets/svg";
import { TextInput } from "../components/shared/text-input.component";
import { Button } from "../components/shared/button.component";
import "react-phone-number-input/style.css";
import { ModalRef } from "../components/shared/modal.component";
import PhoneInput from "react-phone-number-input";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { register, removeUser } from "@/redux/features/userSlice";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { registerSchema } from "@/typeSchema/schema";
import { validateForm } from "@/app/hooks/validate";
import ModelRules from "@/app/components/shared/ModelRules";
import Cookie from "js-cookie";
import { eventAnalistic } from "@/utils/event-analistic";
export interface userRegister {
  username: string;
  email: string;
  phone: string;
  password: string;
  repeate_password: string;
}
const SignUp: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const modalRefRules = useRef<ModalRef>(null);
  const [user, setUser] = useState<userRegister>({
    username: "",
    email: "",
    phone: "",
    password: "",
    repeate_password: "",
  });
  const [checkBox, setCheckBox] = useState(false);
  let { loading, message, data } = useSelector<RootState>(
    (state) => state.register
  ) as { loading: boolean; message: string; data: any };
  const [errors, setErrors] = useState<{
    username: string;
    email: string;
    phone: string;
    password: string;
    repeate_password: string;
  }>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const status = await validateForm(user, registerSchema, setErrors);

    if (checkBox) {
      if (status == true) {
        dispatch(register(user));
        eventAnalistic({
          action: "Register_without_otp",
          category: "register",
          label: "Register without otp",
          value: "Register_without_otp",
        });
        setErrors({
          username: "",
          email: "",
          phone: "",
          password: "",
          repeate_password: "",
        });
      }
    } else {
      toast.error(" يجب الموافقه علي شروط الاستخدام وسياسية الخصوصية");
    }
  };
  useEffect(() => {
    if (message && Boolean(data) == true) {
      toast.success(message);
      router.push(`/verify/${data?.user?.email}`);
    } else if (message && Boolean(data) == false) {
      toast.error(message);
    }
    return () => {
      dispatch(removeUser());
    };
  }, [data, message, router, dispatch]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = Cookie.remove("token");
    }
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen h-full  w-full flex-col">
      {/* <div className="flex items-end justify-start p-4 w-full h-full lg:hidden bg-white ">
        <CloseButton
          onClick={() => {
            router.push("/");
          }}
          className="cursor-pointer"
        />
      </div> */}
      <div className="w-full max-w-md  space-y-8 bg-white  shadow-md  ">
        <div className=" items-end justify-start ml-4 mt-4 hidden sm:flex ">
          <CloseButton
            onClick={() => {
              router.push("/");
            }}
            className="cursor-pointer"
          />
        </div>
        <div className="text-center flex items-center justify-center flex-col  h-full">
          <MashrookLogo />
          <p className="mt-6 text-2xl font-bold text-[#374151]">إنشاء حساب</p>
        </div>
        <form className="mt-8 space-y-6 p-8" onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm">
            <div className="mb-4 gap-4">
              <div className="!mb-2">
                <TextInput
                  label="اسم المستخدم"
                  inputProps={{ placeholder: "اسم المستخدم" }}
                  value={user.username}
                  autoComplete={"username"}
                  onChange={(event) =>
                    setUser({ ...user, username: event.target.value })
                  }
                  disabled={loading}
                  name="username"
                />
                {errors?.username && (
                  <p className="text-xs text-red-600 dark:text-red-500 text-right">
                    {errors?.username}
                  </p>
                )}
              </div>
              <div className="!mb-2">
                <TextInput
                  label="البريد الإلكتروني "
                  inputProps={{ placeholder: "البريد الإلكتروني" }}
                  type="email"
                  name="email"
                  autoComplete={"email"}
                  value={user.email}
                  onChange={(event) =>
                    setUser({ ...user, email: event.target.value })
                  }
                  disabled={loading}
                />
                {errors?.email && (
                  <p className="text-xs text-red-600 dark:text-red-500 text-right">
                    {errors?.email}
                  </p>
                )}
              </div>
              <div className="!my-2" style={{ direction: "rtl" }}>
                <h3 className="font-bold text-[#4B5563] my-2">
                  ادخل الرقم الجوال
                </h3>
                <PhoneInput
                  placeholder="50 345 6708"
                  className="border-2 border-gray-300 p-1 rounded-md "
                  numberInputProps={{ style: { textAlign: "end" } }}
                  value={user?.phone}
                  defaultCountry="SA"
                  countries={["SA"]}
                  labels={{ SA: "المملكة العربية السعودية" }}
                  addInternationalOption={false}
                  international={false}
                  onChange={(value) => {
                    if (value) {
                      setUser((prev) => ({ ...prev, phone: String(value) }));
                    }
                  }}
                  limitMaxLength={true}
                />
                {errors?.phone && (
                  <p className="text-xs text-red-600 dark:text-red-500 text-right">
                    {errors?.phone}
                  </p>
                )}
              </div>

              <div className="!mb-2">
                <TextInput
                  label="كلمة المرور"
                  type="password"
                  inputProps={{ placeholder: "ادخل كلمة المرور" }}
                  value={user.password}
                  onChange={(event) =>
                    setUser({ ...user, password: event.target.value })
                  }
                  disabled={loading}
                />
                {errors?.password && (
                  <p className="text-xs text-red-600 dark:text-red-500 text-right">
                    {errors?.password}
                  </p>
                )}
              </div>
              <div className="!mb-2">
                <TextInput
                  label="تاكيد كلمة المرور"
                  type="password"
                  inputProps={{ placeholder: "تاكيد كلمة المرور" }}
                  value={user.repeate_password}
                  onChange={(event) =>
                    setUser({ ...user, repeate_password: event.target.value })
                  }
                  disabled={loading}
                />
                {errors?.repeate_password && (
                  <p className="text-xs text-red-600 dark:text-red-500 text-right">
                    {errors?.repeate_password}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm"></div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="remember-me"
                className="block ml-2 text-sm text-gray-900"
              >
                <button
                  className="text-[#98CC5D]"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    modalRefRules?.current?.open();
                  }}
                >
                  الأحكام
                </button>
                <button
                  className="text-[#98CC5D]"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    modalRefRules?.current?.open();
                  }}
                >
                  الشروط و
                </button>
                لقد قرأت ووافقت على
              </label>
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                onChange={(e) => setCheckBox(e.target.checked)}
                checked={checkBox}
              />
            </div>
          </div>
          <ModelRules
            refModel={modalRefRules}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCheckBox(e.target.checked)
            }
            deal={checkBox}
          />
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
                  text="تسجيل جديد"
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#3B73B9] border border-transparent rounded-md group  focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  onClick={() => {}}
                  type="submit"
                />
              </>
            )}
          </div>
        </form>
        <div className="mt-auto bg-[#3B73B9] text-center w-full h-[271px] mb-0 lg:h-[40px] flex items-center  lg:gap-2 justify-center flex-col lg:flex-row-reverse">
          <p className="lg:text-base text-3xl font-medium text-white">
            لديك حساب بالفعل؟
          </p>
          <a
            href="/login"
            className="font-medium text-base text-white hover:cursor-pointer lg:text-base"
          >
            قم بتسجيل الدخول باستخدام بياناتك{" "}
          </a>
          <div>
            <a
              href="/login"
              className="relative text-sm flex justify-center w-full px-14 mt-9 lg:hidden py-2 font-medium text-white bg-[#3B73B9] border border-transparent border-white rounded-md group  focus:outline-none focus:ring-2 focus:ring-offset-2 "
            >
              تسجيل الدخول
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
