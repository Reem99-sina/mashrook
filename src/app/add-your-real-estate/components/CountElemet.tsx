import {Button} from "../../components/shared/button.component"
import { Add, Sub } from "../../assets/svg";
import Image from "next/image"
interface CountElementInter{
    value:string,
    onChange:(num:number)=>void,
    title:string
}
const CountElement:React.FC<CountElementInter>=({value,onChange,title})=>{
    
    return  <div className="border-2 border-solid border-gray-200 rounded-md flex items-center justify-between">

        <button 
        onClick={(e)=>{
            e.preventDefault()
            onChange(Number(value)+1)
        }}
        className="w-[75px] h-[50px] rounded-r-lg bg-[#3B73B9] flex items-center justify-center">
        <Image
                  src={Add}
                  width={25}
                  height={25}
                  alt={"add"}
                />   
        </button>
        <p className="">
            {value}
            {title}
        </p>
        <button  onClick={(e)=>{
             e.preventDefault()
             if(Number(value)>0){
                onChange(Number(value)-1)

             }
            }} className="w-[75px] h-[50px] rounded-l-lg bg-[#3B73B9] flex items-center justify-center">
        <Image
                  src={Sub}
                  width={21}
                  height={21}
                  alt={"add"}
                />   
</button>
    </div>
}
export default CountElement