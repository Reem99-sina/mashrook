"use client"
import {useEffect,useState} from "react"
import Image from "next/image"
import {Button} from "./button.component"
import {X} from "@/app/assets/svg"
import {imageInfo} from "@/type/addrealestate"

const ImageAppear: React.FC<{images?:(imageInfo|File)[],onDelete:(index:imageInfo)=>void,links?:imageInfo[]}>=({images,onDelete,links})=>{
 
    const [urls,setUrls]=useState<imageInfo[]>(links?links:[])
    function readAndPreview(file:any) {
        // Make sure `file.name` matches our extensions criteria
        if((file instanceof File)==true){
          if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            const reader = new FileReader();
      
            reader.addEventListener(
              "load",
              () => {
              if(reader?.result){
                  setUrls((prevs)=>[...prevs,{name:file?.name,link:reader?.result}])
              }
              //   preview.appendChild(image);
              },
              false,
            );
      
            reader.readAsDataURL(file);
        }
        
        }else{
          
          setUrls((prevs)=>[...prevs,file])
        }
      }
  // useEffect(()=>{
  //         if(links&&links?.length>0){
  //           setUrls(links)
  //         }
  // },[links])
    useEffect(()=>{
        Array.prototype.forEach.call(images, readAndPreview);
        return ()=>{
            setUrls([])
        }
    },[images])
 
    return<>
    <div className="flex gap-1 flex-row-reverse items-center flex-wrap">
        {urls?.map((url,ind)=><div key={ind} className="flex gap-x-2 shadow-lg shadow-gray-500/40 border-2 border-solid border-gray-500/40 rounded-md p-4">
            <div className="self-start" onClick={()=>{
              
               setUrls((prev)=>prev.filter((img,index)=>img?.name!=url?.name))
                onDelete(url)
            }}>
                <Image
                  src={X}
                  width={15}
                  height={15}
                  alt={"add"}
                /> 
            </div>
            <p>{url?.name}</p>
            {url?.link&&<Image src={String(url?.link)} width={42} height={40} alt={String(url?.link)}/>}
        </div>
        )}
        
    </div>
    </>
}
export default ImageAppear