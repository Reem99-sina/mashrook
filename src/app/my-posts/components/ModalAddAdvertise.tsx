import { Modal, ModalRef } from "@/app/components/shared/modal.component";
import { IoMdClose } from "react-icons/io";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react"
import { getMyAdvertise } from "@/redux/features/getMyAdvertise"
import { fetchToken } from "@/redux/features/userSlice"
import { Button } from "@/app/components/shared/button.component";
import { useRouter } from "next/navigation"
import { eventAnalistic } from "@/utils/event-analistic";
const ModalAddAdvertising = ({ refModel }: { refModel: React.RefObject<ModalRef> }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()
  let {
    loading,
    message,
    data: dataOrder,
    dataSelect
  } = useSelector<RootState>((state) => state.myAdvertise) as {
    loading: boolean;
    message: string;
    data: any;
    dataSelect:any
  };
  let [property_id, setPropertyId] = useState<number>()
  let [show, setShow] = useState<boolean>(false)

  const { token } = useSelector<RootState>(
    (state) => state.register
  ) as { token: string };
  useEffect(() => {
    dispatch(fetchToken())
  }, [dispatch])
  useEffect(() => {
    if (token) {
      dispatch(getMyAdvertise());
    }
  }, [token, dispatch]);
  return (
    <Modal ref={refModel}>
      <div className="bg-white border-2 rounded-md">
        <div className="flex items-center justify-end p-2 border-b-2 border-gray-400 gap-x-3">
          <p className="text-black font-bold">أعلان جديد</p>
          <IoMdClose className="text-gray-600 " onClick={() => refModel?.current?.close()} />
        </div>
        <div className="flex flex-col items-end p-2 my-3">
          <p>اختر الطلب</p>
          <select
            className="border w-full text-right border-[#D1D5DB] rounded-lg"
            onChange={(event) =>
              setPropertyId(Number(event?.target?.value))
            }
          >
             <option value="" selected>--الرجاء الاختيار--</option> 
            {dataSelect?.length>0&&dataSelect?.map((order: any) => (
              <option key={order.id} value={order?.id}>
               رقم الطلب ({order?.id}) {order?.propertyType?.title}
              </option>
            ))}
          </select>
          {show && (
                  <p className="text-xs text-red-600 dark:text-red-500 text-right my-2">
                   يجب ادخال عقار لتعلن عليه
                  </p>
                )}
        </div>
        <div className="flex gap-x-2 items-center p-2">
          <Button text="الغاء"
            className="!flex !flex-row-reverse items-center justify-center gap-2 bg-white !text-black border-2 border-gray-400"
            onClick={() => refModel?.current?.close()}
          />
          <Button
            text="متابعة"
            className="!flex !flex-row-reverse items-center justify-center gap-2"
            onClick={() => {
              if(property_id){
              setShow(false)
              eventAnalistic({
                action: "advertisement_add",
                category: "advertisement",
                label: "Item added to  advertise",
                value: "add  advertise",
              });
              router?.push(`/my-posts/${property_id}/termsandconditions`)
              }else{
                setShow(true)
              }
            }}
          />
        </div>
      </div>
    </Modal>
  )
}
export default ModalAddAdvertising