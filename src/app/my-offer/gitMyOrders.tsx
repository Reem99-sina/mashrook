"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { TextInput } from "../components/shared/text-input.component";
import { FaRegUserCircle } from "react-icons/fa";
import { format } from "date-fns";
import {
  CloseIconSmall,
  Filter,
  InfoOutLine,
  Note,
  Search,
} from "../assets/svg";
import { useRouter,useParams } from "next/navigation";
import Pagination from "../components/shared/pagination";
import FilterDropdown from "../components/shared/FilterDropdown";
import { MyOrdersCard } from "./MyOrdersCard";
import { Tune, MenuWhite } from "@/app/assets/svg";
import FilterModal from "./filterModal";
import { Modal, ModalRef } from "../components/shared/modal.component";
import { Button } from "../components/shared/button.component";
import { getRequest } from "@/redux/features/getOrders";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { RealEstateTypeInter } from "@/redux/features/postRealEstate";
const data = [
  {
    title: "أرض تجارية",
    inProgress: true,
    date: "2024-4-23",
    requestNumber: 2020,
    count: 8,
    city: "الرياض",
    district: "المروج,البطحاء",
    budget: "300,000 ريال - 500,000 ريال",
    type: "مشاع (صك مشترك)",
  },
  {
    title: "شقة (داخل فيلا) ",
    expired: true,
    date: "2024-4-23",
    requestNumber: 2020,
    count: 8,
    city: "الرياض",
    district: "المروج,البطحاء",
    budget: "300,000 ريال - 500,000 ريال",
    type: "مشاع (صك مشترك)",
  },
  {
    title: "أرض تجارية",
    active: true,
    date: "2024-4-23",
    requestNumber: 2020,
    count: 8,
    city: "الرياض",
    district: "المروج,البطحاء",
    budget: "300,000 ريال - 500,000 ريال",
    type: "مشاع (صك مشترك)",
  },
];

