"use client";
import clsx from "clsx";
import React, { FC, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";
interface Props {
  tabs: {
    title: string;
    Component: JSX.Element;
    active:boolean
  }[];
}

export const Tabs: FC<Props> = ({ tabs }) => {
 
  const router = useRouter();
  const searchParams=useSearchParams()
  return (
    <div>
      <div className="mb-4 flex border-b border-[rgba(0,0,0,0.3)] items-center justify-around">
        {tabs.map((tab, index) => {
          const textColorClass =
            (tab?.active)
              ? "text-[#3B73B9]"
              : "text-[rgba(0,0,0,0.3)]";

          return (
            <div
              className={clsx(
                "flex cursor-pointer justify-between items-center ",
                (tab?.active) ? "border-b-4 border-[#3B73B9]" : ""
              )}
              key={tab.title}
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString())
                params.set('title',tab.title)
                router.push(`?${params.toString()}`)
              }}
            >
              <div className={clsx(`h-[50px] self-start rounded-tr-lg  p-3`)}>
                <h3
                  className={`text-xs  font-bold sm:text-base ${textColorClass}`}
                >
                  {tab.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {tabs.find((tab)=>tab?.active==true)?.Component}
    </div>
  );
};
