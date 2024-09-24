import { Modal, ModalRef } from "@/app/components/shared/modal.component";
import { IoMdClose } from "react-icons/io";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {useState,useEffect} from "react"
import { getRequest } from "@/redux/features/getOrders";
import {fetchToken}from "@/redux/features/userSlice"
import { Button } from "@/app/components/shared/button.component";
import {useRouter} from "next/navigation"
const ModalAddAdvertising=({refModel}:{refModel:React.RefObject<ModalRef>})=>{
    const dispatch = useDispatch<AppDispatch>();
    const router=useRouter()
    let {
        loading,
        message,
        data: dataOrder,
      } = useSelector<RootState>((state) => state.requests) as {
        loading: boolean;
        message: string;
        data: any;
      };
      let [property_id,setPropertyId]=useState<number>()
    const {  token } = useSelector<RootState>(
      (state) => state.register
    ) as {  token:string };
    console.log(dataOrder,"dataOrder")
    useEffect(() => {
      dispatch(fetchToken())
    }, [dispatch])
    useEffect(() => {
      if (token) {
        dispatch(getRequest({}));
      }
    }, [token, dispatch]);
    return (
        <Modal ref={refModel} size="sm" >
                <div className="bg-white border-2 rounded-md">
                    <div className="flex items-center justify-end p-2 border-b-2 border-gray-400 gap-x-3">
                        <p className="text-black font-bold">أعلان جديد</p>
                        <IoMdClose className="text-gray-600 " onClick={()=>refModel?.current?.close()}/>
                    </div>
                    <div className="flex flex-col items-end p-2 my-3">
                        <p>اختر الطلب</p>
                        <select
                    className="border w-full text-right border-[#D1D5DB] rounded-lg"
                    onChange={(event) =>
                        setPropertyId(Number(event?.target?.value))
                    }
                  >
                    {dataOrder?.map((order:any)=>(
                        <option key={order.id} value={order?.propertyType?.id}>
                        {order?.propertyType?.title}
                      </option>
                    ))}
                        </select>

                    </div>
                    <div className="flex gap-x-2 items-center p-2">
                        <Button  text="الغاء"
          className="!flex !flex-row-reverse items-center justify-center gap-2 bg-white !text-black border-2 border-gray-400"
          onClick={()=>refModel?.current?.close()}
          />
                        <Button
          text="متابعة"
          className="!flex !flex-row-reverse items-center justify-center gap-2"
          onClick={()=>router?.push(`/my-posts/${property_id}/termsandconditions`)}
        />
                    </div>
                </div>
        </Modal>
    )
}
export default ModalAddAdvertising