'use client';

import { CloseIconSmall,Mashrooklogotextlarge} from '@/app/assets/svg';
import React, { useState, RefObject,useRef } from 'react';
import ModelRules from "@/app/components/shared/ModelRules";
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import {StepThree} from "./StepThree"
import {StepFour} from "./StepFour"
// import { LoginStepThree } from '@/components/shared/login-step-three';
// import { LoginStepFour } from '@/components/shared/login-step-four';
import { Modal,ModalRef } from '@/app/components/shared/modal.component';
import { useRouter } from 'next/navigation';
import Image from "next/image"
const step1 = 'خطوة 1';
const step2 = 'خطوة 2';
const step3 = 'خطوة 3';
const step4 = 'خطوة 4';

const steps = [step1, step2, step3];
interface IAppProps {
  modalRef: RefObject<ModalRef>;
  path:string
}
const ModelForm:React.FC<IAppProps> = ({ modalRef,path })=> {
    const [stepIndex, setStepIndex] = useState(0);
    const modalRefRules = useRef<ModalRef>(null);
  const router = useRouter();
  const [deal, setdeal] = useState(false);
  const goNext = () => {
    if (stepIndex >= steps.length - 1) {
      setStepIndex(0)
      modalRef.current?.close();
      setTimeout(() => {
        router.push(path);
      }, 100);
    } else {
      setStepIndex(stepIndex + 1);
    }
  }
  return (
    <Modal ref={modalRef} size="sm" >
    <div className='flex  justify-center items-center'>
      <div className='flex  flex-col  '>
        <div className='flex justify-between items-center'>
          <CloseIconSmall
            onClick={() => {
              modalRef.current?.close();
            }}
            className='h-10 w-10 cursor-pointer m-3'
          />
           <div >
            {/* <Mashrooklogotextlarge className='h-16 w-[244px]' /> */}
            <Image
              src={Mashrooklogotextlarge}
              alt={"logo"}
              width={100}
              style={{ objectFit: "cover" }}
              className="rounded-xl"
            />
          </div>
        </div>

        <div className='flex  flex-col items-center  justify-center'>
         

          
            {stepIndex === 0 && <StepOne onFinished={goNext} />}
            {stepIndex === 1 && <StepTwo onFinished={goNext} />}
            {stepIndex === 2 && <StepThree onFinished={goNext} />}
          

          <div className='mt-5'>
            <h1 className='text-sm text-[#7B8080]'>
             
              <button
                    className="text-[#98CC5D]"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      modalRefRules?.current?.open();
                    }}
                  >
                    الشروط
                و
                    الأحكام
                  </button>
                  <span className='ml-2 mr-2'>|</span> 
                  اعدادات الخصوصية 
            </h1>
          </div>
        </div>
        <div className=' flex items-center justify-center  p-4'>
          <p className='text-sm text-[#5195A2]'>
            جميع الحقوق محفوظة للمشروك © 2024
          </p>
        </div>
      </div>

      <div
        className={`  bg-contain  bg-no-repeat`}
      ></div>
       <ModelRules
              refModel={modalRefRules}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setdeal(e.target.checked)
              }
              deal={deal}
            />
    </div>
    </Modal>
  )
}
export default ModelForm