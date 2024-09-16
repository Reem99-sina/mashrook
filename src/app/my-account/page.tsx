"use client"
import {useState,useEffect} from "react"
import { useRouter } from "next/navigation";
import { BackButtonOutline,IconNoData } from "../assets/svg";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { BsKey } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaAddressCard } from "react-icons/fa";
import { BsSave } from "react-icons/bs";
import { FaAd } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import Cookie from 'js-cookie';
import {removeLogin} from "@/redux/features/loginSlice"
import MainOtion  from "./component/mainOption"
const MyAccountPage=()=>{
    const router = useRouter();
    const [user, setUser] = useState<any | null>(null);
    
    useEffect(() => {
   
      const storedToken = Cookie.get("user");
      if(storedToken&&storedToken!="undefined" ){
        const makeObject=JSON.parse(storedToken)
        setUser(makeObject);
      }
    
  }, []);
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
            <MainOtion title={user?.username} subTitle={"عرض الملف الشخصية"} dataUser={user}onClick={()=>router.push("/profile")}/>
            <MainOtion title={"كلمة السر"} subTitle={""} dataUser={user} Icon={BsKey} onClick={()=>router.push("/password")}/>
            <MainOtion title={"الاشعارات"} subTitle={""} dataUser={user} Icon={IoIosNotificationsOutline}onClick={()=>router.push("/")}/>
            <MainOtion title={"رخصة فال"} subTitle={""} dataUser={user} Icon={FaAddressCard}onClick={()=>router.push("/lisence_number")}/>
            <MainOtion title={"محفوظاتي"} subTitle={""} dataUser={user} Icon={BsSave}onClick={()=>router.push("/mySave")}/>
            <MainOtion title={"اعلاناتي"} subTitle={""} dataUser={user} Icon={FaAd} onClick={()=>router.push("/")}/>
            <div className="mx-2">
                <div className="flex flex-row gap-x-2 items-center py-4 cursor-pointer" onClick={()=>{
                      Cookie.remove("token");
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