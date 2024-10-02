"use client";

import clsx from "clsx";
import React, {
  FC,
  HTMLInputTypeAttribute,
  useState,
  ChangeEvent,
} from "react";

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
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  autoComplete?:string,
  name?:string
}

export const TextInput: FC<Props> = ({
  label,
  inputProps = {},
  type = "text",
  errorMessage,
  fontFamily,
  disabled,
  containerClasses,
  icon,
  currency,
  maxLength,
  onChange,
  value,
  autoComplete,name
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={clsx("h-full w-full", containerClasses)}>
      {label && (
        <label
          className={clsx(
            "mb-2  text-base font-bold text-[#4B5563]  items-start flex justify-end",
            errorMessage && "dark:text-error-dark text-error"
          )}
        >
          {label}
        </label>
      )}
      <div className="relative flex min-h-[40px] items-center ">
        {inputProps.type === "password" && (
          <div
            className="absolute left-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
            onClick={togglePasswordVisibility}
          ></div>
        )}
        <input
          min="0"
          {...inputProps}
          disabled={disabled}
          type={showPassword && type === "password" ? "password" : type}
          style={{
            fontFamily: fontFamily,
          }}
          className="relative block w-full px-3 py-2 border border-gray-300 rounded-lg bg-[#F9FAFB] focus:outline-none focus:ring-black focus:border-black sm:text-sm placeholder:text-right text-right"
          maxLength={maxLength}
          onChange={onChange}
          value={value}
          name={name}
           autoComplete={`${autoComplete}`}
        />

        {currency && (
          <p
            className={clsx(
              "-mr-[42px] text-sm font-bold text-[#474747] opacity-60"
            )}
          >
            {currency}
          </p>
        )}

        {icon && <div className={clsx("-ms-[8%] z-50")}>{icon}</div>}
      </div>
      {errorMessage && (
        <p className="mt-4 text-xs text-red-600 dark:text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
