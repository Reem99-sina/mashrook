"use client";

import React, { useRef, useState, useEffect,useMemo } from "react";

import { Add, CloseIconSmall, Succeeded } from "@/app/assets/svg";
import RangeComponent from "@/app/components/shared/range.component"
import { RadioInput } from "../components/shared/radio.component";
import { Button } from "../components/shared/button.component";
import { Modal, ModalRef } from "../components/shared/modal.component";
import Footer from "../components/header/Footer2";
import MainHeader from "../components/header/MainHeader";
import { getCity,getDistrict} from "@/redux/features/getCity"
import Image from "next/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Range, getTrackBackground } from "react-range";
import {
  getproperityType,
  getproperityTypeMore,
} from "@/redux/features/getProperity";
import {
  postProperityType,
  properityTypeInter,
  properityErrorTypeInter,
  removeState,
} from "@/redux/features/postRequest";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  rowSchema,
  departmentSchema,
  departmentOwnSchema,
  earthSchema,
  villaOwnSchema,
} from "@/typeSchema/schema";
import { validateForm } from "../hooks/validate";
import AccordionComponent from "../components/shared/Accordion.component";
import Cookie from 'js-cookie';

const dataReal = [
  {
    title: "نوع العقار",
    children: ["أرض سكنية", "أرض تجارية", "فيلا", "دور", "شقة"],
  },
];
 const floorsVilla = [
  { name: "دور الارضي" },
  { name: "دور علوي" },
  { name: "شقة" },
];

