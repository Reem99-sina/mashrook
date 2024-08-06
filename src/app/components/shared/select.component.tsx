import React from "react";
import ReactSelect, { PropsValue, SingleValue } from "react-select";

interface Option {
  label: string;
  value: string;
}

interface Props {
  placeholder?: string;
  options: Option[];
  onChange: (value: string) => void;
  defaultValue?: PropsValue<Option>;
  label?: string;
}

export const Select: React.FC<Props> = ({
  placeholder,
  options,
  onChange,
  defaultValue,
  label,
}) => {
  const handleOnChange = (selectedOption: SingleValue<Option>) => {
    if (selectedOption?.value) {
      onChange(selectedOption.value);
    }
  };

  return (
    <>
      {label ? (
        <p className="text-sm font-bold text-[rgba(123,128,128,1)]">{label}</p>
      ) : null}

      <div className="mt-3" />

      <ReactSelect
        placeholder={placeholder ?? ""}
        options={options}
        onChange={handleOnChange}
        defaultValue={defaultValue}
        styles={{
          control: (styles) => ({
            ...styles,
            borderColor: "#E2E2E2",
            borderRadius: "6px",
            // width: "347px",
            width: "full",
            height: "40px",
            boxShadow: "none",
            "&:hover": {},
          }),
          placeholder: (styles) => ({
            ...styles,
            color: "#58595B",
            fontSize: "14px",
            fontWeight: 400,
            opacity: 0.5,
          }),
          dropdownIndicator: (styles) => ({
            ...styles,
            color: "#58595B",
            opacity: 0.5,
            "&:hover": {
              color: "#58595B",
              opacity: 0.5,
            },
          }),
          option: (styles) => ({
            ...styles,
            borderColor: "#E2E2E2",
            borderTopWidth: 1,
          }),
        }}
        components={{ IndicatorSeparator: null }}
      />
    </>
  );
};
