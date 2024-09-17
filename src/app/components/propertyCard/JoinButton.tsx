"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { RxArrowLeft } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";
import {fetchToken}from "@/redux/features/userSlice"
import { validateForm } from "@/app/hooks/validate";
import { dataReturn, addUnqiue, typePay } from "@/redux/features/getRequest";
import { amountSchema } from "@/typeSchema/schema";
type JoinStatusButtonsProps = {
  currentDealStatus: boolean;
  data: typePay;
  dataMain: dataReturn;
};

const JoinStatusButtons: React.FC<JoinStatusButtonsProps> = ({
  currentDealStatus,
  data,
  dataMain,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const {  token } = useSelector<RootState>(
    (state) => state.register
  ) as {  token:string };
  const [user, setUser] = useState<any>();
  const [partnershipPercentage, setPartnershipPercentage] = useState(0);
  const router = useRouter();
  const availableAmount = 600000;
  const dispatch = useDispatch<AppDispatch>();
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { selectData } = useSelector<RootState>(
    (state) => state.getRequest
  ) as {
    loading: boolean;
    message: string;
    data: dataReturn[];
    selectData: dataReturn;
  };
  const [errors, setErrors] = useState<{
    amount: string;
  }>();

  const handleDialogToggle = () => {
    setShowDialog(!showDialog);
  };
  const handleSubmit = async () => {
    const status = await validateForm(
      { amount: partnershipAmount },
      amountSchema,
      setErrors
    );

    if (status == true) {
      dispatch(
        addUnqiue({
          id: dataMain?.id,
          detail_id: data?.id,
          title: dataMain?.propertyType?.title,
          numberPiece: data?.piece_number,
          type: Boolean(data?.type) ? false : true,
          propertyOwnerType: dataMain?.propertyOwnerType?.title,
          propertyPurpose: dataMain?.propertyPurpose?.id,
        })
      );
      router.push("/termsandconditions");
    }
  };

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPartnershipPercentage(Number(e.target.value));
  };
  useEffect(() => {
    const inputElement = document.querySelector('input[type="range"]');
    const tooltipElement = tooltipRef.current;

    if (inputElement && tooltipElement) {
      const updateTooltipPosition = () => {
        const rangeWidth = inputElement.clientWidth;
        const newLeft = rangeWidth - (partnershipPercentage / 100) * rangeWidth;
        tooltipElement.style.left = `${newLeft}px`;
      };

      updateTooltipPosition();

      inputElement.addEventListener("input", updateTooltipPosition);
      return () => {
        inputElement.removeEventListener("input", updateTooltipPosition);
      };
    }
  }, [partnershipPercentage]);
  useEffect(() => {
    dispatch(fetchToken())
  }, [dispatch])
  useEffect(() => {
    if (typeof window != "undefined") {
      const userItem = Cookie?.get("user");
      if(userItem&&userItem!="undefined"){
        const makeObject=JSON.parse(userItem)
        setUser(makeObject);
      }
    }
  }, []);

  const partnershipAmount = useMemo(() => {
    return (data?.available_price * partnershipPercentage) / 100;
  }, [data?.available_price, partnershipPercentage]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("amount", String(partnershipAmount));
      sessionStorage.setItem("element", JSON.stringify(data));
    }
  }, [partnershipAmount, data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount = Number(e.target.value.replace(/,/g, ""));

    if (inputAmount > data?.available_price) {
      setPartnershipPercentage(100);
    } else {
      const newPercentage = (inputAmount / data?.available_price) * 100;
      setPartnershipPercentage(newPercentage);
    }
  };
  return (
    <div id="joinStatus" className="py-4">
      <div className="flex justify-center">
        <button
          type="button"
          className={`${
            data?.stage === "finished" ||
            Boolean(token) == false ||
            user?.id == dataMain?.user_id
              ? "bg-gray-300 text-gray-800"
              : "bg-blue-450 text-white hover:bg-blue-800 border-2 border-blue-500"
          } w-3/4 font-medium rounded-lg text-sm px-5 py-2.5 flex justify-center rtl:flex-row-reverse dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          disabled={
            data?.stage === "finished" ||
            Boolean(token) == false ||
            user?.id == dataMain?.user_id
          }
          onClick={handleDialogToggle}
        >
          <RxArrowLeft
            className={`mr-4 text-xl ${
              data?.stage === "finished" ||
              Boolean(token) == false ||
              user?.id == dataMain?.user_id
                ? "text-gray-600"
                : "text-white"
            }`}
          />
          انضم كشريك
        </button>
      </div>
      {/* )} */}

      {showDialog && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center px-2 ">
          <div className="bg-white rounded-lg p-4 z-50 ">
            <div className="flex justify-between items-center mb-6 border-b-2 pb-2 ">
              <button
                type="button"
                className="text-2xl font-bold  text-gray-600 hover:text-gray-900"
                onClick={handleDialogToggle}
              >
                &times;
              </button>
              <h2 className="text-sm lg:text-xl font-bold">
                {data?.piece_number
                  ? "رقم القطعة-" + data?.piece_number
                  : data?.type}
              </h2>
              <p></p>
            </div>
            <div className="mb-4">
              <p className="text-lg font-medium">
                المبلغ المتاح
                <span className="text-blue-450 font-bold mx-4">
                  {data?.available_price} ريال
                </span>
              </p>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">نسبة شراكتك</label>

              <div className="flex justify-between text-sm mt-2">
                <span>0%</span>
                <span>100%</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={partnershipPercentage}
                  onChange={handlePercentageChange}
                  className="w-full"
                  dir="rtl"
                />
                <div
                  ref={tooltipRef}
                  className="absolute -top-6 left-0 bg-blue-450 text-white text-xs px-3 py-1 rounded-full"
                >
                  {partnershipPercentage.toFixed(2)}%
                </div>
              </div>
            </div>
            <div className="mb-4 mx-14">
              <label className="block mb-2 font-medium">مبلغ الشراكة</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={partnershipAmount.toLocaleString()}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-r-lg"
                />
                <span className="bg-blue-450 text-white py-2 px-4 rounded-l-lg border-2 border-r-0">
                  ريال
                </span>
              </div>
              {errors?.amount && (
                <p className="text-xs text-red-600 dark:text-red-500 text-right">
                  {String(errors?.amount)}
                </p>
              )}
            </div>
            <div className="flex justify-between">
              <button
                // href="/termsandconditions"
                type="button"
                className="flex-grow bg-blue-450 text-white px-4 py-2 mx-2 rounded-lg text-center"
                onClick={handleSubmit}
              >
                متابعة
              </button>
              <button
                type="button"
                className="flex-grow border-2 text-gray-800 px-4 py-2 rounded-lg"
                onClick={handleDialogToggle}
              >
                الغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinStatusButtons;
