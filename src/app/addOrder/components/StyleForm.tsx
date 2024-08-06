"use client";

import React from "react";

export default function StyleForm({
    children,title
  }: Readonly<{
    children: React.ReactNode;
    title:string
  }>) {
return (
    <div className="rounded-xl bg-white border-2 border-gray-200 border-solid py-6 px-3 ">
         <div className="text-right">
                    <h2 className="font-bold">{title}</h2>
                    <div className="flex flex-wrap justify-end">
        {children}
        </div>
        </div>
    </div>
)
}