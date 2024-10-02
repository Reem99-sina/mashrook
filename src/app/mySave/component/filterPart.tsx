"use client";
import FilterDropdown from "@/app/components/shared/FilterDropdown";
import { Tune, MenuWhite } from "@/app/assets/svg";
import { TextInput } from "@/app/components/shared/text-input.component";
import { Search } from "@/app/assets/svg";
import { useState, useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import FilterModal from "./filterModalOffer";
import { useDispatch, useSelector } from "react-redux";
import { getproperityPurposeType } from "@/redux/features/getproperityPurpose";
import { getDetailsType } from "@/redux/features/getDetailsType";
const FilterPart = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [optionFilter, setOption] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  let {
    loading: loadingproperty_purpose_id,
    message: messagePurpose,
    data: dataPurpose,
  } = useSelector<RootState>((state) => state.properityPurpose) as {
    loading: boolean;
    message: string;
    data: any;
  };
  const [criteria, setCriteria] = useState<any>({
    dealStatus: "",
    city: "",
    district: "",
    unitType: "",
    realEstateStatus: "",
    purposeStatus: "",
    priceRange: [500000, 20000000],
    shareRange: [10, 90],
  });
  const handleSelect = (option: string) => {
    setOption(option);
  };
  useEffect(() => {
    dispatch(getproperityPurposeType());
  }, [dispatch]);
  return (
    <div style={{ direction: "rtl" }}>
      <div className="flex flex-row items-center justify-center gap-2">
        {isFilterModalOpen && (
          <FilterModal
            onClose={() => setIsFilterModalOpen(false)}
            onFilter={(criteria) => {
              // Filter logic to be added later
              setIsFilterModalOpen(false);
            }}
            open={isFilterModalOpen}
            setCriteria={setCriteria}
            criteria={criteria}
          />
        )}
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
              "الميزانية ( الأدنى الى الأعلى)",
              "الميزانية ( الأعلى الى الأدنى)",
            ]}
            onSelect={handleSelect}
            optionFilter={optionFilter}
          />
        </span>
      </div>
      <div className="mt-5 mb-5 flex flex-row gap-2">
        {dataPurpose?.map((status: any) => (
          <button
            key={status?.id}
            className={`px-4 py-2 m-1 rounded-md border text-sm ${
              criteria.purposeStatus === status?.id
                ? "bg-blue-450 text-white"
                : "bg-white text-gray-900"
            }`}
            onClick={() =>
              setCriteria({ ...criteria, purposeStatus: status?.id })
            }
          >
            {status?.title == "بيع" ? "للبيع" : "للتطوير"}
          </button>
        ))}
      </div>
    </div>
  );
};
export default FilterPart;
