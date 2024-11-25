"use client";
import { BackButtonOutline } from "../assets/svg";
import { useRouter } from "next/navigation";
import { TextInput } from "@/app/components/shared/text-input.component";
import { Button } from "@/app/components/shared/button.component";
import { useState, useEffect, useMemo } from "react";
import { FaCheckCircle } from "react-icons/fa";
import FilterPart from "./component/filterPart";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getSaves } from "@/redux/features/mySave";
import { OfferCard } from "./component/offerCard";
import { format } from "date-fns";
import { FormatNumber } from "@/app/hooks/formatNumber";
import { Note } from "@/app/assets/svg";
const MySavePage = () => {
  const router = useRouter();
  let [user, setUser] = useState("");
  let [send, setSend] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  let { loading, message, data } = useSelector<RootState>(
    (state) => state?.save
  ) as {
    loading: boolean;
    message: string;
    data: any;
  };
  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/my-account");
  };
  let dataSaves = useMemo(() => {
    if (data?.length > 0) {
      return data?.map((dataSave: any) => ({
        id: dataSave?.id,
        title:
          dataSave?.property?.propertyTypeDetails?.title ||
          dataSave?.property?.propertyType?.title,
        inProgress: true,
        date: dataSave?.createdAt
          ? format(new Date(dataSave?.createdAt), "yyyy-MM-dd")
          : "",
        requestNumber: dataSave?.property_id,
        count: 8,
        city: dataSave?.property?.propertyLocation?.city,
        purpose: dataSave?.property?.propertyPurpose?.title,
        propertyOwnerType: dataSave?.property?.propertyOwnerType?.title,
        district: dataSave?.property?.propertyLocation?.district?.replace(
          /[\[\]\\"]/g,
          ""
        ),
        house: true,
        budget:
          dataSave?.property?.details && dataSave?.property?.details?.length > 0
            ? `${FormatNumber(
                dataSave?.property?.details[0]?.min_price
              )} ريال -${FormatNumber(
                dataSave?.property?.details[0]?.price
              )} ريال`
            : dataSave?.property?.landDetails &&
              dataSave?.property?.landDetails?.length > 0 &&
              `${FormatNumber(
                dataSave?.property?.landDetails[0]?.min_price
              )} ريال -${FormatNumber(
                dataSave?.property?.landDetails[0]?.price
              )} ريال`,
        type:
          dataSave?.property?.details && dataSave?.property?.details?.length > 0
            ? `${dataSave?.property?.details[0]?.status}`
            : dataSave?.property?.landDetails &&
              dataSave?.property?.landDetails?.length > 0 &&
              `${dataSave?.property?.landDetails[0]?.status}`,
        lisNumber: dataSave?.property?.license_number,
        details:
          dataSave?.property?.details && dataSave?.property?.details?.length > 0
            ? dataSave?.property?.details
            : dataSave?.property?.landDetails &&
              dataSave?.property?.landDetails?.length > 0 &&
              dataSave?.property?.landDetails,
        property_id: dataSave?.property_id,
      }));
    }
  }, [data]);

  useEffect(() => {
    dispatch(getSaves());
  }, [dispatch]);

  // getSaves
  return (
    <>
      <div className="flex items-center justify-center m-2">
        <div>
          <button onClick={handleBack}>
            <BackButtonOutline />
          </button>
        </div>
        <div className="flex flex-1  items-center justify-center border-b-2 border-gray-200">
          <p className="flex items-center justify-center text-[#36343B] font-bold text-xl pb-2">
            محفوظاتي
          </p>
        </div>
      </div>
      <div style={{ direction: "ltr" }} className="m-5">
        <FilterPart />
      </div>
      <div className="mx-2">
        {dataSaves?.length > 0 ? (
          dataSaves?.map((offer: any, index: number) => (
            <OfferCard key={offer?.requestNumber} offer={offer} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-9 w-full">
            <Note />
            <p className="font-medium text-3xl text-[#6B7280] mt-6">
              لا شيء هنا!
            </p>
            <p className="text-base font-normal text-[#9CA3AF] mt-3">
              لا توجد لديك طلبات لعرضها
            </p>
          </div>
        )}
      </div>
    </>
  );
};
export default MySavePage;
