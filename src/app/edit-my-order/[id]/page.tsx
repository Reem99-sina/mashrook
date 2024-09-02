"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import MainHeader from "../../components/header/MainHeader";
import { Button } from "../../components/shared/button.component";
import Footer from "../../components/header/Footer2";
import { RadioInput } from "../../components/shared/radio.component";
import { AddButton, CloseIconSmall, InfoOutLine } from "../../assets/svg";
import { Range, getTrackBackground } from "react-range";
import { Modal, ModalRef } from "../../components/shared/modal.component";
import { BackButtonOutline } from "@/app/assets/svg";
import toast from "react-hot-toast";
import RangeComponent from "@/app/components/shared/range.component"
import { useRouter, useParams } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  RealEstateTypeInter,

  RealEstateErrrorTypeInter,
  putDetailsType,
  putLandDetailsType,
  putLocation,
  removeStateEdit,
  removeState
} from "@/redux/features/postRealEstate";
import {
  properityTypeInter,
  properityInfo,
  properityErrorTypeInter
} from "@/redux/features/postRequest";
import AccordionComponent from "@/app/components/shared/Accordion.component";
import { getRequestByid, dataReturn } from "@/redux/features/getRequest";
import {
  getproperityType,
  getproperityTypeMore,
  removeStatus
} from "@/redux/features/getProperity";
import { getCity,getDistrict} from "@/redux/features/getCity"


