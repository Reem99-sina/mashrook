"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import MainHeader from "@/app/components/header/MainHeader";
import Pusher from "pusher-js";
import Cookie from "js-cookie";
import { TextInput } from "@/app/components/shared/text-input.component";
import {
  BackButtonOutline,
  Block,
  MashrookLogoChat,
  Search,
} from "@/app/assets/svg";
import { IoAttach } from "react-icons/io5";
import { fetchuser } from "@/redux/features/userSlice"
import { useRouter, useParams } from "next/navigation";
import { getMessageByid, postMessage, postFileMessage } from "@/redux/features/getMessage";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { userInfo } from "@/type/addrealestate"
import Image from "next/image"
import { chatdetailinfo, messagePusher } from "@/type/chatinterface"
const ChatPage = () => {
  const params = useParams();
  let refImage = useRef<HTMLInputElement>(null);
  const { user } = useSelector<RootState>(
    (state) => state.register
  ) as { user: userInfo, message: string };
  const [title, setTitle] = useState<string>();
  const [senderId, setsenderId] = useState<number>();
  const [receiver_id, setreceiver_id] = useState<number>();

  const { loading, message, data } = useSelector<RootState>(
    (state) => state.messageByID
  ) as {
    loading: boolean;
    message: string;
    data: chatdetailinfo[];
  };
  const [newMessages, setMessage] = useState<chatdetailinfo[]>([])
  const { id } = params;
  const [newMessage, setNewMessage] = useState<string | File>("");
  const dispatch = useDispatch<AppDispatch>();
  const room_id = useMemo(() => {
    if (newMessages?.length > 0) {
      return Number(newMessages[0]?.room_id)
    }
  }, [newMessages])
  const handleSendMessage = () => {
    if (newMessage instanceof File == true) {
      dispatch(postFileMessage({
        room_id: Number(id),
        message: newMessage
      }))
    } else {
      dispatch(postMessage({
        room_id: Number(id),
        message: newMessage
      }))
    }
  }
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  useEffect(() => {
    if (data?.length > 0) {
      setMessage(data)
    }
  }, [data])
  useEffect(() => {
    dispatch(fetchuser())
    const title = Cookie.get("title")
    const sender_id = Cookie.get("senderId")
    const receiver_id = Cookie.get("receiver_id")
    if (sender_id) {
      setsenderId(Number(sender_id))
    }
    if(receiver_id){
      setreceiver_id(Number(receiver_id))
    }
    if (title) {
      setTitle(title)
    }
  }, [dispatch]);
  useEffect(() => {
    const pusher = new Pusher("eac8985b87012d5f5753", {
      cluster: "mt1",
    });
    const channel = pusher.subscribe(`chats-${senderId}`);
    const channelReceiver = pusher.subscribe(`chats-${receiver_id}`);
    channelReceiver.bind(`newMessage`, function (message: messagePusher) {
      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      setMessage((prev) => [...prev, {
        message: message?.message,
        alert_link: null, alert_link_text: null,
        alert_link_type: null,
        alert_message: null,
        alert_message_text: null,
        room_id: Number(id),
        type: message?.type,
        user_id: message?.authorId,
        createdAt: String(new Date())
      }])
      setNewMessage("")
    });
    
    channel.bind(`newMessage`, function (message: messagePusher) {
      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      setMessage((prev) => [...prev, {
        message: message?.message,
        alert_link: null, alert_link_text: null,
        alert_link_type: null,
        alert_message: null,
        alert_message_text: null,
        room_id: Number(id),
        type: message?.type,
        user_id: message?.authorId,
        createdAt: String(new Date())
      }])
      setNewMessage("")
    });
    return () => {
      pusher.unsubscribe(`chats-${senderId||receiver_id||2}`);
    };
  }, [id, senderId,receiver_id]);

  useEffect(() => {
    if (id) {
      dispatch(getMessageByid({ id: Number(id) }));
    }
  }, [id, dispatch]);
  return (
    <>
      <div
        className={`flex flex-col  bg-white ${newMessages?.length == 0 ? "h-screen" : "min-h-screen"}`}
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
              {title}
            </h1>
          </div>
          <div className="flex items-center ">
            <span className="icon">
              <Search stroke="#1F2A37" />
            </span>
          </div>
        </div>

        <div className="flex-1  p-4 gap-4 flex flex-col">
          {newMessages?.length > 0
            ? newMessages.map((msg: chatdetailinfo, index: number) => (
              <div
                key={index}
                className={`flex ${user?.id == msg?.user_id ? "justify-start" : "justify-end"
                  } mb-2`}
              >
                <div className="flex flex-col gap-1">
                  <div
                    className={`flex flex-row items-center justify-start gap-3 ${user?.id == msg?.user_id
                        ? "flex-row"
                        : "flex-row-reverse"
                      }`}
                  >
                    {user?.id == msg?.user_id ? (
                      <span className="bg-[#E5E7EB] text-[#111928] font-normal items-center justify-center rounded-full w-9 h-9 flex">
                        {user?.username[0]}
                      </span>
                    ) : (
                      <MashrookLogoChat />
                    )}
                    <p className="text-[#4B5563] text-sm font-semibold">
                      {user?.id == msg?.user_id
                        ? user?.username
                        : "ادارة مشروك"}
                    </p>
                    <span className="text-xs font-normal text-[#9CA3AF]">
                      {format(msg?.createdAt, "hh:mm a")}
                    </span>
                  </div>
                  <div
                    className={`max-w-xs p-3 rounded-lg ${user?.id == msg?.user_id
                        ? "bg-[#3B73B9] text-white"
                        : "bg-gray-100"
                      }`}
                  >
                    {msg?.type == "string" && <p className="my-1">{msg?.message}</p>}
                    {msg?.alert_message &&
                      <div className="bg-white rounded-lg shadow-lg flex flex-col items-center justify-center p-2">
                        <p className="text-[#98CC5D] text-sm">{msg?.alert_message}</p>
                        <p className="text-blue-450 text-xs">{msg?.alert_message_text}</p>
                      </div>
                    }
                    {msg?.alert_link &&
                      <div className="bg-white rounded-lg shadow-lg flex flex-col items-center justify-center p-2">
                        <p className="text-[#98CC5D] text-sm">{msg?.alert_link}</p>
                        <p className="text-blue-450 text-xs">{msg?.alert_link_type}</p>
                        <p className="text-blue-450 text-xs">{msg?.alert_link_text}</p>
                      </div>
                    }
                    {msg?.type == "file" &&
                      <div className="bg-white rounded-lg shadow-lg flex flex-col items-center justify-center p-2">
                        {/* <p className="text-[#98CC5D] text-sm">انضمام الشركاء</p> */}
                        <Image src={msg?.message} width={50} height={50} alt="message" />
                        {/* <a className="text-blue-450 text-xs" href={msg?.message}>(تم  التحقق من الدفع وقبول طلب الشراكة)</a> */}
                      </div>
                    }
                  </div>
                </div>
              </div>
            ))
            : ""}
        </div>

        <div className="flex items-center border-t p-4 gap-2">
          <TextInput
            onChange={(e) => setNewMessage(e.target.value)}
            inputProps={{ placeholder: "اكتب رسالة هنا..." }}
            icon={<IoAttach onClick={() => refImage.current?.click()} />}
            value={(newMessage instanceof File == true && newMessage?.name) ? newMessage?.name : newMessage}
          />
          <input
            type="file"
            className="hidden"
            ref={refImage}
            accept="application/pdf,image/*"
            onChange={(event) => {
              const files = event.target.files;
              if (files) {
                setNewMessage(files[0])
              }
            }}
          />
          <button
            className="ml-4 bg-[#9CA3AF] text-white px-4 py-2 rounded-lg"
            onClick={handleSendMessage}
          >
            إرسال
          </button>
        </div>
      </div>

    </>
  );
};

export default ChatPage;
