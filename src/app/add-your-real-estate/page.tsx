"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Add, BackButtonOutline } from "@/app/assets/svg";
import { RadioInput } from "../components/shared/radio.component";
import { Button } from "../components/shared/button.component";
import { Modal, ModalRef } from "../components/shared/modal.component";
import ImageAppear from "../components/shared/ImageAppear";
import AccordionComponent from "../components/shared/Accordion.component";
import Image from "next/image";
import { fetchToken } from "@/redux/features/userSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiSubtractFill } from "react-icons/ri";
import NumberRoom from "./components/NumberRoom";
import Footer from "../components/header/Footer2";
import MainHeader from "../components/header/MainHeader";
import { useRouter } from "next/navigation";
import { TextInput } from "../components/shared/text-input.component";
import {
  dataTypeOfRealEstate,
  detailsType,
  detailsMoreType,
  cityDetial,
  districtDetail,
  returnRealState,
  imageInfo,
  DataSendInfo,
} from "@/type/addrealestate";
import CountElement from "./components/CountElemet";
import CheckFeature from "./components/CheckFeature";
import InputAreaPrice from "./components/InputAreaPrice";
import ModelRules from "@/app/components/shared/ModelRules";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getproperityType,
  getproperityTypeMore,
} from "@/redux/features/getProperity";
import Cookie from "js-cookie";
import { getproperityPurposeType } from "@/redux/features/getproperityPurpose";
import { getproperityOwnerType } from "@/redux/features/getProperityOwnerType";
import {
  RealEstateErrrorTypeInter,
  postrealEstateType,
  earthInter,
  removeState,
} from "@/redux/features/postRealEstate";
import { getCity, getDistrict } from "@/redux/features/getCity";
import { validateForm } from "../hooks/validate";
import toast from "react-hot-toast";
import {
  earthSchema,
  partnerSchema,
  departmentOrRowSchema,
  departmentOrRowArchSchema,
  villaOwnSchema,
  departmentWithVillaSchema,
  schemaMain,
  earthDevSchema,
  earthDevSchemaWithoutAdvert,
} from "@/typeSchema/schemaRealestate";
import VillaDetails from "./VillaDetails";
import OnSuccess from "./OnSuccess";
import AddLocation from "../components/add-real-estate-components/AddLocation";
import PropertyLocation from "../components/add-real-estate-components/PropertyLocation";
import { eventAnalistic } from "@/utils/event-analistic";
type Option = {
  id: number;
  title: string;
};
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
  const modalRefRules = useRef<ModalRef>(null);
  const refImage = useRef<HTMLInputElement>(null);
  const [sentYourRequest, setSentYourRequest] = useState<boolean>(false);
  const [dataSend, setDataSend] = useState<DataSendInfo>({
    property_owner_type_id: 0,
    property_purpose_id: 0,
    property_type_id: 0,
    partner_type_id: 0,
    city: "الرياض",
    district: "other",
    address: "",
    area: 0,
    price: 0,
    lat: 24.64,
    long: 46.72,
    is_divisible: false,
  });
  const [errors, setErrors] = useState<RealEstateErrrorTypeInter>();
  const [indexRemove, setIndex] = useState<number | null>();
  const [selectedPropertyType, setSelectedPropertyType] =
    useState<typeSelectedProperty>();
  const handleOptionChange = (option: Option, title: string) => {
    if (title == "صفة مقدم العرض") {
      setDataSend((prev) => ({ ...prev, property_owner_type_id: option?.id }));
    } else if (title == "الغرض من عرض العقار") {
      setDataSend((prev) => ({ ...prev, property_purpose_id: option?.id }));
    } else {
      setDataSend((prev) => ({ ...prev, property_type_id: option?.id }));
      setSelectedPropertyType(option);
    }
    setDataSend((prev) => ({ ...prev, city: "الرياض" }));
  };
  const { token } = useSelector<RootState>((state) => state.register) as {
    token: string;
  };
  const [haveNumber, setHaveNumber] = useState(false);
  const [deal, setdeal] = useState(false);

  const [mediator, setMediator] = useState({
    advertisement_number: "",
    license_number: "",
  });
  const initialVillaData: earthInter[] = Array.from({ length: 3 }, () => ({
    type: "",
    area: 0,
    price: 0,
    rooms_number: 0, // في حالة الفيلا عدد الغرف
    halls_number: 0, // في حالة الفيلا عدد الصالات
    bathrooms_number: 0, // في حالة الفيلا عدد دورات المياه
    kitchens_number: 0, // في حالة الفيلا عدد المطابخ
    pool: false, // مزايا اضافية مسبح
    garden: false, // مزايا اضافية
    servants_room: false, // مزايا اضافية غرفة خدم
    ac: false, // مزايا اضافية مكيفة
    furnished: false, // مزايا اضافية مؤثثة
    kitchen: false, // مزايا اضافية مطبخ راكب
    garage: false,
    car_entrance: false,
    stage: "",
    available_percentage: 0,
    available_price: 0,
  }));
  const [villa, setvilla] = useState<earthInter[]>(initialVillaData);

  const [count, setCount] = useState({
    nums: 1,
  });
  const [DepartmentArch, setDepartmentArch] = useState({
    apartment_number: "", // رقم الاعلان
    apartment_floor: "",
  });

  const [landDetails, setlandDetails] = useState<
    { piece_number: string; area: number; price: number; plan_number: string }[]
  >([]);
  const [departmentArch, setdepartmentArch] = useState({
    age: 0,
    rooms_number: 0,
    halls_number: 0,
    bathrooms_number: 0,
    kitchens_number: 0,
    property_type_details_id: 0,
  });
  const [departmentvilla, setDepartmentvilla] = useState({
    area: 0,
    price: 0,
    rooms_number: 0,
    halls_number: 0,
    bathrooms_number: 0,
    kitchens_number: 0,
    pool: false,
    garden: false,
    servants_room: false,
    ac: false,
    furnished: false,
    kitchen: false,
    garage: false,
    car_entrance: false,
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

  const { data, title, details, titleSection, detailsSection } =
    useSelector<RootState>((state) => state.properityType) as {
      loading: boolean;
      message: string;
      data: dataTypeOfRealEstate;
      title: string;
      details: detailsType[];
      titleSection: string;
      detailsSection: detailsMoreType[];
    };
  const { city, district } = useSelector<RootState>((state) => state.city) as {
    district: districtDetail[] | null;
    city: cityDetial[] | null;
  };
  const { data: dataPurpose } = useSelector<RootState>(
    (state) => state.properityPurpose
  ) as {
    loading: boolean;
    message: string;
    data: detailsType[];
  };
  const villaOne = useMemo(() => {
    return villa.filter((ele) => ele?.type);
  }, [villa]);
  const { data: dataOwnerType } = useSelector<RootState>(
    (state) => state.properityOwnerType
  ) as {
    loading: boolean;
    message: string;
    data: detailsType[];
  };
  const {
    loading: loadingrealEstateRequest,
    message: messagerealEstateRequest,
    data: datarealEstateRequest,
  } = useSelector<RootState>((state) => state.realEstateRequest) as {
    loading: boolean;
    message: string;
    data: returnRealState;
  };
  const dispatch = useDispatch<AppDispatch>();

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setdepartmentArch({
      ...departmentArch,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleDepartmentVillaChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepartmentvilla({
      ...departmentvilla,
      [e.target.name]: Number(e.target.value),
    });
  };
  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/");
  };
  const onSubmit = async () => {
    if (deal) {
      if (token) {
        let validationMain = await validateForm(
          {
            property_owner_type_id: dataSend?.property_owner_type_id, // وسيط عقاري, مطور عقاري, وسيط
            property_purpose_id: dataSend?.property_purpose_id, //بيع, تطوير (شراكة برأس المال أو البنا
            property_type_id: dataSend?.property_type_id,
          },
          schemaMain,
          setErrors
        );
        if (title && details) {
          validationMain =
            validationMain &&
            (await validateForm(
              {
                partner_type_id: dataSend?.partner_type_id,
              },
              partnerSchema,
              setErrors
            ));
        }
        if (
          (dataSend.property_owner_type_id == 2 ||
            dataSend.property_owner_type_id == 3) &&
          dataSend?.property_purpose_id == 1
        ) {
          validationMain =
            validationMain &&
            (await validateForm(
              {
                ...mediator,
              },
              earthDevSchema,
              setErrors
            ));
        }
        if (
          (dataSend.property_owner_type_id == 2 ||
            dataSend.property_owner_type_id == 3) &&
          dataSend?.property_purpose_id != 1
        ) {
          validationMain =
            validationMain &&
            (await validateForm(
              {
                ...mediator,
              },
              earthDevSchemaWithoutAdvert,
              setErrors
            ));
        }
        if (
          selectedPropertyType?.title == "أرض سكنية" ||
          selectedPropertyType?.title == "أرض تجارية" ||
          selectedPropertyType?.title == "أرض سكنية تجارية"
        ) {
          validationMain =
            validationMain &&
            (await validateForm(
              {
                ...dataSend,
                landDetails: landDetails,
                images: images,
              },
              earthSchema,
              setErrors
            ));

          if (validationMain == true) {
            dispatch(
              postrealEstateType({
                ...dataSend,
                landDetails: landDetails,
                ...mediator,
                images,
              })
            );
          }
        } else if (departmentArch.property_type_details_id == 5) {
          validationMain =
            validationMain &&
            (await validateForm(
              {
                ...dataSend,
                ...departmentArch,
                ...DepartmentArch,
                images: images,
                ac: additionalData?.ac, // مزايا اضافية مكيفة
                furnished: additionalData?.furnished, // مزايا اضافية مؤثثة
                kitchen: additionalData?.kitchen,

                car_entrance: additionalData?.car_entrance,
              },
              departmentOrRowArchSchema,
              setErrors
            ));

          if (validationMain == true) {
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
          validationMain =
            validationMain &&
            (await validateForm(
              {
                ...dataSend,
                ...departmentArch,
                images: images,
                ac: additionalData?.ac, // مزايا اضافية مكيفة
                furnished: additionalData?.furnished, // مزايا اضافية مؤثثة
                kitchen: additionalData?.kitchen,
                car_entrance: additionalData?.car_entrance,
              },
              departmentOrRowSchema,
              setErrors
            ));

          if (validationMain == true) {
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
          departmentArch?.property_type_details_id == 4
        ) {
          validationMain =
            validationMain &&
            (await validateForm(
              {
                ...dataSend,
                property_type_details_id:
                  departmentArch?.property_type_details_id,
                age: departmentArch?.age,
                details: villaOne,
                images: images,
              },
              villaOwnSchema,
              setErrors
            ));

          if (validationMain == true) {
            dispatch(
              postrealEstateType({
                ...dataSend,
                property_type_details_id:
                  departmentArch?.property_type_details_id,
                age: departmentArch?.age,
                details: villaOne,
                ...mediator,
                images,
              })
            );
          }
        } else if (
          selectedPropertyType?.title === "فيلا" &&
          departmentArch?.property_type_details_id == 3
        ) {
          validationMain =
            validationMain &&
            (await validateForm(
              {
                ...dataSend,
                ...departmentArch,
                pool: additionalData?.pool, // مزايا اضافية مكيفة
                furnished: additionalData?.furnished, // مزايا اضافية مؤثثة
                servants_room: additionalData?.servants_room,
                garage: additionalData?.garage,
                images: images,
                apartment: { ...departmentvilla },
              },
              departmentWithVillaSchema,
              setErrors
            ));
          if (validationMain == true) {
            dispatch(
              postrealEstateType({
                ...dataSend,
                ...departmentArch,
                pool: additionalData?.pool, // مزايا اضافية مكيفة
                furnished: additionalData?.furnished, // مزايا اضافية مؤثثة
                servants_room: additionalData?.servants_room,
                garage: additionalData?.garage,
                apartment: departmentvilla,
                ...mediator,
                images,
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

  const onDelete = (index: imageInfo) => {
    setImages(images?.filter((ele) => ele?.name != index?.name));
  };

  useEffect(() => {
    dispatch(getproperityType({ num: 1 }));
    dispatch(getproperityPurposeType());
    dispatch(getproperityOwnerType());
    dispatch(getCity());
    dispatch(getproperityTypeMore({ num: 1, type: "offer" }));
    return () => {
      dispatch(removeState());
    };
  }, [dispatch]);
  useEffect(() => {
    if (dataSend?.city) {
      dispatch(getDistrict({ name: dataSend?.city }));
    }
  }, [dataSend?.city, dispatch]);
  useEffect(() => {
    dispatch(getproperityType({ num: dataSend?.property_purpose_id || 1 }));
  }, [dataSend?.property_purpose_id, dispatch]);
  useEffect(() => {
    
    dispatch(
      getproperityPurposeType({
        property_owner_type_id: dataSend?.property_owner_type_id,
      })
    );
  }, [dataSend?.property_owner_type_id, dispatch]);
  useEffect(() => {
    dispatch(
      getproperityTypeMore({
        num: dataSend?.property_type_id || 1,
        type: "offer",
      })
    );
  }, [dataSend?.property_type_id, dispatch]);
  useEffect(() => {
    dispatch(fetchToken());
  }, [dispatch]);

  useEffect(() => {
    if (messagerealEstateRequest && Boolean(datarealEstateRequest) == true) {
      eventAnalistic({
        action: "add_offer",
        category: "offer",
        label: "Item added to offer",
        value: "add",
      });
      toast.success(messagerealEstateRequest);
      setSentYourRequest(true);
    } else if (
      messagerealEstateRequest &&
      Boolean(datarealEstateRequest) == false
    ) {
      toast.error(messagerealEstateRequest);
    }
  }, [datarealEstateRequest, messagerealEstateRequest]);
  useEffect(() => {
    return () => {
      setSentYourRequest(false);
    };
  }, []);
  useEffect(() => {
    setlandDetails((prev) =>
      prev.length < count.nums
        ? [
            ...prev,
            {
              piece_number: "", // في حالة اختيار ارض (رقم القطعة)
              plan_number: "",
              area: 0,
              price: 0,
            },
          ]
        : prev.filter((ele, index) => index != indexRemove)
    );
  }, [count.nums, indexRemove]);

  return (
    <>
      {!sentYourRequest ? (
        <form className="flex flex-col items-center min-h-screen h-full w-full bg-[url('/background-cover.png')] bg-cover">
          <MainHeader />
          <div
            className="flex items-center justify-center w-full"
            style={{ direction: "rtl" }}
          >
            <div className="justify-start">
              <button onClick={handleBack}>
                <BackButtonOutline />
              </button>
            </div>
            <div className="flex flex-1  items-center justify-center">
              <p className="flex items-center justify-center text-[#36343B] font-bold text-xl">
                اضف عقارك
              </p>
            </div>
          </div>
          <div className="p-4 w-full flex gap-4 flex-col">
            <div>
              {dataa.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4"
                >
                  <div className="flex items-end justify-end flex-col gap-2">
                    <p className="text-base font-bold text-[#4B5563]">
                      {item.tattle}
                    </p>
                    {item.tattle == "نوع العقار" &&
                      errors?.property_type_id && (
                        <p className="text-xs text-red-600 dark:text-red-500 text-right">
                          {errors?.property_type_id}
                        </p>
                      )}
                    {item.tattle == "صفة مقدم العرض" &&
                      errors?.property_owner_type_id && (
                        <p className="text-xs text-red-600 dark:text-red-500 text-right">
                          {errors?.property_owner_type_id}
                        </p>
                      )}
                    {item.tattle == "الغرض من عرض العقار" &&
                      errors?.property_purpose_id && (
                        <p className="text-xs text-red-600 dark:text-red-500 text-right">
                          {errors?.property_purpose_id}
                        </p>
                      )}
                  </div>
                  <div className="flex flex-row-reverse flex-wrap justify-start mt-6 gap-4">
                    {item.tattle == "نوع العقار"
                      ? data?.data?.map(
                          (option: { id: number; title: string }) => (
                            <RadioInput
                              name={`realstateType`}
                              onChange={() =>
                                handleOptionChange(option, item.tattle)
                              }
                              value={option?.title}
                              key={option?.id}
                              label={option?.title}
                            />
                          )
                        )
                      : item.tattle == "صفة مقدم العرض"
                      ? dataOwnerType?.map(
                          (option: { id: number; title: string }) => (
                            <RadioInput
                              name={item.tattle}
                              onChange={() =>
                                handleOptionChange(option, item.tattle)
                              }
                              value={option?.title}
                              key={option?.id}
                              label={option?.title}
                            />
                          )
                        )
                      : dataPurpose?.map(
                          (option: { id: number; title: string }) => (
                            <RadioInput
                              key={option?.id}
                              name={item.tattle}
                              onChange={() =>
                                handleOptionChange(option, item.tattle)
                              }
                              value={option?.title}
                              label={option?.title}
                            />
                          )
                        )}
                    {title &&
                      details &&
                      item.tattle == "الغرض من عرض العقار" && (
                        <div className=" w-full mb-2 items-start justify-start ">
                          <div className="flex items-center justify-end">
                            <p
                              className="text-base font-bold text-[#4B5563] self-end"
                              style={{ direction: "rtl" }}
                            >
                              {title}
                            </p>
                          </div>
                          <div className="flex flex-row flex-wrap justify-end mt-2 gap-8 items-end">
                            <div className="mb-2 flex-row-reverse flex">
                              {details?.map(
                                (ele: { id: number; title: string }) => (
                                  <RadioInput
                                    key={ele?.id}
                                    name="partner_type_id"
                                    onChange={(event) =>
                                      setDataSend({
                                        ...dataSend,
                                        partner_type_id: Number(
                                          event?.target?.value
                                        ),
                                      })
                                    }
                                    value={ele?.id}
                                    label={ele?.title}
                                  />
                                )
                              )}
                            </div>
                          </div>
                          {errors?.partner_type_id && (
                            <p className="text-xs text-red-600 dark:text-red-500 text-right">
                              {String(errors?.partner_type_id)}
                            </p>
                          )}
                        </div>
                      )}
                    <div className=" w-full">
                      {(dataSend?.property_owner_type_id == 2 ||
                        dataSend?.property_owner_type_id == 3) &&
                        item.tattle == "الغرض من عرض العقار" && (
                          <div className="bg-white rounded-lg border border-[#E5E7EB] p-2">
                            <div className="flex items-end gap-2 justify-end flex-col mt-2">
                              <p className="text-base text-[#4B5563] font-medium">
                                رقم رخصة فال{" "}
                              </p>
                              <TextInput
                                inputProps={{
                                  placeholder: "-- الرجاء الادخال --",
                                }}
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
                            {dataSend?.property_purpose_id == 1 && (
                              <div className="flex items-end gap-2 justify-end flex-col mt-2">
                                <p className="text-base text-[#4B5563] font-medium">
                                  رقم ترخيص الاعلان{" "}
                                </p>
                                <TextInput
                                  inputProps={{
                                    placeholder: "-- الرجاء الادخال --",
                                  }}
                                  onChange={(event) =>
                                    setMediator({
                                      ...mediator,
                                      advertisement_number:
                                        event?.target?.value,
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
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {titleSection &&
              detailsSection &&
              dataSend?.property_purpose_id == 1 && (
                <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-2 items-start justify-start p-4">
                  <div className="flex items-center justify-end">
                    <p className="text-base font-bold text-[#4B5563]">
                      {titleSection}
                    </p>
                  </div>
                  <div className="flex flex-row flex-wrap justify-end mt-6 gap-8 items-end">
                    <div className="mb-2 flex-row-reverse flex">
                      {detailsSection?.map(
                        (ele: { id: number; title: string }) => (
                          <RadioInput
                            key={ele?.id}
                            name="property_type_details_id"
                            onChange={(event) =>
                              setdepartmentArch({
                                ...departmentArch,
                                property_type_details_id: Number(
                                  event?.target?.value
                                ),
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
              )}

            <div>
              <PropertyLocation
                dataSend={dataSend}
                setDataSend={setDataSend}
                city={city}
                district={district}
                errors={errors}
                modalRef={modalRef}
              />
            </div>

            <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
              <div className="flex items-center justify-end">
                <p className="text-base font-bold text-[#4B5563]">
                  تفاصيل وسعر العقار{" "}
                </p>
              </div>
              <div className="mb-4" style={{ direction: "rtl" }}>
                {departmentArch?.property_type_details_id == 8 && (
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
                      {errors?.apartment_number && (
                        <p className="text-xs text-red-600 dark:text-red-500 text-right">
                          {errors?.apartment_number}
                        </p>
                      )}
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
                      {errors?.apartment_floor && (
                        <p className="text-xs text-red-600 dark:text-red-500 text-right">
                          {errors?.apartment_floor}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {(selectedPropertyType?.title == "أرض سكنية" ||
                  selectedPropertyType?.title == "أرض تجارية" ||
                  selectedPropertyType?.title == "أرض سكنية تجارية") &&
                  landDetails?.map((ele, index) => (
                    <div key={index}>
                      <div className="flex items-start gap-2 justify-end flex-col mt-5">
                        <p className="text-base text-[#4B5563] font-medium">
                          رقم المخطط{" "}
                        </p>
                        <TextInput
                          inputProps={{ placeholder: "-- الرجاء الادخال --" }}
                          onChange={(event) =>
                            setlandDetails((prevs) =>
                              prevs.map((ele, i) =>
                                i == index
                                  ? {
                                      ...ele,
                                      piece_number: event?.target?.value,
                                    }
                                  : ele
                              )
                            )
                          }
                          value={ele?.piece_number}
                        />
                        {errors &&
                          errors[`landDetails[${index}].plan_number`] && (
                            <p className="text-xs text-red-600 dark:text-red-500 text-right">
                              {errors[`landDetails[${index}].plan_number`]}
                            </p>
                          )}
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 font-medium mt-2">
                          رقم القطعة{" "}
                        </label>
                        <div className="flex items-center">
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="-- الرجاء الادخال --"
                            value={ele?.plan_number}
                            onChange={(event) =>
                              setlandDetails((prevs) =>
                                prevs.map((ele, i) =>
                                  i == index
                                    ? {
                                        ...ele,
                                        plan_number: event?.target?.value,
                                      }
                                    : ele
                                )
                              )
                            }
                          />
                        </div>

                        {errors &&
                          errors[`landDetails[${index}].piece_number`] && (
                            <p className="text-xs text-red-600 dark:text-red-500 text-right">
                              {errors[`landDetails[${index}].piece_number`]}
                            </p>
                          )}
                      </div>
                      <InputAreaPrice
                        title="المساحة"
                        value={ele?.area > 0 ? ele?.area : ""}
                        onChange={(event) =>
                          setlandDetails((prevs) =>
                            prevs.map((ele, i) =>
                              i == index
                                ? {
                                    ...ele,
                                    area: Number(event?.target?.value),
                                  }
                                : ele
                            )
                          )
                        }
                        errors={errors && errors[`landDetails[${index}].area`]}
                        measurement="متر"
                      />
                      <InputAreaPrice
                        title=" السعر للمتر المربع"
                        value={ele?.price > 0 ? ele?.price : ""}
                        onChange={(event) =>
                          setlandDetails((prevs) =>
                            prevs.map((ele, i) =>
                              i == index
                                ? {
                                    ...ele,
                                    price: Number(event?.target?.value),
                                  }
                                : ele
                            )
                          )
                        }
                        errors={errors && errors[`landDetails[${index}].price`]}
                        measurement="ريال"
                        desc=" (بدون ضريبة التصرفات العقارية و السعي) "
                      />
                      {index > 0 && (
                        <>
                          <div
                            onClick={() => {
                              setIndex(index);
                              setCount((prev) => ({ nums: prev?.nums - 1 }));
                            }}
                            className="cursor-pointer bg-[#3B73B9] p-1 flex justify-center"
                          >
                            <RiSubtractFill className="text-white" />
                          </div>
                        </>
                      )}
                    </div>
                  ))}

                {(selectedPropertyType?.title == "شقة" ||
                  selectedPropertyType?.title == "دور") && (
                  <>
                    <InputAreaPrice
                      title="المساحة"
                      onChange={(event) =>
                        setDataSend({
                          ...dataSend,
                          area: Number(event?.target?.value),
                        })
                      }
                      value={dataSend?.area > 0 ? dataSend?.area : ""}
                      errors={errors?.area}
                      measurement="متر"
                    />
                    <InputAreaPrice
                      title=" السعر"
                      onChange={(event) =>
                        setDataSend({
                          ...dataSend,
                          price: Number(event?.target?.value),
                        })
                      }
                      value={dataSend?.price > 0 ? dataSend?.price : ""}
                      errors={errors?.price}
                      measurement="ريال"
                      desc=" (بدون ضريبة التصرفات العقارية و السعي) "
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
                    firstNumber={
                      Number(departmentArch?.age) > 1 ? "سنين" : "سنة"
                    }
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
                      firstNumber={
                        Number(departmentArch?.age) > 1 ? "سنين" : "سنة"
                      }
                      secondNumber={"+10 سنين"}
                      max={10}
                    />
                  </>
                )
              )}
              {selectedPropertyType?.title === "فيلا" &&
                departmentArch?.property_type_details_id == 4 && (
                  <>
                    {floorsVilla?.map((floor, index) => (
                      <AccordionComponent
                        title={floor?.name}
                        key={index}
                        floors={floorsVilla}
                        onChange={(e) =>
                          setvilla((prev) =>
                            prev.map((ele, i) =>
                              i == index
                                ? {
                                    ...ele,
                                    type: e.target.checked
                                      ? e.target.value
                                      : "",
                                  }
                                : ele
                            )
                          )
                        }
                        value={floor?.name}
                        error={errors && errors[`details[${index}].type`]}
                      >
                        <VillaDetails
                          villa={villa}
                          index={index}
                          setvilla={setvilla}
                          villaOne={villaOne}
                          errors={errors}
                        />
                      </AccordionComponent>
                    ))}
                  </>
                )}
              {errors?.details && (
                <p className="text-xs text-red-600 dark:text-red-500 text-right">
                  {String(errors?.details)}
                </p>
              )}
              {selectedPropertyType?.title === "فيلا" &&
                departmentArch?.property_type_details_id == 3 && (
                  <>
                    <div className="mt-2">
                      <div
                        className="flex justify-between text-sm mt-2"
                        style={{ direction: "rtl" }}
                      >
                        <p className="font-bold text-base text-black ">فيلا</p>
                      </div>
                      <div
                        className=" flex flex-col flex-wrap gap-2"
                        style={{ direction: "rtl" }}
                      >
                        <InputAreaPrice
                          title="المساحة"
                          onChange={(event) =>
                            setDataSend({
                              ...dataSend,
                              area: Number(event?.target?.value),
                            })
                          }
                          value={dataSend?.area > 0 ? dataSend?.area : ""}
                          errors={errors?.area}
                          measurement="متر"
                        />
                        <InputAreaPrice
                          title=" السعر "
                          onChange={(event) =>
                            setDataSend({
                              ...dataSend,
                              price: Number(event?.target?.value),
                            })
                          }
                          value={dataSend?.price > 0 ? dataSend?.price : ""}
                          errors={errors?.price}
                          measurement="ريال"
                          desc=" (بدون ضريبة التصرفات العقارية و السعي) "
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
                        <hr className="border-gray-200 dark:border-white my-2" />
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
                      </div>
                      <div
                        className="flex justify-between text-sm mt-2"
                        style={{ direction: "rtl" }}
                      >
                        <p className="font-bold text-base text-black ">شقة</p>
                      </div>
                      <div
                        className=" flex flex-col flex-wrap gap-2"
                        style={{ direction: "rtl" }}
                      >
                        <InputAreaPrice
                          title="المساحة"
                          onChange={(event) =>
                            setDepartmentvilla({
                              ...departmentvilla,
                              area: Number(event?.target?.value),
                            })
                          }
                          value={
                            departmentvilla?.area > 0
                              ? departmentvilla?.area
                              : ""
                          }
                          errors={errors && errors["apartment.area"]}
                          measurement="متر"
                        />
                        <InputAreaPrice
                          title=" السعر"
                          onChange={(event) =>
                            setDepartmentvilla({
                              ...departmentvilla,
                              price: Number(event?.target?.value),
                            })
                          }
                          value={
                            departmentvilla?.price > 0
                              ? departmentvilla?.price
                              : ""
                          }
                          errors={errors && errors["apartment.price"]}
                          measurement="ريال"
                          desc=" (بدون ضريبة التصرفات العقارية و السعي) "
                        />
                        <NumberRoom
                          errors={errors && errors["apartment.rooms_number"]}
                          value={departmentvilla?.rooms_number}
                          onChange={handleDepartmentVillaChange}
                          name="rooms_number"
                          title={"عدد الغرف"}
                          firstNumber={"غرفة"}
                          secondNumber={"+10 غرف"}
                          max={10}
                        />
                        <NumberRoom
                          errors={errors && errors["apartment.halls_number"]}
                          value={departmentvilla?.halls_number}
                          onChange={handleDepartmentVillaChange}
                          name="halls_number"
                          title={"عدد الصالات"}
                          firstNumber={"صالة"}
                          secondNumber={"3+ صالات "}
                          max={3}
                        />
                        <NumberRoom
                          errors={
                            errors && errors["apartment.bathrooms_number"]
                          }
                          value={departmentvilla?.bathrooms_number}
                          onChange={handleDepartmentVillaChange}
                          name="bathrooms_number"
                          title={"عدد دورات المياه"}
                          firstNumber={"دورة مياه"}
                          secondNumber={"3+ دورة مياه "}
                          max={3}
                        />
                        <NumberRoom
                          errors={errors && errors["apartment.kitchens_number"]}
                          value={departmentvilla?.kitchens_number}
                          onChange={handleDepartmentVillaChange}
                          name="kitchens_number"
                          title={" عدد المطابخ"}
                          firstNumber={"مطبخ"}
                          secondNumber={"3+ مطابخ"}
                          max={3}
                        />
                        <hr className="border-gray-200 dark:border-white my-2" />
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
                                setDepartmentvilla({
                                  ...departmentvilla,
                                  pool: event?.target?.checked,
                                })
                              }
                            />
                            <CheckFeature
                              title="كراج للسيارات"
                              onChange={(event) =>
                                setDepartmentvilla({
                                  ...departmentvilla,
                                  garage: event?.target?.checked,
                                })
                              }
                            />
                            <CheckFeature
                              title="غرفة خدم"
                              onChange={(event) =>
                                setDepartmentvilla({
                                  ...departmentvilla,
                                  servants_room: event?.target?.checked,
                                })
                              }
                            />
                            <CheckFeature
                              title="مؤثثة"
                              onChange={(event) =>
                                setDepartmentvilla({
                                  ...departmentvilla,
                                  furnished: event?.target?.checked,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              {selectedPropertyType?.title === "فيلا" &&
              departmentArch?.property_type_details_id == 3 ? (
                <></>
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
              {(selectedPropertyType?.title == "أرض سكنية" ||
                selectedPropertyType?.title == "أرض تجارية" ||
                selectedPropertyType?.title == "أرض سكنية تجارية") && (
                <div className="mb-4" style={{ direction: "rtl" }}>
                  <div className="flex gap-2  flex-row mt-5">
                    <div
                      onClick={() => {
                        setCount((prev) => ({ nums: prev?.nums + 1 }));
                      }}
                      className="cursor-pointer bg-[#3B73B9]"
                    >
                      <Image src={Add} width={21} height={21} alt={"add"} />
                    </div>

                    <p className="text-sm text-[#3B73B9] font-bold">
                      إضافة عقار اخر
                    </p>
                  </div>
                </div>
              )}
            </div>
            {(selectedPropertyType?.title == "أرض سكنية" ||
              selectedPropertyType?.title == "أرض تجارية" ||
              selectedPropertyType?.title == "أرض سكنية تجارية") && (
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
                    checked={dataSend?.is_divisible == true}
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
                    checked={dataSend?.is_divisible == false}
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
            )}
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

                  <div
                    onClick={() => refImage.current?.click()}
                    className="cursor-pointer bg-[#3B73B9]"
                  >
                    <Image src={Add} width={21} height={21} alt={"add"} />
                  </div>
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
                    checked={haveNumber == true}
                    label="نعم"
                  />
                  <RadioInput
                    name="haveNumber"
                    onChange={() => setHaveNumber(false)}
                    value="لا"
                    checked={haveNumber == false}
                    label="لا"
                  />
                </div>
                {haveNumber && (
                  <div className="mb-4" style={{ direction: "rtl" }}>
                    <label className="block mb-2 font-medium mt-2">
                      رقم ترخيص الإعلان{" "}
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
                  <button
                    className="text-[#98CC5D]"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      modalRefRules?.current?.open();
                    }}
                  >
                    الشروط
                  </button>{" "}
                  و
                  <button
                    className="text-[#98CC5D]"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      modalRefRules?.current?.open();
                    }}
                  >
                    الأحكام
                  </button>{" "}
                  الخاصة بمشروك
                </p>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded-2xl accent-[#3B73B9]"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setdeal(e.target.checked)
                  }
                  checked={deal}
                />
              </div>
              <div className="p-7">
                {loadingrealEstateRequest ? (
                  <button
                    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#3B73B9] border border-transparent rounded-md group  focus:outline-none focus:ring-2 focus:ring-offset-2 "
                    disabled={loadingrealEstateRequest}
                  >
                    <AiOutlineLoading3Quarters className="rotate-90 text-gray-500" />
                  </button>
                ) : (
                  <Button text="إضافة العقار" onClick={onSubmit} />
                )}
              </div>
            </div>
          </div>

          <div>
            <ModelRules
              refModel={modalRefRules}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setdeal(e.target.checked)
              }
              deal={deal}
            />
            <Modal ref={modalRef} size="xl">
              <>
                <AddLocation
                  dataSend={{
                    lat: dataSend.lat,
                    long: dataSend.long,
                    address: dataSend.address,
                  }}
                  setDataSend={(updatedLocation) =>
                    setDataSend((prev) => ({ ...prev, ...updatedLocation }))
                  }
                  modalRef={modalRef}
                />
              </>
            </Modal>
          </div>

          <footer className="w-full bg-white p-5">
            <Footer />
          </footer>
        </form>
      ) : (
        <>
          <OnSuccess datarealEstateRequest={datarealEstateRequest} />
        </>
      )}
    </>
  );
};

export default AddYourRealEstate;
