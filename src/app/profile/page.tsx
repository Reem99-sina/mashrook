"use client"
import { useRouter } from "next/navigation";
import { BackButtonOutline } from "../assets/svg";
import React,{useRef,useState} from "react"
import Image from "next/image"
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import EditUser from "./component/edituser"
import { CiEdit } from "react-icons/ci";
const ProfilePage=()=>{
    
    const router = useRouter();
    let refImage = useRef<HTMLInputElement>(null);
    let [saveImage,setImage]=useState<File>()
    let [url,setUrl]=useState<string | ArrayBuffer>("")

    let {dataUser ,data} =
    useSelector<RootState>((state) => state.login) as {
      dataUser: any;
      data:any
    };
    function readAndPreview(file:any) {
      // Make sure `file.name` matches our extensions criteria
      
      if((file instanceof File)==true){
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
          const reader = new FileReader();
          reader.addEventListener(
            "load",
            () => {
            if(reader?.result){
              setUrl(String(reader?.result))
            }
            //   preview.appendChild(image);
            },
            false,
          );
          reader.readAsDataURL(file);
      }
      }
    }
    const handleBack = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        router.push("/my-account");
      };
      console.log(url,"url")
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

            <div className="flex flex-row items-center justify-center my-5 cursor-pointer " onClick={()=>refImage?.current?.click()}>
                
                {url?<div className="rounded-full w-[159px] h-[159px] overflow-hidden ">
                  <Image src={String(url)} width={159} height={159} alt="block"/>
                  
                  </div>:<Image src={"/Block.png"} width={159} height={176} alt="block"/>}
                  {url&&<button className="rounded-md border-2 border-gray-500 flex flex-row-reverse items-center p-2 gap-2">
                    <p className="text-xs">تعديل</p>
                    <CiEdit/>
                  </button>}
                <input
                    type="file"
                    className="hidden"
                    ref={refImage}
                    accept="image/*"
                    
                    onChange={(event) => {
                      const files = event.target.files;
                      if (files) {
                        const imageFiles = files[0];
                        if(imageFiles){
                          readAndPreview(imageFiles)
                          setImage(imageFiles)
                        }
                        // setImages(imageFiles);
                      }
                    }}
                  />
            </div>
            <EditUser title={"اسم المستخدم"} name={dataUser?.user?.username} href={`/profile/editName/${dataUser?.user?.id}`}/>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <EditUser title={"الايميل"} name={dataUser?.user?.email}  href={`/profile/editEmail/${dataUser?.user?.id}`}/>

        </>
    )
}
export default ProfilePage