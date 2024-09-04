"use client"
import { useRouter } from "next/navigation";
import { BackButtonOutline } from "../assets/svg";
import React,{useRef} from "react"
import Image from "next/image"
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import EditUser from "./component/edituser"
const ProfilePage=()=>{
    
    const router = useRouter();
    let refImage = useRef<HTMLInputElement>(null);
    let {dataUser ,data} =
    useSelector<RootState>((state) => state.login) as {
     
      dataUser: any;
      data:any
    };
    const handleBack = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        router.push("/my-account");
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
                  الملف الشخصي
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center justify-center my-5 cursor-pointer" onClick={()=>refImage?.current?.click()}>
                <Image src={"/Block.png"} width={159} height={176} alt="block"/>
                <input
                    type="file"
                    className="hidden"
                    ref={refImage}
                    accept="image/*"
                    multiple
                    onChange={(event) => {
                      const files = event.target.files;
                      if (files) {
                        const imageFiles = Array.from(files) as File[];
                        // setImages(imageFiles);
                      }
                    }}
                  />
            </div>
            <EditUser title={"اسم المستخدم"} name={dataUser?.user?.username}/>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <EditUser title={"الايميل"} name={dataUser?.user?.email}/>

        </>
    )
}
export default ProfilePage