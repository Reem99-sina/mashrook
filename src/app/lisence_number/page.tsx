"use client"
import { BackButtonOutline } from "../assets/svg";
import { useRouter } from "next/navigation";
import { TextInput } from "@/app/components/shared/text-input.component";
import { Button } from "@/app/components/shared/button.component";
import {useState} from "react"
import { FaCheckCircle } from "react-icons/fa";
const LisenceNumberPage=()=>{
    const router = useRouter();
    let [user,setUser]=useState("")
    let [send,setSend]=useState(false)
    const handleBack = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        router.push("/my-account");
      };
    return (
        send==false?  <>
            <div className="flex items-center justify-center m-2">
                 <div>
                   <button onClick={handleBack}>
                     <BackButtonOutline />
                   </button>
                 </div>
                 <div className="flex flex-1  items-center justify-center border-b-2 border-gray-200">
                   <p className="flex items-center justify-center text-[#36343B] font-bold text-xl pb-2">
                     رقم رحصة فال
                   </p>
                 </div>
               </div>
               <div style={{direction:"ltr"}} className="m-5">
                   <TextInput
                     label="رقم رخصة فال"
                     inputProps={{ placeholder: "رقم رخصة فال" }}
                     value={user}
                     onChange={(event) =>setUser( event.target.value )}
                   //   disabled={loading}
                   />
               </div>
               <div className="flex flex-row gap-x-3 mx-5 my-8">
               <Button
                 text="حفظ"
                 className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#3B73B9] border border-transparent rounded-md group  focus:outline-none focus:ring-2 focus:ring-offset-2 "
                 onClick={() => {}}
                 type="button"
               />
               </div>
           </>:<>
           <div className="border-2 border-gray-300 rounded-md m-3 flex flex-col items-center justify-center">
            <FaCheckCircle className="text-[96px] text-[#98CC5D]" />
            <h3 className="font-bold">
                نجاح التحقق!
            </h3>
            <p className="text-sm text-gray-500 my-3">
                لقد تم التحقق من رخصة فال بنجاح
            </p>
            <hr className="border-gray-300 dark:border-white my-2 w-full " />
                <div className="flex flex-col items-center justify-center w-full px-3">
                    <div className="flex flex-row items-center justify-between w-full my-2">
                    <h3 className="font-semi-bold">
                رقم رخصة فال
            </h3>
            <p className="text-gray-500">
               12345678 
            </p>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full my-2">
                    <h3 className="font-semi-bold">
                        اسم المرخص
                            </h3>
            <p className="text-gray-500">
               ياسر الخميسي 
            </p>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full my-2">
                    <h3 className="font-semi-bold">
                        النشاط العقاري
                            </h3>
            <p className="text-gray-500">
               فال للوساطةوالتسويق
            </p>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full my-2">
                    <h3 className="font-semi-bold">
                        تاريخ الاصدار
                            </h3>
            <p className="text-gray-500">
               01/03/2024
            </p>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full my-2">
                    <h3 className="font-semi-bold">
                        تاريخ الانتهاء
                            </h3>
            <p className="text-gray-500">
               01/03/2024
            </p>
                    </div>
                </div>
           </div>
           </>
      
    )
}
export default LisenceNumberPage