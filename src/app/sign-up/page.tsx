"use client";

import React from "react";
import { CloseButton, MashrookLogo } from "../assets/svg";
import { TextInput } from "../components/shared/text-input.component";
import { Button } from "../components/shared/button.component";
import { useRouter } from "next/navigation";
import { AppDispatch,RootState } from "@/redux/store";
import { useDispatch,useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { register } from "@/redux/features/userSlice";
import toast from "react-hot-toast";
export interface userRegister {
  username: string;
  email: string;
  password: string;
  repeate_password: string;
}
const SignUp: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<userRegister>({
    username: "",
    email: "",
    password: "",
    repeate_password: "",
  });
  let {loading, message, data}=useSelector<RootState>((state)=>state.register)as {loading:boolean, message:string, data:any}
  const onSubmit = (e:any) => {
    e.preventDefault();
    let { username, email, password, repeate_password } = user;
    if (
      username != "" &&
      email != "" &&
      password != "" &&
      repeate_password != ""
    ) {
      dispatch(register(user))
      console.log(data,"data")
      
    }else{
      toast.error("you need to fill the information")
    }
  };
  useEffect(()=>{
    if(data){
      router.push(`/verify/${data?.data?.user?.email}` );
      }
  },[data])
  return (
    <div className="flex items-center justify-center min-h-screen h-full  w-full flex-col">
      <div className="flex items-end justify-start p-4 w-full h-full lg:hidden bg-white ">
        <CloseButton
          onClick={() => {
            router.push("/");
          }}
          className="cursor-pointer"
        />
      </div>
      <div className="w-full max-w-md  space-y-8 bg-white  shadow-md md:max-w-lg lg:max-w-xl ">
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
                  onChange={(event) =>
                    setUser({ ...user, username: event.target.value })
                  }
                  disabled={loading}
                />
              </div>
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
                />
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
                لقد قرأت ووافقت على{" "}
                <a className="text-[#3B73B9]">شروط الاستخدام</a> و{" "}
                <a className="text-[#3B73B9]">سياسة الخصوصية</a>
              </label>
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <Button
              text="تسجيل جديد"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#3B73B9] border border-transparent rounded-md group  focus:outline-none focus:ring-2 focus:ring-offset-2 "
              onClick={() => {}}
              type="submit"
            />
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
