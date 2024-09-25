"use client"
import { BackButtonOutline } from "../assets/svg";
import { useRouter } from "next/navigation";
import { TextInput } from "@/app/components/shared/text-input.component";
import { Button } from "@/app/components/shared/button.component";
import { useState } from "react"
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { validateForm } from "@/app/hooks/validate";
import { ResetOldNewSchema } from "@/typeSchema/schema"
import { resetNewFromOld } from "@/redux/features/loginSlice"
interface dataSend {
  old_password: string;
  new_password: string;
  repeate_new_password: string;
}
const PasswordPage = () => {
  const router = useRouter();
  let [user, setUser] = useState<dataSend>({
    old_password: "",
    new_password: "",
    repeate_new_password: ""
  })
  let [send, setSend] = useState(false)
  const [errors, setErrors] = useState<dataSend>();
  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push("/my-account");
  };
  const onClose = () => {
    setUser({
      old_password: "",
      new_password: "",
      repeate_new_password: ""
    })
    setErrors({
      old_password: "",
      new_password: "",
      repeate_new_password: ""
    })
  }
  const onSubmit = async () => {
    const status = await validateForm({ ...user }, ResetOldNewSchema, setErrors);
    if (status == true) {
      resetNewFromOld(user).then((res: any) => {
        if (res.message && !res.status) {
          toast.success(res.message);
          setErrors({
            old_password: "",
            new_password: "",
            repeate_new_password: ""
          })
          router.push("/my-account");
        } else if (res.status) {
          toast.error(res.payload.message);
        }
      })
    }
  }
  return (<>
    <div className="flex items-center justify-center m-2">
      <div>
        <button onClick={handleBack}>
          <BackButtonOutline />
        </button>
      </div>
      <div className="flex flex-1  items-center justify-center border-b-2 border-gray-200">
        <p className="flex items-center justify-center text-[#36343B] font-bold text-xl pb-2">
          كلمة المرور
        </p>
      </div>
    </div>
    <div style={{ direction: "ltr" }} className="m-5">
      <TextInput
        type="password"
        label="كلمة المرور الحالية"
        inputProps={{ placeholder: "كلمة المرور الحالية" }}
        value={user?.old_password}
        onChange={(event) => setUser((prev) => ({ ...prev, old_password: event.target.value }))}
      //   disabled={loading}
      />
      {errors?.old_password && (
        <p className="text-xs text-red-600 dark:text-red-500 text-right">
          {errors?.old_password}
        </p>
      )}
      <TextInput
        type="password"
        label="كلمة المرور الجديدة"
        inputProps={{ placeholder: "كلمة المرور الجديدة" }}
        value={user?.new_password}
        onChange={(event) => setUser((prev) => ({ ...prev, new_password: event.target.value }))}
      //   disabled={loading}
      />
      {errors?.new_password && (
        <p className="text-xs text-red-600 dark:text-red-500 text-right">
          {errors?.new_password}
        </p>
      )}
      <TextInput
        type="password"
        label=" تاكيد كلمة المرور الجديدة "
        inputProps={{ placeholder: "تاكيد كلمة المرور الجديدة" }}
        value={user?.repeate_new_password}
        onChange={(event) => setUser((prev) => ({ ...prev, repeate_new_password: event.target.value }))}
      //   disabled={loading}
      />
      {errors?.repeate_new_password && (
        <p className="text-xs text-red-600 dark:text-red-500 text-right">
          {errors?.repeate_new_password}
        </p>
      )}
    </div>
    <div className="flex flex-row gap-x-3 mx-5 my-8">
      <Button
        text="حفظ"
        className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#3B73B9] border border-transparent rounded-md group  focus:outline-none focus:ring-2 focus:ring-offset-2 "
        onClick={onSubmit}
        type="button"
      />
      <Button
        text="الغاء"
        className="relative flex justify-center w-full px-4 py-2 text-sm font-medium !text-black !bg-white border-2 !border-gray-500 rounded-md group  focus:outline-none focus:ring-2 focus:ring-offset-2 "
        onClick={onClose}
        type="button"
      />
    </div>
  </>

  )
}
export default PasswordPage