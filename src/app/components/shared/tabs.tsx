"use client";
import clsx from "clsx";
import React, { FC, useState } from "react";

interface Props {
  tabs: {
    title: string;
    Component: JSX.Element;
  }[];
}

export const Tabs: FC<Props> = ({ tabs }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div>
      <div className="mb-4 flex border-b border-[rgba(0,0,0,0.3)] items-center justify-around">
        {tabs.map((tab, index) => {
          const textColorClass =
            index === activeTabIndex
              ? "text-[#3B73B9]"
              : "text-[rgba(0,0,0,0.3)]";

          return (
            <div
              className={clsx(
                "flex cursor-pointer justify-between items-center ",
                index === activeTabIndex ? "border-b-4 border-[#3B73B9]" : ""
              )}
              key={tab.title}
              onClick={() => {
                setActiveTabIndex(index);
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

      {tabs[activeTabIndex].Component}
    </div>
  );
};
