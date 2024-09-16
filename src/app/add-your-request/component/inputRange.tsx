import { TextInput } from "@/app/components/shared/text-input.component";
interface InputInfo{
    price:number[],
    onChange:(values:number[])=>void
}
const InputRange=({price,onChange}:InputInfo)=>{
    return (
        <>
        <div className="flex gap-x-2 justify-end">
        <div className="flex items-end justify-end flex-col ">
                          <p className="text-base text-[#4B5563] font-medium">
                          اعلي سعر 
                          </p>
                          
                          <TextInput
                            inputProps={{ placeholder: "-- الرجاء الادخال --" }}
                            onChange={(event)=>onChange([price[0],Number(event.target.value)])}
                            value={price[1]}
                            type="number"
                          />
                          </div>
                          <div className="flex items-end  justify-end flex-col ">
                          <p className="text-base text-[#4B5563] font-medium">
                          ادني سعر
                          </p>
                          <TextInput
                            inputProps={{ placeholder: "-- الرجاء الادخال --" }}
                            onChange={(event)=>onChange([Number(event.target.value),price[1]])}
                            value={price[0]}
                            type="number"
                          />
                          </div>
        </div>
        </>
    )
}
export default InputRange