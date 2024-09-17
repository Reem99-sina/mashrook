"use client";
import { useRouter } from "next/navigation";
import { BackButtonOutline } from "../assets/svg";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Cookie from 'js-cookie';
import toast from "react-hot-toast";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import EditUser from "./component/edituser";
import { CiEdit } from "react-icons/ci";
import { updateUserImage } from "@/redux/features/userSlice"
import { userInfo } from "@/type/addrealestate"
import { fetchuser, removeUser } from "@/redux/features/userSlice"
const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  let refImage = useRef<HTMLInputElement>(null);
  let [saveImage, setImage] = useState<File>();
  let [url, setUrl] = useState<string | ArrayBuffer>("");
  const { user } = useSelector<RootState>(
    (state) => state.register
  ) as { user: userInfo, message: string };

  const { user: userProfile, message } = useSelector<RootState>(
    (state) => state.register
  ) as { user: string, message: string };
  function readAndPreview(file: any) {
    // Make sure `file.name` matches our extensions criteria
    if (file instanceof File == true) {
      if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            if (reader?.result) {
              setUrl(String(reader?.result));
            }
            //   preview.appendChild(image);
          },
          false
        );
        reader.readAsDataURL(file);
      }
    }
  }
  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/my-account");
  };
  useEffect(() => {
    dispatch(fetchuser())
  }, [dispatch]);
  useEffect(() => {
    if (Boolean(userProfile) == true && message) {
      toast.success(message)

    } else if (Boolean(userProfile) == false && message) {
      toast.error(message)
    }
    return () => {
      dispatch(removeUser())
    }
  }, [message, userProfile, dispatch])
  return (<>
    <div className="flex items-center justify-center ">
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

    <div
      className="flex flex-col items-center justify-center my-5 cursor-pointer "

    >
      <div onClick={() => refImage?.current?.click()}>
        {url ? (
          <div className="rounded-full w-[159px] h-[159px] overflow-hidden ">
            <Image src={String(url)} width={159} height={159} alt="block" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="rounded-full w-[159px] h-[159px] overflow-hidden ">
              <Image src={user?.image ? user?.image : "/Block.png"} width={159} height={159} alt="block" />
            </div>
            <div className="rounded-md border-2 border-gray-500 flex flex-row-reverse items-center p-2 gap-2 cursor-pointer"
            >
              <p className="text-xs">اضافة</p>
              <CiEdit />
            </div>
          </div>
        )}
      </div>
      {url && (
        <div className="rounded-md border-2 border-gray-500 flex flex-row-reverse items-center p-2 gap-2 cursor-pointer"
          onClick={() => {
            if (saveImage) {
              dispatch(updateUserImage({ image: saveImage }))
            }
          }}
        >
          <p className="text-xs">تعديل</p>
          <CiEdit />
        </div>
      )}
      <input
        type="file"
        className="hidden"
        ref={refImage}
        accept="image/*"
        onChange={(event) => {
          const files = event.target.files;
          if (files) {
            const imageFiles = files[0];
            if (imageFiles) {
              readAndPreview(imageFiles);
              setImage(imageFiles);
            }
          }
        }}
      />
    </div>
    <EditUser
      title={"اسم المستخدم"}
      name={user?.username}
      href={`/profile/editName/${user?.id}`}
    />
    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
    <EditUser
      title={"الايميل"}
      name={user?.email}
      href={`/profile/editEmail/${user?.id}`}
    />
  </>
  );
}
export default Page;
