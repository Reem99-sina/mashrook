import React, { FC ,ChangeEvent} from "react";
import clsx from "clsx";

interface RadioInputProps {
  label?: string;
  name: string;
  value: string;
  checked?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const RadioInput: FC<RadioInputProps> = ({
  label,
  name,
  value,
  checked,
  onChange
}) => {
  return (
    <div
      className="mb-4 flex cursor-pointer items-center flex-row "
      
    >
         <label
        className={`mx-2 cursor-pointer text-sm font-bold ${
          checked ? "text-[#198897]" : "text-prim1"
        } `}
        htmlFor={value}
      >
        {label}
      </label>
      <input
       
        type="radio"
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
        className={clsx("h-4 w-4")}
        id={value}
      />
      
   
    </div>
  );
};
