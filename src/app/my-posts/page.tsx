"use client";

import React, { useRef, useEffect , useMemo,useState} from "react";
import { Plus, Posts } from "../assets/svg";
import { Button } from "../components/shared/button.component";
import PostsCard from "../components/shared/PostsCard";
import Pagination from "../components/shared/pagination";
import FilterPart from "./components/filterPart";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import SharedHeaderComponent from "../components/shared/SharedHeaderComponent";
import { getRequest } from "@/redux/features/getOrders";
import { ModalRef } from "@/app/components/shared/modal.component";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import ModalAddAdvertising from "./components/ModalAddAdvertise"
import { fetchToken } from "@/redux/features/userSlice"
import { getAllAdvertise } from "@/redux/features/getMyAdvertise"
import {dataReturn} from "@/redux/features/getRequest"
interface PostInterface{
  id:number|null,
  type:string,
  status:string,
  requestNumber:number,
  announcementDate: string,
  announcementStatus:string,
  active:string
}
const MyPosts: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  let {
    data: dataAdvertise,
  } = useSelector<RootState>((state) => state.myAdvertise) as {
    loading: boolean;
    message: string;
    data: any;
  };
  const modalRef = useRef<ModalRef>(null);
  const AnnounceMentStatus=useMemo(()=>{
    return (ele:dataReturn)=>(ele?.propertyAdvertising&&ele?.propertyAdvertising[0]?.status=="active")?"متاح":ele?.propertyAdvertising&&ele?.propertyAdvertising[0]?.status=="expired"?"منتهي":ele?.propertyAdvertising&&ele?.propertyAdvertising[0]?.status=="rejected"?"مرفوض":ele?.propertyAdvertising&&ele?.propertyAdvertising[0]?.status=="waiting_for_approved"?"في انتظار الموافقة":""
  },[])
  const dataAdvertiseMemo=useMemo(()=>{
   return dataAdvertise?.map((ele:dataReturn)=>({
      type:ele?.propertyTypeDetails?.title,
      status:ele?.propertyPurpose?.title,
      id:ele?.propertyAdvertising?ele?.propertyAdvertising[0]?.id:null,
      requestNumber:ele?.id,
      announcementDate: ele?.propertyAdvertising?format(new Date(ele?.propertyAdvertising[0]?.createdAt), "yyyy-MM-dd"):"",
      announcementStatus:AnnounceMentStatus(ele),
      active:"تمت الشراكة"
    }))
  },[dataAdvertise,AnnounceMentStatus])
  
  let dataPagination = useMemo(() => {
    return dataAdvertiseMemo?.slice((currentPage - 1) * 3, currentPage * 3);
  }, [dataAdvertiseMemo, currentPage]);
  const handleViewProperty = () => { };
  const handleRenew = (id:number) => { 
    router.push(`/showproperty/${id}`)
  };
  useEffect(() => {
    dispatch(getAllAdvertise({}))
  }, [dispatch])
  return (
    <div className="container bg-white mx-auto">
      <SharedHeaderComponent text="إعلاناتي" />
      <div className="p-4">
        <Button
          text="إضافة إعلان جديد"
          startIcon={<Plus />}
          className="!flex !flex-row-reverse items-center justify-center gap-2"
          onClick={() => modalRef?.current?.open()}
        />
      </div>
      <div className="p-4">
        <FilterPart />
      </div>
      <ModalAddAdvertising refModel={modalRef} />
      <div className="p-4 flex flex-col">
        {dataPagination?.length > 0 ? (
          <>
            {dataPagination.map((post:PostInterface, index:number) => (
              <PostsCard
                key={post.id}
                type={post.type}
                status={post.status}
                active={post.active}
                id={post?.id}
                requestNumber={post.requestNumber}
                announcementDate={post.announcementDate}
                announcementStatus={post.announcementStatus}
                onRenew={handleRenew}
                onViewProperty={handleViewProperty}
              />
            ))}
            <div className="mt-auto">
              <Pagination pageCount={Math.ceil(dataAdvertiseMemo?.length / 3)}
                onPageChange={(p) => setCurrentPage(p)}  />
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
