"use client";
import FilterDropdown from "@/app/components/shared/FilterDropdown";
import { Tune, MenuWhite } from "@/app/assets/svg";
import { TextInput } from "@/app/components/shared/text-input.component";
import { Search } from "@/app/assets/svg";
import { useState, useEffect,useMemo } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import FilterModal from "./filterModalOffer";
import { useDispatch, useSelector } from "react-redux";
import { getproperityPurposeType } from "@/redux/features/getproperityPurpose";
import { getDetailsType } from "@/redux/features/getDetailsType";
import { getAllAdvertise } from "@/redux/features/getMyAdvertise"
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
    unitType: "",
    realEstateStatus: "",
    purposeStatus: ""
  });
  let fiterData = useMemo(() => {
    return {
      property_status:criteria?.realEstateStatus=="متاح"?"available":criteria?.realEstateStatus=="تمت الشراكة"?"joined":"",
      property_purpose_id: criteria?.purposeStatus != 0 ? criteria?.purposeStatus : null
      , status: (criteria?.dealStatus == "منتهي") ? "expired" :(criteria?.dealStatus == "سند دفع غير مقبول")?"rejected":(criteria?.dealStatus == "التحقق من سند الدفع")?"waiting_for_approved":(criteria?.dealStatus == "جاري")?"active":"",
      sort: optionFilter == "الأحدث الى الأقدم" ? "created_desc" : optionFilter == "الأقدم الى الأحدث" ? "created_asc" : optionFilter == "الميزانية ( الأدنى الى الأعلى)" ? "price_asc" : optionFilter == "الميزانية ( الأعلى الى الأدنى)" ? "price_decs" : ""
      // option=="الأحدث إلى الأقدم"?handleSelect("latest"):option=="الأقدم الى الأحدث"?handleSelect("oldest"):option=="الميزانية ( الأدنى الى الأعلى)"?handleSelect("priceLowToHigh"):handleSelect("priceHighToLow")
    }
  }, [criteria, optionFilter])
  const handleSelect = (option: string) => {
    setOption(option);
  };
  useEffect(() => {
    dispatch(getproperityPurposeType());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllAdvertise({
      sort: optionFilter == "الأحدث الى الأقدم" ? "created_desc" : optionFilter == "الأقدم الى الأحدث" ? "created_asc" : optionFilter == "الميزانية ( الأدنى الى الأعلى)" ? "price_asc" : optionFilter == "الميزانية ( الأعلى الى الأدنى)" ? "price_decs" : "",
      property_purpose_id: criteria?.purposeStatus != 0 ? criteria?.purposeStatus : null
    }))
  }, [optionFilter, dispatch, criteria?.purposeStatus])
  return (
    <div style={{ direction: "rtl" }}>
      <div className="flex flex-row items-center justify-center gap-2">
        {isFilterModalOpen && (
          <FilterModal
            onClose={() => setIsFilterModalOpen(false)}
            onFilter={(criteria) => {
              // Filter logic to be added later
              dispatch(getAllAdvertise(fiterData))
              setIsFilterModalOpen(false);
            }}
            onCloseRequest={() => dispatch(getAllAdvertise({}))}
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
              "الأقدم الى الأحدث"
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
