"use client";
import React, { useState, useEffect } from "react";
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
import { useRouter, useParams } from "next/navigation";
import { getMessageByid } from "@/redux/features/getMessage";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

const ChatPage = () => {
  const params = useParams();
  const [user, setUser] = useState<any>();
  const { loading, message, data } = useSelector<RootState>(
    (state) => state.messageByID
  ) as {
    loading: boolean;
    message: string;
    data: any;
  };
  const { id } = params;
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
  const dispatch = useDispatch<AppDispatch>();
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setMessages([
        ...messages,
        {
          sender: "أنت",
          content: newMessage,
          time: currentTime,
          isReceiver: true,
        },
      ]);

      setNewMessage("");
    }
  };
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  useEffect(() => {
    const storedToken = Cookie.get("user");
    if (storedToken) {
      setUser(JSON.parse(storedToken));
    }
  }, []);
  useEffect(() => {
    const pusher = new Pusher("eac8985b87012d5f5753", {
      cluster: "mt1",
    });
    const channel = pusher.subscribe("chat");

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);
  useEffect(() => {
    if (id) {
      dispatch(getMessageByid({ id: Number(id) }));
    }
  }, [id, dispatch]);
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
                ارض سكنية - قطعة رقم 1234 (رقم الطلب 2022)
              </h1>
            </div>
            <div className="flex items-center ">
              <span className="icon">
                <Search stroke="#1F2A37" />
              </span>
            </div>
          </div>

          <div className="flex-1  p-4 gap-4 flex flex-col">
            {data?.length > 0
              ? data.map((msg: any, index: number) => (
                  <div
                    key={index}
                    className={`flex ${
                      user?.id == msg?.user_id ? "justify-start" : "justify-end"
                    } mb-2`}
                  >
                    <div className="flex flex-col gap-1">
                      <div
                        className={`flex flex-row items-center justify-center gap-3 ${
                          user?.id == msg?.user_id
                            ? "flex-row"
                            : "flex-row-reverse"
                        }`}
                      >
                        {user?.id == msg?.user_id ? (
                          <span className="bg-[#E5E7EB] text-[#111928] font-normal items-center justify-center rounded-full w-9 h-9 flex">
                            ي
                          </span>
                        ) : (
                          <MashrookLogoChat />
                        )}
                        <p className="text-[#4B5563] text-sm font-semibold">
                          {user?.id == msg?.user_id
                            ? msg?.sender
                            : "ادارة مشروك"}
                        </p>
                        <span className="text-xs font-normal text-[#9CA3AF]">
                          {msg?.createdAt}
                        </span>
                      </div>
                      <div
                        className={`max-w-xs p-3 rounded-lg ${
                          user?.id == msg?.user_id
                            ? "bg-[#3B73B9] text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        <p className="mt-1">{msg?.message}</p>
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
