"use client";

import React, { useRef, useState, useEffect } from "react";
import MainHeader from "../components/header/MainHeader";
import { Button } from "../components/shared/button.component";
import Footer from "../components/header/Footer2";
import InputAreaPrice from "../add-your-real-estate/components/InputAreaPrice";
import NumberRoom from "../add-your-real-estate/components/NumberRoom";
import CheckFeature from "../add-your-real-estate/components/CheckFeature";
import { Modal, ModalRef } from "../components/shared/modal.component";
import { BackButtonOutline, CloseIconSmall, InfoOutLine } from "../assets/svg";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  putDetailsType,
  putLandDetailsType,
  removeStateEdit,
} from "@/redux/features/postRealEstate";

const EditMyOffer = () => {
  const modalRef = useRef<ModalRef>(null);
  let [offer, setOffer] = useState<any>();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  let {
    message,
  } = useSelector<RootState>((state) => state.realEstateRequest) as {
    message:string;
  };
  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/my-offer?title=عروضي`);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const offer = sessionStorage.getItem("offer");
      if (offer !== null) {
        const storedToken = JSON.parse(offer);
        setOffer(storedToken);
      }
    }
  }, []);
 
  useEffect(() => {
    return () => {
      dispatch(removeStateEdit());
    };
  }, [dispatch]);
  const onSubmit = () => {
    if (offer?.type) {
      dispatch(
        putDetailsType({
          area: offer?.area,
          price: offer?.price,
          rooms_number: offer?.rooms_number,
          halls_number: offer?.halls_number,
          bathrooms_number: offer?.bathrooms_number,
          kitchens_number: offer?.kitchens_number,

          pool: offer?.amenities?.pool,
          garden: offer?.amenities?.garden,
          servants_room: offer?.amenities?.servants_room,
          ac: offer?.amenities?.ac,
          furnished: offer?.amenities?.furnished,
          car_entrance: offer?.amenities?.car_entrance,
          garage: offer?.amenities?.garage,
          kitchen: offer?.amenities?.kitchen,
          details_id: offer?.id,
        })
      ).then((res:any)=>{
        if(res.payload.data){
          toast.success(res.payload.message);
          router.push(`/my-offer?title=عروضي`);
        }else if(res.payload.status){
          toast.error(res.payload.message);
          router.push(`/my-offer?title=عروضي`);
        }
      })
    } else {
      dispatch(
        putLandDetailsType({
          area: Number(offer?.area),
          price: Number(offer?.price),
          piece_number: offer?.piece_number,
          plan_number: offer?.plan_number,
          // status: dataCom?.status, /// مشاع او حر
          land_details_id: offer?.id,
        })
      ).then((res:any)=>{
        if(res.payload.data){
          toast.success(res.payload.message);
          router.push(`/my-offer?title=عروضي`);
        }else if(res.payload.status){
          toast.error(res.payload.message);
          router.push(`/my-offer?title=عروضي`);
        }
      })
    }
  };
  return (
    <form className="bg-white flex w-full h-full min-h-screen  flex-col p-5">
      <MainHeader />

      <div
        className="flex items-center justify-center"
        style={{ direction: "rtl" }}
      >
        <div>
          <button onClick={handleBack}>
            <BackButtonOutline />
          </button>
        </div>
        <div className="flex flex-1  items-center justify-center">
          <p className="font-bold text-xl text-[#36343B]">
            تعديل طلب رقم ({offer?.id}) - {offer?.type || offer?.title}
          </p>
        </div>
      </div>

      <div
        className="bg-white rounded-lg border border-[#E5E7EB] w-full mb-4 items-start justify-start p-5 mt-6"
        dir="rtl"
      >
        {!offer?.type ? (
          <>
            <div className="flex items-start gap-2 justify-end flex-col mt-5">
              <p className="text-base text-[#4B5563] font-medium">
                رقم المخطط{" "}
              </p>
              <input
                placeholder="-- الرجاء الادخال --"
                className="w-full p-2 border border-gray-300 rounded-lg"
                onChange={(event) =>
                  setOffer((prev: any) => ({
                    ...prev,
                    piece_number: event?.target?.value,
                  }))
                }
                value={offer?.piece_number}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium mt-2">رقم القطعة </label>
              <div className="flex items-center">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="-- الرجاء الادخال --"
                  onChange={(event) =>
                    setOffer((prev: any) => ({
                      ...prev,
                      plan_number: event?.target?.value,
                    }))
                  }
                  value={offer?.plan_number}
                />
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <InputAreaPrice
          title="المساحة"
          onChange={(event) =>
            setOffer((prev: any) => ({
              ...prev,
              area: Number(event?.target?.value),
            }))
          }
          measurement="متر"
          value={offer?.area?offer?.area:""}
        />

        <InputAreaPrice
          title="السعر للمتر المربع"
          onChange={(event) =>
            setOffer((prev: any) => ({
              ...prev,
              price: Number(event?.target?.value),
            }))
          }
          measurement="ريال"
          value={offer?.price?offer?.price:""}
          desc="(بدون القيمة المضافة والسعي)"
        />
        {offer?.type ? (
          <>
            <NumberRoom
              value={offer?.rooms_number}
              onChange={(event) =>
                setOffer((prev: any) => ({
                  ...prev,
                  rooms_number: Number(event?.target?.value),
                }))
              }
              name="rooms_number"
              title={"عدد الغرف"}
              firstNumber={"غرفة"}
              secondNumber={"+10 غرف"}
              max={10}
            />
            <NumberRoom
              value={offer?.halls_number}
              onChange={(event) =>
                setOffer((prev: any) => ({
                  ...prev,
                  halls_number: Number(event?.target?.value),
                }))
              }
              name="halls_number"
              title={"عدد الصالات"}
              firstNumber={"صالة"}
              secondNumber={"3+ صالات "}
              max={3}
            />
            <NumberRoom
              value={offer?.bathrooms_number}
              onChange={(event) =>
                setOffer((prev: any) => ({
                  ...prev,
                  bathrooms_number: Number(event?.target?.value),
                }))
              }
              name="bathrooms_number"
              title={"عدد دورات المياه"}
              firstNumber={"دورة مياه"}
              secondNumber={"3+ دورة مياه "}
              max={3}
            />
            <NumberRoom
              value={offer?.kitchens_number}
              onChange={(event) =>
                setOffer((prev: any) => ({
                  ...prev,
                  kitchens_number: Number(event?.target?.value),
                }))
              }
              name="kitchens_number"
              title={" عدد المطابخ"}
              firstNumber={"مطبخ"}
              secondNumber={"3+ مطابخ"}
              max={3}
            />
          </>
        ) : (
          <></>
        )}

        {offer?.type && offer?.type != "الفيلا" ? (
          <>
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
                    setOffer((prev: any) => ({
                      ...prev,
                      amenities: {
                        ...prev.amenities,
                        ac: event?.target?.checked,
                      },
                    }))
                  }
                  checked={offer?.amenities?.ac}
                />
                <CheckFeature
                  title="مدخل سيارة"
                  onChange={(event) =>
                    setOffer((prev: any) => ({
                      ...prev,
                      amenities: {
                        ...prev.amenities,
                        car_entrance: event?.target?.checked,
                      },
                    }))
                  }
                  checked={offer?.amenities?.car_entrance}
                />
                <CheckFeature
                  title="مطبخ راكب"
                  onChange={(event) =>
                    setOffer((prev: any) => ({
                      ...prev,
                      amenities: {
                        ...prev.amenities,
                        kitchen: event?.target?.checked,
                      },
                    }))
                  }
                  checked={offer?.amenities?.kitchen}
                />
                <CheckFeature
                  title="مؤثثة"
                  onChange={(event) =>
                    setOffer((prev: any) => ({
                      ...prev,
                      amenities: {
                        ...prev.amenities,
                        finance: event?.target?.checked,
                      },
                    }))
                  }
                  checked={offer?.amenities?.finance}
                />
                <CheckFeature
                  title="مسبح"
                  onChange={(event) =>
                    setOffer((prev: any) => ({
                      ...prev,
                      amenities: {
                        ...prev.amenities,
                        pool: event?.target?.checked,
                      },
                    }))
                  }
                  checked={offer?.amenities?.pool}
                />
                <CheckFeature
                  title="كراج للسيارات"
                  onChange={(event) =>
                    setOffer((prev: any) => ({
                      ...prev,
                      amenities: {
                        ...prev.amenities,
                        garage: event?.target?.checked,
                      },
                    }))
                  }
                  checked={offer?.amenities?.garage}
                />
                <CheckFeature
                  title="غرفة خدم"
                  onChange={(event) =>
                    setOffer((prev: any) => ({
                      ...prev,
                      amenities: {
                        ...prev.amenities,
                        servants_room: event?.target?.checked,
                      },
                    }))
                  }
                  checked={offer?.amenities?.servants_room}
                />
              </div>
            </div>
          </>
        ) : offer?.type && offer?.type == "الفيلا" ? (
          <>
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
                    setOffer((prev: any) => ({
                      ...prev,
                      amenities: {
                        ...prev.amenities,
                        ac: event?.target?.checked,
                      },
                    }))
                  }
                  checked={offer?.amenities?.ac}
                />
                <CheckFeature
                  title="مدخل سيارة"
                  onChange={(event) =>
                    setOffer((prev: any) => ({
                      ...prev,
                      amenities: {
                        ...prev.amenities,
                        car_entrance: event?.target?.checked,
                      },
                    }))
                  }
                  checked={offer?.amenities?.car_entrance}
                />
                <CheckFeature
                  title="مطبخ راكب"
                  onChange={(event) =>
                    setOffer((prev: any) => ({
                      ...prev,
                      amenities: {
                        ...prev.amenities,
                        kitchen: event?.target?.checked,
                      },
                    }))
                  }
                  checked={offer?.amenities?.kitchen}
                />
                <CheckFeature
                  title="مؤثثة"
                  onChange={(event) =>
                    setOffer((prev: any) => ({
                      ...prev,
                      amenities: {
                        ...prev.amenities,
                        finance: event?.target?.checked,
                      },
                    }))
                  }
                  checked={offer?.amenities?.finance}
                />
                <CheckFeature
                  title="مسبح"
                  onChange={(event) =>
                    setOffer((prev: any) => ({
                      ...prev,
                      amenities: {
                        ...prev.amenities,
                        pool: event?.target?.checked,
                      },
                    }))
                  }
                  checked={offer?.amenities?.pool}
                />
                <CheckFeature
                  title="كراج للسيارات"
                  onChange={(event) =>
                    setOffer((prev: any) => ({
                      ...prev,
                      amenities: {
                        ...prev.amenities,
                        garage: event?.target?.checked,
                      },
                    }))
                  }
                  checked={offer?.amenities?.garage}
                />
                <CheckFeature
                  title="غرفة خدم"
                  onChange={(event) =>
                    setOffer((prev: any) => ({
                      ...prev,
                      amenities: {
                        ...prev.amenities,
                        servants_room: event?.target?.checked,
                      },
                    }))
                  }
                  checked={offer?.amenities?.servants_room}
                />
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
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
                هل أنت متأكد من رغبتك في تنفيذ اجراء تعديل الطلب رقم (
                {offer?.id}) ؟
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
                modalRef.current?.close();
                onSubmit();
              }}
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

      <footer className="w-full bg-white p-5">
        <Footer />
      </footer>
    </form>
  );
};
export default EditMyOffer;
