"use client";
import React, { useState,useEffect } from "react";
import MainHeader from "@/app/components/header/MainHeader";
import Pusher from "pusher-js";
import Cookie from 'js-cookie';
import { TextInput } from "@/app/components/shared/text-input.component";
import {
  BackButtonOutline,
  Block,
  MashrookLogoChat,
  Search,
} from "@/app/assets/svg";
import { IoAttach } from "react-icons/io5";
import { useRouter,useParams } from "next/navigation";
import {getMessageByDetailId} from "@/redux/features/getMessageBydetailsId"
import {getMessageByLandId} from "@/redux/features/getMessageBylandId"
import {postMessage} from "@/redux/features/getMessage"
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {chatdetailinfo} from "@/type/chatinterface"
import {userInfo} from "@/type/addrealestate"
import { format } from "date-fns";
const ChatPage = () => {
  const params = useParams();
  const [user,setUser]=useState<userInfo>()
  const { 
    data:dataDetail, message: messageDetail } = useSelector<RootState>(
    (state) => state.messageByDetailsId
  ) as {
    loading: boolean;
    message: string;
    data: chatdetailinfo[];
  };
  const { 
    data:dataLand } = useSelector<RootState>(
    (state) => state.messageByLandId
  ) as {
    loading: boolean;
    message: string;
    data: chatdetailinfo[];
  };
  const {id}=params
  const [messages, setMessages] = useState([
    {
      sender: "إدارة مشروك",
      content: "هنا تستطيع متابعة إدارة...",
      time: "1:30 PM",
      isReceiver: false,
    },
    {
      sender: "باسم الحسيني",
      content: "تم استلام الرسالة...",
      time: "1:30 PM",
      isReceiver: true,
    },
    {
      sender: "إدارة مشروك",
      content: "الرجاء متابعة الطلب...",
      time: "1:32 PM",
      isReceiver: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [detail, setdetail] = useState();
  const [land, setland] = useState();
  const dispatch = useDispatch<AppDispatch>();
  const handleSendMessage = () => {
    if(newMessage){
      dispatch(postMessage({
        room_id:Number(id),
        message:newMessage
      }))
    }
    }
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  useEffect(() => {
    const storedToken = Cookie.get("user");
    const land = Cookie.get("land");
    const detail = Cookie.get("detail");
    if(storedToken){
      setUser(JSON.parse(storedToken));
    }
    if(land){
      setland(JSON.parse(land))
    }
    if(detail){
      setdetail(JSON.parse(detail))
    }
}, []);
// console.log(,"user")
  useEffect(() => {
    const pusher = new Pusher("eac8985b87012d5f5753", {
      cluster:"mt1"
    });
    const channel = pusher.subscribe("chat");
    channel.bind(`chat-${id}`, function () {
      // console.log(data,"data")
      // setChats((prevState) => [
      //   ...prevState,
      //   { sender: data.sender, message: data.message },
      // ]);
    });
    return () => {
      pusher.unsubscribe("chat");
    };
  }, [id]);
  useEffect(()=>{
    if(id){
      if(Cookie.get("detail")){
        dispatch(getMessageByDetailId({id:Number(id)}))
      }else{
        dispatch(getMessageByLandId({id:Number(id)}))
        // getMessageByLandId
      }
    }
  },[id,dispatch])
  return (
    <>
      <div className="flex flex-col h-screen bg-white">
        <MainHeader />
        <div
          className="flex flex-col h-screen bg-white"
          style={{ direction: "rtl" }}
        >
          <div className="flex justify-between items-center p-4 gap-2 flex-row border-b">
            <div>
              <button onClick={handleBack}>
                <BackButtonOutline />
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 flex-row">
              <span>
                <Block />
              </span>
              <h1 className="text-sm font-bold text-[#36343B]">
                {land?land:detail}
              </h1>
            </div>
            <div className="flex items-center ">
              <span className="icon">
                <Search stroke="#1F2A37" />
              </span>
            </div>
          </div>

          <div className="flex-1  p-4 gap-4 flex flex-col">
            {dataDetail?.length > 0
              ? dataDetail?.map((msg:chatdetailinfo, index:number) => (
                  <div
                    key={index}
                    className={`flex ${
                      user?.id==msg?.user_id? "justify-start" : "justify-end"
                    } mb-2`}
                  >
                    <div className="flex flex-col gap-1">
                      <div
                        className={`flex flex-row items-center justify-center gap-3 ${
                          user?.id==msg?.user_id ? "flex-row" : "flex-row-reverse"
                        }`}
                      >
                        {user?.id==msg?.user_id ? (
                          <span className="bg-[#E5E7EB] text-[#111928] font-normal items-center justify-center rounded-full w-9 h-9 flex">
                             {user?.username[0]}
                          </span>
                        ) : (
                          <MashrookLogoChat />
                        )}
                        <p className="text-[#4B5563] text-sm font-semibold">
                          {user?.id==msg?.user_id?user?.username:"ادارة مشروك"}
                        </p>
                        <span className="text-xs font-normal text-[#9CA3AF]">
                          {format(msg?.createdAt, "hh:mm a")}
                        </span>
                      </div>
                      <div
                        className={`max-w-xs p-3 rounded-lg ${
                          user?.id==msg?.user_id
                            ? "bg-[#3B73B9] text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        <p className="mt-1">{msg?.message}</p>
                        {msg?.type=="share_property"&&
                        <div className="bg-white rounded-lg shadow-lg flex flex-col items-center justify-center p-2">
                          <p className="text-[#98CC5D] text-sm">انضمام الشركاء</p>
                          <p className="text-blue-450 text-xs">(تم  التحقق من الدفع وقبول طلب الشراكة)</p>
                        </div>
                        }
                      </div>
                    </div>
                  </div>
                ))
              : dataLand?.map((msg:chatdetailinfo, index:number) => (
                <div
                  key={index}
                  className={`flex ${
                    user?.id==msg?.user_id? "justify-start" : "justify-end"
                  } mb-2`}
                >
                  <div className="flex flex-col gap-1">
                    <div
                      className={`flex flex-row items-center justify-center gap-3 ${
                        user?.id==msg?.user_id ? "flex-row" : "flex-row-reverse"
                      }`}
                    >
                      {user?.id==msg?.user_id ? (
                        <span className="bg-[#E5E7EB] text-[#111928] font-normal items-center justify-center rounded-full w-9 h-9 flex">
                          ي
                        </span>
                      ) : (
                        <MashrookLogoChat />
                      )}
                      <p className="text-[#4B5563] text-sm font-semibold">
                        {user?.id==msg?.user_id?user?.username:"ادارة مشروك"}
                      </p>
                      <span className="text-xs font-normal text-[#9CA3AF]">
                        {msg?.createdAt}
                      </span>
                    </div>
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        user?.id==msg?.user_id
                          ? "bg-[#3B73B9] text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <p className="mt-1">{msg?.message}</p>
                      {msg?.type=="share_property"&&
                        <div className="bg-white rounded-lg shadow-lg flex flex-col items-center justify-center p-2">
                          <p className="text-[#98CC5D] text-sm">انضمام الشركاء</p>
                          <p className="text-blue-450 text-xs">(تم  التحقق من الدفع وقبول طلب الشراكة)</p>
                        </div>
                        }
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex items-center border-t p-4 gap-2">
            <TextInput
              onChange={(e) => setNewMessage(e.target.value)}
              inputProps={{ placeholder: "اكتب رسالة هنا..." }}
              icon={<IoAttach />}
            />
            <button
              className="ml-4 bg-[#9CA3AF] text-white px-4 py-2 rounded-lg"
              onClick={handleSendMessage}
            >
              إرسال
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
