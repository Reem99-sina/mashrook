import React, { FC } from "react";
import clsx from "clsx";

interface RadioInputProps {
  label?: string;
  name: string;
  value: string;
  checked?: boolean;
  onChange: (value: string) => void;
}

export const RadioInput: FC<RadioInputProps> = ({
  label,
  name,
  value,
  checked,
  onChange,
}) => {
  return (
    <div
      className="mb-4 flex cursor-pointer items-center flex-row-reverse "
      onClick={() => {
        onChange(value);
      }}
    >
      <input
        id={value}
        type="radio"
        value={value}
        name={name}
        checked={checked}
        onChange={() => onChange(value)}
        className={clsx("h-4 w-4")}
      />
      <label
        className={`mx-2 cursor-pointer text-sm font-bold ${
          checked ? "text-[#198897]" : "text-prim1"
        } `}
      >
        {label}
      </label>
    </div>
  );
};
