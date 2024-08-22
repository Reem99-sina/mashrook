"use client";
import React, { useState } from "react";
import MainHeader from "../components/header/MainHeader";
import { TextInput } from "../components/shared/text-input.component";
import {
  BackButtonOutline,
  Block,
  MashrookLogoChat,
  Search,
} from "@/app/assets/svg";
import { IoAttach } from "react-icons/io5";
import { useRouter } from "next/navigation";

const ChatPage = () => {
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
            {messages.length > 0
              ? messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.isReceiver ? "justify-start" : "justify-end"
                    } mb-2`}
                  >
                    <div className="flex flex-col gap-1">
                      <div
                        className={`flex flex-row items-center justify-center gap-3 ${
                          msg.isReceiver ? "flex-row" : "flex-row-reverse"
                        }`}
                      >
                        {msg.isReceiver ? (
                          <span className="bg-[#E5E7EB] text-[#111928] font-normal items-center justify-center rounded-full w-9 h-9 flex">
                            ي
                          </span>
                        ) : (
                          <MashrookLogoChat />
                        )}
                        <p className="text-[#4B5563] text-sm font-semibold">
                          {msg.sender}
                        </p>
                        <span className="text-xs font-normal text-[#9CA3AF]">
                          {msg.time}
                        </span>
                      </div>
                      <div
                        className={`max-w-xs p-3 rounded-lg ${
                          msg.isReceiver
                            ? "bg-[#3B73B9] text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        <p className="mt-1">{msg.content}</p>
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
