"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { TextInput } from "../components/shared/text-input.component";
import { FaRegUserCircle } from "react-icons/fa";
import { format } from "date-fns";
import {
  CloseIconSmall,
  Filter,
  InfoOutLine,
  PartnersIcon,
  Search,
  Note,
} from "../assets/svg";
import toast from "react-hot-toast";
import Cookie from "js-cookie";
import Pagination from "../components/shared/pagination";
import {
  getPartner,
  withDrawProperty,
  withdrawData,
  removeMessageWithDraw,
} from "@/redux/features/getPartners";
import { useRouter } from "next/navigation";
import FilterDropdown from "../components/shared/FilterDropdown";
import { PartnersCard } from "./PartnersCard";
import { Modal, ModalRef } from "../components/shared/modal.component";
import { Button } from "../components/shared/button.component";
import { Tune, MenuWhite } from "@/app/assets/svg";
import FilterModalPartner from "./filterModalPartner";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { RealEstateTypeInter } from "@/redux/features/postRealEstate";
const data = [
  {
    title: "ارض سكنية - قطعة رقم 1256",
    inProgress: true,
    date: "2024-4-23",
    requestNumber: 2020,
    count: 8,
    city: "الرياض",
    district: "المروج,البطحاء",
    budget: "300,000 ريال",
    PartnershipNumber: 2020,
    realEstate: "قطعة رقم 1256",
    bidRequestNumber: 2020,
    partnershipRatio: 50,
    purpose: "للبيع",
  },
  {
    title: "ارض سكنية - قطعة رقم 1256",
    date: "2024-4-23",
    requestNumber: 2020,
    count: 8,
    city: "الرياض",
    district: "المروج,البطحاء",
    budget: "300,000 ريال",
    PartnershipNumber: 2020,
    realEstate: "قطعة رقم 1256",
    bidRequestNumber: 2020,
    partnershipRatio: 50,
    purpose: "للبيع",
  },
];
let statuses = [{ title: "متكامل" }, { title: "تحت التقدم" }];
export const GitMyPartners = () => {
  const handleSelect = (option: string) => {
    setOption(option);
  };
  const dispatch = useDispatch<AppDispatch>();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const modalRef = useRef<ModalRef>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [optionFilter, setOption] = useState<string>("");
  const [criteria, setCriteria] = useState<any>({
    dealStatus: "",
    city: "",
    district: "",
    unitType: "",
    unitStatus: false,
    purposeStatus: "",
    priceRange: [500000, 20000000],
    shareRange: [10, 90],
  });
  const [idDelete, setId] = useState<any>({
    land_details_id: 0,
    details_id: 0,
    requestNumber: 0,
  });
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  let [newData, setNewData] = useState<any>([]);
  const onWithDraw = () => {
    modalRef.current?.close();
    dispatch(
      withDrawProperty(
        idDelete?.details_id
          ? {
              details_id: idDelete?.details_id,
            }
          : {
              land_details_id: idDelete?.land_details_id,
            }
      )
    );
  };
  let {
    loading,
    message,
    data: dataPartner,
    messageWithDraw,
  } = useSelector<RootState>((state) => state.partners) as {
    loading: boolean;
    message: string;
    data: any;
    messageWithDraw: string;
  };
  useEffect(() => {
    dataPartner?.map((dataPartnerOne: RealEstateTypeInter) =>
      dataPartnerOne?.propertyDetailsOwnership?.map((ele: any) => {
        let id = ele?.details_id;
        let idLand = ele?.land_details_id;
        let title =
          (dataPartnerOne?.propertyTypeDetails?.title ||
            dataPartnerOne?.propertyType?.title) +
          " " +
          (ele?.details?.type ||
            ele?.landDetails?.type ||
            "رقم القطعة" + ele?.landDetails?.piece_number);
        setNewData((prev: any) => [
          ...prev,
          {
            id: dataPartnerOne?.id,
            title: title ? title : "",
            date: dataPartnerOne?.createdAt
              ? format(new Date(dataPartnerOne?.createdAt), "yyyy-MM-dd")
              : "",
            requestNumber: ele?.id,
            count: 8,
            city: dataPartnerOne?.propertyLocation?.city,
            district: dataPartnerOne?.propertyLocation?.district?.replace(
              /[\[\]\\"]/g,
              ""
            ),
            budget: `${ele?.amount} ريال`,
            PartnershipNumber: ele?.id,
            realEstate:
              ele?.details?.type ||
              (ele?.landDetails?.type
                ? ele?.landDetails?.type
                : "قطعة رقم " + ele?.landDetails?.piece_number),
            bidRequestNumber: dataPartnerOne?.id,
            partnershipRatio: ele?.percentage,
            purpose: dataPartnerOne?.propertyPurpose?.title,
            finance: dataPartnerOne?.finance,
            details_id: ele?.details_id,
            land_details_id: ele?.land_details_id,
          },
        ]);
      })
    );
  }, [dataPartner]);
  let fiterData = useMemo(() => {
    return {
      min_price:
        criteria?.priceRange[0] != 500000 ? criteria?.priceRange[0] : null,
      max_price:
        criteria?.priceRange[1] != 20000000 ? criteria?.priceRange[1] : null,
      min_percentage:
        criteria?.shareRange[0] != 10 ? criteria?.shareRange[0] : null,
      max_percentage:
        criteria?.shareRange[1] != 90 ? criteria?.shareRange[1] : null,
      city: criteria?.city,
      district: criteria?.district,
      property_type_details_id:
        criteria?.unitType != 0 ? criteria?.unitType : null,
      property_purpose_id:
        criteria?.purposeStatus != 0 ? criteria?.purposeStatus : null,
      status: criteria?.dealStatus == "متكامل" ? "complete" : "available",
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
    return newData?.slice((currentPage - 1) * 3, currentPage * 3);
  }, [newData, currentPage]);
  useEffect(() => {
    const storedToken = Cookie.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  useEffect(() => {
    if (messageWithDraw == "تم الإنسحاب من الطلب بنجاح.") {
      toast.success(messageWithDraw);

      dispatch(
        withdrawData({
          data: dataPartner?.map((dataPartnerOne: any) => ({
            ...dataPartnerOne,
            propertyDetailsOwnership:
              dataPartnerOne?.propertyDetailsOwnership?.filter(
                (ele: any) => ele?.id != idDelete?.requestNumber
              ),
          })),
        })
      );
    } else if (messageWithDraw) {
      toast.error(messageWithDraw);
    }
    return () => {
      dispatch(removeMessageWithDraw());
    };
  }, [messageWithDraw, dataPartner, dispatch, idDelete?.requestNumber]);

  useEffect(() => {
    if (token) {
      dispatch(getPartner({}));
    }
  }, [token, dispatch]);
  useEffect(() => {
    dispatch(
      getPartner({
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
        status: criteria?.dealStatus == "متكامل" ? "complete" : "available",
      })
    );
  }, [optionFilter, dispatch, criteria?.dealStatus]);
  return (
    <div className="p-4 bg-white">
      {isFilterModalOpen && (
        <FilterModalPartner
          onClose={() => setIsFilterModalOpen(false)}
          onFilter={(criteria) => {
            // Filter logic to be added later
            dispatch(getPartner(fiterData));
            setIsFilterModalOpen(false);
          }}
          onCloseRequest={() => dispatch(getPartner({}))}
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
        <span>
          <FilterDropdown
            options={[
              "الأحدث الى الأقدم",
              "الأقدم الى الأحدث",
              " الميزانية ( الأدنى الى الأعلى)",
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
                <PartnersCard
                  key={index}
                  title={offer?.title}
                  count={offer.count}
                  date={offer.date}
                  requestNumber={offer.requestNumber}
                  city={offer.city}
                  district={offer.district}
                  budget={offer.budget}
                  purpose={offer.purpose}
                  finance={offer.finance}
                  PartnershipNumber={offer.PartnershipNumber}
                  details_id={offer?.details_id}
                  land_details_id={offer?.land_details_id}
                  inProgress={offer.inProgress}
                  realEstate={offer.realEstate}
                  bidRequestNumber={offer.bidRequestNumber}
                  partnershipRatio={offer.partnershipRatio}
                  onRetreat={() => {
                    modalRef.current?.open();
                    setId({
                      land_details_id: offer?.land_details_id,
                      details_id: offer?.details_id,
                      requestNumber: offer?.requestNumber,
                    });
                  }}
                  onShow={() => router.push(`/showpartner/${offer?.id}`)}
                />
              ))}
            </div>

            <Modal ref={modalRef} size="xs">
              <div
                className="items-start flex justify-center flex-col p-4 "
                style={{ direction: "rtl" }}
              >
                <div className="flex flex-row items-center justify-center mb-3  w-full">
                  <div className="flex flex-1">
                    <CloseIconSmall />{" "}
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
                      {idDelete?.id})؟
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
                    text="تأكيد الانسحاب"
                    onClick={onWithDraw}
                    className="!text-xs !font-medium"
                  />
                  <Button
                    text="الغاء"
                    onClick={() => modalRef.current?.close()}
                    className="!bg-[#E5E7EB] !text-[#1F2A37] !text-xs !font-medium"
                  />
                </div>
              </div>
            </Modal>

            <div>
              <Pagination
                pageCount={Math.ceil(newData?.length / 3)}
                onPageChange={(p) => setCurrentPage(p)}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-9 w-full">
            <PartnersIcon />
            <p className="font-medium text-3xl text-[#6B7280] mt-6">
              لا شيء هنا!
            </p>
            <p className="text-base font-normal text-[#9CA3AF] mt-3">
              لا توجد لديك شراكات لعرضها{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
