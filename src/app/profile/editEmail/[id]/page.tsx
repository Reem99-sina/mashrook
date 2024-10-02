"use client"
import { BackButtonOutline } from "@/app/assets/svg";
import { useRouter } from "next/navigation";
import {useState,useEffect} from "react"
import { TextInput } from "@/app/components/shared/text-input.component";
import { Button } from "@/app/components/shared/button.component";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { resendCodeRequest } from "@/redux/features/vierfySlice";
import {updateUser,removeUser}from "@/redux/features/userSlice"
import toast from "react-hot-toast";
import {ForgetSchema} from "@/typeSchema/schema"
import { validateForm } from "@/app/hooks/validate";
import {userInfo} from "@/type/addrealestate"
interface errorInter{
  email:string
}
const EditName=()=>{
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [errors, setErrors] = useState<errorInter>();
    let {dataUser ,data} =useSelector<RootState>((state) => state.login) as {
      dataUser: any;
      data:any
    };
    const {  user:userProfile,message } = useSelector<RootState>(
      (state) => state.register
    ) as { user:userInfo,message:string };
    let [user,setUser]=useState(dataUser?.user?.email)
   
    const handleBack = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        router.push("/profile");
      };
      const onSubmit=async()=>{
        const status=await validateForm({email:user},ForgetSchema,setErrors)
        if(status==true){
          dispatch(updateUser({email:user}))
        }
      }
      useEffect(()=>{
        if(Boolean(userProfile)==true&&message){
          toast.success(message)
          
          dispatch(resendCodeRequest({email:String(userProfile?.email)}))
          router.push(`/profile/editEmail/${userProfile?.id}/verify/${user}`)
        }else if(Boolean(userProfile)==false&&message){
          toast.error(message)
        }
        return ()=>{
          dispatch(removeUser())
        }
      },[message,userProfile,dispatch,router,user])
    
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
                  الايميل
                </p>
              </div>
            </div>
            <div style={{direction:"ltr"}} className="m-5">
                <TextInput
                  label="الايميل"
                  inputProps={{ placeholder: "الايميل" }}
                  value={user}
                  onChange={(event) =>setUser( event.target.value )}
                //   disabled={loading}
                />
                  {errors?.email && (
                            <p className="text-xs text-red-600 dark:text-red-500 text-right">
                              {String(errors?.email)}
                            </p>
                          )}
            </div>
            <div className="flex flex-row gap-x-3 mx-5 my-8">
            <Button
              text="حفظ"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#3B73B9] border border-transparent rounded-md group  focus:outline-none focus:ring-2 focus:ring-offset-2 "
              onClick={onSubmit}
              type="button"
            />
              <Button
              text="الغاء"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium !text-black !bg-white !border-2 !border-gray-500 rounded-md group  focus:outline-none focus:ring-2 focus:ring-offset-2 "
              onClick={() => setUser("")}
              type="button"
            />
            </div>
        </>
    )
}
export default EditName