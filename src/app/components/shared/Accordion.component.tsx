import React, { ReactNode, useState, ChangeEvent } from "react";
function AccordionComponent({
  children,
  title,
  onChange,
  error,
}: {
  children: ReactNode;
  title: string;
  floors: { name: string }[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative mb-3 border-b border-solid">
      <h6 className="mb-0">
        <div
          className="relative flex items-center w-full p-4 font-semibold text-right  transition-all ease-in  cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-dark-500"
          style={{ direction: "rtl" }}
        >
          <input
            type="checkbox"
            className="checked:accent-[#3B73B9] w-[16px] h-[16px]  radioCheck"
            onChange={(e) => {
              onChange(e);
              setOpen(!open);
            }}
            value={title}
            name="floorType"
          />
          <label className="mx-2 font-normal">{title}</label>
          {error && (
            <p className="text-xs text-red-600 dark:text-red-500 text-right">
              {error}
            </p>
          )}
        </div>
      </h6>
      {open && (
        <div
          className={" overflow-hidden transition-all duration-300 ease-in-out"}
        >
          {children}
        </div>
      )}
    </div>
  );
}
export default AccordionComponent;