export const GitMyOrders = () => {
  const router = useRouter();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [optionFilter, setOption] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);
  let {
    loading,
    message,
    data: dataOrder,
  } = useSelector<RootState>((state) => state.requests) as {
    loading: boolean;
    message: string;
    data: any;
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = sessionStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);
  // propertyTypeDetails  propertyType  propertyLocation city district  details price min_price landDetails
  const handleSelect = (option: string) => {
    setOption(option);
  };
  
  const modalRef = useRef<ModalRef>(null);
  const modalRefUpdate = useRef<ModalRef>(null);
  const modalRefRetreating = useRef<ModalRef>(null);
  let dataOrders = useMemo(() => {
    return dataOrder?.map((dataOrderOne: RealEstateTypeInter) => ({
      id:dataOrderOne?.id,
      title:
        dataOrderOne?.propertyTypeDetails?.title ||
        dataOrderOne?.propertyType?.title,
      inProgress: true,
      date: dataOrderOne?.createdAt
        ? format(new Date(dataOrderOne?.createdAt), "yyyy-MM-dd")
        : "",
      requestNumber: dataOrderOne?.id,
      count: 8,
      city: dataOrderOne?.propertyLocation?.city,
      district: dataOrderOne?.propertyLocation?.district?.replace(/[\[\]\\"]/g, ''),
      budget:
        dataOrderOne?.details && dataOrderOne?.details?.length > 0
          ? `${dataOrderOne?.details[0]?.min_price} ريال -${dataOrderOne?.details[0]?.price} ريال`
          : dataOrderOne?.landDetails &&
            dataOrderOne?.landDetails?.length > 0 &&
            `${dataOrderOne?.landDetails[0]?.min_price} ريال -${dataOrderOne?.landDetails[0]?.price} ريال`,
      type:
        dataOrderOne?.details && dataOrderOne?.details?.length > 0
          ? `${dataOrderOne?.details[0]?.status}`
          : dataOrderOne?.landDetails &&
            dataOrderOne?.landDetails?.length > 0 &&
            `${dataOrderOne?.landDetails[0]?.status}`,
    }));
  }, [dataOrder]);
  let dataPagination = useMemo(() => {
    return dataOrders?.slice((currentPage - 1) * 3, currentPage * 3);
  }, [dataOrders, currentPage]);
  useEffect(() => {
    if (token) {
      dispatch(getRequest());
    }
  }, [token, dispatch]);
  return (
    <>
      <div className="p-4 bg-white">
        {isFilterModalOpen && (
          <FilterModal
            onClose={() => setIsFilterModalOpen(false)}
            onFilter={(criteria) => {
              // Filter logic to be added later
              setIsFilterModalOpen(false);
            }}
            open={isFilterModalOpen}
          />
        )}
        <div className="flex flex-row items-center justify-center gap-2">
          <TextInput inputProps={{ placeholder: "بحث" }} icon={<Search />} />
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              setIsFilterModalOpen(!isFilterModalOpen);
            }}
            className="flex items-center"
          >
            <div
              className={`py-1 rounded-md border-2 border-blue-500 ${
                isFilterModalOpen ? "bg-blue-450" : "bg-white"
              }`}
            >
              {isFilterModalOpen ? (
                <MenuWhite className={`text-xl mx-2 my-1`} />
              ) : (
                <Tune className={`text-xl mx-2`} />
              )}
            </div>
          </button>
          {/* <span className="border border-[#E5E7EB] rounded-lg p-3">
          <Filter />
        </span> */}

          <span>
            <FilterDropdown
              options={[
                "الأحدث الى الأقدم",
                "الأقدم الى الأحدث",
                "الميزانية ( الأدنى الى الأعلى)",
                "الميزانية ( الأعلى الى الأدنى)",
              ]}
              onSelect={handleSelect}
              optionFilter={optionFilter}
            />
          </span>
        </div>

        <div className="mt-5 mb-5 flex flex-row gap-2">
          <span className="rounded-md border border-[#E5E7EB] text-sm font-normal text-[#6B7280] pl-3 pr-3 pt-1 pb-1">
            المحدثة
          </span>
          <span className="rounded-md border border-[#E5E7EB] text-sm font-normal text-[#6B7280] pl-3 pr-3 pt-1 pb-1">
            تحت التقدم
          </span>

          <span className="rounded-md border border-[#E5E7EB] text-sm font-normal text-[#6B7280] pl-3 pr-3 pt-1 pb-1">
            المنتهية
          </span>
          <span className="rounded-md border border-[#E5E7EB] text-sm font-normal text-[#6B7280] pl-3 pr-3 pt-1 pb-1">
            مكتملة
          </span>
        </div>

        <div>
          {!token ? (
            <>
              <div className="flex flex-col items-center justify-center p-9 w-full gap-y-3">
                <Note />
                <p className="font-medium text-3xl text-[#6B7280] mt-6">
                  قم بمتابعة طلباتك هنا
                </p>
                <p className="text-base font-normal text-[#9CA3AF] mt-3">
                  قم بتسجيل الدخول لعرض طلباتي
                </p>
                <button
                  type="button"
                  className={`${"bg-blue-450 text-white hover:bg-blue-800 border-2 border-blue-500"}  font-medium rounded-lg text-sm px-5 py-2.5 flex justify-center  rtl:flex-row-reverse dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                  onClick={() => router.push("/login")}
                >
                  تسجيل الدخول
                  <FaRegUserCircle className={`mr-4 text-xl ${"text-white"}`} />
                </button>
                <button></button>
              </div>
            </>
          ) : dataPagination?.length > 0 ? (
            <div>
              <div>
                {dataPagination?.map((offer: any, index: number) => (
                  <MyOrdersCard
                    key={index}
                    title={offer.title}
                    count={offer.count}
                    date={offer.date}
                    requestNumber={offer.requestNumber}
                    city={offer.city}
                    district={offer.district}
                    budget={offer.budget}
                    type={offer.type}
                    inProgress={offer.inProgress}
                    active={offer.active}
                    expired={offer.expired}
                    onDelete={() => modalRef.current?.open()}
                    onUpdate={() => modalRefUpdate.current?.open()}
                    onEdit={() => router.push(`/edit-my-order/${offer?.id}`)}
                    onRetreating={() => modalRefRetreating.current?.open()}
                  />
                ))}
              </div>
              <div>
                <Pagination
                  pageCount={Math.ceil(dataOrders?.length / 3)}
                  onPageChange={(p) => setCurrentPage(p)}
                />
              </div>
              <Modal ref={modalRef} size="xs">
                <div
                  className="items-start flex justify-center flex-col p-4 "
                  style={{ direction: "rtl" }}
                >
                  <div className="flex flex-row items-center justify-center mb-3  w-full">
                    <div
                      className="flex flex-1 cursor-pointer "
                      onClick={() => modalRef.current?.close()}
                    >
                      <CloseIconSmall />
                    </div>
                    <div className="flex  w-full items-center justify-center">
                      <p className="font-bold text-base text-[#374151]">
                        تحذير!
                      </p>
                    </div>
                  </div>

                  <div className="border border-[#E5E7EB] w-full mb-4" />

                  <div>
                    <span>
                      <p className="text-base font-normal text-[#4B5563]">
                        هل أنت متأكد من رغبتك في تنفيذ اجراء حذف الطلب رقم
                        (2022) ؟
                      </p>
                    </span>
                    <div className="bg-[#FDE8E8] rounded-md mt-5 mb-5 flex items-center justify-start p-1 flex-row gap-1 ">
                      <InfoOutLine />
                      <p className="font-medium text-[10px] text-[#4B5563]">
                        في حال قمت بحذف الطلب سيتم حذف البيانات المتعلقة بالطلب
                        ولن تتمكن من استرجاع الطلب
                      </p>
                    </div>
                  </div>

                  <div className="border border-[#E5E7EB] w-full mb-4" />

                  <div className="flex flex-row items-center justify-center gap-3  w-full">
                    <Button
                      text=" حذف"
                      onClick={() => modalRef.current?.close()}
                      className="!text-xs !font-medium"
                    />
                    <Button
                      text="الغاء"
                      onClick={() => modalRef.current?.close()}
                      className="!bg-white !text-[#1F2A37] !border !border-[#E5E7EB] !rounded-lg !text-xs !font-medium"
                    />
                  </div>
                </div>
              </Modal>

              <Modal ref={modalRefRetreating} size="xs">
                <div
                  className="items-start flex justify-center flex-col p-4 "
                  style={{ direction: "rtl" }}
                >
                  <div className="flex flex-row items-center justify-center mb-3  w-full">
                    <div
                      className="flex flex-1 cursor-pointer "
                      onClick={() => modalRefRetreating.current?.close()}
                    >
                      <CloseIconSmall />
                    </div>
                    <div className="flex  w-full items-center justify-center">
                      <p className="font-bold text-base text-[#374151]">
                        تحذير!
                      </p>
                    </div>
                  </div>

                  <div className="border border-[#E5E7EB] w-full mb-4" />

                  <div>
                    <span>
                      <p className="text-base font-normal text-[#4B5563]">
                        هل أنت متأكد من رغبتك في تنفيذ الانسحاب من الطلب رقم
                        (2022) ؟
                      </p>
                    </span>
                    <div className="bg-[#FDE8E8] rounded-md mt-5 mb-5 flex items-center justify-start p-1 flex-row gap-1 ">
                      <InfoOutLine />
                      <p className="font-medium text-[10px] text-[#4B5563]">
                        في حال قمت بالانسحاب من الطلب لن يتم ارجاع رسوم الخدمة
                        المدفوعة
                      </p>
                    </div>
                  </div>

                  <div className="border border-[#E5E7EB] w-full mb-4" />

                  <div className="flex flex-row items-center justify-center gap-3  w-full">
                    <Button
                      text=" تأكيد الانسحاب"
                      onClick={() => modalRefRetreating.current?.close()}
                      className="!text-xs !font-medium"
                    />
                    <Button
                      text="الغاء"
                      onClick={() => modalRefRetreating.current?.close()}
                      className="!bg-white !text-[#1F2A37] !border !border-[#E5E7EB] !rounded-lg !text-xs !font-medium"
                    />
                  </div>
                </div>
              </Modal>

              <Modal ref={modalRefUpdate} size="xs">
                <div
                  className="items-start flex justify-center flex-col p-4 "
                  style={{ direction: "rtl" }}
                >
                  <div className="flex flex-row items-center justify-center mb-3  w-full">
                    <div
                      className="flex flex-1 cursor-pointer"
                      onClick={() => modalRefUpdate.current?.close()}
                    >
                      <CloseIconSmall />
                    </div>
                    <div className="flex  w-full items-center justify-center">
                      <p className="font-bold text-base text-[#374151]">
                        تنويه
                      </p>
                    </div>
                  </div>

                  <div className="border border-[#E5E7EB] w-full mb-4" />

                  <div>
                    <span>
                      <p className="text-base font-normal text-[#4B5563] mb-2">
                        سيتم تحديث الطلب رقم (2022) لمدة 30 يوم من الان
                      </p>
                    </span>
                  </div>

                  <div className="border border-[#E5E7EB] w-full mb-4" />

                  <div className="flex flex-row items-center justify-center gap-3  w-full">
                    <Button
                      text=" حذف"
                      onClick={() => modalRefUpdate.current?.close()}
                      className="!text-xs !font-medium"
                    />
                    <Button
                      text="الغاء"
                      onClick={() => modalRefUpdate.current?.close()}
                      className="!bg-white !text-[#1F2A37] !border !border-[#E5E7EB] !rounded-lg !text-xs !font-medium"
                    />
                  </div>
                </div>
              </Modal>
            </div>
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
      </div>
    </>
  );
};
