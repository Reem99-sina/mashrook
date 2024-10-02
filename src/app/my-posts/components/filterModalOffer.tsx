"use client";

import React, { useState, useEffect, useRef } from "react";
import { Range, getTrackBackground } from "react-range";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getproperityPurposeType } from "@/redux/features/getproperityPurpose";
import { CloseIconSmall } from "@/app/assets/svg";
import { Modal, ModalRef } from "@/app/components/shared/modal.component";
interface criteriaInfo {
  dealStatus: string;
  unitType: string | number;
  unitStatus: string;
  realEstateStatus: string;
  purposeStatus: string;
}
type FilterModalProps = {
  onClose: () => void;
  onFilter: (criteria: any) => void;
  open: boolean;
  setCriteria: (prev: criteriaInfo) => void;
  criteria: criteriaInfo;
  onCloseRequest?: () => void;
};

const FilterModalOffer: React.FC<FilterModalProps> = ({
  onClose,
  onFilter,
  open,
  criteria,
  setCriteria,
  onCloseRequest,
}) => {
  let refFilter = useRef<ModalRef>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [boolStatus, setbool] = useState<boolean>(false);
  // Example data for dropdowns
  const unitStatuses = ["للتطوير", "للبيع"];
  const dealStatuses = ["متاح",  "تمت الشراكة"];
  const statusOfReal = ["جاري",  "منتهي","سند دفع غير مقبول","التحقق من سند الدفع"];
  let {
    loading: loadingproperty_purpose_id,
    message: messagePurpose,
    data: dataPurpose,
  } = useSelector<RootState>((state) => state.properityPurpose) as {
    loading: boolean;
    message: string;
    data: any;
  };
  const formatNumber = (number: number) => {
    return number.toLocaleString();
  };

  const handleApplyFilters = () => {
    onFilter(criteria);
    onClose();
  };
  
  useEffect(() => {
    if (open == true) {
      refFilter.current?.open();
    } else {
      refFilter.current?.close();
    }
  }, [open]);
  useEffect(() => {
    dispatch(getproperityPurposeType());
  }, [dispatch]);
  return (
    <Modal
      ref={refFilter}
      className="flex rounded-lg items-start justify-center font-[Cairo] w-full "
      size="sm"
    >
      <div
        className="bg-white p-2  opacity-100 h-auto   rounded-lg"
        style={{ direction: "rtl" }}
      >
        <div className="">
          <CloseIconSmall
            className="cursor-pointer "
            onClick={() => refFilter.current?.close()}
            size="lg"
          />
          <h2 className="text-xl font-bold mb-4 text-center border-b-2 pb-4 self-center">
            عوامل التصفية
          </h2>
        </div>
        {/* Deal Status */}
        <div className="h-auto overflow-y-auto  overflow-x-hidden w-full">
          {/* Unit Status */}
          <div className="mb-4  ">
            <h3 className="font-semibold mb-2"> حالة العقار</h3>
            <div className="flex flex-wrap">
              {dealStatuses.map((status) => (
                <button
                  key={status}
                  className={`px-4 py-2 m-1 rounded-md border text-sm ${
                    criteria?.realEstateStatus === status
                      ? "bg-blue-450 text-white"
                      : "bg-white text-gray-900"
                  }`}
                  onClick={() =>
                    setCriteria({ ...criteria, realEstateStatus: status })
                  }
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4  ">
            <h3 className="font-semibold mb-2">الغرض من عرض العقار</h3>
            <div className="flex flex-wrap">
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
          <div className="mb-4  ">
            <h3 className="font-semibold mb-2"> حالة الاعلان</h3>
            <div className="flex flex-wrap">
              {statusOfReal.map((status) => (
                <button
                  key={status}
                  className={`px-4 py-2 m-1 rounded-md border text-sm ${
                    criteria?.dealStatus === status
                      ? "bg-blue-450 text-white"
                      : "bg-white text-gray-900"
                  }`}
                  onClick={() =>
                    setCriteria({ ...criteria, dealStatus: status })
                  }
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex container justify-center space-x-2">
          <button
            onClick={handleApplyFilters}
            className="bg-blue-450 text-white mx-4 px-4 py-2 rounded-md flex-grow"
          >
            تطبيق
          </button>
          <button
            onClick={() => {
              setCriteria({
                dealStatus: "",
                unitType: "",
                unitStatus: "",
                realEstateStatus: "",
                purposeStatus: "",
              });
              if (onCloseRequest) {
                onCloseRequest();
              }
              onClose();
            }}
            className="bg-gray-300 text-gray-900 px-4 py-2 rounded-md flex-grow"
          >
            إلغاء
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModalOffer;

//last modified by Omar Marei 3/8/2024
