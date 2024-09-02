"use client"
import { useRouter } from "next/navigation";
import { BackButtonOutline,IconNoData } from "../assets/svg";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { BsKey } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaAddressCard } from "react-icons/fa";
import { BsSave } from "react-icons/bs";
import { FaAd } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";

import {removeLogin} from "@/redux/features/loginSlice"
import MainOtion  from "./component/mainOption"
const MyAccountPage=()=>{
    const router = useRouter();
    let {dataUser ,data} =
    useSelector<RootState>((state) => state.login) as {
     
      dataUser: any;
      data:any
    };
    const dispatch = useDispatch<AppDispatch>();
    const handleBack = (e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      router.push("/");
    };
    return (
        <>
        <div className="flex items-center justify-center m-2">
              <div>
                <button onClick={handleBack}>
                  <BackButtonOutline />
                </button>
              </div>
              <div className="flex flex-1  items-center justify-center border-b-2 border-gray-200">
                <p className="flex items-center justify-center text-[#36343B] font-bold text-xl pb-2">
                  حسابي
                </p>
              </div>
            </div>
            <MainOtion title={dataUser?.user?.username} subTitle={"عرض الملف الشخصية"} dataUser={dataUser}/>
            <MainOtion title={"كلمة السر"} subTitle={""} dataUser={dataUser} Icon={BsKey}/>
            <MainOtion title={"الاشعارات"} subTitle={""} dataUser={dataUser} Icon={IoIosNotificationsOutline}/>
            <MainOtion title={"رخصة فال"} subTitle={""} dataUser={dataUser} Icon={FaAddressCard}/>
            <MainOtion title={"محفوظاتي"} subTitle={""} dataUser={dataUser} Icon={BsSave}/>
            <MainOtion title={"اعلاناتي"} subTitle={""} dataUser={dataUser} Icon={FaAd}/>
            <div className="mx-2">
                <div className="flex flex-row gap-x-2 items-center py-4 cursor-pointer" onClick={()=>{
                      sessionStorage.removeItem("token");
                       sessionStorage.removeItem("user");
                       dispatch(removeLogin())
                       router.push("/")
                }}>
                    <CiLogout className={"text-blue-450"}/>
                    <p className={"text-blue-450"}>تسجيل الخروج</p>
                </div>
                <div className="flex flex-row gap-x-2 items-center pb-4 text-red">
                    <RiDeleteBinLine className={"text-red-500"}/>
                    <p className={"text-red-500"}>حذف الحساب </p>
                </div>
            </div>
        </>
    )
}
export default MyAccountPage