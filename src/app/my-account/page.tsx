"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { BackButtonOutline, IconNoData } from "../assets/svg";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { BsKey } from "react-icons/bs";
import { fetchuser } from "@/redux/features/userSlice"
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaAddressCard } from "react-icons/fa";
import { BsSave } from "react-icons/bs";
import toast from "react-hot-toast";
import { FaAd } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { removeTokenUser, deleteUser, removeMessage ,deleteTokenUser} from "@/redux/features/userSlice"
import { RiDeleteBinLine } from "react-icons/ri";
import useFcmToken from '@/utils/hooks/useFcmToken';
import Cookie from 'js-cookie';
import { removeLogin } from "@/redux/features/loginSlice"
import MainOtion from "./component/mainOption"
import { userInfo } from "@/type/addrealestate"
const MyAccountPage = () => {
  const router = useRouter();
  const { fcmToken,notificationPermissionStatus } = useFcmToken();
  const { user, message } = useSelector<RootState>(
    (state) => state.register
  ) as { user: userInfo, message: string };


  const dispatch = useDispatch<AppDispatch>();
  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push("/");
  };
  const onDeleteAccount = () => {
    dispatch(deleteTokenUser({token:fcmToken}))
    Cookie.remove("token");
    Cookie.remove("user");
    Cookie.remove("tokenTime");
    router.push("/")
    dispatch(removeLogin());
    dispatch(removeTokenUser());
  }
  useEffect(() => {
    dispatch(fetchuser())
  }, [dispatch]);
  useEffect(() => {
    if (message) {
      toast(message)
    }
    return () => {
      dispatch(removeMessage())
    }
  }, [message, dispatch])
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
      <MainOtion title={user?.username} subTitle={"عرض الملف الشخصية"} dataUser={user} onClick={() => router.push("/profile")} />
      <MainOtion title={"كلمة السر"} dataUser={user} Icon={BsKey} onClick={() => router.push("/password")} />
      <MainOtion title={"الاشعارات"} dataUser={user} Icon={IoIosNotificationsOutline} onClick={() => router.push("/notification")} />
      <MainOtion title={"رخصة فال"} dataUser={user} Icon={FaAddressCard} onClick={() => router.push("/lisence_number")} />
      <MainOtion title={"محفوظاتي"} dataUser={user} Icon={BsSave} onClick={() => router.push("/mySave")} />
      <MainOtion title={"اعلاناتي"} dataUser={user} Icon={FaAd} onClick={() => router.push("/my-posts")} />
      <div className="mx-2">
        <div className="flex flex-row gap-x-2 items-center py-4 cursor-pointer" onClick={onDeleteAccount}>
          <CiLogout className={"text-blue-450"} />
          <p className={"text-blue-450"}>تسجيل الخروج</p>
        </div>
        <div className="flex flex-row gap-x-2 items-center pb-4 text-red cursor-pointer" onClick={() => dispatch(deleteUser())}>
          <RiDeleteBinLine className={"text-red-500"} />
          <p className={"text-red-500"}>حذف الحساب </p>
        </div>
      </div>
    </>
  )
}
export default MyAccountPage