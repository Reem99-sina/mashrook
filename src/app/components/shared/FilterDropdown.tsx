import { ArrowDropUp } from "@/app/assets/svg";
import { useState } from "react";

interface FilterDropdownProps {
  options: string[];
  onSelect: (option: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  options,
  onSelect,
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
        <div className="origin-top-left absolute right-[-190px] mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-right"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
