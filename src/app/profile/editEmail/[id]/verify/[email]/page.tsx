"use client"
import { BackButtonOutline } from "@/app/assets/svg";
import { useRouter,useParams } from "next/navigation";
import {useState,useRef,useEffect} from "react"
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { verifyRequest,resendCodeRequest,deleteMessage } from "@/redux/features/vierfySlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/app/components/shared/button.component";
import toast from "react-hot-toast";
const VerifyEmail=()=>{
    const router = useRouter();
    const params=useParams()
    const inputRefs = useRef<(HTMLInputElement|null)[]>([]); 
    let dispatch = useDispatch<AppDispatch>();
    const [time, settime] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [code, setCode] = useState(Array(4).fill(""));
    let {email}=params
    let {dataUser ,data} =
    useSelector<RootState>((state) => state.login) as {
      dataUser: any;
      data:any
    };
    let { loading, message, data:dataVerify } = useSelector<RootState>(
      (state) => state.verify
    ) as { loading: boolean; message: string; data: any };
    let [user,setUser]=useState(dataUser?.user?.email)
    const handleChange = (value: string, index: number) => { 

        // Move to the next input if the current input is filled  
        if (value.length === 1 && index < inputRefs.current.length - 1) {  
            inputRefs?.current[index + 1]?.focus();  
        }  

        // Move to the previous input if the current input is empty  
        if (value.length === 0 && index > 0) {  
            inputRefs?.current[index - 1]?.focus();  
        }  
const newCode = [...code];
newCode[index] = value;
setCode(newCode);
};
const onResend=()=>{
    dispatch(resendCodeRequest({email:String(email)?.replace("%40", "@")}))
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      dispatch(
        verifyRequest({
          email: String(email)?.replace("%40", "@"),
          code: code.join(""),
        })
      );
    } else {
      toast.error("you need email and code");
    }
  };
    const handleBack = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        router.push(`/profile/editEmail/${dataUser?.user?.id}`);
      };
      useEffect(() => {
        if (message && Boolean(dataVerify) == false&&message!="تم إرسال الكود اللي الايميل.") {
          toast.error(message);
        } else if (Boolean(dataVerify) == true) {
          toast.success(message);
          router.push(`/my-account`);
        }else if(message=="تم إرسال الكود اللي الايميل." && Boolean(dataVerify) == false){
          settime(60)
          toast.success(message)
        }
        return ()=>{
          dispatch(deleteMessage())
        }
      }, [message,router, dataVerify,dispatch]);
      useEffect(() => {
        let interval:NodeJS.Timeout;
        if (time > 0) {
          interval = setInterval(() => {
            settime((prevTimer) => prevTimer - 1);
          }, 1000);
        } else if (time === 0) {
          setCanResend(true); // Re-enable the button after 60 seconds
        }
        return () => clearInterval(interval);
      }, [time]);
    return(
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
            <div className="p-4">
                <h3 className="font-bold">
                    التحقق من البريد الالكتروني
                </h3>
                <p className="text-sm">
                لقد قمنا بإرسال رمز التحقق الى بريدك الالكتروني {String(email)?.replace("%40","@")?String(email)?.replace("%40","@"):"email"} الرجاء قم بإدخال رمز التحقق لتعديل الايميل
                </p>
            </div>
            <div className="p-4">
            <h3 className="font-semibold ">
                    رمز التحقق
                </h3> 
                <div style={{direction:"ltr"}} className="text-end">
                {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  ref={(el) => {inputRefs.current[index] = el}} 
                  maxLength={1}
                  pattern="\d{4}"
                  className="w-12 h-12 m-1 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                />
              ))}
              </div>
              <p className=" text-sm text-gray-500 mb-4">
              لم يصلك الرمز؟{" "}
              <button className={`${time!=0?"text-gray-500":"text-[#98CC5D]"}`} onClick={onResend} type="button" disabled={time!=0}>
                إعادة إرسال الرمز خلال {time} ثانية
              </button>
            </p>
            <div>
            {/* {loading? */}
            {/* <button
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#3B73B9] border border-transparent rounded-md group  focus:outline-none focus:ring-2 focus:ring-offset-2 "
            //   disabled={loading}
            ><AiOutlineLoading3Quarters className="rotate-90 text-gray-500"/>
            </button> */}
            
            {/* : */}
             <Button
              text="تحقق"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#3B73B9] border border-transparent rounded-md group  focus:outline-none focus:ring-2 focus:ring-offset-2 "
              type="submit"
              onClick={onSubmit}
            />
            {/* } */}
           
          </div>
            </div>
        </>
    )
}
export default VerifyEmail