"use client";
import React,{useRef} from "react";
import MainHeader from "../components/header/MainHeader";
import Footer from "../components/header/Footer2";
import ImageRadioButtons from "./PaymentMethod";
import BackButton from "./backButton";
import Link from "next/link";
import Image from "next/image";
import {  Add } from "@/app/assets/svg";
import { IoDocumentText } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { GoDownload } from "react-icons/go";
import { AppDispatch,RootState } from "@/redux/store";
import { useDispatch,useSelector } from "react-redux";
import {dataReturn,addUnqiue} from "@/redux/features/getRequest"
import {postPaymentType,removeStatePayment,postPaymentFileType} from "@/redux/features/postRequest"
import toast from "react-hot-toast";
import {paymentSchema} from "@/typeSchema/schema"
import {useState,useEffect} from "react"
import { validateForm } from "../hooks/validate";
import {useRouter} from "next/navigation"
export default function Payment() {
  const router=useRouter()
  let { selectData } = useSelector<RootState>(
    (state) => state.getRequest
  ) as { loading: boolean; message: string; data: dataReturn[], selectData:{
    id:number,detail_id?:number,title:string,numberPiece:number,
    type:boolean,
    propertyOwnerType:string,
    propertyPurpose:string
  }
};
  let {  messagePayment,
    dataPayment } = useSelector<RootState>(
    (state) => state.properityRequest
  ) as { messagePayment:string,
    dataPayment:string};
  let [data,setData]=useState({
    method:"",
 name:"",
 numCard:0,
 endDate:"",
cvv:""})
let [recipt,setRecipt]=useState<File>()
const [errors, setErrors] = useState<{
  method?:string,
 name?:string,
 numCard?:number,
 endDate?:string,
cvv?:string,
receipt?:string
}>();
let dispatch=useDispatch<AppDispatch>()
let refImage = useRef<HTMLInputElement>(null);
let refA = useRef<any>(null);
let [url,setUrl]=useState<any>()
  async function onSubmit(e:React.MouseEvent<HTMLButtonElement>){
    e.preventDefault()
    if(data?.method=="bank"){
      if(recipt){
        if(selectData?.type){
          dispatch(postPaymentFileType({
            property_id: selectData?.id,
            land_details_id: selectData?.detail_id,
        // land_details_id: selectData?.detail_id,
        receipt:recipt,
        amount:Number(sessionStorage.getItem("amount"))
          }))
        }else{
          dispatch(postPaymentFileType({
            property_id: selectData?.id,
            details_id: selectData?.detail_id,
        // land_details_id: selectData?.detail_id,
        receipt:recipt,
        amount:Number(sessionStorage.getItem("amount"))
          }))
        }
      }else{
        setErrors({...errors,receipt:"يجب ادخال ايصال"})
      }
    }else{
      const status=await validateForm(data,paymentSchema,setErrors)
      if(status==true){
        if(selectData?.type){
          dispatch(postPaymentType({
            property_id: selectData?.id,
            land_details_id: selectData?.detail_id,
        // land_details_id: selectData?.detail_id,
        amount:Number(sessionStorage.getItem("amount"))
          }))
        }else{
          dispatch(postPaymentType({
            property_id: selectData?.id,
            details_id: selectData?.detail_id,
        // land_details_id: selectData?.detail_id,
        amount:Number(sessionStorage.getItem("amount"))
          }))
        }
       
      }
    }
    
  }
  function readAndPreview(file:any) {
    // Make sure `file.name` matches our extensions criteria
    
    if((file instanceof File)==true){
      setRecipt(file)
      if (/\.(pdf?g|pdf)$/i.test(file.name)) {
        const reader = new FileReader();
      
        reader.addEventListener(
          "load",
          () => {
          if(reader?.result){
          
            setUrl({name:file?.name,link:reader?.result})
          }
          //   preview.appendChild(image);
          },
          false,
        );
  
        reader.readAsDataURL(file);
    }
    
    }
  }
 
  useEffect(()=>{
    if(messagePayment&&Boolean(dataPayment)==false){
      toast.error(messagePayment)
    }else if(messagePayment&&Boolean(dataPayment)==true){
      toast.success(messagePayment)
      
      router.push("/JoiningSuccess")
    }
    return ()=>{
      dispatch(removeStatePayment())
    }
  },[messagePayment,dataPayment,router,dispatch])

  return (
    <div className="flex justify-center w-dvh h-max  ">
      <div className="w-full bg-white rounded text-black shadow ">
        <div className="w-full z-50">
          <MainHeader />
        </div>
        <div className="flex">
          <main className="container mx-auto ">
            <section className=" rounded text-center">
              <div>
                <div className="flex items-center justify-between">
                  <p></p>
                  <h1 className="text-2xl font-bold">
                    دفع رسوم الخدمة للشراكة
                  </h1>
                  <BackButton />
                </div>

                <div className="text-right p-4 m-4 bg-gray-200">
                  <div className="flex flex-row justify-between">
                    <p className="text-xl text-green-500 font-bold">{selectData?.propertyOwnerType=="مالك"?100:500} ريال</p>
                    <p className="text-xl text-blue-450 font-bold my-2">
                      رسوم خدمة شراكة
                    </p>
                  </div>
                  <p>  {selectData?.title} - قطعة رقم {selectData?.numberPiece}</p>

                  <div className="flex bg-gray-100 items-center justify-center py-2 px-2 rounded-lg mt-4 w-1/3 ml-auto">
                    <span className="mr-2 ml-2 text-lg font-bold">
                      <h4>{selectData?.id}</h4>
                    </span>
                    <p>رقم الطلب</p>
                  </div>
                </div>

                <div className="text-right p-4 m-4 rounded-xl bg-gray-200">
                  <p className="text-xl font-bold">طريقة الدفع </p>
                </div>

                <div className="border-2 rounded-md p-4 shadow-md text-right ">
                  <div className="text-right">
                    <ImageRadioButtons setData={setData} data={data}/>{" "}
                    {errors?.method && (
                <p className="text-xs text-red-600 dark:text-red-500 text-right">
                  {String(errors?.method)}
                </p>
              )}
                  </div>
                  
                  <div className="text-right p-4 mb-4 rounded-xl bg-gray-200">
                    <p className="text-xl font-bold">بيانات الدفع</p>
                  </div>
                  {data?.method=="bank"?
            //       url?<>
            //         <div className="my-2 border-2 shadow-md p-4 rounded-xl flex flex-row-reverse items-center justify-between">
            //   <div className="flex flex-row-reverse items-center gap-x-3">
            //   <IoDocumentText/>
            //   <div className="text-gray-500 text-xs flex-col items-center  justify-start">
            //   <p>
            //      {url?.name}
            //   </p>
            //   <p>
            //     PDF file
            //   </p>
            //   </div>
            //   </div>
            //   <div className="cursor-pointer items-start">
            //     <IoMdClose className="text-blue-450 text-md" onClick={()=>setUrl({})}/>
            //   </div>
            // </div>
            //         <div className="my-2 border-2 shadow-md p-4 rounded-xl flex flex-row-reverse items-center justify-between">
            //   <div className="flex flex-row-reverse items-center gap-x-3">
            //   <IoDocumentText/>
            //   <div className="text-gray-500 text-xs flex-col items-center  justify-start">
            //   <p>
            //     فاتورة الدفع
            //   </p>
            //   <p>
            //     انقر للتحميل
            //   </p>
            //   </div>
            //   </div>
            //   <div className="cursor-pointer items-start">
            //     <GoDownload className="text-blue-450 text-md" onClick={()=>refA?.current?.click()}/>
            //       <a href="/منصة مشروك الإجراءات والسياسات.pdf" download ref={refA} ></a>
            //   </div>
            // </div>
            //       </>
            <>
                    <div className="border-2 shadow-md p-4 rounded-xl">
                    <h3 className="my-2 font-bold">صورة السند</h3>
                    <div className="flex gap-2  flex-row-reverse mt-5">
              <div
                onClick={() => refImage.current?.click()}
                className="cursor-pointer bg-[#3B73B9]"
              >
                <Image src={Add} width={21} height={21} alt={"add"} />
              </div>
              <p className="text-sm text-[#3B73B9] font-bold">
                أضف صورة / ملف
              </p>
              {errors?.receipt?<p className="text-xs text-red-600 dark:text-red-500 text-right">
                  {String(errors?.receipt)}
                </p>:<></>}
              <input
                type="file"
                className="hidden"
                ref={refImage}
                accept="application/pdf"
                onChange={(event) => {
                  const files = event.target.files;
                  if(files){
                    readAndPreview(files[0])
                    
                  }
                }}
              />
            </div>
            <div className="my-2">
              <p className="text-gray-500 text-xs">
              قم بتحميل الفاتورة ادناه للقيام بالدفع
              </p>
            </div>
            <div className="my-2 border-2 shadow-md p-4 rounded-xl flex flex-row-reverse items-center justify-between">
              <div className="flex flex-row-reverse items-center gap-x-3">
              <IoDocumentText/>
              <div className="text-gray-500 text-xs flex-col items-center  justify-start">
              <p>
                {url?.name}
              </p>
              <p>
                انقر للتحميل
              </p>
              </div>
              </div>
              <div className="cursor-pointer items-start">
                <GoDownload className="text-blue-450 text-md" onClick={()=>refA?.current?.click()}/>
                  <a href={url?.link} download ref={refA} ></a>
              </div>
            </div>
                    </div>
                  </>:<>
                    <div className="border-2 shadow-md p-4 rounded-xl">
                    <h3 className="my-2">اسم صاحب البطاقة</h3>
                    <input
                      type="text"
                      placeholder="الرجاء الادخال"
                      name=" الرجاء الادخال"
                      id="holderName"
                      className="bg-gray-200 rounded-xl flex-grow text-right  px-4 py-2 w-full"
                      onChange={(e)=>setData((prev)=>({...prev,name:e.target.value}))}
                    />
                    {errors?.name && (
                <p className="text-xs text-red-600 dark:text-red-500 text-right">
                  {String(errors?.name)}
                </p>
              )}
                    <h3 className="my-2">رقم البطاقة</h3>
                    <input
                      type="number"
                      placeholder="الرجاء الادخال"
                      name=" الرجاء الادخال"
                      id="holderName"
                      className="bg-gray-200 rounded-xl flex-grow text-right  px-4 py-2 w-full"
                      onChange={(e)=>setData((prev)=>({...prev,numCard:Number(e.target.value)}))}
                    />
                    {errors?.numCard && (
                <p className="text-xs text-red-600 dark:text-red-500 text-right">
                  {String(errors?.numCard)}
                </p>
              )}
                    <div className="flex flex-row justify-end flex-wrap mb-4 gap-x-2">
                      <div>
                        <h3 className="my-2 mx-6">CVV</h3>
                        <input
                          type="number"
                          placeholder="الرجاء الادخال"
                          name=" الرجاء الادخال"
                          id="holderName"
                          className="bg-gray-200 rounded-xl flex-grow text-right  px-4 py-2 w-full"
                      onChange={(e)=>setData((prev)=>({...prev,cvv:e.target.value}))}

                        />
                         {errors?.cvv && (
                <p className="text-xs text-red-600 dark:text-red-500 text-right">
                  {String(errors?.cvv)}
                </p>
              )}
                      </div>
                      <div>
                        <h3 className="my-2 mx-6">تاريخ الانتهاء</h3>
                        <input
                          type="date"
                          placeholder="الرجاء الادخال"
                          name=" الرجاء الادخال"
                          id="holderName"
                          className="bg-gray-200 rounded-xl flex-grow text-right  px-4 py-2 w-full"
                      onChange={(e)=>setData((prev)=>({...prev,endDate:e.target.value}))}

                        />
                         {errors?.endDate && (
                <p className="text-xs text-red-600 dark:text-red-500 text-right">
                  {String(errors?.endDate)}
                </p>
              )}
                      </div>
                    </div>
                  </div>
                  </>}
                  

                  <div className="flex flex-row items-center align-middle justify-center  p-2 text-blue-450">
                    <button 
                    type="button"
                    // href="/JoiningSuccess"
                    onClick={onSubmit}
                     className="bg-blue-450 text-white px-4 py-2 rounded-2xl p-2 m-2 flex-grow text-center">
                      الدفع
                    </button>
                  </div>
                </div>
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

//last modified by Omar Marei 2/8/2024
