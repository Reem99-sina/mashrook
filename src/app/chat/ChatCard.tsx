"use client";
import React from "react";

interface ChatCardProps {
  image: React.ReactElement | undefined;
  title: string;
  subtitle: string;
  time: string;
  count: number;
  onClick?: () => void;
}

export const ChatCard: React.FC<ChatCardProps> = ({
  image,
  title,
  subtitle,
  time,
  count,
  onClick,
}) => {
  return (
    <div
      className="mt-4 w-full border-b-2 mb-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-row gap-6 items-center justify-between">
        <div>{image}</div>
        <div className="flex flex-col flex-wrap mb-auto p-3 items-start w-full">
          <p className="font-normal text-base text-[#000000DE]">{title}</p>
          <p className="text-xs font-normal">{subtitle}</p>
        </div>
        <div className="flex flex-col">
          <span className="bg-[#1976D2] rounded-full items-center justify-center flex text-white">
            {count}
          </span>
          <p className="text-xs font-normal text-[#396FB5]">{time}</p>
        </div>
      </div>
    </div>
  );
};
