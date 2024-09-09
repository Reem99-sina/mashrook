import dynamic from "next/dynamic"
import { IoMdClose } from "react-icons/io";
const Map = dynamic(() => import("../../components/shared/map"), { ssr:false })
import { Modal, ModalRef } from "@/app/components/shared/modal.component";
const ModalMapComponent=({
    lat,long,refModel
}:{refModel:React.RefObject<ModalRef>,lat:number,long:number})=>{
    return (
        <>
         <Modal ref={refModel} size="sm" >
            <div className="bg-white rounded-lg p-2">
                <div className="cursor-pointer text-right flex justify-end" onClick={()=>refModel?.current?.close()}>
                    <IoMdClose className="text-black"/>
                </div>
 <Map latitude={lat}longitude={long}/>
 </div>
 </Modal>
        </>
    )
}
export default ModalMapComponent