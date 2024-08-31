"use client";
import PropertyDetails from "../PropertyDetails";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getRequestByid } from "@/redux/features/getRequest";
export default function ShowProperty() {
  const router = useParams();
  const { id } = router;
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    if (id) {
      dispatch(getRequestByid({ id: Number(id) }));
    }
  }, [id, dispatch]);
  return (
    <div dir="rtl">
      <PropertyDetails id={Number(id)}/>
    </div>
  );
}

//last modified by Omar Marei 2/8/2024