const EditMyOrderBadge = () => {
  const [criteria, setCriteria] = useState<any>({
    property_type_id: 0,
    city: "",
    district: null,
    unitType: 0,
    status: "",
    shareRange: [1000000, 2000000],
    desiredRow: [1, 10],
    finance: false
  });
  const [dataSend, setDataSend] = useState({
    city: "",
    district: "",
    address: "",
    area: 0,
    is_divisible: false,
  });
  const [detailsVilla, setDetails] = useState([
    {
      type: "",
      price: 20000000,
      min_price: 1000000,
    },
    {
      type: "",
      price: 20000000,
      min_price: 1000000,
    },
    {
      type: "",
      price: 20000000,
      min_price: 1000000,
    },
  ]);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCites, setSelectedCites] = useState<
    { id: number; name: string }[]
  >([]);
  const { id } = params;
  let { data: dataById, selectData } = useSelector<RootState>(
    (state) => state.getRequest
  ) as {
    loading: boolean;
    message: string;
    data: dataReturn[];
    selectData: any;
  };
  let { data: dataType, titleSection, detailsSection } = useSelector<RootState>(
    (state) => state.properityType
  ) as {
    loading: boolean;
    message: string;
    data: any;
    title: string;
    details: any;
    titleSection: string;
    detailsSection: any;
  };
  let {
    loading: loadingRequest,
    message: messageRequest,
    data: dataRequest,
  } = useSelector<RootState>((state) => state.realEstateRequest) as {
    loading: boolean;
    message: string;
    data: any;
  };
  let {
    dataPut,
    messagePut,
    dataPutLocat,
    messagePutLocat,
    dataPutDetail,
    messagePutDetail
  } = useSelector<RootState>((state) => state.realEstateRequest) as {
    dataPut: any,
    messagePut: string,
    dataPutLocat: any,
    messagePutLocat: string,
    dataPutDetail: any,
    messagePutDetail: string
  };
  let {  city,district } =
  useSelector<RootState>((state) => state.city) as {
    district:any
    city:any
  };
  const propertyType = useMemo(() => {
    return {
      id: selectData?.details[0]?.id,
      property_type_id: selectData?.propertyType?.id,
      unitType: selectData?.propertyTypeDetails?.id,
      city: selectData?.propertyLocation?.city,
      district: selectData?.propertyLocation?.district?.replace(/[\[\]\\"]/g, '')?.split(","),
      status: selectData?.details[0]?.status || selectData?.landDetails[0]?.status,
      shareRange: [selectData?.details[0]?.min_price || selectData?.landDetails[0]?.min_price, selectData?.details[0]?.price || selectData?.landDetails[0]?.price],
      finance: selectData?.finance,
      desiredRow: [selectData?.details[0]?.min_apartment_floor, selectData?.details[0]?.apartment_floor]
    }
  }, [selectData])
  const handleCiteChange = (cite: { id: number; name: string }) => {
    setSelectedCites((prevSelectedCites) => {
      if (prevSelectedCites.some((c) => c.id === cite.id)) {
        return prevSelectedCites.filter((c) => c.id !== cite.id);
      } else {
        return [...prevSelectedCites, cite];
      }
    });
    setCriteria((prev: any) => ({ ...prev, district: criteria?.district?.some((c: any) => c == cite.name) ? criteria?.district?.filter((c: any) => c != cite.name) : [...criteria?.district, cite?.name] }))
    // setCriteria({ ...criteria,  })
  };
  const handleShareRangeChange = (values: number[]) => {
    setCriteria({ ...criteria, shareRange: values });
  };
  const modalRef = useRef<ModalRef>(null);
  const citiesRef = useRef<ModalRef>(null);
  const handleRemoveCite = (cit: any) => {
    setSelectedCites(selectedCites.filter((cite) => cite.name !== cit));
    setCriteria({ ...criteria, district: criteria?.district?.filter((c: any) => c != cit) })
    // 
  };
  useEffect(() => {
    if (id) {
      dispatch(getRequestByid({ id: Number(id) }));
    }
  }, [id, dispatch]);
  useEffect(() => {
    dispatch(getproperityType({ num: 1 }));
    return () => {
      // dispatch(removeState())
    };
  }, [dispatch]);
  useEffect(() => {
    if (!(titleSection && detailsSection)) {
      console.log(titleSection && detailsSection, "titleSection&&detailsSection")
      if (criteria?.property_type_id) {
        dispatch(
          getproperityTypeMore({
            num: criteria?.property_type_id || 1,
            type: "request",
          })
        );
      }
    }

  }, [criteria?.property_type_id, dispatch, detailsSection, titleSection]);
  useEffect(() => {
    // if(propertyType){
    setCriteria({ ...propertyType })

    // }
  }, [propertyType])
  useEffect(() => {
    if (criteria?.unitType == 4) {
      setDetails(selectData?.details?.map((detail: any) => ({
        id: detail?.id,
        type: detail?.type,
        price: detail?.price,
        min_price: detail?.min_price,
      })))
    }
  }, [criteria?.unitType, selectData])
  useEffect(() => {
    if (messagePut && Boolean(dataPut) == true) {
      toast.success(messagePut);
      router.push("/my-offer");
      // setSentYourRequest(true);
    }
    if (messagePutLocat && Boolean(dataPutLocat) == true) {
      toast.success(messagePutLocat);

      // setSentYourRequest(true);
    }
    if (messagePutDetail && Boolean(dataPutDetail) == true) {
      toast.success(messagePutDetail);
      router.push("/my-offer");
      // setSentYourRequest(true);
    }
  }, [dataPut, messagePut, dataPutLocat, messagePutLocat, dataPutDetail,
    messagePutDetail, router]);
  useEffect(() => {
    return () => {
      setCriteria({
        id: 0,
        property_type_id: 0,
        city: "",
        district: null,
        unitType: 0,
        status: "",
        shareRange: [1000000, 2000000],
        finance: false
      })
      dispatch(removeStatus())
    }
  }, [dispatch])
  useEffect(() => {
    return () => {
      dispatch(removeStateEdit())
    }
  }, [dispatch])
  useEffect(()=>{
    dispatch(getCity());
  },[dispatch])
  useEffect(()=>{
    if(criteria?.city){
      dispatch(getDistrict({name:criteria?.city}));
    }
  },[criteria?.city,dispatch])
  const data = [
    {
      id: 1,
      title: "نوع العقار",
      english: "property_type_id",
      option: dataType?.data?.map((ele: { id: number; title: string }) => ele),
    },
    {
      id: 2,
      title: titleSection,
      english: "unitType",
      option: detailsSection?.map((ele: { id: number; title: string }) => ele),
    },
    {
      id: 3,
      title: "موقع العقار",
      english: "city",
      copmonent: (
        <div style={{ direction: "rtl" }}>
          <div className="mt-5 mb-2">
            <p>المدينة</p>
            <select className="border w-full text-right  border-[#D1D5DB] rounded-lg"
              value={criteria?.city}
              onChange={(event) =>
                setCriteria({ ...criteria, city: event?.target?.value })
              }
            >
              {city?.map((city:any) => (
                <option key={city?.id} value={city?.nameAr}>
                  {city?.nameAr}
                </option>
              ))}
            </select>
            <div className="flex flex-row gap-1 mt-4">
              <AddButton fill="#3B73B9" onClick={() => citiesRef.current?.open()} />
              <p className="text-[#3B73B9] font-bold text-sm">
                إضافة حي/ أحياء
              </p>
            </div>
          </div>
          <div className="flex flex-row-reverse gap-3 items-center justify-end flex-wrap mb-5">
            {criteria?.district?.map((cite: any) => (
              <div
                key={cite}
                className="flex items-center border-[#F3F4F6]  w-32 h-11 p-3 rounded-md gap-2 justify-between border shadow-sm flex-row mt-5"
              >
                <CloseIconSmall
                  className="cursor-pointer w-4 h-4"
                  onClick={() => handleRemoveCite(cite)}
                />
                <p className="text-xs font-normal text-[#9CA3AF]">
                  {cite}
                </p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: (criteria?.property_type_id == 3 || criteria?.property_type_id == 4 || criteria?.property_type_id == 5) ? "حالة العقار " : "حدد نوع التملك",
      english: "status",
      option: (criteria?.property_type_id == 3 || criteria?.property_type_id == 4 || criteria?.property_type_id == 5) ? [{ id: "جديد", title: "جديد" }, { id: "مستخدم", title: "مستخدم" }, { id: "أي", title: "أي" }] : [{ id: "مشاع", title: "مشاع" }, { id: "حر", title: "حر" }],
    },
    {
      id: 5,
      title: "",
      english: "shareRange",
      copmonent: (criteria?.unitType == 4 ?
        floorsVilla?.map((floor, ind) => (
          <AccordionComponent
            title={floor?.name}
            key={ind}
            floors={floorsVilla}

            onChange={(e) => {
              setDetails((prev) =>
                prev?.map((ele, i) =>
                  i == ind ? { ...ele, type: e.target.value } : ele
                )
              );
            }}
            value={floor?.name}
          >
            <>
              {(detailsVilla && detailsVilla[ind]) && <RangeComponent
                title="ميزانيتك"
                firstNumDes="500,000"
                secondNumDes="+20,000,000"
                step={500000}
                min={500000}
                max={20000000}
                values={[
                  detailsVilla[ind]?.min_price,
                  detailsVilla[ind]?.price,
                ]}
                handleShareRangeChange={(values: number[]) =>
                  setDetails((prev) =>
                    prev?.map((ele, i) =>
                      i == ind
                        ? {
                          ...ele,
                          min_price: values[0],
                          price: values[1],
                        }
                        : ele
                    )
                  )}
                unit="ريال"
              />}
            </>
          </AccordionComponent>
        )) : criteria?.unitType == 8 ? <>
          <RangeComponent
            title="الادوار المرغوبة"
            firstNumDes="1"
            secondNumDes="+10"
            step={1}
            min={1}
            max={10}
            values={criteria?.desiredRow}
            handleShareRangeChange={(values: number[]) => {
              setCriteria({ ...criteria, desiredRow: values });
            }}
            unit="دور"
          />
          <RangeComponent
            title="ميزانيتك"
            firstNumDes="500,000"
            secondNumDes="+20,000,000"
            step={500000}
            min={500000}
            max={20000000}
            values={criteria?.shareRange}
            handleShareRangeChange={(values: number[]) => {
              setCriteria({ ...criteria, shareRange: values });
            }}
            unit="ريال"
          />
        </> : <>
          <RangeComponent
            title="ميزانيتك"
            firstNumDes="500,000"
            secondNumDes="+20,000,000"
            step={500000}
            min={500000}
            max={20000000}
            values={criteria?.shareRange}
            handleShareRangeChange={(values: number[]) => {
              setCriteria({ ...criteria, shareRange: values });
            }}
            unit="ريال"
          />
        </>
      ),
    },
    {
      id: 6,
      title: "هل ترغب في تمويل عقاري؟",
      english: "finance",
      option: [{ id: true, title: "نعم" }, { id: false, title: "لا" }],
    },
  ];

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/my-offer");
  };
  const onSubmit = () => {
    console.log(selectedCites, "selectedCites")
    const datasend = {
      property_id: Number(id),
      city: criteria?.city,
      district: criteria?.district?.map((dis: any) => dis)
    } as properityInfo
    dispatch(
      putLocation({
        ...datasend,
      })
    );
    if (
      criteria?.property_type_id == 1 ||
      criteria?.property_type_id == 2
    ) {
      dispatch(
        putLandDetailsType({
          price: criteria?.shareRange[1],
          min_price: criteria?.shareRange[0],
          finance: criteria?.finance == "false" ? false : true,

          status: criteria?.status, /// مشاع او حر
          land_details_id: selectData?.landDetails[0]?.id
        })
      );

    } else {
      if (selectData?.details?.length == 1) {
        selectData?.details.map((ele: any) => dispatch(

          putDetailsType(ele?.min_apartment_floor && ele?.apartment_floor ? {

            // finance: criteria?.finance=="false"?false:true,

            status: criteria?.status,
            details_id: ele?.id,
            price: criteria?.shareRange[1],
            min_price: criteria?.shareRange[0],
            min_apartment_floor: criteria?.desiredRow[0],
            apartment_floor: String(criteria?.desiredRow[1])
            // details: detailsVilla,
          } : {
            status: criteria?.status,
            details_id: ele?.id,
            price: criteria?.shareRange[1],
            min_price: criteria?.shareRange[0],
          })
        ))
      } else if (selectData?.details?.length > 1) {
        detailsVilla?.map((ele: any) => {
          dispatch(
            putDetailsType({

              status: criteria?.status,
              details_id: ele?.id,
              price: ele?.price,
              min_price: ele?.min_price
              // details: detailsVilla,
            })
          );
        })

      }


    }

  }
  return (
    <form className="bg-white flex w-full h-full min-h-screen  flex-col p-5">
      <MainHeader />
      <div style={{ direction: "rtl" }}>
        <div className="flex items-center justify-center">
          <div>
            <button onClick={handleBack}>
              <BackButtonOutline />
            </button>
          </div>
          <div className="flex flex-1  items-center justify-center">
            <p className="flex items-center justify-center text-[#36343B] font-bold text-xl">
              تعديل طلب رقم ({id})
            </p>
          </div>
        </div>
      </div>
      <hr className="border-gray-300 dark:border-white my-2" />
      <div className="bg-white w-full mb-4 items-start justify-start  mt-4">
        {data.map((item) => (item?.english != "unitType" ?
          <div
            key={item.id}
            className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4 mt-6"
          >
            <h2 className="text-lg font-bold text-[#333] mb-2 flex justify-end">
              {item.title}
            </h2>
            {item.option && (
              <div className="flex flex-row-reverse justify-start  flex-wrap">
                {item.option.map((option: any, index: number) => (
                  <RadioInput
                    key={item?.english + index}
                    label={option?.title || option}
                    name={item?.english}
                    value={item?.english + option?.id}
                    disabled={(item.english == "property_type_id") || (item.english == "unitType")}
                    checked={item?.english + criteria[item.english] == item?.english + option?.id}
                    onChange={(e) => { setCriteria({ ...criteria, [item.english]: e.target.value.replace(item?.english, "") }); console.log(item?.english, e.target.value.replace(item?.english, "")) }}
                  />
                ))}
              </div>
            )}
            {item.copmonent}
          </div> : item?.english == "unitType" && titleSection && detailsSection ? <div
            key={item.id}
            className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4 mt-6"
          >
            <h2 className="text-lg font-bold text-[#333] mb-2 flex justify-end">
              {item.title}
            </h2>
            {item.option && (
              <div className="flex flex-row-reverse justify-start  flex-wrap">
                {item.option.map((option: any, index: number) => (
                  <RadioInput
                    key={item?.english + index}
                    label={option?.title || option}
                    name={item?.english}
                    value={item?.english + option?.id}
                    checked={item?.english + criteria[item.english] == item?.english + option?.id}
                    onChange={(e) => { setCriteria({ ...criteria, [item.english]: e.target.value.replace(item?.english, "") }); console.log(item?.english) }}
                    disabled={(item.english == "property_type_id") || (item.english == "unitType")}

                  />
                ))}
              </div>
            )}
            {item.copmonent}
          </div> : null
        ))}
      </div>

      <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4 mt-6">
        <div className="flex items-center justify-end gap-2">
          <p className="text-xs text-[#6B7280] font-bold">
            أوافق على <span className="text-[#98CC5D]">الشروط</span> و
            <span className="text-[#98CC5D]">الأحكام</span> الخاصة بمشروك
          </p>
          <input
            type="checkbox"
            className="h-4 w-4 rounded-2xl accent-[#3B73B9]"
          />
        </div>
        <div className="p-7">
          <Button
            text="حفظ التعديلات"
            onClick={() => modalRef.current?.open()}
          />
        </div>
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
                هل أنت متأكد من رغبتك في تنفيذ اجراء تعديل الطلب رقم (2022) ؟
              </p>
            </span>
            <div className="bg-[#FDE8E8] rounded-md mt-5 mb-5 flex items-center justify-start p-1 flex-row gap-1 ">
              <InfoOutLine />
              <p className="font-medium text-[10px] text-[#4B5563]">
                في حال قمت بتعديل الطلب سيتم حذف البيانات المتعلقة بالطلب بما في
                ذلك شراكة قد قمت بها من خلال الطلب و مراحل الطلب
              </p>
            </div>
          </div>

          <div className="border border-[#E5E7EB] w-full mb-4" />

          <div className="flex flex-row items-center justify-center gap-3  w-full">
            <Button
              text=" تعديل"
              onClick={() => { modalRef.current?.close(); onSubmit() }}
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
      <Modal ref={citiesRef} size="sm">
        <div className="items-start flex justify-center flex-col p-4 ">
          <div className="flex items-center   w-full">
            <div className="flex-1 flex  items-center justify-center">
              <p className="text-base text-[#374151] font-bold">
                إضافة حي / أحياء
              </p>
            </div>
            <div>
              <CloseIconSmall
                className="cursor-pointer"
                onClick={() => citiesRef.current?.close()}
              />
            </div>
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="ابحث عن حي..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="flex flex-col items-end h-[500px] overflow-scroll  w-full">
            {district?.map((cite:any) => (
              <div
                key={cite?.id}
                className="flex justify-end items-center w-full py-2"
              >
                <span className="mr-2">{cite?.name}</span>
                <input
                  type="checkbox"
                  checked={criteria?.district?.some((c: any) => c == cite?.name)}
                  onChange={() => handleCiteChange(cite)}
                  className="checked:accent-[#3B73B9] w-[16px] h-[16px]"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-row items-center justify-center gap-3  w-full">
            <Button
              text="الغاء"
              onClick={() => citiesRef.current?.close()}
              className="!bg-[#E5E7EB] !text-[#1F2A37]"
            />
            <Button
              text="حفظ"
              onClick={() => citiesRef.current?.close()}
            />
          </div>
        </div>
      </Modal>
      <footer className="w-full bg-white p-5">
        <Footer />
      </footer>
    </form>
  );
};
export default EditMyOrderBadge;
const floorsVilla = [
  { name: "دور الارضي" },
  { name: "دور علوي" },
  { name: "شقة" },
];