"use client";

import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import PropertyCard from "../components/propertyCard/PropertyCard";
import { sampleData5 } from "../assets/data/data";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MainHeader from "../components/header/MainHeader";
import Footer from "../components/header/Footer2";
import SortPopup from "./SortPopup";
import FilterModal from "./FilterModal2";
import { TbArrowsSort } from "react-icons/tb";
import { RiEqualizerFill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import Link from "next/link";

const MarketPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSortPopupOpen, setIsSortPopupOpen] = useState<boolean>(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [popupPosition, setPopupPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const sortButtonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

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

  return (
    <div dir="">
      <div className="bg-white">
        <div dir="ltr">
          <MainHeader />
        </div>
        <div className="opacity-100 z-0">
          {/* Filter Modal */}
          {isFilterModalOpen && (
            <FilterModal
              onClose={() => setIsFilterModalOpen(false)}
              onFilter={(criteria) => {
                // Filter logic to be added later
                setIsFilterModalOpen(false);
              }}
            />
          )}
        </div>
        <div className="flex items-center justify-between">
          <Link href={"./"} className="mr-4">
            <FaChevronRight className="text-xl" />
          </Link>
          <h1 className="flex text-center text-xl font-bold">السوق</h1>
          <p></p>
        </div>
        <hr className="h-px mb-6 mt-6 bg-gray-200 border-0" />

        <div className="flex justify-between mb-4 p-4">
          <div className="relative w-3/4">
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
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center"
            >
              <div className="py-1 rounded-md border-2 border-blue-500 bg-blue-450">
                <RiEqualizerFill className="text-xl mx-2 text-white" />
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

        {currentOffers.map((offer, index) => (
          <PropertyCard
            key={offer.offerId}
            offerId={[offer.offerId]}
            offersCount={[offer.offersCount]}
            date={[offer.date]}
            seller={[offer.seller]}
            unitStatus={[offer.unitStatus]}
            requestId={[offer.requestId]}
            licenseNumber={[offer.licenseNumber]}
            city={[offer.city]}
            district={[offer.district]}
            offeredShare={[offer.offeredShare]}
            area={[offer.area]}
            price={[offer.price]}
            currency={[offer.currency]}
            unitCategory={[offer.unitCategory]}
            unitType={[offer.unitType]}
            dealStatus={[offer.dealStatus]}
          />
        ))}

        <div className="flex justify-center items-center p-6">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="p-2 mx-2 rounded-xl border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
          >
            <FaChevronRight className="text-lg text-gray-900" />
          </button>
          <div className="flex items-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 mx-2 rounded-md border-2 ${
                  currentPage === index + 1
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
          />
        )}
      </div>
    </div>
  );
};

export default MarketPage;

//last modified by Omar Marei 2/8/2024