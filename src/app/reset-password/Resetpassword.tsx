"use client";

import React from "react";
import { TextInput } from "../components/shared/text-input.component";
interface forgetPasswordInfo{
  new_password: string,
  repeate_new_password: string
}
interface dataReset{
  data:forgetPasswordInfo,setData:React.Dispatch<React.SetStateAction<forgetPasswordInfo>>,error:any
}
export const ResetPassword: React.FC<dataReset> = ({data,setData,error}) => {
  return (
    <div className="w-full  gap-y-6 flex flex-col">
      <div>
        <TextInput label="كلمة المرور" value={data?.new_password}
        onChange={(event) =>
          setData((prev:forgetPasswordInfo)=>({...prev, new_password:event.target.value }))
        }type="text" />
        {error?.new_password&& (
                        <p className="text-xs text-red-600 dark:text-red-500 text-right">
                          {error?.new_password}
                        </p>
                      )}
      </div>
      <div>
        <TextInput label="تاكيد كلمة المرور" value={data?.repeate_new_password}
        onChange={(event) =>
          setData((prev:forgetPasswordInfo)=>({...prev, repeate_new_password:event.target.value }))
        }type="text"/>
         {error?.repeate_new_password&& (
                        <p className="text-xs text-red-600 dark:text-red-500 text-right">
                          {error?.repeate_new_password}
                        </p>
                      )}
      </div>
    </div>
  );
};
