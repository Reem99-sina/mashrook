"use client";

import React, { useRef, useState, useEffect,useMemo } from "react";
import MainHeader from "../../components/header/MainHeader";
import { Button } from "../../components/shared/button.component";
import Footer from "../../components/header/Footer2";
import { RadioInput } from "../../components/shared/radio.component";
import { AddButton, CloseIconSmall, InfoOutLine } from "../../assets/svg";
import { Range, getTrackBackground } from "react-range";
import { Modal, ModalRef } from "../../components/shared/modal.component";
import { BackButtonOutline } from "@/app/assets/svg";
import { useRouter, useParams } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getRequestByid, dataReturn } from "@/redux/features/getRequest";
import {
  getproperityType,
  getproperityTypeMore,
} from "@/redux/features/getProperity";
import {cites} from "@/typeSchema/schema"
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

const EditMyOrderBadge = () => {
  const [criteria, setCriteria] = useState<any>({
    property_type_id: 0,
    city: "",
    district: null,
    unitType: 0,
    status: "",
    shareRange: [1000000, 2000000],
    finance:false
  });
  const [dataSend, setDataSend] = useState({
    city: "",
    district: "",
    address: "",
    area: 0,
    is_divisible: false,
  });
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
  let { data: dataType,titleSection, detailsSection } = useSelector<RootState>(
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
  const propertyType=useMemo(()=>{
    return {
      property_type_id:selectData?.propertyType?.id
      ,unitType:selectData?.propertyTypeDetails?.id,
      city:selectData?.propertyLocation?.city,
      district:selectData?.propertyLocation?.district?.replace(/[\[\]\\"]/g, '')?.split(","),
      status:selectData?.details[0]?.status||selectData?.landDetails[0]?.status,
      shareRange:[selectData?.details[0]?.min_price||selectData?.landDetails[0]?.min_price,selectData?.details[0]?.price||selectData?.landDetails[0]?.price],
      finance:selectData?.finance
    }
  },[selectData])
  const handleCiteChange = (cite: { id: number; name: string }) => {
    setSelectedCites((prevSelectedCites) => {
      if (prevSelectedCites.some((c) => c.id === cite.id)) {
        return prevSelectedCites.filter((c) => c.id !== cite.id);
      } else {
        return [...prevSelectedCites, cite];
      }
    });
    setCriteria({...criteria,district:criteria?.district?.some((c:any) => c == cite.name)? criteria?.district?.filter((c:any) => c != cite.name):[...criteria?.district, cite?.name]})
  };
  const handleShareRangeChange = (values: number[]) => {
    setCriteria({ ...criteria, shareRange: values });
  };
  const modalRef = useRef<ModalRef>(null);
  const citiesRef = useRef<ModalRef>(null);
  const handleRemoveCite = (cit: any) => {
    setSelectedCites(selectedCites.filter((cite) => cite.name !== cit));
    setCriteria({...criteria,district:criteria?.district?.filter((c:any) => c != cit)})
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
    dispatch(
      getproperityTypeMore({
        num: criteria?.property_type_id || 1,
        type: "request",
      })
    );
  }, [criteria?.property_type_id, dispatch]);
 useEffect(()=>{
  // if(propertyType){
    setCriteria({ ...propertyType  })

  // }
 },[propertyType])
  const data = [
    {
      id: 1,
      title: "نوع العقار",
      english:"property_type_id",
      option: dataType?.data?.map((ele: { id: number; title: string }) => ele),
    },
    {
      id: 2,
      title: titleSection,
      english:"unitType",
      option: detailsSection?.map((ele:{ id: number; title: string })=>ele),
    },
    {
      id: 3,
      title: "موقع العقار",
      english:"city",
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
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            <div className="flex flex-row gap-1 mt-4">
              <AddButton fill="#3B73B9" onClick={() => citiesRef.current?.open()}/>
              <p className="text-[#3B73B9] font-bold text-sm">
                إضافة حي/ أحياء
              </p>
            </div>
          </div>
          <div className="flex flex-row-reverse gap-3 items-center justify-end flex-wrap mb-5">
              {criteria?.district?.map((cite:any) => (
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
      title: (criteria?.property_type_id==3||criteria?.property_type_id==4||criteria?.property_type_id==5)?"حالة العقار ":"حدد نوع التملك",
      english:"status",
      option: (criteria?.property_type_id==3||criteria?.property_type_id==4||criteria?.property_type_id==5)?[{id:"جديد",title:"جديد"}, {id:"مستخدم",title:"مستخدم"},{id:"أي",title:"أي"}]:[{id:"مشاع",title:"مشاع"}, {id:"حر",title:"حر"}],
    },
    {
      id: 5,
      title: "",
      english:"shareRange",
      copmonent: (
        <>
          <div className="flex items-center justify-end">
            <p className="text-base font-bold text-[#4B5563]">ميزانيتك </p>
          </div>
          <div className="mb-4" style={{ direction: "rtl" }}>
            <div className="flex flex-col">
              <div className="flex justify-between mb-2 text-sm text-gray-500 w-full p-4">
                <span>500,000 ريال</span>
                <span>+20,000,000 ريال </span>
              </div>
              <Range
                step={500000}
                min={500000}
                max={20000000}
                values={criteria.shareRange}
                onChange={handleShareRangeChange}
                rtl
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: "36px",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: "5px",
                        width: "100%",
                        borderRadius: "4px",
                        background: getTrackBackground({
                          values: criteria.shareRange,
                          colors: ["#ccc", "#548BF4", "#ccc"],
                          min: 1000000,
                          max: 20000000,
                          rtl: true,
                        }),
                        alignSelf: "center",
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ index, props }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "20px",
                      width: "20px",
                      borderRadius: "50%",
                      backgroundColor: "#548BF4",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 2px 6px #AAA",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-28px",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "12px",
                        fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
                        padding: "4px",
                        borderRadius: "4px",
                        backgroundColor: "#548BF4",
                      }}
                    >
                      {criteria.shareRange[index]}ريال
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </>
      ),
    },
    {
      id: 6,
      title: "هل ترغب في تمويل عقاري؟",
      english:"finance",
      option: [{id:true,title:"نعم"},{id:false,title:"لا"}],
    },
  ];

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/my-offer");
  };

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
              تعديل طلب رقم (2020)
            </p>
          </div>
        </div>
      </div>
      <hr className="border-gray-300 dark:border-white my-2" />
      <div className="bg-white w-full mb-4 items-start justify-start  mt-4">
        {data.map((item) => (item?.english!="unitType"?
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
                    key={item?.english+index}
                    label={option?.title || option}
                    name={item?.english}
                    value={item?.english+option?.id}
                    checked={item?.english+criteria[item.english]==item?.english+option?.id}
                    onChange={(e)=> {setCriteria({...criteria,[item.english]:e.target.value.replace(item?.english,"")});console.log(item?.english)}}                     
                  />
                ))}
              </div>
            )}
            {item.copmonent}
          </div>:item?.english=="unitType"&&titleSection&&detailsSection?<div
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
                    key={item?.english+index}
                    label={option?.title || option}
                    name={item?.english}
                    value={item?.english+option?.id}
                    checked={item?.english+criteria[item.english]==item?.english+option?.id}
                    onChange={(e)=> {setCriteria({...criteria,[item.english]:e.target.value.replace(item?.english,"")});console.log(item?.english)}}                     
                  />
                ))}
              </div>
            )}
            {item.copmonent}
          </div>:null
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
              onClick={() => modalRef.current?.close()}
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
                  {cites.map((cite) => (
                    <div
                      key={cite.id}
                      className="flex justify-end items-center w-full py-2"
                    >
                      <span className="mr-2">{cite.name}</span>
                      <input
                        type="checkbox"
                        checked={selectedCites.some((c:any) => c.id === cite.id)||criteria?.district?.some((c:any)=>c==cite.name)}
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
