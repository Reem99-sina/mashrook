
import {messageInfo} from "@/type/chatinterface"
import { format } from "date-fns";
import { IoMdNotifications } from "react-icons/io";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import {readMessages} from "@/redux/features/getMyNotification"
const MessageItem=({data}:{data:messageInfo})=>{
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const onClick=()=>{
        dispatch(readMessages({notification_ids:[data?.id]}))
        router.push(data?.link)
    }
    return (
        <div className={`flex gap-x-3 items-center justify-between ${data?.is_read==false?"bg-[#F3F4F6]":"bg-white"} p-3 cursor-pointer`} onClick={onClick}>
            <div className="rounded-full border-2 border-gray-400 p-2">
                <IoMdNotifications className="text-[18px]" />
            </div>
            
            <div className="flex gap-x-2 items-start flex-col">
                <h3 className="font-bold text-sm">{data?.body}</h3>
                <p className="text-gray-500 text-sm">أنقر لمعرفة التفاصيل</p>
            </div>
            <div className="flex gap-x-2 items-center flex-col">
                <p className="rounded-full w-2 h-2 bg-blue-450"></p>
                <p className="text-sm text-blue-450" style={{direction:"ltr"}}>{format(data?.createdAt,"hh:mm a")}</p>
            </div>
        </div>
    )
}
export default MessageItem