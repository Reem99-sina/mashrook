
import {ChangeEvent} from "react"
interface CheckFeatureInter{
    onChange:(event: ChangeEvent<HTMLInputElement>) => void,
    title:string,
   checked?:boolean
}
const CheckFeature:React.FC<CheckFeatureInter>=({
    title,
    onChange,
    checked
})=> {
  return (
    <div
    style={{ direction: "rtl" }}
    className="flex flex-row gap-2 items-center mt-2 mb-2"
  >
    <input
      type="checkbox"
      className="h-4 w-4 rounded-2xl accent-[#3B73B9]"
      onChange={onChange}
      checked={checked}
    />
    <p>{title}</p>
  </div>
  )
}
export default CheckFeature