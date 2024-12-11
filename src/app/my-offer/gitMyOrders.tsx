"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { TextInput } from "../components/shared/text-input.component";
import { FaRegUserCircle } from "react-icons/fa";
import { format } from "date-fns";
import { fetchToken } from "@/redux/features/userSlice";
import {
  CloseIconSmall,
  Filter,
  InfoOutLine,
  Note,
  Search,
} from "../assets/svg";
import toast from "react-hot-toast";
import Cookie from "js-cookie";
import { useRouter, useParams } from "next/navigation";
import Pagination from "../components/shared/pagination";
import FilterDropdown from "../components/shared/FilterDropdown";
import { MyOrdersCard } from "./MyOrdersCard";
import { Tune, MenuWhite } from "@/app/assets/svg";
import FilterModal from "./filterModal";
import { Modal, ModalRef } from "../components/shared/modal.component";
import { Button } from "../components/shared/button.component";
import { getRequest, deleteOrder } from "@/redux/features/getOrders";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { RealEstateTypeInter } from "@/redux/features/postRealEstate";
import {
  deleteProperty,
  removeDelete,
  UpdataExpiredDateProperty,
} from "@/redux/features/getPartners";
import { FormatNumber } from "@/app/hooks/formatNumber";
import { eventAnalistic } from "@/utils/event-analistic";
interface criteriaInfo {
  dealStatus: string;
  city: string;
  district: string;
  unitType: string | number;
  unitStatus: boolean;
  priceRange: number[];
  shareRange: number[];
}
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
let statuses = [
  { title: "متكامل" },
  { title: "محدث" },
  { title: "تحت التقدم" },
  { title: "منتهي" },
];
export const GitMyOrders = () => {
  const router = useRouter();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [optionFilter, setOption] = useState<string>("");
  const [criteria, setCriteria] = useState<any>({
    dealStatus: "",
    city: "",
    district: "",
    unitType: "",
    unitStatus: true,
    priceRange: [500000, 20000000],
  });
  const { token } = useSelector<RootState>((state) => state.register) as {
    token: string;
  };
  const dispatch = useDispatch<AppDispatch>();
  const [idDelete, setId] = useState<number>();
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
    dispatch(fetchToken());
  }, [dispatch]);
  // propertyTypeDetails  propertyType  propertyLocation city district  details price min_price landDetails
  const handleSelect = (option: string) => {
    setOption(option);
  };

  const modalRef = useRef<ModalRef>(null);
  const modalRefUpdate = useRef<ModalRef>(null);
  const modalRefRetreating = useRef<ModalRef>(null);
  let dataOrders = useMemo(() => {
    return dataOrder?.map((dataOrderOne: RealEstateTypeInter) => ({
      id: dataOrderOne?.id,
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
      district: dataOrderOne?.propertyLocation?.district?.replace(
        /[\[\]\\"]/g,
        ""
      ),
      budget:
        dataOrderOne?.details && dataOrderOne?.details?.length > 0
          ? `${FormatNumber(
              dataOrderOne?.details[0]?.min_price
            )} ريال -${FormatNumber(dataOrderOne?.details[0]?.price)} ريال`
          : dataOrderOne?.landDetails &&
            dataOrderOne?.landDetails?.length > 0 &&
            `${FormatNumber(
              dataOrderOne?.landDetails[0]?.min_price
            )} ريال -${FormatNumber(dataOrderOne?.landDetails[0]?.price)} ريال`,
      type:
        dataOrderOne?.details && dataOrderOne?.details?.length > 0
          ? `${dataOrderOne?.details[0]?.status}`
          : dataOrderOne?.landDetails &&
            dataOrderOne?.landDetails?.length > 0 &&
            `${dataOrderOne?.landDetails[0]?.status}`,
      finance: dataOrderOne?.finance,
      alternativeCount: dataOrderOne?.alternativeCount,
      details:
        dataOrderOne?.details && dataOrderOne?.details?.length > 0
          ? dataOrderOne?.details
          : dataOrderOne?.landDetails &&
            dataOrderOne?.landDetails?.length > 0 &&
            dataOrderOne?.landDetails,
    }));
  }, [dataOrder]);
  let fiterData = useMemo(() => {
    return {
      min_price: criteria?.priceRange[0] != 0 ? criteria?.priceRange[0] : null,
      max_price:
        criteria?.priceRange[1] != 200000 ? criteria?.priceRange[1] : null,
      city: criteria?.city,
      district: criteria?.district,
      property_type_details_id:
        criteria?.unitType != 0 ? criteria?.unitType : null,
      status:
        criteria?.dealStatus == "متكامل" || criteria?.dealStatus == "منتهي"
          ? "complete"
          : "available",
      sort:
        optionFilter == "الأحدث الى الأقدم"
          ? "created_desc"
          : optionFilter == "الأقدم الى الأحدث"
          ? "created_asc"
          : optionFilter == "الميزانية ( الأدنى الى الأعلى)"
          ? "price_asc"
          : optionFilter == "الميزانية ( الأعلى الى الأدنى)"
          ? "price_decs"
          : "",
      finance: criteria?.unitStatus,
      // option=="الأحدث إلى الأقدم"?handleSelect("latest"):option=="الأقدم الى الأحدث"?handleSelect("oldest"):option=="الميزانية ( الأدنى الى الأعلى)"?handleSelect("priceLowToHigh"):handleSelect("priceHighToLow")
    };
  }, [criteria, optionFilter]);
  let dataPagination = useMemo(() => {
    return dataOrders?.slice((currentPage - 1) * 3, currentPage * 3);
  }, [dataOrders, currentPage]);
  const onDelete = () => {
    if (idDelete) {
      dispatch(deleteProperty({ id: idDelete })).then((res: any) => {
        if (res.payload.message && !res.payload.status) {
          eventAnalistic({
            action: "delete_request",
            category: "request",
            label: " delete of request",
            value: "delete of request",
          });
          toast.success(res.payload.message);
        } else if (res.payload.status) {
          toast.error(res.payload.message);
        }
        dispatch(
          deleteOrder({
            data: dataOrder?.filter(
              (dataOrderOne: any) => dataOrderOne?.id !== idDelete
            ),
          })
        );
      });
      modalRef.current?.close();
    }
  };
  const onExpiredDate = () => {
    if (idDelete) {
      dispatch(UpdataExpiredDateProperty({ id: idDelete })).then((res: any) => {
        if (res.payload.data) {
          eventAnalistic({
            action: "Renew_request",
            category: "request",
            label: " renew of request",
            value: "renew of request",
          });
          toast.success(res.payload.message);
        } else if (res.payload.status) {
          toast.error(res.payload.message);
        }
      });
      modalRefUpdate.current?.close();
    }
  };
  useEffect(() => {
    if (token) {
      dispatch(getRequest({}));
    }
  }, [token, dispatch]);
  useEffect(() => {
    return () => {
      dispatch(removeDelete());
    };
  }, [dispatch]);
  useEffect(() => {
    dispatch(
      getRequest({
        sort:
          optionFilter == "الأحدث الى الأقدم"
            ? "created_desc"
            : optionFilter == "الأقدم الى الأحدث"
            ? "created_asc"
            : optionFilter == "الميزانية ( الأدنى الى الأعلى)"
            ? "price_asc"
            : optionFilter == "الميزانية ( الأعلى الى الأدنى)"
            ? "price_decs"
            : "",
        status:
          criteria?.dealStatus == "متكامل" || criteria?.dealStatus == "منتهي"
            ? "complete"
            : "available",
      })
    );
  }, [optionFilter, dispatch, criteria?.dealStatus]);
  return (
    <div className="p-4 bg-white">
      {isFilterModalOpen && (
        <FilterModal
          onClose={() => setIsFilterModalOpen(false)}
          onFilter={(criteria) => {
            // Filter logic to be added later
            dispatch(getRequest(fiterData));
            setIsFilterModalOpen(false);
          }}
          open={isFilterModalOpen}
          setCriteria={setCriteria}
          criteria={criteria}
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
        {statuses?.map((status: any) => (
          <span
            key={status?.title}
            className={`rounded-md border border-[#E5E7EB] text-sm font-normal text-[#6B7280] pl-3 pr-3 pt-1 pb-1 cursor-pointer 
            ${
              criteria.dealStatus === status?.title
                ? "bg-blue-450 text-white"
                : "bg-white text-gray-900"
            }
            `}
            onClick={() =>
              setCriteria({ ...criteria, dealStatus: status?.title })
            }
          >
            {status?.title}
          </span>
        ))}
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
                  key={offer?.id}
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
                  onDelete={() => {
                    modalRef.current?.open();
                    setId(offer?.id);
                  }}
                  onUpdate={() => {
                    modalRefUpdate.current?.open();
                    setId(offer?.id);
                  }}
                  onEdit={() => router.push(`/edit-my-order/${offer?.id}`)}
                  onRetreating={() => modalRefRetreating.current?.open()}
                  finance={offer.finance}
                  alternativeCount={offer.alternativeCount}
                  details={offer.details}
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
                    <p className="font-bold text-base text-[#374151]">تحذير!</p>
                  </div>
                </div>

                <div className="border border-[#E5E7EB] w-full mb-4" />

                <div>
                  <span>
                    <p className="text-base font-normal text-[#4B5563]">
                      هل أنت متأكد من رغبتك في تنفيذ اجراء حذف الطلب رقم (
                      {idDelete}) ؟
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
                    onClick={onDelete}
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
                    <p className="font-bold text-base text-[#374151]">تحذير!</p>
                  </div>
                </div>

                <div className="border border-[#E5E7EB] w-full mb-4" />

                <div>
                  <span>
                    <p className="text-base font-normal text-[#4B5563]">
                      هل أنت متأكد من رغبتك في تنفيذ الانسحاب من الطلب رقم (
                      {idDelete}) ؟
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
                    <p className="font-bold text-base text-[#374151]">تنويه</p>
                  </div>
                </div>

                <div className="border border-[#E5E7EB] w-full mb-4" />

                <div>
                  <span>
                    <p className="text-base font-normal text-[#4B5563] mb-2">
                      سيتم تحديث الطلب رقم ({idDelete}) لمدة 30 يوم من الان
                    </p>
                  </span>
                </div>

                <div className="border border-[#E5E7EB] w-full mb-4" />

                <div className="flex flex-row items-center justify-center gap-3  w-full">
                  <Button
                    text="تحديث"
                    onClick={onExpiredDate}
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
  );
};
