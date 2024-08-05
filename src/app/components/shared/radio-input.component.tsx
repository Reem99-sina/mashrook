"use client";

import clsx from "clsx";
import React, { FC, HTMLInputTypeAttribute, useState,ChangeEvent } from "react";

interface Props {
  errorMessage?: string;
  label?: string;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & { placeholder?: string };
  type?: HTMLInputTypeAttribute;
  fontFamily?: string;
  disabled?: boolean;
  containerClasses?: string;
  className?: string;
  icon?: React.ReactElement | undefined;
  currency?: string;
  maxLength?: number;
  onChange?:(event: ChangeEvent<HTMLInputElement>) => void;
  value?:any,
  name?:string,
  id?:string
}

export const RadioInput: FC<Props> = ({
  label,
  inputProps = {},
  type = "radio",
  errorMessage,
  fontFamily,
  disabled,
  containerClasses,
    name,
  maxLength,
  onChange,
  value,id
}) => {
 

  return (
    <div className={clsx("text-right h-full  p-2", containerClasses)}>
        
      {label && (
        <label
          className={clsx(
            "text-base font-bold text-[#4B5563] px-3",
            errorMessage && "dark:text-error-dark text-error"
          )}
          for={id}
        >
          {label}
        </label>
      )}
       <input
          min="0"
          {...inputProps}
          disabled={disabled}
          type={ type}
          style={{
            fontFamily: fontFamily,
          }}
          className="  px-3  border border-gray-300 rounded-lg bg-[#F9FAFB] focus:outline-none focus:ring-black focus:border-black sm:text-sm placeholder:text-right text-right"
          maxLength={maxLength}
          onChange={onChange}
          value={value}
          id={id}
          name={name}
        />
     
      {errorMessage && (
        <p className="mt-4 text-xs text-red-600 dark:text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
