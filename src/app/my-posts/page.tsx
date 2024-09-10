"use client";

import React from "react";
import { Plus, Posts } from "../assets/svg";
import { Button } from "../components/shared/button.component";
import PostsCard from "../components/shared/PostsCard";
import Pagination from "../components/shared/pagination";
import FilterPart from "../mySave/component/filterPart";
import SharedHeaderComponent from "../components/shared/SharedHeaderComponent";

const posts = [
  {
    type: "شقة (داخل فيلا)",
    status: "للبيع",
    active: "تمت الشراكة",
    id: 12345,
    requestNumber: 2022,
    announcementDate: "2024-4-23",
    announcementStatus: "سند دفع غير مقبول",
  },
  {
    type: "شقة (داخل فيلا)",
    status: "للبيع",
    active: "متاح",
    id: 12346,
    requestNumber: 2023,
    announcementDate: "2024-4-24",
    announcementStatus: "منتهي",
  },
  {
    type: "شقة (داخل فيلا)",
    status: "للبيع",
    active: "تمت الشراكة",
    id: 12347,
    requestNumber: 2024,
    announcementDate: "2024-4-25",
    announcementStatus: "التحقق من سند الدفع",
  },
  {
    type: "شقة (داخل فيلا)",
    status: "للبيع",
    active: "متاح",
    id: 12348,
    requestNumber: 2025,
    announcementDate: "2024-4-26",
    announcementStatus: "سند دفع غير مقبول",
  },
  {
    type: "شقة (داخل فيلا)",
    status: "للبيع",
    active: "متاح",
    id: 12349,
    requestNumber: 2026,
    announcementDate: "2024-4-27",
    announcementStatus: "سند دفع غير مقبول",
  },
];

const MyPosts: React.FC = () => {
  const handleRenew = () => {};

  const handleViewProperty = () => {};

  return (
    <div className="container bg-white mx-auto">
      <SharedHeaderComponent text="إعلاناتي" />

      <div className="p-4">
        <Button
          text="إضافة إعلان جديد"
          startIcon={<Plus />}
          className="!flex !flex-row-reverse items-center justify-center gap-2"
        />
      </div>
      <div className="p-4">
        <FilterPart />
      </div>
      <div className="p-4 flex flex-col">
        {posts.length > 0 ? (
          <>
            {posts.map((post, index) => (
              <PostsCard
                key={post.id}
                type={post.type}
                status={post.status}
                active={post.active}
                id={post.id}
                requestNumber={post.requestNumber}
                announcementDate={post.announcementDate}
                announcementStatus={post.announcementStatus}
                onRenew={handleRenew}
                onViewProperty={handleViewProperty}
              />
            ))}
            <div className="mt-auto">
              <Pagination pageCount={4} onPageChange={() => {}} />
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500 flex items-center justify-center flex-col mb-8">
            <Posts />
            <p className="text-[32px] text-[#6B7280] font-medium">
              لا شيء هنا!
            </p>
            <p className="text-base font-normal text-[#9CA3AF]">
              لا توجد لديك إعلانات لعرضها
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
