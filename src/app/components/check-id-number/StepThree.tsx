import React from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthId, verifyNationalIdUser } from "@/redux/features/userSlice";
import toast from "react-hot-toast";
interface Props {
  onFinished: () => void;
}

export const StepThree: React.FC<Props> = ({ onFinished }) => {
  const [error, setError] = React.useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { TransactionId,code } = useSelector<RootState>(
    (state) => state.register
  ) as {  TransactionId:string|null,code:string|null};
  const { token, auth } = useSelector<RootState>((state) => state.register) as {
    token: string;
    auth: boolean;
  };
  // React.useEffect(() => {
  //   let interval: NodeJS.Timeout;
  //   if (auth == true) {
  //     onFinished();
  //   }
  //   if (time > 0) {
  //     interval = setInterval(() => {
  //       settime((prevTimer) => prevTimer - 1);
  //     }, 1000);
  //   } else if (time == 0) {
  //     onFinished();
  //   }
  //   return () => clearInterval(interval);
  // }, [time, auth, onFinished]);
  const sendVerify=()=>{
    dispatch(verifyNationalIdUser({TransactionId:TransactionId})).then((res)=>{
      if(!res.payload.status){
        onFinished()
      }else{
        setError(res.payload.message)
      }
    }).catch((error)=>{
      setError(error.message)
    })
  }
  React.useEffect(() => {
    dispatch(fetchAuthId());
  }, [dispatch]);
  return (
    <div>
      <div className="flex h-full  w-full flex-col items-center justify-center  text-center	 ">
        <div className="mt-8 flex w-[453px] flex-col items-center rounded-lg border border-[#DCDFE4]">
          <div className="mb-3 mt-8">
            <p className="text-[20px] font-bold"> تطابق رمز التحقق</p>
            <p className=" mt-3 text-sm text-[#7B8080]">
              اختر رمز التحقق المرسل كما هو مطابق بالمرسل على رقم{" "}
            </p>
            <p className="text-sm text-[#7B8080]">
              جوالك المسجل لدى مركز المعلومات الوطني{" "}
            </p>
          </div>
          <div className="mb-3 flex items-center justify-center  ">
            <div className=" relative flex h-[90px] w-[389px] items-center  justify-center rounded-2xl border border-[#F4F6F9] bg-[#F4F6F9] ">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#A4A4A4] bg-white">
                <span
                  className="text-lg font-bold text-[#7B8494]"
                  onClick={sendVerify}
                >
                  {code}
                </span>
              </div>
            </div>
           
          </div>
          <p className="text-red-500 mb-3">{error}</p>
        </div>
      </div>
    </div>
  );
};