interface typeSelect {
  id: number;
  title: string;
}
const AddYourRequest: React.FC = () => {
  const [selectedPropertyType, setSelectedPropertyType] =
    useState<typeSelect>();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [selectedCites, setSelectedCites] = useState<
    { id: number; name: string }[]
  >([]);
  const modalRef = useRef<ModalRef>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deal, setdeal] = useState(false);
  const [ownerShip, setownerShip] = useState(false);
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
  const [criteria, setCriteria] = useState<any>({
    dealStatus: "",
    city: "",
    district: null,
    unitType: 0,
    unitStatus: "",
    priceRange: [500000, 20000000],
    shareRange: [1000000, 2000000],
    desiredRow: [1, 1],
    floorType: "",
  });
  const [sentYourRequest, setSentYourRequest] = useState<boolean>(false);
  const [errors, setErrors] = useState<properityErrorTypeInter>();

  let { loading, message, data, title, details, titleSection, detailsSection } =
    useSelector<RootState>((state) => state.properityType) as {
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
  } = useSelector<RootState>((state) => state.properityRequest) as {
    loading: boolean;
    message: string;
    data: any;
  };
  let {  city,district } =
  useSelector<RootState>((state) => state.city) as {
    district:any
    city:any
  };
  const dispatch = useDispatch<AppDispatch>();

  const handlePropertyTypeChange = (value: typeSelect) => {
    setSelectedPropertyType(value);
  };

  const handleCiteChange = (cite: { id: number; name: string }) => {
    setSelectedCites((prevSelectedCites) => {
      if (prevSelectedCites.some((c) => c.id === cite.id)) {
        return prevSelectedCites.filter((c) => c.id !== cite.id);
      } else {
        return [...prevSelectedCites, cite];
      }
    });
  };

  const handleRemoveCite = (id: number) => {
    setSelectedCites(selectedCites.filter((cite) => cite.id !== id));
  };

  const filteredCites = useMemo(()=>{
    return district?.filter((cite:any) =>
    cite?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  )},[district,searchTerm]);

  const handleShareRangeChange = (values: number[]) => {
    setCriteria({ ...criteria, shareRange: values });
  };
  const handleDesiredRowChange = (values: number[]) => {
    setCriteria({ ...criteria, desiredRow: values });
  };
  const onSubmit = async () => {
    // setSentYourRequest(true);
    // departmentSchema
    const datasend = {
      property_type_id: selectedPropertyType?.id,
      property_type_details_id: criteria?.unitType,
      city: criteria?.city,
      district: selectedCites?.map((dis) => dis?.name),
      status: criteria?.unitStatus,
      price: criteria?.shareRange[1],
      min_price: criteria?.shareRange[0],
      finance: criteria?.dealStatus,
    } as properityTypeInter;
    if (deal) {
      if (token) {
        if (selectedPropertyType?.title == "شقة" && criteria?.unitType == "8") {
          const status = await validateForm(
            {
              ...datasend,
              min_apartment_floor: String(criteria?.desiredRow[0]), // الادوار الامرغوبة
              apartment_floor: String(criteria?.desiredRow[1]),
            },
            departmentOwnSchema,
            setErrors
          );
          if (status == true) {
            dispatch(
              postProperityType({
                ...datasend,
                finance: criteria?.dealStatus == "نعم" ? true : false,
                min_apartment_floor: String(criteria?.desiredRow[0]), // الادوار الامرغوبة
                apartment_floor: String(criteria?.desiredRow[1]),
              })
            );
          }
        } else if (
          selectedPropertyType?.title == "أرض سكنية" ||
          selectedPropertyType?.title == "أرض تجارية"
        ) {
          const status = await validateForm(datasend, earthSchema, setErrors);

          if (status == true) {
            dispatch(
              postProperityType({
                ...datasend,
                finance: criteria?.dealStatus == "نعم" ? true : false,
              })
            );
          }
        } else if (
          selectedPropertyType?.title == "فيلا" &&
          criteria?.unitType == 4
        ) {
          const status = await validateForm(
            { ...datasend, details: detailsVilla },
            villaOwnSchema,
            setErrors
          );
          if (status == true) {
            dispatch(
              postProperityType({
                ...datasend,
                finance: criteria?.dealStatus == "نعم" ? true : false,
                // apartment_floor:criteria?.floorType,
                details: detailsVilla,
              })
            );
          }
        } else {
          const status = await validateForm(
            datasend,
            departmentSchema,
            setErrors
          );
          if (status == true) {
            dispatch(
              postProperityType({
                ...datasend,
                finance: criteria?.dealStatus == "نعم" ? true : false,
              })
            );
          }
        }
      } else {
        toast.error("انت تحتاج الي تسجيل دخول");
        router.push("/login");
      }
    } else {
      toast.error(" يجب الموافقه علي شروط الاستخدام وسياسية الخصوصية");
    }
  };

  useEffect(() => {
    dispatch(getproperityType({ num: 1 }));
    dispatch(getCity())
    return () => {
      dispatch(removeState());
    };
  }, [dispatch]);
  useEffect(() => {
    dispatch(
      getproperityTypeMore({
        num: selectedPropertyType?.id || 1,
        type: "request",
      })
    );
  }, [selectedPropertyType?.id, dispatch]);
  useEffect(() => {
    if (messageRequest && Boolean(dataRequest) == true) {
      toast.success(messageRequest);
      setSentYourRequest(true);
    }
  }, [dataRequest, messageRequest]);
  useEffect(() => {
   
      const storedToken = Cookie.get("token");
      if(storedToken){
        setToken(storedToken);
      }
    
  }, []);

  useEffect(()=>{
    if(criteria?.city){
      dispatch(getDistrict({name:criteria?.city}));
    }
  },[criteria?.city,dispatch])

  // let router=useRouter()
  useEffect(() => {
    return () => {
      setSentYourRequest(false);
    };
  }, []);
  return (
    <>
      {!sentYourRequest ? (
        <form className="flex flex-col items-center min-h-screen h-full w-full bg-[url('/background-cover.png')] bg-cover">
          <MainHeader />
          <div className="p-4">
            <p className="text-2xl font-medium text-[#374151]">أضف طلبك</p>
          </div>
          <div className="p-4 w-full flex gap-4 flex-col">
            <div className="bg-white rounded-lg border border-[#E5E7EB] w-full  items-start justify-start p-4">
              {dataReal.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-end">
                    <p className="text-base font-bold text-[#4B5563]">
                      {item.title}
                    </p>
                  </div>
                  <div className="flex  flex-row-reverse flex-wrap gap-8 items-center justify-start mt-6">
                    {Array.isArray(data?.data) &&
                      data?.data?.map(
                        (child: { id: number; title: string }, id: number) => (
                          <RadioInput
                            key={id}
                            name="propertyType"
                            onChange={() => handlePropertyTypeChange(child)}
                            label={child?.title}
                            value={child?.title}
                          />
                        )
                      )}
                  </div>
                </div>
              ))}

              {errors?.property_type_id && (
                <p className="text-xs text-red-600 dark:text-red-500 text-right">
                  {String(errors?.property_type_id)}
                </p>
              )}
            </div>
          </div>
          {titleSection && detailsSection && (
            <div className=" w-full items-start justify-start p-4 ">
              <div className="bg-white rounded-lg border border-[#E5E7EB] p-4">
                <div className="flex items-center justify-end">
                  <p className="text-base font-bold text-[#4B5563]">
                    {titleSection}
                  </p>
                </div>
                <div className="flex flex-row flex-wrap justify-end mt-6 gap-8 items-end">
                  <div className="mb-4 flex-row-reverse flex flex-wrap">
                    {detailsSection?.map(
                      (ele: { id: number; title: string }) => (
                        <RadioInput
                          key={ele?.id}
                          name="property_type_details_id"
                          onChange={(event) =>
                            setCriteria({
                              ...criteria,
                              unitType: Number(event?.target?.value),
                            })
                          }
                          value={ele.id}
                          label={ele?.title}
                        />
                      )
                    )}
                  </div>
                </div>
                {errors?.property_type_details_id && (
                  <p className="text-xs text-red-600 dark:text-red-500 text-right">
                    {String(errors?.property_type_details_id)}
                  </p>
                )}
              </div>
            </div>
          )}
          <div className=" w-full  items-start justify-start p-4">
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-4 mb-4">

            <div className="flex items-center justify-end">
              <p className="text-base font-bold text-[#4B5563]">
                {" "}
                موقع العقار{" "}
              </p>
            </div>
            <div className="flex items-end gap-2 justify-end flex-col mt-5">
              <p className="text-base font-medium text-[#4B5563]">المدينة</p>
              <div className=" w-full">
                <select
                  className="border w-full text-right border-[#D1D5DB] rounded-lg"
                  onChange={(event) =>
                    setCriteria({ ...criteria, city: event?.target?.value })
                  }
                >
                  {city?.map((city:any) => (
                    <option key={city.id} value={city.nameAr}>
                      {city?.nameAr}
                    </option>
                  ))}
                </select>
              </div>

              {errors?.city && (
                <p className="text-xs text-red-600 dark:text-red-500 text-right">
                  {errors?.city}

                </p>)}
             
              
                <div className="flex items-end gap-2 justify-end flex-row mt-5 ">
                  <p
                    className={`cursor-pointer text-[#3B73B9]  ${
                      selectedCites ? "" : "text-gray-500"
                    }`}
                  >
                    إضافة حي/ أحياء
                  </p>

                  <div
                    onClick={() => modalRef.current?.open()}
                    className="cursor-pointer bg-[#3B73B9]"
                  >
                    <Image src={Add} width={21} height={21} alt={"add"} />
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-3 items-center justify-end flex-wrap mb-5">
                {selectedCites.map((cite) => (
                  <div
                    key={cite.id}
                    className="flex items-center border-[#F3F4F6]  w-32 h-11 p-3 rounded-md gap-2 justify-between border shadow-sm flex-row mt-5"
                  >
                    <CloseIconSmall
                      className="cursor-pointer w-4 h-4"
                      onClick={() => handleRemoveCite(cite.id)}
                    />
                    <p className="text-xs font-normal text-[#9CA3AF]">
                      {cite.name}
                    </p>
                  </div>
                ))}

                {errors?.district && (
                  <p className="text-xs text-red-600 dark:text-red-500 text-right">
                    {errors?.district}
                  </p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
              {(selectedPropertyType?.title === "شقة" ||
                selectedPropertyType?.title === "فيلا" ||
                selectedPropertyType?.title === "دور") && (
                <>
                  <div className="flex items-center justify-end">
                    <p className="text-base font-bold text-[#4B5563]">
                      حالة العقار{" "}
                    </p>
                  </div>
                  <div className="flex flex-row-reverse   justify-end mt-6">
                    <div className="flex-1">
                      <RadioInput
                        name="realStateType"
                        onChange={(event) =>
                          setCriteria({
                            ...criteria,
                            unitStatus: event?.target?.value,
                          })
                        }
                        value="جديد"
                        label="جديد"
                      />
                    </div>
                    <div className="flex-1">
                      <RadioInput
                        name="realStateType"
                        onChange={(event) =>
                          setCriteria({
                            ...criteria,
                            unitStatus: event?.target?.value,
                          })
                        }
                        value="مستخدم"
                        label="مستخدم"
                      />
                    </div>
                    <div className="flex-1">
                      <RadioInput
                        name="realStateType"
                        onChange={(event) =>
                          setCriteria({
                            ...criteria,
                            unitStatus: event?.target?.value,
                          })
                        }
                        value="اي"
                        label="اي"
                      />
                    </div>
                  </div>

                  {errors?.status && (
                    <p className="text-xs text-red-600 dark:text-red-500 text-right">
                      {errors?.status}
                    </p>
                  )}
                </>
              )}
              {selectedPropertyType?.title === "شقة" &&
                criteria?.unitType == 8 && (
                  <>
                     <RangeComponent 
                      title="الادوار المرغوبة"
                      firstNumDes="1"
                      secondNumDes="+10"
                      step={1}
                      min={1}
                      max={10}
                      values={criteria?.desiredRow}
                      handleShareRangeChange={(values: number[]) =>{
                        setCriteria({ ...criteria, desiredRow: values });
                      }}
                      unit="دور"
                      />
                  </>
                )}

              {criteria?.unitType != 4 ? (
                <>
                      <RangeComponent 
                      title="ميزانيتك"
                      firstNumDes="500,000"
                      secondNumDes="+20,000,000"
                      step={500000}
                      min={500000}
                      max={20000000}
                      values={criteria?.shareRange}
                      handleShareRangeChange={(values: number[]) =>{
                        setCriteria({ ...criteria, shareRange: values });
                      }}
                      unit="ريال"
                      />
                </>
              ) : (
                <>
                  {floorsVilla?.map((floor, ind) => (
                    <AccordionComponent
                      title={floor?.name}
                      key={ind}
                      floors={floorsVilla}
                      error={errors && errors[`details[${ind}].type`]}
                      onChange={(e) => {
                        setDetails((prev) =>
                          prev.map((ele, i) =>
                            i == ind ? { ...ele, type: e.target.value } : ele
                          )
                        );
                      }}
                      value={floor?.name}
                    >
                      <>
                      {(detailsVilla&&detailsVilla[ind])&&<RangeComponent 
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
                  ))}
                </>
              )}
            </div>
            {(selectedPropertyType?.title == "أرض سكنية" ||
              selectedPropertyType?.title == "أرض تجارية") && (
              <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
                <div className="flex items-center justify-end">
                  <p className="text-base font-bold text-[#4B5563]">
                    حدد نوع التملك
                  </p>
                </div>
                <div className="flex flex-row justify-end mt-6 gap-8">
                  <RadioInput
                    name="ownershipType"
                    onChange={(event) =>
                      setCriteria({
                        ...criteria,
                        unitStatus: event?.target?.value,
                      })
                    }
                    value="مشاع"
                    label="مشاع"
                  />
                  <RadioInput
                    name="ownershipType"
                    onChange={(event) =>
                      setCriteria({
                        ...criteria,
                        unitStatus: event?.target?.value,
                      })
                    }
                    value="حر"
                    label="حر"
                  />
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
              <div className="flex items-center justify-end">
                <p className="text-base font-bold text-[#4B5563]">
                  هل ترغب في تمويل عقاري؟
                </p>
              </div>
              <div className="flex flex-row justify-end mt-6 gap-8">
                <RadioInput
                  name="mortgage"
                  onChange={(event) =>
                    setCriteria({
                      ...criteria,
                      dealStatus: event?.target?.value,
                    })
                  }
                  value="نعم"
                  label="نعم"
                />
                <RadioInput
                  name="mortgage"
                  onChange={(event) =>
                    setCriteria({
                      ...criteria,
                      dealStatus: event?.target?.value,
                    })
                  }
                  value="لا"
                  label="لا"
                />
              </div>

              {errors?.finance && (
                <p className="text-xs text-red-600 dark:text-red-500 text-right">
                  {String(errors?.finance)}
                </p>
              )}
            </div>

            <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
              <div className="flex items-center justify-end gap-2">
                <p className="text-xs text-[#6B7280] font-bold">
                  أوافق على <span className="text-[#98CC5D]">الشروط</span> و
                  <span className="text-[#98CC5D]">الأحكام</span> الخاصة بمشروك
                </p>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded-2xl accent-[#3B73B9]"
                  onChange={(e) => setdeal(e.target.checked)}
                />
              </div>
              <div className="p-7">
                {loadingRequest?<button
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#3B73B9] border border-transparent rounded-md group  focus:outline-none focus:ring-2 focus:ring-offset-2 "
              disabled={loadingRequest}
            ><AiOutlineLoading3Quarters className="rotate-90 text-gray-500"/>
            </button>:<Button text="إضافة الطلب" onClick={onSubmit} />}
                
              </div>
            </div>
          </div>
          <div>
            <Modal ref={modalRef} size="sm">
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
                      onClick={() => modalRef.current?.close()}
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
                  {filteredCites?.map((cite:any) => (
                    <div
                      key={cite.id}
                      className="flex justify-end items-center w-full py-2"
                    >
                      <span className="mr-2">{cite.name}</span>
                      <input
                        type="checkbox"
                        checked={selectedCites.some((c) => c.id === cite.id)}
                        onChange={() => handleCiteChange(cite)}
                        className="checked:accent-[#3B73B9] w-[16px] h-[16px]"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-row items-center justify-center gap-3  w-full">
                  <Button
                    text="الغاء"
                    onClick={() => modalRef.current?.close()}
                    className="!bg-[#E5E7EB] !text-[#1F2A37]"
                  />
                  <Button
                    text="حفظ"
                    onClick={() => modalRef.current?.close()}
                  />
                </div>
              </div>
            </Modal>
          </div>
          <footer className="w-full bg-white p-5">
            <Footer />
          </footer>
        </form>
      ) : (
        <div className="flex flex-col items-center min-h-screen h-full w-full bg-white">
          <MainHeader />
          <div className="flex items-center justify-center flex-col border border-[#F3F4F6] rounded-lg p-3 mb-6 w-4/5 shadow-sm">
            <Succeeded />
            <p className="font-bold text-xl text-[#1F2A37] mt-4 mb-4">
              تم بنجاح إضافة طلب شراكة عقار
            </p>
            <div className=" flex mb-auto bg-[#F3F4F6] rounded-lg justify-center items-center w-24 h-6">
              <p className="text-[#6B7280] text-xs font-normal">
                رقم الطلب: {dataRequest?.id}
              </p>
            </div>
          </div>
          <div className="w-4/5 mb-28  ">
            <Button
              text="الذهاب الى طلباتي"
              onClick={() => {
              
                router.push("/my-offer")
              }}
            />
            <Button
              text="العودة الى الرئيسية"
              className="!text-[#3B73B9] !bg-white !border !border-[#3B73B9] rounded !mt-5"
              onClick={() => {
                router.refresh();
                router.push("/");
              }}
            />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default AddYourRequest;
