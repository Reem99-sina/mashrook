"use client";
import React, { useState } from "react";
import MainHeader from "@/app/components/header/MainHeader";
import Footer from "@/app/components/header/Footer2";
import { MdOutlineInfo } from "react-icons/md";
import {
    CloseIconSmall
  } from "@/app/assets/svg";
import { Modal, ModalRef } from "@/app/components/shared/modal.component";
const ModelRules=({refModel,deal,onChange}:{refModel:React.RefObject<ModalRef>,deal:boolean,onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void})=>{
    const [showNotification, setShowNotification] = useState(false);
      const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
          }, 5000);
        }
    return (
        <Modal ref={refModel} size="sm" >
        <div className="flex justify-center w-dvh h-[600px] overflow-y-auto">
      <div className="w-full bg-white rounded text-black shadow">
     
        <div className="flex">
          <main className="container mx-auto">
            <section className="rounded text-center">
              <div>
                <div className="flex items-center justify-between p-2">
                  
                  <h1 className="text-3xl font-bold flex-1"> الشروط والاحكام</h1>
                  <div
              className=" cursor-pointer p-2"
              onClick={() => refModel.current?.close()}
            >
              <CloseIconSmall />
            </div>
                  {/* <BackButton /> */}
                </div>
                <div className="text-right p-4 m-4">
                  <h3 className="font-bold">احكام وشروط الاستخدام لمنصة مشروك العقارية</h3>
                  <h3 className="font-bold">قبول شروط الخدمة</h3>
                  <p>
                  يسري هذا الاتفاق بين كل من (مالك – أو مطور – أو وكيل – أو وسيط – أو مستفيد) موقع منصة مشروك
                  إن استعمالك لموقع منصة مشروك  يعني موافقتك على شروط الخدمة المبينة أدناه. فباستخدامك لموقع مشروك تقر بأنك قرأت شروط الخدمة وبأنك وافقت عليها.
                   إذا كنت لا توافق على هذه الشروط الخاصة بالاستعمال لا يسمح لك بدخول أو استخدام موقع منصة مشروك 
                  </p>
                  <h3 className="font-bold">
                  شروط الخدمة
                  </h3>
                  <p>
                  تتمتع منصة مشروك  بكامل الصلاحية في حق التغيير أو التبديل أو الزيادة أو النقصان في أي جزء من هذا الاتفاق، كاملاً أو جزئياً،
                   وفي أي وقت كان، ويصبح أي تعديل في هذا الاتفاق ساري المفعول مباشرة.

                  </p>
                  <h3 className="font-bold">ضوابط وشروط استخدام الخدمات</h3>
                  <p>يلتزم المستخدم بدفع الحقوق المالية لمنصة مشروك عند استخدامه لأي خدمة
                     مدفوعة وذلك حسب التعليمات التي تظهر عند استخدامه للخدمة، ويلتزم بالدفع لمنصة مشروك في القنوات المالية
                      الخاصة بها والتي توضحها التعليمات التي تظهر عند استخدام الخدمات المدفوعة.</p>
                      <p>يلتزم مستخدم موقع منصة مشروك بالضوابط الموضحة لكل خدمة سواء كانت مدفوعة أم مجانية
                        ، ويحق لمنصة مشروك تغييرها في أي وقت دون سابق إنذار، وتصبح هذه الشروط فعالة وملزمة لكافة العملاء مباشرة. لهذا،
                         يقر العميل بالتزامه بالضوابط والشروط الحالية والمستقبلية وهي على سبيل المثال لا الحصر:</p>
                    <h3 className="font-bold">خدمة الطلبات العقارية</h3>
                    <p>
                    يلتزم مقدم الطلب العقاري بدقة البيانات الخاصة بالطلب، 
                    وأنها دقيقة وصحيحة وليست وهمية، 
                    وأن الطلب العقاري جاد وليس لغرض الاستطلاع فقط، كما يلتزم بالتفاعل مع الإعلانات الواردة من مزودي الخدمات العقارية
                     والاجابة عن استفساراتهم التي تمكنهم من تقديم الخدمة المناسبة، وتوضيح ما إذا كانت الإعلانات المقدمة مناسبة لطلبه أم لا، 
                    كما يقوم بتقييم مزودي الخدمات العقارية من ناحية جودة تواصلهم والبيانات المقدمة منهم.
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
                    checked={deal}
                    onChange={onChange}
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
                
                </div>

                {showNotification && (
                  <div className="text-red-500 text-center mt-4">
                    يجب الموافقة على الشروط والاحكام للاستمرار
                  </div>
                )}
              </div>


            </section>
          </main>
        </div>
      </div>
    </div>
    </Modal>
    )
}
export default ModelRules