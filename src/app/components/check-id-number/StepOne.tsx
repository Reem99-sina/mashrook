import React from 'react';
import clsx from 'clsx';
// import { NafazLogo } from '@/app/assets/svg';

interface Props {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  onFinished: () => void;
  className?: string;
}

export const StepOne: React.FC<Props> = ({ onFinished, className }) => {
  return (
    <div>
      <div className='mt-8 flex h-[246px] w-full flex-col items-center rounded-lg border border-[#DCDFE4]'>
        <div className='mb-3 mt-8 items-center justify-center text-center'>
          <p className='text-[20px] font-black text-[#58595B]'> تسجيل الدخول</p>
          <p className='mt-3 text-sm text-blue-gray-400'>
            برجاء ادخال رقم الهوية الوطنية المسجل
            <br />
            لدى مركز المعلومات الوطني ( نفاذ )
          </p>
        </div>
        <div className='mt-2 flex items-center justify-center  '>
          <button
            className={clsx(
              'flex h-20 w-[399px] items-center justify-center rounded-lg border border-[#7B8494] bg-[#7B8494]',
              className,
            )}
            onClick={onFinished}
          >
            {/* <NafazLogo /> */}
          </button>
        </div>
      </div>
    </div>
  );
};
