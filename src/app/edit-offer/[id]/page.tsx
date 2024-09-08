"use client";
import MainHeader from "@/app/components/header/MainHeader";
import { BackButtonOutline, Add } from "@/app/assets/svg";
import { useRouter, useParams } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/app/components/shared/button.component";
import { RadioInput } from "@/app/components/shared/radio.component";
import { TextInput } from "@/app/components/shared/text-input.component";
import { cites, cities } from "@/typeSchema/schema";
import ImageAppear from "@/app/components/shared/ImageAppear";
import CountElement from "@/app/add-your-real-estate/components/CountElemet";
import CheckFeature from "@/app/add-your-real-estate/components/CheckFeature";
import toast from "react-hot-toast";
import InputAreaPrice from "@/app/add-your-real-estate/components/InputAreaPrice";
import NumberRoom from "@/app/add-your-real-estate/components/NumberRoom";
import AccordionComponent from "@/app/components/shared/Accordion.component";
import {
  putDetailsType,
  putLandDetailsType,
  putLocation,
  removeStateEdit,
  RealEstateTypeInter,
  imageDeleteRequest,
  imageUpdateRequest,
} from "@/redux/features/postRealEstate";
import Image from "next/image";
import { getCity, getDistrict } from "@/redux/features/getCity";
import { FaEdit } from "react-icons/fa";
import { compare } from "@/app/hooks/compare";
import { CiLocationOn } from "react-icons/ci";
import { AddButton, CloseIconSmall, InfoOutLine } from "@/app/assets/svg";
import { earthInter } from "@/redux/features/postRealEstate";
import {
  getproperityType,
  getproperityTypeMore,
} from "@/redux/features/getProperity";
import { getproperityPurposeType } from "@/redux/features/getproperityPurpose";
import { getproperityOwnerType } from "@/redux/features/getProperityOwnerType";
import { useMemo, useEffect, useState, useRef } from "react";
import { Modal, ModalRef } from "@/app/components/shared/modal.component";
import MapLocation from "@/app/add-your-real-estate/components/MapLocation";
import { getRequestByid, dataReturn } from "@/redux/features/getRequest";
import { properityInfo } from "@/redux/features/postRequest";
const EditOffer = () => {
  let router = useRouter();
  const params = useParams();
  let refImage = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[] | undefined>([]);
  const [Links, setLinks] = useState<string[] | undefined>([]);

  const modalRef = useRef<ModalRef>(null);
  const checkRef = useRef<ModalRef>(null);
  const { id } = params;
  const dispatch = useDispatch<AppDispatch>();
  let { data: dataById, selectData } = useSelector<RootState>(
    (state) => state.getRequest
  ) as {
    loading: boolean;
    message: string;
    data: dataReturn[];
    selectData: any;
  };
  let {
    dataPut,
    messagePut,
    dataPutDetail,
    messagePutLocat,
    dataPutLocat,
    messagePutDetail,
  } = useSelector<RootState>((state) => state.realEstateRequest) as {
    dataPut: any;
    messagePut: string;
    messagePutLocat: string;
    dataPutLocat: any;
    dataPutDetail: any;
    messagePutDetail: string;
  };
  let { city, district } = useSelector<RootState>((state) => state.city) as {
    district: any;
    city: any;
  };
  const [deal, setDeal] = useState(false);
  const [dataCom, setData] = useState<RealEstateTypeInter>();
  const [parent, setParent] = useState({});
  const [count, setCount] = useState({
    nums: 1,
  });
  let { data, title, details, titleSection, detailsSection } =
    useSelector<RootState>((state) => state.properityType) as {
      loading: boolean;
      message: string;
      data: any;
      title: string;
      details: any;
      titleSection: string;
      detailsSection: any;
    };
  let { data: dataPurpose } = useSelector<RootState>(
    (state) => state.properityPurpose
  ) as {
    loading: boolean;
    message: string;
    data: any;
  };
  let { data: dataOwnerType } = useSelector<RootState>(
    (state) => state.properityOwnerType
  ) as {
    loading: boolean;
    message: string;
    data: any;
  };
  const dataReal = useMemo(() => {
    return [
      {
        id: 1,
        title: "صفة مقدم العرض",
        english: "property_owner_type_id",
        option: dataOwnerType?.map((ele: { id: number; title: string }) => ele),
      },
      {
        id: 2,
        title: "الغرض من عرض العقار",
        english: "property_purpose_id",
        option: dataPurpose?.map((ele: { id: number; title: string }) => ele),
      },
      {
        id: 3,
        title: "نوع العقار",
        english: "property_type_id",
        option: data?.data?.map((ele: { id: number; title: string }) => ele),
      },
    ];
  }, [dataOwnerType, dataPurpose, data]);
  const onDelete = (index: any) => {
    setImages(images?.filter((ele, ind) => ele?.name != index?.name));
    if (index?.id) {
      dispatch(imageDeleteRequest({ id: index?.id }));
    }
  };
  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/my-offer");
  };
  const handleOptionChange = (option: any, title: string) => {
    if (title == "صفة مقدم العرض") {
      setData({ ...dataCom, property_owner_type_id: option?.id });
    } else if (title == "الغرض من عرض العقار") {
      setData({ ...dataCom, property_purpose_id: option?.id });
    } else {
      setData({ ...dataCom, property_type_id: option?.id });
    }
    // setSelectedPropertyType(option);
  };
  useEffect(() => {
    dispatch(getproperityType({ num: 1 }));
    dispatch(getproperityPurposeType());
    dispatch(getproperityOwnerType());
    dispatch(getproperityTypeMore({ num: 1, type: "offer" }));
    return () => {
      //  dispatch(removeState())
    };
  }, [dispatch]);
  useEffect(() => {
    if (id) {
      dispatch(getRequestByid({ id: Number(id) }));
    }
  }, [id, dispatch]);

  // useEffect(() => {
  //   setlandDetails((prev) =>
  //     [
  //       ...prev,
  //       {
  //         piece_number: "", // في حالة اختيار ارض (رقم القطعة)
  //         plan_number: "",
  //         area: 0,
  //         price: 0,
  //       },
  //     ]
  //   );
  // }, [count.nums]);
  const onSubmit = async () => {
    const datasend = {
      property_id: Number(id),
      city: dataCom?.propertyLocation?.city,
      district: [dataCom?.propertyLocation?.district],
      address: dataCom?.propertyLocation?.address,
      lat: dataCom?.propertyLocation?.lat,
      long: dataCom?.propertyLocation?.long,
    } as properityInfo;
    dispatch(
      putLocation({
        ...datasend,
      })
    );
    if (images && images?.length > 0 && Array.isArray(images)) {
      let newImages = images.filter((item) => item instanceof File);
      newImages.map((image: File) =>
        dispatch(imageUpdateRequest({ id: dataCom?.id, images: image }))
      );
    }
    if (dataCom?.details && dataCom?.details?.length > 0) {
      dataCom?.details?.map((detail: any) => {
        dispatch(
          putDetailsType({
            age: dataCom?.age,
            area: detail?.area,
            price: detail?.price,
            rooms_number: detail?.rooms_number,
            halls_number: detail?.halls_number,
            bathrooms_number: detail?.bathrooms_number,
            kitchens_number: detail?.kitchens_number,
            pool: detail?.amenities?.pool,
            garden: detail?.amenities?.garden,
            servants_room: detail?.amenities?.servants_room,
            ac: detail?.amenities?.ac,
            furnished: detail?.amenities?.furnished,
            car_entrance: detail?.amenities?.car_entrance,
            garage: detail?.amenities?.garage,
            kitchen: detail?.amenities?.kitchen,
            details_id: detail?.id,
          })
        );
      });
    } else {
      dataCom?.landDetails?.map((detail: any) =>
        dispatch(
          putLandDetailsType({
            area: detail?.area,
            price: detail?.price,
            piece_number: detail?.piece_number,
            plan_number: detail?.plan_number,
            // status: dataCom?.status, /// مشاع او حر
            land_details_id: detail?.id,
          })
        )
      );
    }
  };

  useEffect(() => {
    setData({ ...selectData });
    if (selectData?.propertyMedia?.length > 0) {
      setImages(selectData?.propertyMedia);
    }
  }, [selectData]);

  useEffect(() => {
    if (!(titleSection && detailsSection)) {
      dispatch(
        getproperityTypeMore({
          num: dataCom?.property_type_id || 1,
          type: "offer",
        })
      );
    }
  }, [titleSection, detailsSection, dispatch, dataCom?.property_type_id]);
  useEffect(() => {
    if (dataCom?.property_purpose_id == 2) {
      if (!(title && details)) {
        dispatch(getproperityType({ num: dataCom?.property_purpose_id || 1 }));
      }
    }
  }, [title, details, dataCom?.property_purpose_id, dispatch]);
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
  }, [
    dataPut,
    messagePut,
    dataPutLocat,
    messagePutLocat,
    dataPutDetail,
    messagePutDetail,
    router,
  ]);
  useEffect(() => {
    dispatch(getCity());
  }, [dispatch]);
  useEffect(() => {
    if (dataCom?.propertyLocation?.city) {
      dispatch(getDistrict({ name: dataCom?.propertyLocation?.city }));
    }
  }, [dataCom?.propertyLocation?.city, dispatch]);
  useEffect(() => {
    return () => {
      dispatch(removeStateEdit());
    };
  }, [dispatch]);
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
      <hr className="border-gray-200 dark:border-white my-2" />
      <div className="bg-white  w-full mb-4 items-start justify-start  mt-4">
        <div className="p-2 w-full flex gap-4 flex-col">
          <div>
            {dataReal?.map(
              (item: {
                title: string;
                english: string;
                id: number;
                option: any;
              }) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4"
                >
                  <div className="flex items-end justify-end flex-col gap-2">
                    <p className="text-base font-bold text-[#4B5563]">
                      {item.title}
                    </p>
                  </div>
                  <div className="flex flex-row-reverse flex-wrap justify-start mt-6 gap-2">
                    {item?.option?.map((ele: any, index: number) => (
                      <RadioInput
                        name={item.english}
                        onChange={() => handleOptionChange(ele, item.title)}
                        value={ele?.title}
                        checked={
                          dataCom
                            ? ele?.id ==
                              dataCom[item?.english as keyof typeof dataCom]
                            : false
                        }
                        key={ele?.id}
                        label={ele?.title}
                        disabled={true}
                      />
                    ))}
                    {title &&
                      details &&
                      item.title == "الغرض من عرض العقار" && (
                        <div className=" w-full  items-start justify-start ">
                          <div className="flex items-center justify-end">
                            <p className="text-base font-bold text-[#4B5563] self-end">
                              {title}
                            </p>
                          </div>
                          <div className="flex flex-row flex-wrap justify-end mt-2 gap-8 items-end">
                            <div className=" flex-row-reverse flex">
                              {details?.map(
                                (ele: { id: number; title: string }) => (
                                  <RadioInput
                                    key={ele?.id}
                                    name="partner_type_id"
                                    disabled={true}
                                    onChange={(event) =>
                                      setData({
                                        ...dataCom,
                                        partner_type_id: Number(
                                          event?.target?.value
                                        ),
                                      })
                                    }
                                    value={ele?.id}
                                    checked={
                                      dataCom?.partner_type_id == ele?.id
                                    }
                                    label={ele?.title}
                                  />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                  {(dataCom?.property_owner_type_id == 2 ||
                    dataCom?.property_owner_type_id == 3) &&
                    item.title == "صفة مقدم العرض" && (
                      <>
                        <div className="flex items-end gap-2 justify-end flex-col ">
                          <p className="text-base text-[#4B5563] font-medium">
                            رقم رخصة فال{" "}
                          </p>
                          <TextInput
                            inputProps={{ placeholder: "-- الرجاء الادخال --" }}
                            onChange={(event) =>
                              setData({
                                ...dataCom,
                                license_number: event?.target?.value,
                              })
                            }
                            disabled={true}
                            value={dataCom?.license_number}
                          />
                        </div>
                        <div className="flex items-end gap-2 justify-end flex-col mt-2">
                          <p className="text-base text-[#4B5563] font-medium">
                            رقم الاعلان{" "}
                          </p>
                          <TextInput
                            inputProps={{ placeholder: "-- الرجاء الادخال --" }}
                            onChange={(event) =>
                              setData({
                                ...dataCom,
                                advertisement_number: event?.target?.value,
                              })
                            }
                            disabled={true}
                            value={dataCom?.advertisement_number}
                          />
                        </div>
                      </>
                    )}
                </div>
              )
            )}
            {titleSection && detailsSection && (
              <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4 mt-4">
                <div className="flex items-center justify-end">
                  <p className="text-base font-bold text-[#4B5563]">
                    {titleSection}
                  </p>
                </div>
                <div className="flex flex-row flex-wrap justify-end mt-6 gap-8 items-end">
                  <div className="mb-4 flex-row-reverse flex">
                    {detailsSection?.map(
                      (ele: { id: number; title: string }) => (
                        <RadioInput
                          key={ele?.id}
                          name="property_type_details_id"
                          onChange={(event) =>
                            setData({
                              ...dataCom,
                              property_type_details_id: Number(
                                event?.target?.value
                              ),
                            })
                          }
                          checked={ele?.id == dataCom?.property_type_details_id}
                          value={ele.id}
                          label={ele?.title}
                        />
                      )
                    )}
                  </div>
                </div>
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
                    value={dataCom?.propertyLocation?.district}
                    onChange={(event) =>
                      setData({
                        ...dataCom,
                        propertyLocation: {
                          ...dataCom?.propertyLocation,

                          district: event?.target?.value,
                        },
                      })
                    }
                  >
                    {district?.map((city: any) => (
                      <option key={city?.id} value={city?.name}>
                        {city?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col items-end gap-2 justify-end  w-full">
                  <p className="text-base font-medium text-[#4B5563]">
                    المدينة
                  </p>
                  <select
                    className="border w-full text-right  border-[#D1D5DB] rounded-lg"
                    value={dataCom?.propertyLocation?.city}
                    onChange={(event) =>
                      setData({
                        ...dataCom,
                        propertyLocation: {
                          ...dataCom?.propertyLocation,

                          city: event?.target?.value,
                        },
                      })
                    }
                  >
                    {city?.map((city: any) => (
                      <option key={city?.id} value={city?.nameAr}>
                        {city?.nameAr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-end gap-2 justify-end flex-col mt-5 rounded-lg border border-[#E5E7EB] p-2">
                <div className="flex flex-row-reverse justify-between w-full items-center">
                  <p className="text-sm text-[#3B73B9] font-bold">
                    الموقع العقار{" "}
                  </p>
                  <div className="flex justify-center items-center gap-2">
                    <CloseIconSmall onClick={() => modalRef.current?.close()} />
                    <FaEdit
                      onClick={() => modalRef.current?.open()}
                      className="cursor-pointer"
                    />
                    {/* <div
                  onClick={() => modalRef.current?.open()}
                  className="cursor-pointer bg-[#3B73B9]"
                >
                  <Image src={Add} width={21} height={21} alt={"add"} />
                </div> */}
                  </div>
                </div>
                <div className="flex gap-2 items-center flex-row-reverse">
                  <CiLocationOn className="text-[20px]" />
                  <p>{dataCom?.propertyLocation?.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
          <div className="flex items-center justify-end">
            <p className="text-base font-bold text-[#4B5563]">
              تفاصيل وسعر العقار{" "}
            </p>
          </div>
          <div className="mb-4" style={{ direction: "rtl" }}>
            {dataCom?.property_type_details_id == 8 &&
              dataCom?.details?.map((detail) => (
                <>
                  <div className="flex flex-col gap-5 my-3">
                    <p>رقم الشقة </p>
                    <CountElement
                      value={String(detail?.apartment_number)}
                      onChange={(num) =>
                        setData({
                          ...dataCom,
                          details: dataCom?.details?.map((ele: any) =>
                            ele?.id == detail?.id
                              ? {
                                  ...ele,
                                  apartment_number: String(num),
                                }
                              : ele
                          ),
                        })
                      }
                      title="رقم الشقة"
                    />

                    <p> رقم الدور</p>
                    <CountElement
                      value={String(dataCom?.apartment_floor)}
                      onChange={(num) =>
                        setData({
                          ...dataCom,
                          details: dataCom?.details?.map((ele: any) =>
                            ele?.id == detail?.id
                              ? {
                                  ...ele,
                                  apartment_number: String(num),
                                }
                              : ele
                          ),
                        })
                      }
                      title="رقم الدور"
                    />
                  </div>
                </>
              ))}

            {(dataCom?.property_type_id == 1 ||
              dataCom?.property_type_id == 2 ||
              dataCom?.property_type_id == 6) &&
              dataCom?.landDetails?.map((ele, index) => (
                <>
                  <div className="flex items-start gap-2 justify-end flex-col mt-5">
                    <p className="text-base text-[#4B5563] font-medium">
                      رقم المخطط{" "}
                    </p>
                    <TextInput
                      inputProps={{ placeholder: "-- الرجاء الادخال --" }}
                      value={ele?.piece_number}
                      onChange={(event) =>
                        setData({
                          ...dataCom,
                          landDetails: dataCom?.landDetails?.map(
                            (landDetail: any) =>
                              landDetail?.id == ele?.id
                                ? {
                                    ...landDetail,
                                    piece_number: event?.target?.value,
                                  }
                                : landDetail
                          ),
                        })
                      }
                    />
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
                          setData({
                            ...dataCom,
                            landDetails: dataCom?.landDetails?.map(
                              (landDetail) =>
                                landDetail?.id == ele?.id
                                  ? {
                                      ...landDetail,
                                      plan_number: event?.target?.value,
                                    }
                                  : landDetail
                            ),
                          })
                        }
                      />
                    </div>
                  </div>
                  <InputAreaPrice
                    title="المساحة"
                    value={ele?.area}
                    onChange={(event) =>
                      setData({
                        ...dataCom,
                        landDetails: dataCom?.landDetails?.map((landDetail) =>
                          landDetail?.id == ele?.id
                            ? {
                                ...landDetail,
                                area: Number(event?.target?.value),
                              }
                            : landDetail
                        ),
                      })
                    }
                    measurement="متر"
                  />
                  <InputAreaPrice
                    title="السعر"
                    value={ele?.price}
                    onChange={(event) =>
                      setData({
                        ...dataCom,
                        landDetails: dataCom?.landDetails?.map((landDetail) =>
                          landDetail?.id == ele?.id
                            ? {
                                ...landDetail,
                                price: Number(event?.target?.value),
                              }
                            : landDetail
                        ),
                      })
                    }
                    measurement="ريال"
                    desc="(بدون القيمة المضافة والسعي)"
                  />
                </>
              ))}

            {(dataCom?.property_type_id == 4 ||
              dataCom?.property_type_id == 5) && (
              <>
                <InputAreaPrice
                  title="المساحة"
                  onChange={(event) =>
                    setData({
                      ...dataCom,
                      area: Number(event?.target?.value),
                    })
                  }
                  value={Number(dataCom?.area)}
                  measurement="متر"
                />
              </>
            )}
          </div>

          {dataCom?.property_type_id == 4 || dataCom?.property_type_id == 5
            ? dataCom?.details?.map((detail) => (
                <>
                  <InputAreaPrice
                    title="السعر"
                    onChange={(event) =>
                      setData({
                        ...dataCom,
                        details: dataCom?.details?.map((ele) =>
                          ele?.id == detail?.id
                            ? {
                                ...ele,
                                price: Number(event?.target?.value),
                              }
                            : ele
                        ),
                      })
                    }
                    value={Number(detail?.price)}
                    measurement="ريال"
                    desc="(بدون القيمة المضافة والسعي)"
                  />
                  <NumberRoom
                    value={Number(dataCom?.age)}
                    onChange={(e) => {
                      setData({
                        ...dataCom,
                        age: Number(e?.target?.value),
                      });
                    }}
                    name="age"
                    title={"العمر"}
                    firstNumber={"جديد"}
                    secondNumber={"+10 سنين"}
                    max={10}
                  />
                  <NumberRoom
                    value={detail?.rooms_number}
                    onChange={(e) => {
                      setData({
                        ...dataCom,
                        details: dataCom?.details?.map((ele) =>
                          ele?.id == detail?.id
                            ? {
                                ...ele,
                                rooms_number: Number(e?.target?.value),
                              }
                            : ele
                        ),
                      });
                    }}
                    name="rooms_number"
                    title={"عدد الغرف"}
                    firstNumber={"غرفة"}
                    secondNumber={"+10 غرف"}
                    max={10}
                  />
                  <NumberRoom
                    value={detail?.halls_number}
                    onChange={(e) => {
                      setData({
                        ...dataCom,
                        details: dataCom?.details?.map((ele) =>
                          ele?.id == detail?.id
                            ? {
                                ...ele,
                                halls_number: Number(e?.target?.value),
                              }
                            : ele
                        ),
                      });
                    }}
                    name="halls_number"
                    title={"عدد الصالات"}
                    firstNumber={"صالة"}
                    secondNumber={"3+ صالات "}
                    max={3}
                  />
                  <NumberRoom
                    value={detail?.bathrooms_number}
                    onChange={(e) => {
                      setData({
                        ...dataCom,
                        details: dataCom?.details?.map((ele) =>
                          ele?.id == detail?.id
                            ? {
                                ...ele,
                                bathrooms_number: Number(e?.target?.value),
                              }
                            : ele
                        ),
                      });
                    }}
                    name="bathrooms_number"
                    title={"عدد دورات المياه"}
                    firstNumber={"دورة مياه"}
                    secondNumber={"3+ دورة مياه "}
                    max={3}
                  />
                  <NumberRoom
                    value={detail?.kitchens_number}
                    onChange={(e) => {
                      setData({
                        ...dataCom,
                        details: dataCom?.details?.map((ele) =>
                          ele?.id == detail?.id
                            ? {
                                ...ele,
                                kitchens_number: Number(e?.target?.value),
                              }
                            : ele
                        ),
                      });
                    }}
                    name="kitchens_number"
                    title={" عدد المطابخ"}
                    firstNumber={"مطبخ"}
                    secondNumber={"3+ مطابخ"}
                    max={3}
                  />
                </>
              ))
            : dataCom?.property_type_id == 3 && (
                <>
                  <NumberRoom
                    value={Number(dataCom?.age)}
                    onChange={(e) => {
                      setData({
                        ...dataCom,

                        age: Number(e?.target?.value),
                      });
                    }}
                    name="age"
                    title={"العمر"}
                    firstNumber={"جديد"}
                    secondNumber={"+10 سنين"}
                    max={10}
                  />
                </>
              )}
          {dataCom?.property_type_id == 3 &&
            dataCom?.property_type_details_id == 4 && (
              <>
                {dataCom?.details?.map((floor, index) => (
                  <AccordionComponent
                    title={floor?.type}
                    key={index}
                    floors={floorsVilla}
                    onChange={(e) =>
                      setData({
                        ...dataCom,
                        details: dataCom?.details?.map((ele) =>
                          ele?.id == floor?.id
                            ? {
                                ...ele,
                                type: e.target.value,
                              }
                            : ele
                        ),
                      })
                    }
                    value={floor?.type}
                  >
                    <>
                      <InputAreaPrice
                        title="المساحة"
                        onChange={(e) =>
                          setData({
                            ...dataCom,
                            details: dataCom?.details?.map((ele) =>
                              ele?.id == floor?.id
                                ? {
                                    ...ele,
                                    area: Number(e.target.value),
                                  }
                                : ele
                            ),
                          })
                        }
                        value={floor?.area}
                        measurement="متر"
                      />
                      <InputAreaPrice
                        title="السعر"
                        onChange={(e) =>
                          setData({
                            ...dataCom,
                            details: dataCom?.details?.map((ele) =>
                              ele?.id == floor?.id
                                ? {
                                    ...ele,
                                    price: Number(e.target.value),
                                  }
                                : ele
                            ),
                          })
                        }
                        value={floor?.price}
                        measurement="ريال"
                        desc="(بدون القيمة المضافة والسعي)"
                      />
                      <NumberRoom
                        value={floor?.rooms_number}
                        onChange={(e) =>
                          setData({
                            ...dataCom,
                            details: dataCom?.details?.map((ele) =>
                              ele?.id == floor?.id
                                ? {
                                    ...ele,
                                    rooms_number: Number(e.target.value),
                                  }
                                : ele
                            ),
                          })
                        }
                        name="rooms_number"
                        title={"عدد الغرف"}
                        firstNumber={"غرفة"}
                        secondNumber={"+10 غرف"}
                        max={10}
                      />
                      <NumberRoom
                        value={floor?.halls_number}
                        onChange={(e) =>
                          setData({
                            ...dataCom,
                            details: dataCom?.details?.map((ele) =>
                              ele?.id == floor?.id
                                ? {
                                    ...ele,
                                    halls_number: Number(e.target.value),
                                  }
                                : ele
                            ),
                          })
                        }
                        name="halls_number"
                        title={"عدد الصالات"}
                        firstNumber={"صالة"}
                        secondNumber={"3+ صالات "}
                        max={3}
                      />
                      <NumberRoom
                        value={floor?.bathrooms_number}
                        onChange={(e) =>
                          setData({
                            ...dataCom,
                            details: dataCom?.details?.map((ele) =>
                              ele?.id == floor?.id
                                ? {
                                    ...ele,
                                    bathrooms_number: Number(e.target.value),
                                  }
                                : ele
                            ),
                          })
                        }
                        name="bathrooms_number"
                        title={"عدد دورات المياه"}
                        firstNumber={"دورة مياه"}
                        secondNumber={"3+ دورة مياه "}
                        max={3}
                      />
                      <NumberRoom
                        value={floor?.kitchens_number}
                        onChange={(e) =>
                          setData({
                            ...dataCom,
                            details: dataCom?.details?.map((ele) =>
                              ele?.id == floor?.id
                                ? {
                                    ...ele,
                                    kitchens_number: Number(e.target.value),
                                  }
                                : ele
                            ),
                          })
                        }
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
                              setData({
                                ...dataCom,
                                details: dataCom?.details?.map((ele) =>
                                  ele?.id == floor?.id
                                    ? {
                                        ...ele,
                                        amenities: {
                                          ...ele?.amenities,
                                          ac: event?.target?.checked,
                                        },
                                      }
                                    : ele
                                ),
                              })
                            }
                            checked={floor?.pool}
                          />
                          <CheckFeature
                            title="مدخل سيارة"
                            onChange={(event) =>
                              setData({
                                ...dataCom,
                                details: dataCom?.details?.map((ele) =>
                                  ele?.id == floor?.id
                                    ? {
                                        ...ele,
                                        amenities: {
                                          ...ele?.amenities,
                                          car_entrance: event?.target?.checked,
                                        },
                                      }
                                    : ele
                                ),
                              })
                            }
                            checked={floor?.car_entrance}
                          />
                          <CheckFeature
                            title="مطبخ راكب"
                            onChange={(event) =>
                              setData({
                                ...dataCom,
                                details: dataCom?.details?.map((ele) =>
                                  ele?.id == floor?.id
                                    ? {
                                        ...ele,
                                        amenities: {
                                          ...ele?.amenities,
                                          kitchen: event?.target?.checked,
                                        },
                                      }
                                    : ele
                                ),
                              })
                            }
                            checked={floor?.kitchen}
                          />
                          <CheckFeature
                            title="مؤثثة"
                            onChange={(event) =>
                              setData({
                                ...dataCom,
                                details: dataCom?.details?.map((ele) =>
                                  ele?.id == floor?.id
                                    ? {
                                        ...ele,
                                        amenities: {
                                          ...ele?.amenities,
                                          furnished: event?.target?.checked,
                                        },
                                      }
                                    : ele
                                ),
                              })
                            }
                            checked={floor?.furnished}
                          />
                        </div>
                      </div>
                    </>
                  </AccordionComponent>
                ))}
              </>
            )}
          {dataCom?.property_type_id == 3 &&
            dataCom?.property_type_details_id == 3 &&
            dataCom?.details?.map((detail) => (
              <>
                <div className="mt-2">
                  <div
                    className="flex justify-between text-sm mt-2"
                    style={{ direction: "rtl" }}
                  >
                    <p className="font-bold text-base text-black ">
                      {detail?.type}
                    </p>
                  </div>
                  <div
                    className=" flex flex-col flex-wrap gap-2"
                    style={{ direction: "rtl" }}
                  >
                    <InputAreaPrice
                      title="المساحة"
                      onChange={(event) =>
                        setData({
                          ...dataCom,
                          details: dataCom?.details?.map((ele) =>
                            ele?.id == detail?.id
                              ? {
                                  ...ele,
                                  area: Number(event?.target?.value),
                                }
                              : ele
                          ),
                        })
                      }
                      value={detail?.area}
                      measurement="متر"
                    />
                    <InputAreaPrice
                      title="السعر"
                      onChange={(event) =>
                        setData({
                          ...dataCom,
                          details: dataCom?.details?.map((ele) =>
                            ele?.id == detail?.id
                              ? {
                                  ...ele,
                                  price: Number(event?.target?.value),
                                }
                              : ele
                          ),
                        })
                      }
                      value={detail?.price}
                      measurement="ريال"
                      desc="(بدون القيمة المضافة والسعي)"
                    />
                    <NumberRoom
                      value={detail?.rooms_number}
                      onChange={(e) =>
                        setData({
                          ...dataCom,
                          details: dataCom?.details?.map((ele) =>
                            ele?.id == detail?.id
                              ? {
                                  ...ele,
                                  rooms_number: Number(e?.target?.value),
                                }
                              : ele
                          ),
                        })
                      }
                      name="rooms_number"
                      title={"عدد الغرف"}
                      firstNumber={"غرفة"}
                      secondNumber={"+10 غرف"}
                      max={10}
                    />
                    <NumberRoom
                      value={detail?.halls_number}
                      onChange={(e) =>
                        setData({
                          ...dataCom,
                          details: dataCom?.details?.map((ele) =>
                            ele?.id == detail?.id
                              ? {
                                  ...ele,
                                  halls_number: Number(e?.target?.value),
                                }
                              : ele
                          ),
                        })
                      }
                      name="halls_number"
                      title={"عدد الصالات"}
                      firstNumber={"صالة"}
                      secondNumber={"3+ صالات "}
                      max={3}
                    />
                    <NumberRoom
                      value={detail?.bathrooms_number}
                      onChange={(e) =>
                        setData({
                          ...dataCom,
                          details: dataCom?.details?.map((ele) =>
                            ele?.id == detail?.id
                              ? {
                                  ...ele,
                                  bathrooms_number: Number(e?.target?.value),
                                }
                              : ele
                          ),
                        })
                      }
                      name="bathrooms_number"
                      title={"عدد دورات المياه"}
                      firstNumber={"دورة مياه"}
                      secondNumber={"3+ دورة مياه "}
                      max={3}
                    />
                    <NumberRoom
                      value={detail?.kitchens_number}
                      onChange={(e) =>
                        setData({
                          ...dataCom,
                          details: dataCom?.details?.map((ele) =>
                            ele?.id == detail?.id
                              ? {
                                  ...ele,
                                  kitchens_number: Number(e?.target?.value),
                                }
                              : ele
                          ),
                        })
                      }
                      name="kitchens_number"
                      title={" عدد المطابخ"}
                      firstNumber={"مطبخ"}
                      secondNumber={"3+ مطابخ"}
                      max={3}
                    />
                    <hr className="border-gray-200 dark:border-white my-2" />
                  </div>
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
                          setData({
                            ...dataCom,
                            details: dataCom?.details?.map((ele) =>
                              ele?.id == detail?.id
                                ? {
                                    ...ele,
                                    amenities: {
                                      ...ele?.amenities,
                                      pool: event?.target?.checked,
                                    },
                                  }
                                : ele
                            ),
                          })
                        }
                        checked={detail?.amenities?.pool}
                      />
                      <CheckFeature
                        title="كراج للسيارات"
                        onChange={(event) =>
                          setData({
                            ...dataCom,
                            details: dataCom?.details?.map((ele) =>
                              ele?.id == detail?.id
                                ? {
                                    ...ele,
                                    amenities: {
                                      ...ele?.amenities,
                                      garage: event?.target?.checked,
                                    },
                                  }
                                : ele
                            ),
                          })
                        }
                        checked={detail?.amenities?.garage}
                      />
                      <CheckFeature
                        title="غرفة خدم"
                        onChange={(event) =>
                          setData({
                            ...dataCom,
                            details: dataCom?.details?.map((ele) =>
                              ele?.id == detail?.id
                                ? {
                                    ...ele,
                                    amenities: {
                                      ...ele?.amenities,
                                      servants_room: event?.target?.checked,
                                    },
                                  }
                                : ele
                            ),
                          })
                        }
                        checked={detail?.amenities?.servants_room}
                      />
                      <CheckFeature
                        title="مؤثثة"
                        onChange={(event) =>
                          setData({
                            ...dataCom,
                            details: dataCom?.details?.map((ele) =>
                              ele?.id == detail?.id
                                ? {
                                    ...ele,
                                    amenities: {
                                      ...ele?.amenities,
                                      furnished: event?.target?.checked,
                                    },
                                  }
                                : ele
                            ),
                          })
                        }
                        checked={detail?.amenities?.furnished}
                      />
                    </div>
                  </div>
                </div>
              </>
            ))}
          {dataCom?.property_type_id == 3 &&
          dataCom?.property_type_details_id == 3 ? (
            <></>
          ) : (
            (dataCom?.property_type_id == 4 ||
              dataCom?.property_type_id == 5) &&
            dataCom?.details?.map((detail) => (
              <div className="mt-2" key={detail?.id}>
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
                      setData({
                        ...dataCom,
                        details: dataCom?.details?.map((ele) =>
                          ele?.id == detail?.id
                            ? {
                                ...ele,
                                amenities: {
                                  ...ele?.amenities,
                                  ac: event?.target?.checked,
                                },
                              }
                            : ele
                        ),
                      })
                    }
                    checked={detail?.amenities?.ac}
                  />
                  <CheckFeature
                    title="مدخل سيارة"
                    onChange={(event) =>
                      setData({
                        ...dataCom,
                        details: dataCom?.details?.map((ele) =>
                          ele?.id == detail?.id
                            ? {
                                ...ele,
                                amenities: {
                                  ...ele?.amenities,
                                  car_entrance: event?.target?.checked,
                                },
                              }
                            : ele
                        ),
                      })
                    }
                    checked={detail?.amenities?.car_entrance}
                  />
                  <CheckFeature
                    title="مطبخ راكب"
                    onChange={(event) =>
                      setData({
                        ...dataCom,
                        details: dataCom?.details?.map((ele) =>
                          ele?.id == detail?.id
                            ? {
                                ...ele,
                                amenities: {
                                  ...ele?.amenities,
                                  kitchen: event?.target?.checked,
                                },
                              }
                            : ele
                        ),
                      })
                    }
                    checked={detail?.amenities?.kitchen}
                  />
                  <CheckFeature
                    title="مؤثثة"
                    onChange={(event) =>
                      setData({
                        ...dataCom,
                        details: dataCom?.details?.map((ele) =>
                          ele?.id == detail?.id
                            ? {
                                ...ele,
                                amenities: {
                                  ...ele?.amenities,
                                  furnished: event?.target?.checked,
                                },
                              }
                            : ele
                        ),
                      })
                    }
                    checked={detail?.amenities?.furnished}
                  />
                </div>
              </div>
            ))
          )}
          {/* {(dataCom?.property_type_id == 1 || dataCom?.property_type_id == 2 || dataCom?.property_type_id == 6) && (
            <div className="mb-4" style={{ direction: "rtl" }}>
              <div className="flex gap-2  flex-row mt-5">
                <div
                  onClick={() =>
                    setData({
                      ...dataCom,
                      landDetails:[...dataCom?.landDetails,{
                        area:0,
                        price:0,
                        piece_number:"",
                        plan_number:""
                      }]
                    })
                  }
                  className="cursor-pointer bg-[#3B73B9]"
                >
                  <Image src={Add} width={21} height={21} alt={"add"} />
                </div>

                <p className="text-sm text-[#3B73B9] font-bold">
                  إضافة عقار اخر
                </p>
              </div>
            </div>
          )} */}
        </div>
        <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
          <div className="flex items-center justify-end">
            <p className="text-base font-bold text-[#4B5563]">المرفقات</p>
          </div>
          <ImageAppear images={images} onDelete={onDelete} links={Links} />
          <div className="flex flex-row justify-end mt-1 gap-8">
            <div className="flex gap-2  flex-row mt-5">
              <p className="text-sm text-[#3B73B9] font-bold">أضف صورة / صور</p>

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
                    setImages((prev: any) => [...prev, ...imageFiles]);
                  }
                }}
              />
            </div>
          </div>
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
              onChange={(event) => setDeal(event?.target?.checked)}
            />
          </div>
          <div className="p-7">
            <Button
              text="حفظ التعديلات"
              onClick={() => checkRef?.current?.open()}
            />
          </div>
        </div>
      </div>
      <Modal ref={checkRef} size="xs">
        <div
          className="items-start flex justify-center flex-col p-4 "
          style={{ direction: "rtl" }}
        >
          <div className="flex flex-row items-center justify-center mb-3  w-full">
            <div
              className="flex flex-1 cursor-pointer "
              onClick={() => checkRef.current?.close()}
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
              onClick={() => {
                checkRef.current?.close();
                onSubmit();
              }}
              className="!text-xs !font-medium"
            />
            <Button
              text="الغاء"
              onClick={() => checkRef.current?.close()}
              className="!bg-white !text-[#1F2A37] !border !border-[#E5E7EB] !rounded-lg !text-xs !font-medium"
            />
          </div>
        </div>
      </Modal>
      <Modal ref={modalRef} size="xl">
        <div className="items-start flex justify-center flex-col p-4">
          <MapLocation
            lat={dataCom?.propertyLocation?.lat}
            long={dataCom?.propertyLocation?.long}
            onChange={({
              address,
              lat,
              long,
            }: {
              address: string;
              lat: number;
              long: number;
            }) =>
              setData({
                ...dataCom,
                propertyLocation: {
                  ...dataCom?.propertyLocation,
                  lat: lat,
                  long: long,
                  address: address,
                },
              })
            }
          />
          {/* <Map /> */}
          {/* <div></div> */}
          {/* <div className="flex flex-col  mt-6 gap-3 mb-6 w-full  items-end justify-start">
                  <p className="text-base font-bold text-[#4B5563]">العنوان</p>
                  <input className="w-full h-10 rounded-lg bg-[#D1D5DB]" />
                </div> */}
          <div className="flex flex-row items-center justify-center gap-3  w-full">
            <Button
              text="الغاء"
              onClick={() => modalRef.current?.close()}
              className="!bg-[#E5E7EB] !text-[#1F2A37]"
            />
            <Button text="حفظ" onClick={() => modalRef.current?.close()} />
          </div>
        </div>
      </Modal>
    </form>
  );
};
export default EditOffer;
const floorsVilla = [
  { name: "دور الارضي" },
  { name: "دور علوي" },
  { name: "شقة" },
];
