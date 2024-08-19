"use client";
import clsx from "clsx";
import React, { useState } from "react";
import { TextInput } from "../components/shared/text-input.component";
import { Block, MessageIcon, Search } from "../assets/svg";
import { ChatCard } from "./ChatCard";
import { useRouter } from "next/navigation";

const message = [
  {
    count: 1,
    subtitle: "هذا النص هو مثال لنص.....",
    title: "ارض سكنية - قطعة رقم 1234 (رقم الطلب 2022)",
    time: "8:53AM",
    image: <Block />,
  },
  {
    count: 1,
    subtitle: "هذا النص هو مثال لنص.....",
    title: "ارض سكنية - قطعة رقم 1234 (رقم الطلب 2022)",
    time: "8:53AM",
    image: <Block />,
  },
  {
    count: 1,
    subtitle: "هذا النص هو مثال لنص.....",
    title: "ارض سكنية - قطعة رقم 1234 (رقم الطلب 2022)",
    time: "8:53AM",
    image: <Block />,
  },
  {
    count: 1,
    subtitle: "هذا النص هو مثال لنص.....",
    title: "ارض سكنية - قطعة رقم 1234 (رقم الطلب 2022)",
    time: "8:53AM",
    image: <Block />,
  },
  {
    count: 1,
    subtitle: "هذا النص هو مثال لنص.....",
    title: "ارض سكنية - قطعة رقم 1234 (رقم الطلب 2022)",
    time: "8:53AM",
    image: <Block />,
  },
  {
    count: 1,
    subtitle: "هذا النص هو مثال لنص.....",
    title: "ارض سكنية - قطعة رقم 1234 (رقم الطلب 2022)",
    time: "8:53AM",
    image: <Block />,
  },
];

export const MyOffer = () => {
  const router = useRouter();
  const OnClick = () => {
    router.push("/ChatPage");
  };
  return (
    <div className="p-4 bg-white">
      <div>
        <TextInput inputProps={{ placeholder: "بحث" }} icon={<Search />} />
      </div>

      <div>
        {message.length > 0 ? (
          message.map((data, index) => (
            <ChatCard
              key={index}
              count={data.count}
              subtitle={data.subtitle}
              title={data.title}
              time={data.time}
              image={data.image}
              onClick={OnClick}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-9 w-full">
            <MessageIcon />
            <p className="font-medium text-3xl text-[#6B7280] mt-6">
              لا شيء هنا!
            </p>
            <p className="text-base font-normal text-[#9CA3AF] mt-3">
              لا توجد اي محادثات هنا بعد
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
