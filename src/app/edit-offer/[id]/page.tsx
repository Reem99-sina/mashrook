"use client"
import MainHeader from "@/app/components/header/MainHeader";
import { BackButtonOutline,Add } from "@/app/assets/svg";
import {useRouter,useParams} from "next/navigation"
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/app/components/shared/button.component";
import { RadioInput } from "@/app/components/shared/radio.component";
import { TextInput } from "@/app/components/shared/text-input.component";
import {cites,cities} from "@/typeSchema/schema"
import ImageAppear from "@/app/components/shared/ImageAppear";
import CountElement from "@/app/add-your-real-estate/components/CountElemet";
import CheckFeature from "@/app/add-your-real-estate/components/CheckFeature";
import InputAreaPrice from "@/app/add-your-real-estate/components/InputAreaPrice";
import NumberRoom from "@/app/add-your-real-estate/components/NumberRoom";
import AccordionComponent from "@/app/components/shared/Accordion.component";
import {
  RealEstateTypeInter,
  RealEstateErrrorTypeInter,
  putrealEstateType,
  removeState
} from "@/redux/features/postRealEstate";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import {compare} from "@/app/hooks/compare"
import { CiLocationOn } from "react-icons/ci";
import { AddButton, CloseIconSmall, InfoOutLine } from "@/app/assets/svg";
import {
    earthInter
  } from "@/redux/features/postRealEstate";
