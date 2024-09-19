import {detailOneInfo,landInfo} from "@/type/addrealestate"
interface compareEle{
    array1:landInfo[]|detailOneInfo[],
    array2:landInfo[]|detailOneInfo[]
}
export const compare=(array1?:(landInfo[]|detailOneInfo[]),array2?:(landInfo[]|detailOneInfo[]))=>{
    const ids:number[]=[]
    if(array1&&array2){
        array1?.filter((ele:(landInfo|detailOneInfo),index:number)=>{
            Object.keys(ele).filter((key:string)=>{
               if(ele[key  as keyof (landInfo|detailOneInfo)]!=array2[index][key as keyof (landInfo|detailOneInfo)]&&ele?.id){
                ids.push(ele?.id)
               }
            })
        })
    }
   return ids
}