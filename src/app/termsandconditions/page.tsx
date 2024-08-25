"use client";
import React, { useState } from "react";
import MainHeader from "../components/header/MainHeader";
import Footer from "../components/header/Footer2";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { MdOutlineInfo } from "react-icons/md";
import BackButton from "../paymentpage/backButton";
import { AppDispatch,RootState } from "@/redux/store";
import { useDispatch,useSelector } from "react-redux";
export default function TermsAndConditions() {
  const [isChecked, setIsChecked] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  let { selectData } = useSelector<RootState>(
    (state) => state.getRequest
  ) as { loading: boolean; message: string; data: dataReturn[], selectData:{
    id:number,detail_id?:number,title:string,numberPiece:number,
    type:boolean,
    propertyOwnerType:string,
    propertyPurpose:string
  }
};
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
 
  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isChecked) {
      e.preventDefault();
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
  };
console.log(selectData,"selectData")
  return (
    <div className="flex justify-center w-dvh h-max">
      <div className="w-full bg-white rounded text-black shadow">
        <div className="w-full z-50">
          <MainHeader />
        </div>
        <div className="flex">
          <main className="container mx-auto">
            <section className="rounded text-center">
              <div>
                <div className="flex items-center justify-between">
                  <p></p>
                  <h1 className="text-3xl font-bold"> الشروط والاحكام</h1>
                  <BackButton />
                </div>
                <div className="text-right p-4 m-4">
                  <p>
                    هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن
                    الغالبية تم تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات
                    العشوائية إلى النص. إن كنت تريد أن تستخدم نص لوريم إيبسوم
                    ما، عليك أن تتحقق أولاً أن ليس هناك أي كلمات أو عبارات محرجة
                    أو غير لائقة مخبأة في هذا النص. بينما تعمل بعض مولّدات نصوص
                    لوريم إيبسوم على الإنترنت على إعادة تكرار مقاطع من نص لوريم
                    إيبسوم نفسه عدة مرات بما تتطلبه الحاجة، فأن البعض الأخر
                    يستخدم كلمات من قاموس يحوي على أكثر من 200 كلمة لا تينية،
                    مضاف إليها مجموعة من الجمل النموذجية، لتكوين نص لوريم إيبسوم
                    ذو شكل منطقي قريب إلى النص الحقيقي. وبالتالي يكون النص
                    الناتح خالي من التكرار، أو أي كلمات أو عبارات غير لائقة أو
                    ما شابه
                  </p>
                  <p>
                    هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن
                    الغالبية تم تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات
                    العشوائية إلى النص. إن كنت تريد أن تستخدم نص لوريم إيبسوم
                    ما، عليك أن تتحقق أولاً أن ليس هناك أي كلمات أو عبارات محرجة
                    أو غير لائقة مخبأة في هذا النص. بينما تعمل بعض مولّدات نصوص
                    لوريم إيبسوم على الإنترنت على إعادة تكرار مقاطع من نص لوريم
                    إيبسوم نفسه عدة مرات بما تتطلبه الحاجة، فأن البعض الأخر
                    يستخدم كلمات من قاموس يحوي على أكثر من 200 كلمة لا تينية،
                    مضاف إليها مجموعة من الجمل النموذجية، لتكوين نص لوريم إيبسوم
                    ذو شكل منطقي قريب إلى النص الحقيقي. وبالتالي يكون النص
                    الناتح خالي من التكرار، أو أي كلمات أو عبارات غير لائقة أو
                    ما شابه
                  </p>
                </div>

                <div className="border-2 rounded-md p-2 shadow-md text-right">
                  <label htmlFor="terms" className="text-lg">
                    اوفق على الشروط والاحكام الخاصة بمشروك
                  </label>
                  <input
                    type="checkbox"
                    id="terms"
                    className="mx-4 p-2 size-4 form-checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <div className="flex flex-row items-center align-middle justify-end p-2 text-blue-450">
                    <p>
                      في حالة الموافقة رسوم الخدمة 100 ريال تدفع لمشروك للانضمام
                      للشراكة
                    </p>
                    <span>
                      <MdOutlineInfo className="mx-2" />
                    </span>
                  </div>
                  <div className="flex flex-row items-center align-middle justify-end p-2 text-blue-450">
                    <p>
                      في حالة الموافقة رسوم السعي 2.5 % من قيمة الصفقة تدفع
                      لمشروك بعد اكتمال الشراكة
                    </p>
                    <span>
                      <MdOutlineInfo className="mx-2" />
                    </span>
                  </div>
                  <div className="flex flex-row items-center align-middle justify-center p-2 text-blue-450">
                    <Link
                      href={selectData?.propertyPurpose==1?"/paymentpage":"/JoiningSuccess"}
                      onClick={handleButtonClick}
                      className="bg-blue-450 text-white px-4 py-2 rounded-2xl p-2 m-2 flex-grow text-center"
                    >
                      متابعة
                    </Link>
                  </div>
                </div>

                {showNotification && (
                  <div className="text-red-500 text-center mt-4">
                    يجب الموافقة على الشروط والاحكام للاستمرار
                  </div>
                )}
              </div>

              <div className="pt-8">
                <Footer />
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

//last modified by Omar Marei 1/8/2024