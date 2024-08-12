import React, { ReactNode ,useState,useRef,ChangeEvent} from 'react';
function AccordionComponent({children,title,floors,onChange,value}:{
    children:ReactNode
    ,title:string
    ,floors:{name:string}[]
    ,onChange:(event: ChangeEvent<HTMLInputElement>) => void,
    value:string
}) {
  return (
    <div className="relative mb-3 border-b border-solid">
    <h6 className="mb-0">
      <div
        className="relative flex items-center w-full p-4 font-semibold text-right  transition-all ease-in  cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-dark-500"
        style={{direction:"rtl"}}

      >
       <input
      
        type="checkbox"
        // checked={selectedCites.forEach((c) => c.id !== cite.id)}
        // onChange={() => handleCiteChange(cite)}
        className="checked:accent-[#3B73B9] w-[16px] h-[16px]  radioCheck"
        
        onChange={onChange}
        value={title}
        checked={value==title}
         name="floorType"
        />
        <label className="mx-2 font-normal">{title}</label>
      </div>
    </h6>
    {value==title?<div
      className={" overflow-hidden transition-all duration-300 ease-in-out"}
    >
     {children}
    </div>:<></>}
    
  </div>
  )
}
export default AccordionComponent