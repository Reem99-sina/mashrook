import { ChangeEvent } from "react";
interface InputAreaPriceInter {
  errors?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  title: string;
  desc?: string;
  measurement: string;
  value?: string | number;
}
const InputAreaPrice: React.FC<InputAreaPriceInter> = ({
  title,
  onChange,
  errors,
  desc,
  measurement,
  value,
}) => {
  return (
    <>
      <div className="mb-4" style={{ direction: "rtl" }}>
        <label className="block mb-2 font-medium">
          {title}
          <span className="text-[#3B73B9]">{desc}</span>{" "}
        </label>
        <div className="flex items-center ">
          <input
            type="number"
            className="  p-2 border border-gray-300 rounded-r-lg w-full "
            placeholder="-- الرجاء الادخال --"
            onChange={onChange}
            value={value}
          />
          <span className="bg-blue-450 text-white  py-2 px-4  rounded-l-lg border-2 border-r-0">
            {measurement}
          </span>
        </div>
        {errors && (
          <p className="text-xs text-red-600 dark:text-red-500 text-right">
            {errors}
          </p>
        )}
      </div>
    </>
  );
};
export default InputAreaPrice;
