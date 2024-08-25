import { ArrowDropUp } from "@/app/assets/svg";
import { useState } from "react";

interface FilterDropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  optionFilter?:string
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  options,
  onSelect,
  optionFilter
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md border  shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 "
          onClick={() => setIsOpen(!isOpen)}
        >
          <ArrowDropUp />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-left p-3 absolute right-[-190px] mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
           
          <div className="py-1">
          <h2 className="text-base text-gray-500 mb-4 text-right px-3">ترتيب حسب</h2>
          <ul>
          
            {options.map((option, index) => (
              <li key={index}>
              <button
                
                onClick={() => handleSelect(option)}
                className={`w-full rounded-lg text-sm text-start ${optionFilter==option?"bg-[#3B73B9] bg-opacity-25 text-blue-450":"bg-gray-100"} p-2 mb-2`}
              >
                {option}
              </button>
              </li>
            ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
