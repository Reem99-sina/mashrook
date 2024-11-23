import React from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAuthIdMakeCheck,
} from "@/redux/features/userSlice";
import { IoIosArrowForward } from "react-icons/io";
import clsx from "clsx";
import mqtt from 'mqtt';

import { ModalRef } from "../shared/modal.component";
import toast from "react-hot-toast";
interface Props {
  onFinished: (stepNumber?: number) => void;
  modalRef: React.RefObject<ModalRef>;
}

export const StepThree: React.FC<Props> = ({ onFinished, modalRef }) => {
  const [error, setError] = React.useState("");
  const [appear, setAppear] = React.useState(false);
  const [status, setStatus] = React.useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { TransactionId, code } = useSelector<RootState>(
    (state) => state.register
  ) as { TransactionId: string | null; code: string | null };
  const { token, auth } = useSelector<RootState>((state) => state.register) as {
    token: string;
    auth: boolean;
  };

  // const sendVerify = () => {
  //   if (auth) {
  //     onFinished();
  //   }
  // };
  React.useEffect(() => {
    const client = mqtt.connect(process.env.NEXT_PUBLIC_MQTT!);

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('mashrook-transaction-status', (err:Error|null) => {
        if (err) {
          console.error('Subscription failed:', err);
        } else {
          console.log('Subscribed');
        }
      });
    });
    client.on('message', (topic:string, message:Buffer) => {
      const data = JSON.parse(message.toString());
       if(data.TransactionId == TransactionId){
       if (data.Status == "COMPLETED") {
          dispatch(fetchAuthIdMakeCheck());
          onFinished();
        } else if (data.Status == "REJECTED") {
          onFinished(0);
          modalRef?.current?.close();
          toast.error("لم يتم تأكيد الكود علي منصة نفاذ")
        }
       }
    });
    return () => {
      client.end();
    };
  }, []);

  return (
    <div>
      <div className="flex h-full  w-full flex-col items-center justify-center  text-center	 ">
        <div className="my-4 flex w-[453px] flex-col items-center rounded-lg border border-[#DCDFE4] pb-2">
          <div className="mb-3 mt-3">
            <div className="flex items-center justify-end gap-x-3">
              <p className="text-[20px] font-bold text-black"> رمز التحقق</p>
              {appear && (
                <IoIosArrowForward
                  className="cursor-pointer text-2xl"
                  onClick={() => onFinished(1)}
                />
              )}
            </div>
          </div>
          <div className="mb-3 flex items-center justify-center  ">
            <div
              className={clsx(
                " relative flex p-[45px] items-center  justify-center rounded-2xl border border-[#F4F6F9] bg-[#ddf3f3]"
              )}
            >
              <span className="text-xl font-bold text-black">{code}</span>
            </div>
          </div>
          <p className=" mt-3 text-sm text-[#7B8080]">
            الرجاء فتح تطبيق نفاذ و تأكيد الطلب باختيار الرقم أعلاه
          </p>
          <p className=" mt-3 text-sm text-[#7B8080]">
            بعد تاكيد الرقم علي نفاذ اضغط علي رمز التحقق للدخول للصفحة
          </p>
          <p className="text-red-500 mb-3">{error}</p>
        </div>
      </div>
    </div>
  );
};
