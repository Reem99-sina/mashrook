"use client";

import React, { useState, ChangeEvent, useRef, useEffect, useMemo } from "react";
import PropertyCard from "../components/propertyCard/PropertyCard";
import { sampleData5 } from "../assets/data/data";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MainHeader from "../components/header/MainHeader";
import Footer from "../components/header/Footer2";
import SortPopup from "./SortPopup";
import FilterModal from "./FilterModal2";
import { TbArrowsSort } from "react-icons/tb";
import { RiEqualizerFill } from "react-icons/ri";
import { getRequest } from "@/redux/features/getRequest";
import { getDetailsType } from "@/redux/features/getDetailsType"
import { IoIosSearch } from "react-icons/io";
import Link from "next/link";
import { Tune, MenuWhite } from "@/app/assets/svg"

import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getproperityPurposeType } from "@/redux/features/getproperityPurpose";
import { dataReturn, addUnqiue } from "@/redux/features/getRequest";
export interface criteriaInfo {
  dealStatus: string,
  city: string,
  district: string,
  unitType: string | number,
  unitStatus: string,
  priceRange: number[],
  shareRange: number[],
}
const MarketPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setstatus] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [sortOption, setSortOption] = useState<string>("");
  const [criteria, setCriteria] = useState<criteriaInfo>({
    dealStatus: "",
    city: "",
    district: "",
    unitType: 0,
    unitStatus: "",
    priceRange: [0, 200000],
    shareRange: [10, 50],
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSortPopupOpen, setIsSortPopupOpen] = useState<boolean>(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [popupPosition, setPopupPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const sortButtonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  let fiterData = useMemo(() => {
    return {
      min_price: criteria?.priceRange[0] != 0 ? criteria?.priceRange[0] : null,
      max_price: criteria?.priceRange[1] != 200000 ? criteria?.priceRange[1] : null,
      property_purpose_id: status || criteria?.unitStatus,
      property_type_details_id: criteria?.unitType!=0?criteria?.unitType:null,
      min_percentage: criteria?.shareRange[0] != 10 ? criteria?.shareRange[0] : null,
      max_percentage: criteria?.shareRange[1] != 50 ? criteria?.shareRange[0] : null
      , status: criteria?.dealStatus == "متاح" ? "available" : criteria?.dealStatus ? "complete" : "",
      sort: sortOption == "latest" ? "created_asc" : sortOption == "oldest" ? "created_decs" : sortOption == "priceLowToHigh" ? "price_decs" : "price_asc"
    }
  }, [criteria, status, sortOption])
  let {
    loading: loadingproperty_purpose_id,
    message: messagePurpose,
    data: dataPurpose,
  } = useSelector<RootState>((state) => state.properityPurpose) as {
    loading: boolean;
    message: string;
    data: any;
  };
  let { loading, message, data } = useSelector<RootState>(
    (state) => state.getRequest
  ) as { loading: boolean; message: string; data: dataReturn[] };
  const offersPerPage = 5;
  const totalOffers = sampleData5.offerId.length;
  const totalPages = Math.ceil(totalOffers / offersPerPage);

  const filterOffers = () => {
    return sampleData5.offerId
      .map((id, index) => ({
        offerId: id,
        offersCount: sampleData5.offersCount[index],
        date: sampleData5.date[index],
        seller: sampleData5.seller[index],
        unitStatus: sampleData5.unitStatus[index],
        requestId: sampleData5.requestId[index],
        licenseNumber: sampleData5.licenseNumber[index],
        city: sampleData5.city[index],
        district: sampleData5.district[index],
        offeredShare: sampleData5.offeredShare[index],
        area: sampleData5.area[index],
        price: sampleData5.price[index],
        currency: sampleData5.currency[index],
        unitCategory: sampleData5.unitCategory[index],
        unitType: sampleData5.unitType[index],
        dealStatus: sampleData5.dealStatus[index],
      }))
      .filter((offer) => {
        const searchMatch =
          searchQuery === "" ||
          offer.unitCategory.includes(searchQuery) ||
          offer.unitType.some((unitTypeName) =>
            unitTypeName.includes(searchQuery)
          ) ||
          offer.seller.includes(searchQuery);

        return searchMatch;
      })
      .sort((a, b) => {
        if (sortOption === "latest") {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else if (sortOption === "oldest") {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        } else if (sortOption === "priceLowToHigh") {
          return Math.min(...a.price) - Math.min(...b.price);
        } else if (sortOption === "priceHighToLow") {
          return Math.max(...b.price) - Math.max(...a.price);
        }
        return 0;
      });
  };

  const currentOffers = filterOffers().slice(
    (currentPage - 1) * offersPerPage,
    currentPage * offersPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSortButtonClick = () => {
    if (sortButtonRef.current) {
      const rect = sortButtonRef.current.getBoundingClientRect();
      setPopupPosition({
        top: rect.bottom + window.scrollY + 10,
        left: rect.left + window.scrollX,
      });
    }
    setIsSortPopupOpen(!isSortPopupOpen);
  };
  const onFilter = (criteria: criteriaInfo) => {
    // Filter logic to be added later
    dispatch(getRequest(fiterData))
    setIsFilterModalOpen(false);
  }
  const onClose = () => {
    setIsFilterModalOpen(false);
    setCriteria({
      dealStatus: "",
      city: "",
      district: "",
      unitType: "",
      unitStatus: "",
      priceRange: [0, 20000000],
      shareRange: [10, 90]
    })
    dispatch(getRequest({}))
  }
  const onCloseModal = () => {
    setIsFilterModalOpen(false);
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        sortButtonRef.current &&
        !sortButtonRef.current.contains(event.target as Node)
      ) {
        setIsSortPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    dispatch(getproperityPurposeType());
    dispatch(getDetailsType());

  }, [dispatch])

  useEffect(() => {
    dispatch(getRequest(fiterData))
  }, [status, sortOption, dispatch, fiterData])
  return (
    <div dir="">
      <div className="bg-white">
        <div dir="ltr" className="relative">
          <MainHeader />
        </div>

        {/* Filter Modal */}
        {isFilterModalOpen && (
          <FilterModal
            onClose={onClose}
            onFilter={onFilter}
            open={isFilterModalOpen}
            setCriteria={setCriteria}
            criteria={criteria}
            onCloseModal={onCloseModal}
          />
        )}

        <div className="flex items-center justify-between">
          <Link href={"./"} className="mr-4">
            <FaChevronRight className="text-xl" />
          </Link>
          <h1 className="flex text-center text-xl font-bold">السوق</h1>
          <p></p>
        </div>
        <hr className="h-px mb-6 mt-6 bg-gray-200 border-0" />

        <div className="flex justify-between mb-4 p-4">
          <div className="relative w-3/4 mx-2">
            <input
              type="text"
              placeholder="بحث... "
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              className="border rounded-xl p-2 w-full pr-10"
            />
            <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-450" />
          </div>

          <div className="flex flex-row">
            <button
              onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
              className="flex items-center"
            >
              <div className={`py-1 rounded-md border-2 border-blue-500 ${isFilterModalOpen ? "bg-blue-450" : "bg-white"}`}>
                {isFilterModalOpen ? <MenuWhite className={`text-xl mx-2 my-1`} /> : <Tune className={`text-xl mx-2`} />}
              </div>
            </button>
            <button
              ref={sortButtonRef}
              onClick={handleSortButtonClick}
              className="flex items-center"
            >
              <div className="py-1 mx-2 rounded-md border-2 border-blue-500">
                <TbArrowsSort className="text-xl mx-2 text-blue-450" />
              </div>
            </button>
          </div>
        </div>
        <div className="flex gap-x-2">
          {dataPurpose?.map((purpose: any) => (
            <button
              key={purpose?.id}
              className={`px-4 py-2 m-1 rounded-md border ${status == purpose?.id ? "bg-blue-450 text-white" :
                  "bg-white text-gray-900"
                }`}
              onClick={() => setstatus(purpose?.id)}
            >
              {purpose?.title}
            </button>
          ))}

          {/* <button
                // key={status}
                className={`px-4 py-2 m-1 rounded-md border ${
                  status=="للتطوير"  ? "bg-blue-450 text-white" :
                   "bg-white text-gray-900"
                }`}
                onClick={() => setstatus("للتطوير")}
              >
            للتطوير
              </button> */}
        </div>

        <PropertyCard page={currentPage} limit={4} />


        <div className="flex justify-center items-center p-6">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="p-2 mx-2 rounded-xl border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
          >
            <FaChevronRight className="text-lg text-gray-900" />
          </button>
          <div className="flex items-center">
            {Array.from({ length: Math.ceil(data?.length / 4) }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 mx-2 rounded-md border-2 ${currentPage === index + 1
                    ? "bg-blue-450 text-white"
                    : "bg-gray-200 text-blue-450"
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="p-2 mx-2 rounded-xl border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
          >
            <FaChevronLeft className="text-lg text-gray-900" />
          </button>
        </div>

        <Footer />

        {/* Sort Popup */}
        {isSortPopupOpen && (
          <SortPopup
            onClose={() => setIsSortPopupOpen(false)}
            onSort={(option) => {
              setSortOption(option);
              setIsSortPopupOpen(false);
            }}
            style={{ top: popupPosition.top, left: popupPosition.left }}
            ref={popupRef}
            option={sortOption}
          />
        )}
      </div>
    </div>
  );
};

export default MarketPage;

//last modified by Omar Marei 3/8/2024