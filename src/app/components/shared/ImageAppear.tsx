"use client"
import {useEffect,useState} from "react"
import Image from "next/image"
import {Button} from "./button.component"
import {X} from "@/app/assets/svg"
const ImageAppear: React.FC<{images?:any,onDelete:(index:Number)=>void}>=({images,onDelete})=>{
 
    let [urls,setUrls]=useState<{ name: string; url: string | ArrayBuffer|null  }[]>([])
    function readAndPreview(file:File) {
        // Make sure `file.name` matches our extensions criteria
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
          const reader = new FileReader();
    
          reader.addEventListener(
            "load",
            () => {
            if(reader?.result){
                setUrls((prevs)=>[...prevs,{name:file?.name,url:reader?.result}])
            }
            //   preview.appendChild(image);
            },
            false,
          );
    
          reader.readAsDataURL(file);
        }
      }
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
               setUrls( urls.filter((img,index)=>img?.name!=url?.name))
                onDelete(ind)
            }}>
                <Image
                  src={X}
                  width={15}
                  height={15}
                  alt={"add"}
                /> 
            </div>
            <p>{url?.name}</p>
            {url?.url&&<Image src={String(url?.url)} width={42} height={40} alt={String(url?.url)}/>}
        </div>
        )}
        
    </div>
    </>
}
export default ImageAppear