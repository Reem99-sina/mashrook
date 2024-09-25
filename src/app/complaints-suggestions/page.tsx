"use client"
import { TextInput } from "@/app/components/shared/text-input.component";
import {useState} from "react"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Button } from "@/app/components/shared/button.component";
import { ComplaintsSchema } from "@/typeSchema/schema";
import { validateForm } from "@/app/hooks/validate";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {postComplaint} from "@/redux/features/complaintsSuggestions"
interface ComplaintsSuggestionsProps{
name:string,
phone:string,
title:string,
details:string,
type:string
}
const arrayPurpose=[{title:"عام",value:"general"},{title:"تقديم شكوى",value:"complaint"},{title:"تقديم اقتراح",value:"suggest"}]
const ComplaintsSuggestions=()=>{
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()
    const [data,setData]=useState<ComplaintsSuggestionsProps>({
        name:"",
        phone:"",
        title:"",
        details:"",
        type:""
    })
    const [errors, setErrors] = useState<undefined|ComplaintsSuggestionsProps>();
    const onSubmit=async()=>{
        const status=await validateForm(data,ComplaintsSchema,setErrors)
        if(status==true){
            dispatch(postComplaint(data)).then((res: any) => {
                if (res.payload.message && !res.payload.status) {
                  toast.success(res.payload.message)
                  router.push("/");
                } else if (res.payload.status) {
                  toast.error(res.payload.message);
                }
              })
        }
    }
    return (
        <div className="m-2 " style={{direction:"rtl"}}>
            <h3 className="text-xl font-bold my-3">راسلنا</h3>
            <div style={{direction:"ltr"}}>
            <div style={{direction:"rtl"}} className="my-2">
            <h3 className="font-bold text-[#4B5563] my-2"> غرض المراسلة</h3>
            <select
                    className="border w-full text-right border-[#D1D5DB] rounded-lg"
                    onChange={(event) =>
                        setData({ ...data, type: event?.target?.value })
                    }
                    value={data?.type}
                  >
                    <option value="" selected>
                        --الرجاء الاختيار--
                      </option>
                    {arrayPurpose?.map((city: {title:string,value:string}) => (
                      <option key={city.value} value={city.value}>
                        {city?.title}
                      </option>
                    ))}
                  </select>
                  {errors?.type && (
                  <p className="text-xs text-red-600 dark:text-red-500 text-right">
                    {errors?.type}
                  </p>
                )}
                  </div>
            <div className="!mb-2">
                <TextInput
                  label="الاسم بالكامل "
                  inputProps={{ placeholder: "الاسم بالكامل" }}
                  type="text"
                  value={data?.name}
                  onChange={(event) =>
                    setData({ ...data, name: event.target.value })
                  }
                />
                {errors?.name && (
                  <p className="text-xs text-red-600 dark:text-red-500 text-right">
                    {errors?.name}
                  </p>
                )}
              </div>
              <div className="!my-2" style={{direction:"rtl"}}>
                <h3 className="font-bold text-[#4B5563] my-2"> الرقم الجوال</h3>
              <PhoneInput
              placeholder="050 345 6708"
              className="border-2 border-gray-300 p-1 rounded-md "
          numberInputProps={{style:{textAlign:"end"}}}
      value={data?.phone}
      defaultCountry="SA"
      countries={["SA"]}
      labels={{"SA":"المملكة العربية السعودية"}}
      addInternationalOption={false}
      onChange={(value)=>setData({ ...data, phone: value?String(value):"" })}/>
      {errors?.phone && (
                  <p className="text-xs text-red-600 dark:text-red-500 text-right">
                    {errors?.phone}
                  </p>
                )}
</div>
<div className="!mb-2" >
                <TextInput
                  label="عنوان الرسالة "
                  inputProps={{ placeholder: "عنوان الرسالة" }}
                  type="text"
                  value={data?.title}
                  onChange={(event) =>
                    setData({ ...data, title: event.target.value })
                  }
                />
                {errors?.title && (
                  <p className="text-xs text-red-600 dark:text-red-500 text-right">
                    {errors?.title}
                  </p>
                )}
              </div>
              <div className="!mb-2" >
                <TextInput
                  label="تفاصيل الرسالة "
                  inputProps={{ placeholder: "تفاصيل الرسالة" }}
                  type="text"
                  value={data?.details}
                  onChange={(event) =>
                    setData({ ...data, details: event.target.value })
                  }
                />
                {errors?.details && (
                  <p className="text-xs text-red-600 dark:text-red-500 text-right">
                    {errors?.details}
                  </p>
                )}
              </div>
              <Button
              type="submit"
              text="ارسال"
              onClick={onSubmit}
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#3B73B9] border border-transparent rounded-md group  focus:outline-none focus:ring-2 focus:ring-offset-2 "
            ></Button>
            </div>
        </div>
    )
}
export default ComplaintsSuggestions