import {
  getproperityType,
  getproperityTypeMore,
} from "@/redux/features/getProperity";
import { getproperityPurposeType } from "@/redux/features/getproperityPurpose";
import { getproperityOwnerType } from "@/redux/features/getProperityOwnerType";
import {useMemo,useEffect,useState,useRef} from "react"
import { Modal, ModalRef } from "@/app/components/shared/modal.component";
import MapLocation from "@/app/add-your-real-estate/components/MapLocation";
import { getRequestByid, dataReturn } from "@/redux/features/getRequest";
const EditOffer=()=>{
    let router=useRouter()
    const params = useParams();
    let refImage = useRef<HTMLInputElement>(null);
    const [images, setImages] = useState<File[] | undefined>([]);
    const [Links, setLinks] = useState<string[] | undefined>([]);

    const modalRef = useRef<ModalRef>(null);
    const checkRef=useRef<ModalRef>(null);
    const {id}=params
    const dispatch = useDispatch<AppDispatch>();
    let { data: dataById, selectData } = useSelector<RootState>(
      (state) => state.getRequest
    ) as {
      loading: boolean;
      message: string;
      data: dataReturn[];
      selectData: any;
    };
    const [deal, setDeal] = useState(false);
    const [dataSend, setDataSend] = useState({
        property_owner_type_id: 0, // وسيط عقاري, مطور عقاري, وسيط
        property_purpose_id: 0, //بيع, تطوير (شراكة برأس المال أو البنا
        property_type_id: 0,
        partner_type_id: 0,
        city: "",
        district: "",
        address: "",
        area: 0,
        price: 0,
        lat: 24.64,
        long: 46.72,
        is_divisible: false,
      });
      const [mediator, setMediator] = useState({
        advertisement_number: "", // رقم الاعلان
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
        pool: true, // مزايا اضافية مسبح
        garden: true, // مزايا اضافية
        servants_room: true, // مزايا اضافية غرفة خدم
        ac: true, // مزايا اضافية مكيفة
        furnished: true, // مزايا اضافية مؤثثة
        kitchen: true, // مزايا اضافية مطبخ راكب
        garage: true,
        car_entrance: true,
        stage: "",
        available_percentage: 0,
        available_price: 0,
      }));
      const [villa, setvilla] = useState<earthInter[]>(initialVillaData);
      const [parent,setParent]=useState({})
      const [count, setCount] = useState({
        nums: 1,
      });
      const [DepartmentArch, setDepartmentArch] = useState({
        apartment_number: "", // رقم الاعلان
        apartment_floor: "",
      });
      const [earth, setEarth] = useState({
        plan_number: "",
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
    let {  data, title, details, titleSection, detailsSection } =
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
   
    data: dataPurpose,
  } = useSelector<RootState>((state) => state.properityPurpose) as {
    loading: boolean;
    message: string;
    data: any;
  };
  let {
   
    data: dataOwnerType,
  } = useSelector<RootState>((state) => state.properityOwnerType) as {
    loading: boolean;
    message: string;
    data: any;
  };
    const dataReal = useMemo(()=>{
        return [
            {
              id: 1,
              title: "صفة مقدم العرض",
              english: "property_owner_type_id",
              option: dataOwnerType?.map((ele:{id:number,title:string})=>ele),
            },
            {
              id: 2,
              title: "الغرض من عرض العقار",
              english: "property_purpose_id",
              option: dataPurpose?.map((ele:{id:number,title:string})=>ele),
            },
            {
              id: 3,
              title: "نوع العقار",
              english: "property_type_id",
              option: data?.data?.map((ele:{id:number,title:string})=>ele),
            },
          ]
    },[dataOwnerType,dataPurpose,data]);
    const onDelete = (index: Number) => {
      setImages(images?.filter((_, ind) => ind != index));
    };
    const handleBack=(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        router.push("/my-offer")
    }
    const handleOptionChange = (option: any, title: string) => {
        if (title == "صفة مقدم العرض") {
          setDataSend({ ...dataSend, property_owner_type_id: option?.id });
        } else if (title == "الغرض من عرض العقار") {
          setDataSend({ ...dataSend, property_purpose_id: option?.id });
        } else {
          setDataSend({ ...dataSend, property_type_id: option?.id });
        }
        // setSelectedPropertyType(option);
      };
      const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setdepartmentArch({
          ...departmentArch,
          [e.target.name]: Number(e.target.value),
        });
        // set(Number(e.target.value));
      };
    
      const handleDepartmentVillaChange = (
        e: React.ChangeEvent<HTMLInputElement>
      ) => {
        setDepartmentvilla({
          ...departmentvilla,
          [e.target.name]: Number(e.target.value),
        });
        // set(Number(e.target.value));
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
      useEffect(() => {
        setlandDetails((prev) =>
          [
                ...prev,
                {
                  piece_number: "", // في حالة اختيار ارض (رقم القطعة)
                  plan_number: "",
                  area: 0,
                  price: 0,
                },
              ]
        );
      }, [count.nums]);
      const onSubmit = async () => {
        // if (deal) {
        //   if (token) {
            if (
             dataSend?.property_type_id == 1 ||
             dataSend?.property_type_id == 2 ||
             dataSend?.property_type_id == 6
            ) {
             
                dispatch(
                  putrealEstateType({
                    ...dataSend,
                    landDetails: landDetails,
                    ...mediator,
                    images,
                  })
                );
              
            } else if (departmentArch.property_type_details_id == 5) {
              
                dispatch(
                  putrealEstateType({
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
              
            } else if (
              dataSend?.property_type_id == 4  ||
              dataSend?.property_type_id == 5
            ) {
              
                dispatch(
                  putrealEstateType({
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
              
            } else if (
              dataSend?.property_type_id == 3 &&
              departmentArch?.property_type_details_id == 2
            ) {
              
                dispatch(
                  putrealEstateType({
                    ...dataSend,
                    property_type_details_id:
                      departmentArch?.property_type_details_id,
                    age: departmentArch?.age,
                    details: villa,
                    ...mediator,
                    images,
                  })
                );
              
            } else if (
              dataSend?.property_type_id == 3 &&
              departmentArch?.property_type_details_id == 1
            ) {
              
                dispatch(
                  putrealEstateType({
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
        //   } else {
        //     toast.error("انت تحتاج الي تسجيل دخول");
        //     router.push("/login");
        //   }
        // } else {
        //   toast.error("لازم تقبل بشروط الاستخدام وسياسية الخصوصية");
        // }
        // setSentYourRequest(true);
      };
      useEffect(()=>{
        
        setDataSend((prev)=>({...prev,
          property_type_id:selectData?.propertyType?.id,
          property_owner_type_id:selectData?.propertyOwnerType?.id,
          property_purpose_id:selectData?.propertyPurpose?.id,
          partner_type_id:selectData?.partnerType?.id,
          city:selectData?.propertyLocation?.city,
          district:selectData?.propertyLocation?.district?.replace(/[\[\]\\"]/g, ''),
          address:selectData?.propertyLocation?.address,
          area: selectData?.area,
        price: (selectData?.propertyTypeDetails?.id==1||selectData?.propertyType?.id == 4||selectData?.propertyType?.id == 5)?selectData?.details[0]?.price:0,
        }))
        setMediator((prev)=>({
          ...prev,
          advertisement_number: selectData?.advertisement_number, // رقم الاعلان
          license_number:selectData?.license_number,
        }));
        if(selectData?.landDetails?.length>0){
          setlandDetails(selectData?.landDetails?.map((ele:any)=>({
            piece_number: ele?.piece_number, // في حالة اختيار ارض (رقم القطعة)
            plan_number:  ele?.plan_number,
            area:  ele?.area,
            price: ele?.price,
          })));
        }
        if(selectData?.propertyTypeDetails?.id){
          setdepartmentArch((prev)=>({...prev,property_type_details_id:selectData?.propertyTypeDetails?.id,
          age: selectData?.age,
          // rooms_number: 0,
          // halls_number: 0,
          // bathrooms_number: 0,
          // kitchens_number: 0,
        }))
        }
        if(selectData?.propertyTypeDetails?.id==1||selectData?.propertyType?.id == 4||selectData?.propertyType?.id == 5){
          setdepartmentArch((prev)=>({
            ...prev,
              rooms_number: selectData?.details[0]?.rooms_number,
              halls_number: selectData?.details[0]?.halls_number,
              bathrooms_number: selectData?.details[0]?.bathrooms_number,
              kitchens_number: selectData?.details[0]?.kitchens_number,
          }))
          
          setAdditional((prev)=>({
            ...prev,
            pool: selectData?.details[0]?.amenities?.pool,
            garden: selectData?.details[0]?.amenities?.garden,
            servants_room:  selectData?.details[0]?.amenities?.servants_room, // مزايا اضافية غرفة خدم
            ac:  selectData?.details[0]?.amenities?.ac, // مزايا اضافية مكيفة
            furnished: selectData?.details[0]?.amenities?.furnished, // مزايا اضافية مؤثثة
            kitchen: selectData?.details[0]?.amenities?.kitchen,
            car_entrance: selectData?.details[0]?.amenities?.car_entrance,
            garage: selectData?.details[0]?.amenities?.garage,
          }))
        }
        if(selectData?.propertyTypeDetails?.id==1){
          setDepartmentvilla((prev)=>({
            ...prev,
            area: selectData?.details[1]?.area,
            price: selectData?.details[1]?.price,
            rooms_number: selectData?.details[1]?.rooms_number,
            halls_number: selectData?.details[1]?.halls_number,
            bathrooms_number: selectData?.details[1]?.bathrooms_number,
            kitchens_number: selectData?.details[1]?.kitchens_number
          }));
        }
        if(selectData?.propertyMedia?.length>0){
          setLinks(selectData?.propertyMedia)
        }
        if(selectData?.propertyTypeDetails?.id == 2){
          let newVilla=selectData?.details.map((ele:any)=>({...ele,...ele?.amenities}))
          setvilla(newVilla)
        }
        if(selectData?.propertyTypeDetails?.id  == 5){
          setDepartmentArch((prev)=>({
            ...prev,
            apartment_number: selectData?.details[0]?.apartment_number, // رقم الاعلان
            apartment_floor: selectData?.details[0]?.apartment_floor,
          }));
        }
      
      },[selectData])
     
      useEffect(() => {
        if(!(titleSection && detailsSection)){
          dispatch(
            getproperityTypeMore({
              num: dataSend?.property_type_id || 1,
              type: "offer",
            })
          );
        }
        
      }, [ titleSection , detailsSection,dispatch,dataSend?.property_type_id]);
      // useEffect(() => {
      //   console.log(dataSend?.property_purpose_id,"dataSend?.property_purpose_id")
      //   dispatch(getproperityType({ num: dataSend?.property_purpose_id || 1 }));
      // }, [dataSend?.property_purpose_id, dispatch]);

      useEffect(()=>{
        console.log(dataSend?.property_purpose_id,"dataSend?.property_purpose_id")
        
        if(dataSend?.property_purpose_id==2){
          if(!(title&&details)){
            dispatch(getproperityType({ num: dataSend?.property_purpose_id || 1 }));
           }
        }
      },[title,details,dataSend?.property_purpose_id,dispatch])
     
      // propertyOwnerType
    
    return (
        <form className="bg-white flex w-full h-full min-h-screen  flex-col p-5">
        <MainHeader />
        <div style={{direction:"rtl"}}>
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
              {dataReal?.map((item:{title:string,english:string,id:number,option:any}) => (
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
                        {item?.option?.map((ele:any,index:number)=>(
                            <RadioInput
                            name={item.english}
                            onChange={() =>handleOptionChange(ele, item.title)}
                            value={ele?.title}
                            checked={ele?.id==dataSend[item?.english as keyof typeof dataSend]}
                            key={ele?.id}
                            label={ele?.title}
                            disabled={true}
                          />
                        ))}
                        {title &&
                      details &&
                      item.title == "الغرض من عرض العقار"&& (
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
                                      setDataSend({
                                        ...dataSend,
                                        partner_type_id: Number(
                                          event?.target?.value
                                        ),
                                      })
                                    }
                                    value={ele?.id}
                                    checked={dataSend?.partner_type_id==ele?.id}
                                    label={ele?.title}
                                  />
                                )
                              )}
                            </div>
                          </div>
                          
                        </div>
                      )}
                     
                    </div>
                    {(dataSend?.property_owner_type_id == 2 ||
                    dataSend?.property_owner_type_id == 3) &&
                    item.title == "صفة مقدم العرض" && (
                      <>
                        <div className="flex items-end gap-2 justify-end flex-col ">
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
                            disabled={true}
                            value={mediator?.license_number}
                          />
                         
                        </div>
                        <div className="flex items-end gap-2 justify-end flex-col mt-2">
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
                            disabled={true}
                            value={mediator?.advertisement_number}
                          />
                         
                        </div>
                      </>
                    )}
                </div>
                 ))}
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
                            setdepartmentArch({
                              ...departmentArch,
                              property_type_details_id: Number(
                                event?.target?.value
                              ),
                            })
                          }
                          checked={ele?.id==departmentArch?.property_type_details_id}
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
                    value={dataSend?.district}
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
                 
                </div>
                <div className="flex flex-col items-end gap-2 justify-end  w-full">
                  <p className="text-base font-medium text-[#4B5563]">
                    المدينة
                  </p>
                  <select
                    className="border w-full text-right  border-[#D1D5DB] rounded-lg"
                    value={dataSend?.city}
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
                 
                </div>
              </div>
              <div className="flex items-end gap-2 justify-end flex-col mt-5 rounded-lg border border-[#E5E7EB] p-2">
                <div className="flex flex-row-reverse justify-between w-full items-center">
                  <p className="text-sm text-[#3B73B9] font-bold">الموقع العقار </p>
                    <div className="flex justify-center items-center gap-2">
                    <CloseIconSmall  onClick={()=>modalRef.current?.close()}/>
                    <FaEdit onClick={()=>modalRef.current?.open()} className="cursor-pointer"/>
                   {/* <div
                  onClick={() => modalRef.current?.open()}
                  className="cursor-pointer bg-[#3B73B9]"
                >
                  <Image src={Add} width={21} height={21} alt={"add"} />
                </div> */}
                </div>

                </div>
                <div className="flex gap-2 items-center flex-row-reverse">
                  <CiLocationOn className="text-[20px]"/>
                  <p>{dataSend?.address}</p>
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
                {departmentArch?.property_type_details_id == 5 && (
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

                {(dataSend.property_type_id == 1 ||
                  dataSend.property_type_id == 2 ||
                  dataSend.property_type_id == 6) &&
                  landDetails?.map((ele, index) => (
                    <>
                      <div className="flex items-start gap-2 justify-end flex-col mt-5">
                        <p className="text-base text-[#4B5563] font-medium">
                          رقم المخطط{" "}
                        </p>
                        <TextInput
                          inputProps={{ placeholder: "-- الرجاء الادخال --" }}
                          value={ele?.piece_number}
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

                        
                      </div>
                      <InputAreaPrice
                        title="المساحة"
                        value={ele?.area}
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
                        
                        measurement="متر"
                      />
                      <InputAreaPrice
                        title="السعر"
                        value={ele?.price}
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
                        
                        measurement="ريال"
                        desc="(بدون القيمة المضافة والسعي)"
                      />
                    </>
                  ))}

                {(dataSend.property_type_id == 4||dataSend.property_type_id == 5) && (
                  <>
                    <InputAreaPrice
                      title="المساحة"
                      onChange={(event) =>
                        setDataSend({
                          ...dataSend,
                          area: Number(event?.target?.value),
                        })
                      }
                      value={Number(dataSend?.area)}
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
                      value={Number(dataSend?.price)}
                      measurement="ريال"
                      desc="(بدون القيمة المضافة والسعي)"
                    />
                  </>
                )}
              </div>

              {(dataSend.property_type_id == 4||dataSend.property_type_id == 5)? (
                <>
                  <NumberRoom
                    
                    value={departmentArch?.age}
                    onChange={handlePercentageChange}
                    name="age"
                    title={"العمر"}
                    firstNumber={"جديد"}
                    secondNumber={"+10 سنين"}
                    max={10}
                  />
                  <NumberRoom
                    
                    value={departmentArch?.rooms_number}
                    onChange={handlePercentageChange}
                    name="rooms_number"
                    title={"عدد الغرف"}
                    firstNumber={"غرفة"}
                    secondNumber={"+10 غرف"}
                    max={10}
                  />
                  <NumberRoom
                   
                    value={departmentArch?.halls_number}
                    onChange={handlePercentageChange}
                    name="halls_number"
                    title={"عدد الصالات"}
                    firstNumber={"صالة"}
                    secondNumber={"3+ صالات "}
                    max={3}
                  />
                  <NumberRoom
                    
                    value={departmentArch?.bathrooms_number}
                    onChange={handlePercentageChange}
                    name="bathrooms_number"
                    title={"عدد دورات المياه"}
                    firstNumber={"دورة مياه"}
                    secondNumber={"3+ دورة مياه "}
                    max={3}
                  />
                  <NumberRoom
                    
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
                dataSend.property_type_id == 3 && (
                  <>
                    <NumberRoom
                      
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
              {dataSend.property_type_id == 3 &&
                departmentArch?.property_type_details_id == 2 && (
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
                                ? { ...ele, type: e.target.value }
                                : ele
                            )
                          )
                        }
                        value={villa[index]?.type}
                      >
                        <>
                          <InputAreaPrice
                            title="المساحة"
                            onChange={(e) =>
                              setvilla((prev) =>
                                prev.map((ele, i) =>
                                  i == index
                                    ? { ...ele, area: Number(e.target.value) }
                                    : ele
                                )
                              )
                            }
                            value={villa[index]?.area} 
                            measurement="متر"
                          />
                          <InputAreaPrice
                            title="السعر"
                            onChange={(e) =>
                              setvilla((prev) =>
                                prev.map((ele, i) =>
                                  i == index
                                    ? { ...ele, price: Number(e.target.value) }
                                    : ele
                                )
                              )
                            }
                           value={villa[index]?.price}
                            measurement="ريال"
                            desc="(بدون القيمة المضافة والسعي)"
                          />
                          <NumberRoom
                            
                            value={villa[index]?.rooms_number}
                            onChange={(e) =>
                              setvilla((prev) =>
                                prev.map((ele, i) =>
                                  i == index
                                    ? {
                                        ...ele,
                                        rooms_number: Number(e.target.value),
                                      }
                                    : ele
                                )
                              )
                            }
                            name="rooms_number"
                            title={"عدد الغرف"}
                            firstNumber={"غرفة"}
                            secondNumber={"+10 غرف"}
                            max={10}
                          />
                          <NumberRoom
                           
                            value={villa[index]?.halls_number}
                            onChange={(e) =>
                              setvilla((prev) =>
                                prev.map((ele, i) =>
                                  i == index
                                    ? {
                                        ...ele,
                                        halls_number: Number(e.target.value),
                                      }
                                    : ele
                                )
                              )
                            }
                            name="halls_number"
                            title={"عدد الصالات"}
                            firstNumber={"صالة"}
                            secondNumber={"3+ صالات "}
                            max={3}
                          />
                          <NumberRoom
                            
                            value={villa[index]?.bathrooms_number}
                            onChange={(e) =>
                              setvilla((prev) =>
                                prev.map((ele, i) =>
                                  i == index
                                    ? {
                                        ...ele,
                                        bathrooms_number: Number(
                                          e.target.value
                                        ),
                                      }
                                    : ele
                                )
                              )
                            }
                            name="bathrooms_number"
                            title={"عدد دورات المياه"}
                            firstNumber={"دورة مياه"}
                            secondNumber={"3+ دورة مياه "}
                            max={3}
                          />
                          <NumberRoom
                           
                            value={villa[index]?.kitchens_number}
                            onChange={(e) =>
                              setvilla((prev) =>
                                prev.map((ele, i) =>
                                  i == index
                                    ? {
                                        ...ele,
                                        kitchens_number: Number(e.target.value),
                                      }
                                    : ele
                                )
                              )
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
                                  setvilla((prev) =>
                                    prev.map((ele, i) =>
                                      i == index
                                        ? { ...ele, ac: event.target.checked }
                                        : ele
                                    )
                                  )
                                }
                                checked={villa[index]?.pool}
                              />
                              <CheckFeature
                                title="مدخل سيارة"
                                onChange={(event) =>
                                  setvilla((prev) =>
                                    prev.map((ele, i) =>
                                      i == index
                                        ? {
                                            ...ele,
                                            car_entrance: event.target.checked,
                                          }
                                        : ele
                                    )
                                  )
                                }
                                checked={villa[index]?.car_entrance}
                              />
                              <CheckFeature
                                title="مطبخ راكب"
                                onChange={(event) =>
                                  setvilla((prev) =>
                                    prev.map((ele, i) =>
                                      i == index
                                        ? {
                                            ...ele,
                                            kitchen: event.target.checked,
                                          }
                                        : ele
                                    )
                                  )
                                }
                                checked={villa[index]?.kitchen}
                              />
                              <CheckFeature
                                title="مؤثثة"
                                onChange={(event) =>
                                  setvilla((prev) =>
                                    prev.map((ele, i) =>
                                      i == index
                                        ? {
                                            ...ele,
                                            furnished: event.target.checked,
                                          }
                                        : ele
                                    )
                                  )
                                }
                                checked={villa[index]?.furnished}
                              />
                            </div>
                          </div>
                        </>
                      </AccordionComponent>
                    ))}
                  </>
                )}
              {dataSend.property_type_id == 3 &&
                departmentArch?.property_type_details_id == 1 && (
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
                         value={dataSend?.area}
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
                          value={dataSend?.price}
                          measurement="ريال"
                          desc="(بدون القيمة المضافة والسعي)"
                        />
                        <NumberRoom
                          
                          value={departmentArch?.rooms_number}
                          onChange={handlePercentageChange}
                          name="rooms_number"
                          title={"عدد الغرف"}
                          firstNumber={"غرفة"}
                          secondNumber={"+10 غرف"}
                          max={10}
                        />
                        <NumberRoom
                          
                          value={departmentArch?.halls_number}
                          onChange={handlePercentageChange}
                          name="halls_number"
                          title={"عدد الصالات"}
                          firstNumber={"صالة"}
                          secondNumber={"3+ صالات "}
                          max={3}
                        />
                        <NumberRoom
                          
                          value={departmentArch?.bathrooms_number}
                          onChange={handlePercentageChange}
                          name="bathrooms_number"
                          title={"عدد دورات المياه"}
                          firstNumber={"دورة مياه"}
                          secondNumber={"3+ دورة مياه "}
                          max={3}
                        />
                        <NumberRoom
                          
                          value={departmentArch?.kitchens_number}
                          onChange={handlePercentageChange}
                          name="kitchens_number"
                          title={" عدد المطابخ"}
                          firstNumber={"مطبخ"}
                          secondNumber={"3+ مطابخ"}
                          max={3}
                        />
                        <hr className="border-gray-200 dark:border-white my-2" />
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
                          value={departmentvilla?.area}
                          measurement="متر"
                        />
                        <InputAreaPrice
                          title="السعر"
                          onChange={(event) =>
                            setDepartmentvilla({
                              ...departmentvilla,
                              price: Number(event?.target?.value),
                            })
                          }
                          value={departmentvilla?.price}
                          measurement="ريال"
                          desc="(بدون القيمة المضافة والسعي)"
                        />
                        <NumberRoom
                         
                          value={departmentvilla?.rooms_number}
                          onChange={handleDepartmentVillaChange}
                          name="rooms_number"
                          title={"عدد الغرف"}
                          firstNumber={"غرفة"}
                          secondNumber={"+10 غرف"}
                          max={10}
                        />
                        <NumberRoom
                          
                          value={departmentvilla?.halls_number}
                          onChange={handleDepartmentVillaChange}
                          name="halls_number"
                          title={"عدد الصالات"}
                          firstNumber={"صالة"}
                          secondNumber={"3+ صالات "}
                          max={3}
                        />
                        <NumberRoom
                        
                          value={departmentvilla?.bathrooms_number}
                          onChange={handleDepartmentVillaChange}
                          name="bathrooms_number"
                          title={"عدد دورات المياه"}
                          firstNumber={"دورة مياه"}
                          secondNumber={"3+ دورة مياه "}
                          max={3}
                        />
                        <NumberRoom
                          
                          value={departmentvilla?.kitchens_number}
                          onChange={handleDepartmentVillaChange}
                          name="kitchens_number"
                          title={" عدد المطابخ"}
                          firstNumber={"مطبخ"}
                          secondNumber={"3+ مطابخ"}
                          max={3}
                        />
                        <hr className="border-gray-200 dark:border-white my-2" />
                      </div>
                    </div>
                  </>
                )}
              {dataSend.property_type_id == 3 &&
              departmentArch?.property_type_details_id == 1 ? (
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
                      checked={additionalData?.pool}
                    />
                    <CheckFeature
                      title="كراج للسيارات"
                      onChange={(event) =>
                        setAdditional({
                          ...additionalData,
                          garage: event?.target?.checked,
                        })
                      }
                      checked={additionalData?.garage}
                    />
                    <CheckFeature
                      title="غرفة خدم"
                      onChange={(event) =>
                        setAdditional({
                          ...additionalData,
                          servants_room: event?.target?.checked,
                        })
                      }
                      checked={additionalData?.servants_room}
                    />
                    <CheckFeature
                      title="مؤثثة"
                      onChange={(event) =>
                        setAdditional({
                          ...additionalData,
                          furnished: event?.target?.checked,
                        })
                      }
                      checked={additionalData?.furnished}
                    />
                  </div>
                </div>
              ) : (
                (dataSend.property_type_id == 4||dataSend.property_type_id == 5) && (
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
                        checked={additionalData?.ac}
                      />
                      <CheckFeature
                        title="مدخل سيارة"
                        onChange={(event) =>
                          setAdditional({
                            ...additionalData,
                            car_entrance: event?.target?.checked,
                          })
                        }
                        checked={additionalData?.car_entrance}
                      />
                      <CheckFeature
                        title="مطبخ راكب"
                        onChange={(event) =>
                          setAdditional({
                            ...additionalData,
                            kitchen: event?.target?.checked,
                          })
                        }
                        checked={additionalData?.kitchen}
                      />
                      <CheckFeature
                        title="مؤثثة"
                        onChange={(event) =>
                          setAdditional({
                            ...additionalData,
                            furnished: event?.target?.checked,
                          })
                        }
                        checked={additionalData?.furnished}
                      />
                    </div>
                  </div>
                )
              )}
              {(dataSend.property_type_id == 1||dataSend.property_type_id == 2||dataSend.property_type_id == 6) && (
                <div className="mb-4" style={{ direction: "rtl" }}>
                  <div className="flex gap-2  flex-row mt-5">
                    <div
                      onClick={() =>
                        setCount((prev) => ({ nums: prev.nums + 1 }))
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
              )}
            </div>
            <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
              <div className="flex items-center justify-end">
                <p className="text-base font-bold text-[#4B5563]">المرفقات</p>
              </div>

              <ImageAppear images={images} onDelete={onDelete} links={Links}/>
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
              
            </div>
            <div className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-4">
              <div className="flex items-center justify-end gap-2">
                <p className="text-xs text-[#6B7280] font-bold">
                  أوافق على{" "}
                  <span
                    className="text-[#98CC5D]"
                   
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
                <Button text="حفظ التعديلات" onClick={()=>checkRef?.current?.open()} />
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
              onClick={() =>{checkRef.current?.close();onSubmit()}}
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
                  lat={dataSend?.lat}
                  long={dataSend?.long}
                  onChange={setDataSend}
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
                  <Button
                    text="حفظ"
                    onClick={() => modalRef.current?.close()}
                  />
                </div>
              </div>
            </Modal>
           </form>
    )
}
export default EditOffer
const floorsVilla = [
    { name: "دور الارضي" },
    { name: "دور علوي" },
    { name: "شقة" },
  ];