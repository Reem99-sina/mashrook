"use client";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getMyNotification } from "@/redux/features/getMyNotification";
import { messageInfo } from "@/type/chatinterface";
import MessageItem from "./component/messageItem";
import { useRouter } from "next/navigation";
import { Note, BackButtonOutline } from "@/app/assets/svg";
const NotificationPage = () => {
  // getMyNotification
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector<RootState>((state) => state.notifications) as {
    data: messageInfo[];
  };
  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  };
  useEffect(() => {
    dispatch(getMyNotification());
  }, [dispatch]);
  // {format(new Date(data?.createdAt), 'EEEE')}
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
            الاشعارات
          </p>
        </div>
      </div>
      <div className="my-4">
        {data?.length > 0 ? (
          data?.map((ele: messageInfo) => (
            <MessageItem data={ele} key={ele?.id} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-9 w-full">
            <Note />
            <p className="font-medium text-3xl text-[#6B7280] mt-6">
              لا شيء هنا!
            </p>
            <p className="text-base font-normal text-[#9CA3AF] mt-3">
              لا توجد لديك طلبات لعرضها
            </p>
          </div>
        )}
      </div>
    </>
  );
};
export default NotificationPage;
