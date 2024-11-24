import React from 'react';
import clsx from 'clsx';
// import { NafazLogo } from '@/app/assets/svg';
import Image from "next/image"
interface Props {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  onFinished: () => void;
  className?: string;
}

export const StepOne: React.FC<Props> = ({ onFinished, className }) => {
  return (
    <div>
      <div className='mt-8 flex h-[246px] w-full flex-col  rounded-lg border border-[#DCDFE4]'>
        <div className='mb-3 mt-8 items-center justify-center text-center'>
          <p className='xl:text-[20px] font-black text-black xs:text-sm'> تسجيل الدخول</p>
          <p className='mt-3 text-sm text-blue-gray-400 px-2'>
            برجاء ادخال رقم الهوية الوطنية المسجل
            <br />
            لدى مركز المعلومات الوطني ( نفاذ )
          </p>
        </div>
        <div className='m-2 flex items-center justify-center  '>
          <button
            className={clsx(
              'flex h-20 w-full items-center justify-center rounded-lg border border-[#7B8494] bg-[rgb(245,246,248)]',
              className,
            )}
            onClick={onFinished}
          >
            {/* <NafazLogo /> */}
            <Image src={"/logoid.jpg"} width={150} height={100} alt="logo"/>
          </button>
        </div>
      </div>
    </div>
  );
};
