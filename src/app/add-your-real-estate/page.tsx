"use client";

import React, { useRef, useState, useEffect } from "react";
import { AddButton, CloseIconSmall, Succeeded } from "../assets/svg";
import { RadioInput } from "../components/shared/radio.component";
import { Button } from "../components/shared/button.component";
import { Modal, ModalRef } from "../components/shared/modal.component";
import ImageAppear from "../components/shared/ImageAppear";

import AccordionComponent from "../components/shared/Accordion.component";

import NumberRoom from "./components/NumberRoom";
import Footer from "../components/header/Footer2";
import MainHeader from "../components/header/MainHeader";
import { useRouter } from "next/navigation";
import { TextInput } from "../components/shared/text-input.component";

import CountElement from "./components/CountElemet";
import CheckFeature from "./components/CheckFeature";
import InputAreaPrice from "./components/InputAreaPrice";

import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getproperityType } from "@/redux/features/getProperity";
import { getproperityPurposeType } from "@/redux/features/getproperityPurpose";
import { getproperityOwnerType } from "@/redux/features/getProperityOwnerType";
import {
  RealEstateTypeInter,
  RealEstateErrrorTypeInter,
  postrealEstateType,
} from "@/redux/features/postRealEstate";
import { cites } from "@/typeSchema/schema";
import { validateForm } from "../hooks/validate";
import toast from "react-hot-toast";
import {
  earthSchema,
  departmentOrRowSchema,

  departmentOrRowArchSchema,
  villaOwnSchema,

} from "@/typeSchema/schemaRealestate";
// import MapLocation from "./components/MapLocation"
const cities = [
  {
    id: 1,
    name: "الرياض",
  },
  {
    id: 2,
    name: "الدمام",
  },
  {
    id: 3,
    name: "جدة",
  },
  {
    id: 4,
    name: "تبوك",
  },
  {
    id: 5,
    name: "الطائف",
  },
];

const dataa = [
  {
    id: 1,
    tattle: "صفة مقدم العرض",
    english: "view",
    option: ["مالك", "مطور عقاري", "وسيط عقاري"],
  },
  {
    id: 2,
    tattle: "الغرض من عرض العقار",
    english: "viewrealstate",
    option: ["بيع", "تطوير (شراكة برأس المال أو البناء)"],
  },
  {
    id: 3,
    tattle: "نوع العقار",
    english: "typerealstate",
    option: ["أرض سكنية", "أرض تجارية", "فيلا", "دور", "شقة"],
  },
];

const floorsVilla = [
  { name: "دور الارضي" },
  { name: "دور علوي" },
  { name: "شقة" },
];

