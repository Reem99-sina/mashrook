"use client"
import { BackButtonOutline } from "../assets/svg";
import { useRouter } from "next/navigation";
import { TextInput } from "@/app/components/shared/text-input.component";
import { Button } from "@/app/components/shared/button.component";
import {useState} from "react"
import { FaCheckCircle } from "react-icons/fa";
const PasswordPage=()=>{
    const router = useRouter();
    let [user,setUser]=useState("")
    let [send,setSend]=useState(false)
    const handleBack = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        router.push("/my-account");
      };
    return (<>
            <div className="flex items-center justify-center m-2">
                 <div>
                   <button onClick={handleBack}>
                     <BackButtonOutline />
                   </button>
                 </div>
                 <div className="flex flex-1  items-center justify-center border-b-2 border-gray-200">
                   <p className="flex items-center justify-center text-[#36343B] font-bold text-xl pb-2">
                     كلمة المرور
                   </p>
                 </div>
               </div>
               <div style={{direction:"ltr"}} className="m-5">
                   <TextInput
                     label="كلمة المرور الحالية"
                     inputProps={{ placeholder: "كلمة المرور الحالية" }}
                     value={user}
                     onChange={(event) =>setUser( event.target.value )}
                   //   disabled={loading}
                   />
                    <TextInput
                     label="كلمة المرور الجديدة"
                     inputProps={{ placeholder: "كلمة المرور الجديدة" }}
                     value={user}
                     onChange={(event) =>setUser( event.target.value )}
                   //   disabled={loading}
                   />
                     <TextInput
                     label=" تاكيد كلمة المرور الجديدة "
                     inputProps={{ placeholder: "تاكيد كلمة المرور الجديدة" }}
                     value={user}
                     onChange={(event) =>setUser( event.target.value )}
                   //   disabled={loading}
                   />
               </div>
               <div className="flex flex-row gap-x-3 mx-5 my-8">
            <Button
              text="حفظ"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#3B73B9] border border-transparent rounded-md group  focus:outline-none focus:ring-2 focus:ring-offset-2 "
              onClick={() =>{}}
              type="button"
            />
              <Button
              text="الغاء"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium !text-black !bg-white border-2 !border-gray-500 rounded-md group  focus:outline-none focus:ring-2 focus:ring-offset-2 "
              onClick={() => {}}
              type="button"
            />
            </div>
           </>
      
    )
}
export default PasswordPage