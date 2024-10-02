// import { Spinner } from './spinner.component';
import {useEffect} from "react"
import { ImSpinner4 } from "react-icons/im";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {fetchAuthId}from "@/redux/features/userSlice"
interface Props {
  onFinished: () => void;
}

export const StepFour: React.FC<Props> = ({ onFinished }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { auth } = useSelector<RootState>(
        (state) => state.register
      ) as {  auth:boolean };
    useEffect(() => {
        dispatch(fetchAuthId())
      }, [dispatch]);
  return (
    <div>
      <div className='flex h-full  w-full flex-col items-center justify-center  text-center	 '>
        <div className='mt-8 flex w-[453px] flex-col items-center rounded-lg border border-[#DCDFE4]'>
          <div className='mb-3 mt-8'>
            <p className='text-[20px] font-bold'>{auth?"تأكيد رمز التحقق":""}  </p>
            <p className=' mt-3 text-sm text-[#7B8080]'>
              {' '}
              اختر رمز التحقق المرسل كما هو مطابق بالمرسل على رقم{' '}
            </p>
            <p className='text-sm text-[#7B8080]'>
              جوالك المسجل لدى مركز المعلومات الوطني{' '}
            </p>
          </div>
          <div className='mb-8 flex items-center justify-center  '>
            <div className=' relative flex h-[90px] w-[389px] items-center  justify-center rounded-2xl border border-[#F4F6F9] bg-[#F4F6F9] '>
              <div className='flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#A4A4A4] bg-white'>
                <span
                  className='text-lg font-bold text-[#7B8494]'
                  onClick={onFinished}
                >
                  <ImSpinner4 className="text-[18px] spinner" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
