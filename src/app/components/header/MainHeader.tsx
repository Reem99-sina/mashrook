
import { useState, useEffect } from "react";
import SideBar from "./SideBar2";
import {
  Mainnavigationmenu,
  Mashrooklogotextlarge,
  User,
} from "@/app/assets/svg";
import Cookie from "js-cookie";
import {fetchToken,getUserRequest,removeLogin }from "@/redux/features/userSlice"
import Image from "next/image";
import Link from "next/link";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {userInfo} from "@/type/addrealestate"

export default function MainHeader() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const toggleSidebar = (e?: any) => {
    e.preventDefault();
    setSidebarOpen(!sidebarOpen);
  };
  const {  token,user:userProfile,message } = useSelector<RootState>(
    (state) => state.register
  ) as {  token:string,user:userInfo,message:string };
  const { dataUser } = useSelector<RootState>((state) => state.login) as {
    dataUser: any;
    data: any;
  };
  
  useEffect(() => {
    dispatch(fetchToken())
  }, [dispatch])
  useEffect(() => {
    if (token&&token!="") {
      dispatch(getUserRequest());
    }else if(!token||token==""){
      dispatch(removeLogin())
    }
  }, [token, dispatch]);
  return (
    <header className="border-b-2 mb-4 w-full bg-white">
      <div className="flex items-center justify-between">
        <div className="w-full self-center p-4">
          <button onClick={toggleSidebar}>
            {(!dataUser&&!userProfile) ? (
              <Mainnavigationmenu />
            ) : (
              <div className="flex items-center flex-row-reverse gap-x-2 border-2 border-gray-200 p-2 rounded-full">
                <div className="relative inline-flex items-center justify-center flex-row-reverse w-5 h-5 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600">
                  <span className="font-medium text-gray-600 dark:text-gray-300 p-2">
                    {(userProfile?.username&&userProfile?.username[0]?.toUpperCase())?userProfile?.username[0]?.toUpperCase():dataUser?.username[0].toUpperCase()}
                  </span>
                </div>
                <User />
              </div>
            )}
            {/* <Mainnavigationmenu /> */}
          </button>
        </div>

        <div className="self-center me-3 p-2">
          <Link href="/">
            <Image
              src={Mashrooklogotextlarge}
              alt={"logo"}
              width={100}
              style={{ objectFit: "cover" }}
              className="rounded-xl"
            />
          </Link>
        </div>
      </div>
      <SideBar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </header>
  );
}

//last modified by Omar Marei 21/7
//last modified by Omar Marei 31/7
