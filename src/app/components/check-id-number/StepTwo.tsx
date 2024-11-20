import React, { useState, useEffect } from "react";
// import { Brush } from '@/app/assets/svg';
import { TextInput } from "../shared/text-input.component";
import { Button } from "../shared/button.component";
import {
  fetchuser,
  fetchAuthIdMakeCheck,
  sendNationalIdUser,
} from "@/redux/features/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { userInfo } from "@/type/addrealestate";
import { validateForm } from "@/app/hooks/validate";
import { NationalIdSchema } from "@/typeSchema/schema";
interface Props {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  input?: string;
  onFinished: (stepNum?: number) => void;
}
interface UserInput {
  idNumber: string;
}

export const StepTwo: React.FC<Props> = ({ onFinished }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState("");
  const [click, setclick] = useState(false);
  const { user, TransactionId, code } = useSelector<RootState>(
    (state) => state.register
  ) as { user: userInfo; TransactionId: string | null; code: string | null };
  const [userInput, setUserInput] = useState<UserInput>({
    idNumber: "",
  });
  const [errors, setErrors] = useState<UserInput>({
    idNumber: "",
  });
  const IsDisabled = userInput.idNumber == "";

  const clearUserInput = () => {
    setUserInput({ idNumber: "" });
  };
  const onSubmit = async () => {
    setclick(true);
    const status = await validateForm(
      { idNumber: userInput?.idNumber },
      NationalIdSchema,
      setErrors
    );
    if (status == true) {
        dispatch(sendNationalIdUser({ national_id: userInput?.idNumber }))
          .then((res) => {
            if (!res.payload.status) {
              onFinished();
            } else {
              setError(res.payload.message);
            }
          })
          .finally(() => {
            setclick(false);
          });
    }
  };
  useEffect(() => {
    dispatch(fetchuser());
    //   return () => {
    //   clearInterval(interval);
    // };
  }, [dispatch]);
  return (
    <div>
      <div className=" flex h-[246px] w-[438px] flex-col items-center rounded-lg border border-[#DCDFE4] text-center">
        <div className="mb-3 mt-8">
          <p className="text-[20px] font-bold"> تسجيل الدخول</p>
          <p className=" mt-3 text-sm text-[#7B8080]">
            {" "}
            برجاء ادخال رقم الهوية الوطنية المسجل
          </p>
          <p className="text-sm text-[#7B8080]">
            لدى مركز المعلومات الوطني ( نفاذ )
          </p>
        </div>
        <div className="mb-8 flex items-center justify-center  ">
          <div className="relative flex-col ">
            <div
              className="absolute left-[16px] top-4 "
              onClick={clearUserInput}
            >
              {/* {IsDisabled ? '' : <Brush className='cursor-pointer' />} */}
            </div>
            <TextInput
              //   placeholder='رقم الهوية الوطنية'
              value={userInput.idNumber ? userInput?.idNumber : ""}
              onChange={(event) => {
                const inputValue = event.target.value;
                if (/^\d*$/.test(inputValue)) {
                  setUserInput({ ...userInput, idNumber: inputValue });
                }
              }}
              type={"number"}
              className="mt-3 h-10 w-[280px] rounded-md border border-[#E2E2E2] bg-[#fff] px-3 py-1 font-normal !text-black"
            />
            {errors?.idNumber ||
              (error && (
                <p className="text-xs text-red-600 dark:text-red-500 text-right">
                  {String(errors?.idNumber) || error}
                </p>
              ))}
            <Button
              disabled={IsDisabled}
              isLoading={click}
              text={IsDisabled ? "تسجيل الدخول" : "تحقق من الهوية"}
              className={
                "mt-3 flex h-10 w-[325px] items-center justify-center bg-blue-450"
              }
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
