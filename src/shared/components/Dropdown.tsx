import { useState, useRef, useEffect } from "react";
import ArrowIcon from "@/assets/icon/arrow-down.svg";
import CheckIcon from "@/assets/icon/check.svg";

type DropdownProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export function Dropdown({ options, value, onChange, placeholder }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="dropdown-listbox"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-[4.8rem] w-[12.1rem] items-center justify-between gap-g3 rounded-r3 border border-gray-60 bg-white px-p5 text-left text-b-md text-gray-90 focus:border-2 focus:border-primary-50 focus:outline-none mobile:h-[4rem] mobile:w-[11.2rem] mobile:text-b-sm"
      >
        {value || placeholder}
        <img
          src={ArrowIcon}
          alt="arrow"
          className={`ml-auto h-icon2 w-icon2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          id="dropdown-listbox"
          aria-labelledby="dropdown-button"
          className="absolute z-10 mt-[0.7rem] w-[12.1rem] rounded-r4 border border-gray-20 bg-white p-p3 mobile:w-[11.2rem]"
        >
          {options.map((option) => (
            <li
              role="option"
              aria-selected={option === value}
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`flex h-[4.6rem] w-full cursor-pointer items-center gap-g3 rounded-r3 px-p2 py-p4 text-b-md mobile:text-b-sm ${
                option === value
                  ? "bg-secondary-5 text-secondary-80"
                  : "text-gray-90 hover:bg-secondary-5 active:bg-secondary-10"
              }`}
            >
              {option === value && (
                <span className="mr-1">
                  <img src={CheckIcon} className="h-icon1 w-icon1" />
                </span>
              )}
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