interface typeSelectedProperty {
  id: number;
  title: string;
}
const AddYourRealEstate: React.FC = () => {
  const router = useRouter();
  const modalRef = useRef<ModalRef>(null);
  let refImage = useRef<HTMLInputElement>(null);

  const [sentYourRequest, setSentYourRequest] = useState<boolean>(false);
  const [errors, setErrors] = useState<RealEstateErrrorTypeInter>();
  const [selectedPropertyType, setSelectedPropertyType] =
    useState<typeSelectedProperty>();
  const handleOptionChange = (option: any, title: string) => {
    if (title == "صفة مقدم العرض") {
      setDataSend({ ...dataSend, property_owner_type_id: option?.id });
    } else if (title == "الغرض من عرض العقار") {
      setDataSend({ ...dataSend, property_purpose_id: option?.id });
    } else {
      setDataSend({ ...dataSend, property_type_id: option?.id });
      setSelectedPropertyType(option);
    }
    // setSelectedPropertyType(option);
  };
  const [token, setToken] = useState<string | null>(null);
  const [haveNumber, setHaveNumber] = useState(false);
  const [deal, setDeal] = useState(false);

  const [dataSend, setDataSend] = useState({
    property_owner_type_id: 0, // وسيط عقاري, مطور عقاري, وسيط
    property_purpose_id: 0, //بيع, تطوير (شراكة برأس المال أو البنا
    property_type_id: "",
    city: "",
    district: "",
    address: "gh",
    area: "",
    price: 0,
    lat: 45,
    long: 67,
    is_divisible: false,
  });
  const [mediator, setMediator] = useState({
    advertisement_number: "", // رقم الاعلان
    license_number: "",
  });

  const [villa, setvilla] = useState({
    location: "",
  });

  const [DepartmentArch, setDepartmentArch] = useState({
    apartment_number: "", // رقم الاعلان
    apartment_floor: "",
  });
  const [earth, setEarth] = useState({
    plan_number: "", // رقم الاعلان
    piece_number: "",
  });
  const [departmentArch, setdepartmentArch] = useState({
    age: 0,
    rooms_number: 0,
    halls_number: 0,
    bathrooms_number: 0,
    kitchens_number: 0,
    type: "",
  });
  const [additionalData, setAdditional] = useState({
    pool: false,
    garden: false,
    servants_room: false, // مزايا اضافية غرفة خدم
    ac: false, // مزايا اضافية مكيفة
    furnished: false, // مزايا اضافية مؤثثة
    kitchen: false,
    car_entrance: false,
    garage: false,
  });
  const [images, setImages] = useState<File[] | undefined>([]);
  let { loading, message, data } = useSelector<RootState>(
    (state) => state.properityType
  ) as { loading: boolean; message: string; data: any };
  let {
    loading: loadingproperty_purpose_id,
    message: messagePurpose,
    data: dataPurpose,
  } = useSelector<RootState>((state) => state.properityPurpose) as {
    loading: boolean;
    message: string;
    data: any;
  };
  let {
    loading: loadingOwnerType,
    message: messageOwnerType,
    data: dataOwnerType,
  } = useSelector<RootState>((state) => state.properityOwnerType) as {
    loading: boolean;
    message: string;
    data: any;
  };
  let {
    loading: loadingrealEstateRequest,
    message: messagerealEstateRequest,
    data: datarealEstateRequest,
  } = useSelector<RootState>((state) => state.realEstateRequest) as {
    loading: boolean;
    message: string;
    data: any;
  };
  const dispatch = useDispatch<AppDispatch>();
  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setdepartmentArch({
      ...departmentArch,
      [e.target.name]: Number(e.target.value),
    });
    // set(Number(e.target.value));
  };
  const onSubmit = async () => {
    if (deal) {
      if (token) {

        if (images && images?.length > 0) {
          if (
            selectedPropertyType?.title == "أرض سكنية" ||
            selectedPropertyType?.title == "أرض تجارية"
          ) {
            const status = await validateForm(
              {
                ...earth,
                ...dataSend,
                advertisement_number: mediator.advertisement_number,
              },
              earthSchema,
              setErrors
            );
            if (status == true) {
              dispatch(
                postrealEstateType({
                  ...earth,
                  ...dataSend,
                  ...mediator,
                  images,
                })
              );
            }
          } else if (departmentArch.type == "شقة (داخل عمارة سكنية)") {
            const status = await validateForm(
              {

                ...dataSend,
                ...departmentArch,
                ...DepartmentArch,
                ac: additionalData?.ac, // مزايا اضافية مكيفة
                furnished: additionalData?.furnished, // مزايا اضافية مؤثثة
                kitchen: additionalData?.kitchen,
                car_entrance: additionalData?.car_entrance,

              },
              departmentOrRowArchSchema,
              setErrors
            );
            if (status == true) {
              dispatch(
                postrealEstateType({
                  ...dataSend,
                  ...departmentArch,
                  ...DepartmentArch,
                  ac: additionalData?.ac, // مزايا اضافية مكيفة
                  furnished: additionalData?.furnished, // مزايا اضافية مؤثثة
                  kitchen: additionalData?.kitchen,
                  car_entrance: additionalData?.car_entrance,
                  ...mediator,
                  images,
                })
              );
            }
          } else if (
            selectedPropertyType?.title == "شقة" ||
            selectedPropertyType?.title == "دور"
          ) {
            const status = await validateForm(
              {
                ...dataSend,
                ...departmentArch,
                ac: additionalData?.ac, // مزايا اضافية مكيفة
                furnished: additionalData?.furnished, // مزايا اضافية مؤثثة
                kitchen: additionalData?.kitchen,
                car_entrance: additionalData?.car_entrance,
              },
              departmentOrRowSchema,
              setErrors
            );
            if (status == true) {
              dispatch(
                postrealEstateType({
                  ...dataSend,
                  ...departmentArch,
                  ac: additionalData?.ac, // مزايا اضافية مكيفة
                  furnished: additionalData?.furnished, // مزايا اضافية مؤثثة
                  kitchen: additionalData?.kitchen,
                  car_entrance: additionalData?.car_entrance,
                  ...mediator,
                  images,
                })
              );
            }
          } else if (
            selectedPropertyType?.title === "فيلا" &&
            departmentArch?.type == "فيلا (وحدات تمليك)"
          ) {
            const status = await validateForm(
              {
                ...dataSend,
                ...departmentArch,
                ac: additionalData?.ac, // مزايا اضافية مكيفة
                furnished: additionalData?.furnished, // مزايا اضافية مؤثثة
                kitchen: additionalData?.kitchen,
                car_entrance: additionalData?.car_entrance,
                ...villa,
              },
              villaOwnSchema,
              setErrors
            );
            if (status == true) {
              dispatch(
                postrealEstateType({
                  ...dataSend,
                  ...departmentArch,
                  ac: additionalData?.ac, // مزايا اضافية مكيفة
                  furnished: additionalData?.furnished, // مزايا اضافية مؤثثة
                  kitchen: additionalData?.kitchen,
                  car_entrance: additionalData?.car_entrance,
                  ...villa,
                  images,
                })
              );
            }
          }
        } else {
          setErrors({ ...errors, images: "مطلوب اضافة صوره" });
        }

      } else {
        toast.error("انت تحتاج الي تسجيل دخول");
        router.push("/login");
      }
    } else {
      toast.error("لازم تقبل بشروط الاستخدام وسياسية الخصوصية");
    }
    // setSentYourRequest(true);
  };
  const onDelete = (index: Number) => {
    setImages(images?.filter((_, ind) => ind != index));
  };
  useEffect(() => {
    dispatch(getproperityType());
    dispatch(getproperityPurposeType());
    dispatch(getproperityOwnerType());
  }, [dispatch]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = sessionStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (messagerealEstateRequest && Boolean(datarealEstateRequest) == true) {
      toast.success(messagerealEstateRequest);
      setSentYourRequest(true);
    }
  }, [datarealEstateRequest, messagerealEstateRequest]);
  useEffect(() => {
    return () => {
      setSentYourRequest(false);
    };
  }, []);


  // console.log(errors,"errors",formData,images,formData.has('images'))
  return (
    <>
      {!sentYourRequest ? (
        <form className="flex flex-col items-center min-h-screen h-full w-full bg-[url('/background-cover.png')] bg-cover">
          <MainHeader />
          <div className="p-4">
            <p className="text-2xl font-medium text-[#374151]">أضف عقارك</p>
          </div>
          <div className="p-4 w-full flex gap-4 flex-col">
            <div>
              {dataa.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4"
                >
                  <div className="flex items-center justify-end">
                    <p className="text-base font-bold text-[#4B5563]">
                      {item.tattle}
                    </p>
                  </div>
                  <div className="flex flex-row-reverse flex-wrap justify-start mt-6 gap-8">
                    {item.tattle == "نوع العقار"
                      ? data?.map(
                          (
                            option: { id: number; title: string },
                            index: number
                          ) => (
                            <RadioInput
                              name={`realstateType`}
                              onChange={() =>
                                handleOptionChange(option, item.tattle)
                              }
                              value={option?.title}
                              key={index}
                              label={option?.title}
                            />
                          )
                        )
                      : item.tattle == "صفة مقدم العرض"
                      ? dataOwnerType?.map(
                          (
                            option: { id: number; title: string },
                            index: number
                          ) => (
                            <RadioInput
                              name={item.tattle}
                              onChange={() =>
                                handleOptionChange(option, item.tattle)
                              }
                              value={option?.title}
                              key={index}
                              label={option?.title}
                            />
                          )
                        )
                      : dataPurpose?.map(
                          (
                            option: { id: number; title: string },
                            index: number
                          ) => (
                            <RadioInput
                              name={item.tattle}
                              onChange={() =>
                                handleOptionChange(option, item.tattle)
                              }
                              value={option?.title}
                              key={index}
                              label={option?.title}
                            />
                          )
                        )}
                    {item.tattle == "نوع العقار" &&
                      errors?.property_type_id && (
                        <p className="text-xs text-red-600 dark:text-red-500 text-right">
                          {String(errors?.property_type_id)}
                        </p>
                      )}
                    {item.tattle == "صفة مقدم العرض" &&
                      errors?.property_owner_type_id && (
                        <p className="text-xs text-red-600 dark:text-red-500 text-right">
                          {String(errors?.property_owner_type_id)}
                        </p>
                      )}
                    {item.tattle == "الغرض من عرض العقار" &&
                      errors?.property_purpose_id && (
                        <p className="text-xs text-red-600 dark:text-red-500 text-right">
                          {String(errors?.property_purpose_id)}
                        </p>
                      )}
                  </div>
                  {(dataSend?.property_owner_type_id == 2 ||
                    dataSend?.property_owner_type_id == 3) &&
                    item.tattle == "صفة مقدم العرض" && (
                      <>
                        <div className="flex items-end gap-2 justify-end flex-col mt-5">
                          <p className="text-base text-[#4B5563] font-medium">
                            رقم رخصة فال{" "}
                          </p>
                          <TextInput
                            inputProps={{ placeholder: "-- الرجاء الادخال --" }}
                            onChange={(event) =>
                              setMediator({
                                ...mediator,
                                license_number: event?.target?.value,
                              })
                            }
                            value={mediator?.license_number}
                          />
                          {errors?.license_number && (
                            <p className="text-xs text-red-600 dark:text-red-500 text-right">
                              {String(errors?.license_number)}
                            </p>
                          )}
                        </div>
                        <div className="flex items-end gap-2 justify-end flex-col mt-5">
                          <p className="text-base text-[#4B5563] font-medium">
                            رقم الاعلان{" "}
                          </p>
                          <TextInput
                            inputProps={{ placeholder: "-- الرجاء الادخال --" }}
                            onChange={(event) =>
                              setMediator({
                                ...mediator,
                                advertisement_number: event?.target?.value,
                              })
                            }
                            value={mediator?.advertisement_number}
                          />
                          {errors?.advertisement_number && (
                            <p className="text-xs text-red-600 dark:text-red-500 text-right">
                              {String(errors?.advertisement_number)}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                </div>
              ))}
            </div>

            {selectedPropertyType?.title === "شقة" && (
              <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4 mt-4">
                <div className="flex items-center justify-end">
                  <p className="text-base font-bold text-[#4B5563]">
                    نوع الشقة
                  </p>
                </div>
                <div className="flex flex-row flex-wrap justify-end mt-6 gap-8 items-end">
                  <div className="mb-4 flex-row flex">
                    <RadioInput
                      name="ownershipType"
                      onChange={(event) =>
                        setdepartmentArch({
                          ...departmentArch,
                          type: event?.target?.value,
                        })
                      }
                      value="شقة (داخل عمارة سكنية)"
                      label="شقة (داخل عمارة سكنية) "
                    />
                    <RadioInput
                      name="ownershipType"
                      onChange={(event) =>
                        setdepartmentArch({
                          ...departmentArch,
                          type: event?.target?.value,
                        })
                      }
                      value="شقة (داخل فيلا) "
                      label=" شقة (داخل فيلا)"
                    />
                  </div>
                </div>
                {errors?.type && (
                  <p className="text-xs text-red-600 dark:text-red-500 text-right">
                    {String(errors?.type)}
                  </p>
                )}
              </div>
            )}

            {selectedPropertyType?.title === "دور" && (
              <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4 mt-4">
                <div className="flex items-center justify-end">
                  <p className="text-base font-bold text-[#4B5563]">
                    نوع الدور
                  </p>
                </div>
                <div className="flex flex-row flex-wrap justify-end mt-6 gap-8 items-end">
                  <div className="mb-4  flex-row flex">
                    <RadioInput
                      name="ownershipType"
                      onChange={(event) =>
                        setdepartmentArch({
                          ...departmentArch,
                          type: event?.target?.value,
                        })
                      }
                      value="دور أرضي"
                      label="دور أرضي"
                    />
                    <RadioInput
                      name="ownershipType"
                      onChange={(event) =>
                        setdepartmentArch({
                          ...departmentArch,
                          type: event?.target?.value,
                        })
                      }
                      value="دور علوي"
                      label="دور علوي"
                    />
                  </div>
                </div>
                {errors?.type && (
                  <p className="text-xs text-red-600 dark:text-red-500 text-right">
                    {String(errors?.type)}
                  </p>
                )}
              </div>
            )}

            {selectedPropertyType?.title === "فيلا" && (
              <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4 mt-4">
                <div className="flex items-center justify-end">
                  <p className="text-base font-bold text-[#4B5563]">
                    نوع الفيلا
                  </p>
                </div>
                <div className="flex flex-row flex-wrap justify-end mt-6 gap-8  items-end">
                  <div className="mb-4  flex-row flex">
                    <RadioInput
                      name="ownershipType"
                      onChange={(event) =>
                        setdepartmentArch({
                          ...departmentArch,
                          type: event?.target?.value,
                        })
                      }
                      value="فيلا (درج داخلي + شقة)"
                      label="فيلا (درج داخلي + شقة)"
                    />
                    <RadioInput
                      name="ownershipType"
                      onChange={(event) =>
                        setdepartmentArch({
                          ...departmentArch,
                          type: event?.target?.value,
                        })
                      }
                      value="فيلا (وحدات تمليك)"
                      label="فيلا (وحدات تمليك)"
                    />
                  </div>
                </div>
                {errors?.type && (
                  <p className="text-xs text-red-600 dark:text-red-500 text-right">
                    {String(errors?.type)}
                  </p>
                )}
              </div>
            )}

            <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
              <div className="flex items-center justify-end">
                <p className="text-base font-bold text-[#4B5563]">
                  {" "}
                  موقع العقار{" "}
                </p>
              </div>
              <div className="flex items-end gap-2 justify-end flex-row mt-5">
                <div className="flex flex-col items-end gap-2 justify-end w-full">
                  <p className="text-base font-medium text-[#4B5563]">الحي</p>
                  <select
                    className="border w-full text-right  border-[#D1D5DB] rounded-lg "
                    onChange={(event) =>
                      setDataSend({
                        ...dataSend,
                        district: event?.target?.value,
                      })
                    }
                  >
                    {cites?.map((city) => (
                      <option key={city?.id} value={city?.name}>
                        {city?.name}
                      </option>
                    ))}
                  </select>
                  {errors?.district && (
                    <p className="text-xs text-red-600 dark:text-red-500 text-right">
                      {errors?.district}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2 justify-end  w-full">
                  <p className="text-base font-medium text-[#4B5563]">
                    المدينة
                  </p>
                  <select
                    className="border w-full text-right  border-[#D1D5DB] rounded-lg"
                    onChange={(event) =>
                      setDataSend({ ...dataSend, city: event?.target?.value })
                    }
                  >
                    {cities.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  {errors?.district && (
                    <p className="text-xs text-red-600 dark:text-red-500 text-right">
                      {errors?.district}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-end gap-2 justify-end flex-row mt-5">
                <p className="text-sm text-[#3B73B9] font-bold">إضافة الموقع</p>
                <AddButton
                  onClick={() => modalRef.current?.open()}
                  className="cursor-pointer"
                />
              </div>
              {(selectedPropertyType?.title == "أرض سكنية" ||
                selectedPropertyType?.title == "أرض تجارية") && (
                <div className="flex items-end gap-2 justify-end flex-col mt-5">
                  <p className="text-base text-[#4B5563] font-medium">
                    رقم المخطط{" "}
                  </p>
                  <TextInput
                    inputProps={{ placeholder: "-- الرجاء الادخال --" }}
                    onChange={(event) =>
                      setEarth({ ...earth, plan_number: event?.target?.value })
                    }
                    value={earth?.plan_number}
                  />
                  {errors?.plan_number && (
                    <p className="text-xs text-red-600 dark:text-red-500 text-right">
                      {errors?.plan_number}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
              <div className="flex items-center justify-end">
                <p className="text-base font-bold text-[#4B5563]">
                  تفاصيل وسعر العقار{" "}
                </p>
              </div>
              <div className="mb-4" style={{ direction: "rtl" }}>

                {departmentArch?.type == "شقة (داخل عمارة سكنية)" && (
                  <>
                    <div className="flex flex-col gap-5 my-3">
                      <p>رقم الشقة </p>
                      <CountElement
                        value={DepartmentArch?.apartment_number}
                        onChange={(num) =>
                          setDepartmentArch({
                            ...DepartmentArch,
                            apartment_number: String(num),
                          })
                        }
                        title="رقم الشقة"
                      />
                      <p> رقم الدور</p>
                      <CountElement
                        value={DepartmentArch?.apartment_floor}
                        onChange={(num) =>
                          setDepartmentArch({
                            ...DepartmentArch,
                            apartment_floor: String(num),
                          })
                        }
                        title="رقم الدور"
                      />
                    </div>
                  </>
                )}

                {(selectedPropertyType?.title == "أرض سكنية" ||
                  selectedPropertyType?.title == "أرض تجارية") && (
                  <div className="mb-4">
                    <label className="block mb-2 font-medium mt-2">
                      رقم القطعة{" "}
                    </label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="-- الرجاء الادخال --"
                        onChange={(event) =>
                          setEarth({
                            ...earth,
                            piece_number: event?.target?.value,
                          })
                        }
                      />
                    </div>
                    {errors?.piece_number && (
                      <p className="text-xs text-red-600 dark:text-red-500 text-right">
                        {errors?.piece_number}
                      </p>
                    )}
                  </div>
                )}

                {(selectedPropertyType?.title == "أرض سكنية" ||
                  selectedPropertyType?.title == "أرض تجارية" ||
                  selectedPropertyType?.title == "شقة" ||
                  selectedPropertyType?.title == "دور") && (
                  <>
                    <InputAreaPrice
                      title="المساحة"
                      onChange={(event) =>
                        setDataSend({ ...dataSend, area: event?.target?.value })
                      }
                      errors={errors?.area}
                      measurement="متر"
                    />
                    <InputAreaPrice
                      title="السعر"
                      onChange={(event) =>
                        setDataSend({
                          ...dataSend,
                          price: Number(event?.target?.value),
                        })
                      }
                      errors={errors?.price}
                      measurement="ريال"
                      desc="(بدون القيمة المضافة والسعي)"
                    />
                  </>
                )}
              </div>

              {selectedPropertyType?.title === "شقة" ||
              selectedPropertyType?.title === "دور" ? (
                <>
                  <NumberRoom
                    errors={String(errors?.age)}
                    value={departmentArch?.age}
                    onChange={handlePercentageChange}
                    name="age"
                    title={"العمر"}
                    firstNumber={"جديد"}
                    secondNumber={"+10 سنين"}
                    max={10}
                  />
                  <NumberRoom

                    errors={String(errors?.rooms_number)}
                    value={departmentArch?.rooms_number}
                    onChange={handlePercentageChange}
                    name="rooms_number"
                    title={"عدد الغرف"}
                    firstNumber={"غرفة"}
                    secondNumber={"+10 غرف"}
                    max={10}
                  />
                  <NumberRoom
                    errors={String(errors?.halls_number)}
                    value={departmentArch?.halls_number}
                    onChange={handlePercentageChange}
                    name="halls_number"
                    title={"عدد الصالات"}
                    firstNumber={"صالة"}
                    secondNumber={"3+ صالات "}
                    max={3}
                  />
                  <NumberRoom
                    errors={String(errors?.bathrooms_number)}
                    value={departmentArch?.bathrooms_number}
                    onChange={handlePercentageChange}
                    name="bathrooms_number"
                    title={"عدد دورات المياه"}
                    firstNumber={"دورة مياه"}
                    secondNumber={"3+ دورة مياه "}
                    max={3}
                  />
                  <NumberRoom
                    errors={String(errors?.kitchens_number)}
                    value={departmentArch?.kitchens_number}
                    onChange={handlePercentageChange}
                    name="kitchens_number"
                    title={" عدد المطابخ"}
                    firstNumber={"مطبخ"}
                    secondNumber={"3+ مطابخ"}
                    max={3}
                  />

                </>
              ) : (
                selectedPropertyType?.title === "فيلا" && (
                  <>
                    <NumberRoom
                      errors={String(errors?.age)}
                      value={departmentArch?.age}
                      onChange={handlePercentageChange}
                      name="age"
                      title={"العمر"}
                      firstNumber={"جديد"}
                      secondNumber={"+10 سنين"}
                      max={10}
                    />
                  </>
                )
              )}
              {selectedPropertyType?.title === "فيلا" &&
                departmentArch?.type == "فيلا (وحدات تمليك)" && (
                  <>
                    {floorsVilla?.map((floor, index) => (
                      <AccordionComponent
                        title={floor?.name}
                        key={index}
                        floors={floorsVilla}
                        onChange={(e) =>
                          setvilla({ ...villa, location: e.target.value })
                        }
                        value={villa?.location}
                      >
                        <>
                          <InputAreaPrice
                            title="المساحة"
                            onChange={(event) =>
                              setDataSend({
                                ...dataSend,
                                area: event?.target?.value,
                              })
                            }
                            errors={errors?.area}
                            measurement="متر"
                          />
                          <InputAreaPrice
                            title="السعر"
                            onChange={(event) =>
                              setDataSend({
                                ...dataSend,
                                price: Number(event?.target?.value),
                              })
                            }
                            errors={errors?.price}
                            measurement="ريال"
                            desc="(بدون القيمة المضافة والسعي)"
                          />
                          <NumberRoom
                            errors={String(errors?.rooms_number)}
                            value={departmentArch?.rooms_number}
                            onChange={handlePercentageChange}
                            name="rooms_number"
                            title={"عدد الغرف"}
                            firstNumber={"غرفة"}
                            secondNumber={"+10 غرف"}
                            max={10}
                          />
                          <NumberRoom
                            errors={String(errors?.halls_number)}
                            value={departmentArch?.halls_number}
                            onChange={handlePercentageChange}
                            name="halls_number"
                            title={"عدد الصالات"}
                            firstNumber={"صالة"}
                            secondNumber={"3+ صالات "}
                            max={3}
                          />
                          <NumberRoom
                            errors={String(errors?.bathrooms_number)}
                            value={departmentArch?.bathrooms_number}
                            onChange={handlePercentageChange}
                            name="bathrooms_number"
                            title={"عدد دورات المياه"}
                            firstNumber={"دورة مياه"}
                            secondNumber={"3+ دورة مياه "}
                            max={3}
                          />
                          <NumberRoom
                            errors={String(errors?.kitchens_number)}
                            value={departmentArch?.kitchens_number}
                            onChange={handlePercentageChange}
                            name="kitchens_number"
                            title={" عدد المطابخ"}
                            firstNumber={"مطبخ"}
                            secondNumber={"3+ مطابخ"}
                            max={3}
                          />
                          <div className="mt-2">
                            <div
                              className="flex justify-between text-sm mt-2"
                              style={{ direction: "rtl" }}
                            >
                              <p className="font-medium text-base text-[#4B5563]">
                                مزايا إضافية:
                              </p>
                            </div>
                            <div
                              className=" flex flex-row flex-wrap gap-8"
                              style={{ direction: "rtl" }}
                            >
                              <CheckFeature
                                title="مكيفة"
                                onChange={(event) =>
                                  setAdditional({
                                    ...additionalData,
                                    ac: event?.target?.checked,
                                  })
                                }
                              />
                              <CheckFeature
                                title="مدخل سيارة"
                                onChange={(event) =>
                                  setAdditional({
                                    ...additionalData,
                                    car_entrance: event?.target?.checked,
                                  })
                                }
                              />
                              <CheckFeature
                                title="مطبخ راكب"
                                onChange={(event) =>
                                  setAdditional({
                                    ...additionalData,
                                    kitchen: event?.target?.checked,
                                  })
                                }
                              />
                              <CheckFeature
                                title="مؤثثة"
                                onChange={(event) =>
                                  setAdditional({
                                    ...additionalData,
                                    furnished: event?.target?.checked,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </>
                      </AccordionComponent>
                    ))}
                  </>
                )}
              {selectedPropertyType?.title === "فيلا" &&
              departmentArch?.type == "فيلا (درج داخلي + شقة)" ? (
                <div className="mt-2">
                  <div
                    className="flex justify-between text-sm mt-2"
                    style={{ direction: "rtl" }}
                  >
                    <p className="font-medium text-base text-[#4B5563]">
                      مزايا إضافية:
                    </p>
                  </div>
                  <div
                    className=" flex flex-row flex-wrap gap-8"
                    style={{ direction: "rtl" }}
                  >
                    <CheckFeature
                      title="مسبح"
                      onChange={(event) =>
                        setAdditional({
                          ...additionalData,
                          pool: event?.target?.checked,
                        })
                      }
                    />
                    <CheckFeature
                      title="كراج للسيارات"
                      onChange={(event) =>
                        setAdditional({
                          ...additionalData,
                          garage: event?.target?.checked,
                        })
                      }
                    />
                    <CheckFeature
                      title="غرفة خدم"
                      onChange={(event) =>
                        setAdditional({
                          ...additionalData,
                          servants_room: event?.target?.checked,
                        })
                      }
                    />
                    <CheckFeature
                      title="مؤثثة"
                      onChange={(event) =>
                        setAdditional({
                          ...additionalData,
                          furnished: event?.target?.checked,
                        })
                      }
                    />
                  </div>
                </div>
              ) : (
                (selectedPropertyType?.title === "شقة" ||
                  selectedPropertyType?.title === "دور") && (
                  <div className="mt-2">
                    <div
                      className="flex justify-between text-sm mt-2"
                      style={{ direction: "rtl" }}
                    >
                      <p className="font-medium text-base text-[#4B5563]">
                        مزايا إضافية:
                      </p>
                    </div>
                    <div
                      className=" flex flex-row flex-wrap gap-8"
                      style={{ direction: "rtl" }}
                    >
                      <CheckFeature
                        title="مكيفة"
                        onChange={(event) =>
                          setAdditional({
                            ...additionalData,
                            ac: event?.target?.checked,
                          })
                        }
                      />
                      <CheckFeature
                        title="مدخل سيارة"
                        onChange={(event) =>
                          setAdditional({
                            ...additionalData,
                            car_entrance: event?.target?.checked,
                          })
                        }
                      />
                      <CheckFeature
                        title="مطبخ راكب"
                        onChange={(event) =>
                          setAdditional({
                            ...additionalData,
                            kitchen: event?.target?.checked,
                          })
                        }
                      />
                      <CheckFeature
                        title="مؤثثة"
                        onChange={(event) =>
                          setAdditional({
                            ...additionalData,
                            furnished: event?.target?.checked,
                          })
                        }
                      />
                    </div>
                  </div>
                )

              )}

              <div className="mb-4" style={{ direction: "rtl" }}>
                <div className="flex gap-2  flex-row mt-5">
                  <AddButton className="cursor-pointer" />
                  <p className="text-sm text-[#3B73B9] font-bold">
                    إضافة عقار اخر
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
              <div className="flex items-center justify-end">
                <p className="text-base font-bold text-[#4B5563]">
                  هل العقار قابل للتجزئة؟
                </p>
              </div>
              <div className="flex flex-row justify-end mt-6 gap-8">
                <RadioInput
                  name="isDivisibleType"
                  onChange={(event) =>
                    setDataSend({
                      ...dataSend,
                      is_divisible:
                        event?.target?.value == "نعم" ? true : false,
                    })
                  }
                  value="نعم"
                  label="نعم"
                />
                <RadioInput
                  name="isDivisibleType"
                  onChange={(event) =>
                    setDataSend({
                      ...dataSend,
                      is_divisible:
                        event?.target?.value == "نعم" ? true : false,
                    })
                  }
                  value="لا"
                  label="لا"
                />
              </div>
              {errors?.is_divisible && (
                <p className="text-xs text-red-600 dark:text-red-500 text-right">
                  {errors?.is_divisible}
                </p>
              )}
            </div>

            <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
              <div className="flex items-center justify-end">
                <p className="text-base font-bold text-[#4B5563]">المرفقات</p>
              </div>



              <ImageAppear images={images} onDelete={onDelete} />
              <div className="flex flex-row justify-end mt-1 gap-8">
                <div className="flex gap-2  flex-row mt-5">
                  <p className="text-sm text-[#3B73B9] font-bold">
                    أضف صورة / صور
                  </p>
                  <AddButton
                    className="cursor-pointer"
                    onClick={() => refImage?.current?.click()}
                  />
                  <input
                    type="file"
                    className="hidden"
                    ref={refImage}
                    accept="image/*"
                    multiple
                    onChange={(event) => {
                      const files = event.target.files;
                      if (files) {
                        const imageFiles = Array.from(files) as File[];
                        setImages(imageFiles);
                      }
                    }}
                  />
                </div>
              </div>
              {errors?.images && (
                <p className="text-xs text-red-600 dark:text-red-500 text-right my-3">
                  {errors?.images}
                </p>
              )}
            </div>
            {dataSend?.property_owner_type_id == 1 && (
              <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
                <div className="flex items-center justify-end">
                  <p className="text-base font-bold text-[#4B5563]">
                    هل تملك رقم معلن؟
                  </p>
                </div>
                <div className="flex flex-row justify-end mt-6 gap-8">
                  <RadioInput
                    name="haveNumber"
                    onChange={() => setHaveNumber(true)}
                    value="نعم"
                    label="نعم"
                  />
                  <RadioInput
                    name="haveNumber"
                    onChange={() => setHaveNumber(false)}
                    value="لا"
                    label="لا"
                  />
                </div>
                {haveNumber && (
                  <div className="mb-4" style={{ direction: "rtl" }}>
                    <label className="block mb-2 font-medium mt-2">
                      رقم الإعلان{" "}
                    </label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="-- الرجاء الادخال --"
                        onChange={(event) =>
                          setMediator({
                            ...mediator,
                            advertisement_number: event?.target?.value,
                          })
                        }
                      />
                    </div>
                    {errors?.advertisement_number && (
                      <p className="text-xs text-red-600 dark:text-red-500 text-right">
                        {errors?.advertisement_number}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
              <div className="flex items-center justify-end gap-2">
                <p className="text-xs text-[#6B7280] font-bold">
                  أوافق على{" "}
                  <span
                    className="text-[#98CC5D]"
                    onClick={() => modalRef.current?.open()}
                  >
                    الشروط
                  </span>{" "}
                  و<span className="text-[#98CC5D]">الأحكام</span> الخاصة بمشروك
                </p>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded-2xl accent-[#3B73B9]"
                  onChange={(event) => setDeal(event?.target?.checked)}
                />
              </div>
              <div className="p-7">
                <Button text="إضافة العقار" onClick={onSubmit} />
              </div>
            </div>
          </div>

          <div>
            <Modal ref={modalRef} size="xl">
              <div className="items-start flex justify-center flex-col p-4">
                {/* <MapLocation/> */}
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
                رقم الطلب: {datarealEstateRequest?.id}
              </p>
            </div>
          </div>
          <div className="w-4/5 mb-28  ">
            <Button text="الذهاب الى طلباتي" />
            <Button
              text="العودة الى الرئيسية"
              className="!text-[#3B73B9] !bg-white !border !border-[#3B73B9] rounded !mt-5"
              onClick={() => {
                router.replace("/");
              }}
            />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default AddYourRealEstate;
