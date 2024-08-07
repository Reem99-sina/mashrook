import StyleForm from "./StyleForm"
import {SelectCustomer} from "../../components/shared/select.component"
import {Button} from "../../components/shared/button.component"
import {AddICon} from "@/app/assets/svg"
import Image from "next/image"
function ResidentialLand({
    children
  }: Readonly<{
    children?: React.ReactNode
  }>) {
  return (
    <>
    <StyleForm title="موقع العقار">
        {/* <SelectCustomer>

        </SelectCustomer> */}
        <div className="flex my-4 items-center justify-end w-full">
        
            <h2 className="text-2xl mx-5 text-[#3B73B9] font-bold">إضافة حي/ أحياء</h2>
            <Button
        startIcon={<Image src={AddICon} width={10} height={10} alt="add"/>}
              type="button"
                onClick={()=>{}}
              className="w-[10%] text-xl font-medium text-white bg-[#3B73B9] border border-transparent rounded-md group  focus:outline-none focus:ring-2 focus:ring-offset-2 "
            ></Button>
            </div>
    </StyleForm>
    </>
  )
}
export default ResidentialLand