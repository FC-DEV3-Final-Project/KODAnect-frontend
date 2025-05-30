import { useState, useRef, useEffect } from "react";
import ArrowIcon from "@/assets/icon/arrow-down.svg";
import CheckIcon from "@/assets/icon/check.svg";

/**
 * Example usage:
 *
 * const [selected, setSelected] = useState("");
 *
 * <Dropdown
 *   options={[
 *     { label: "공지사항", value: "notice" },
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 *   placeholder="전체"
 * />
 *
 * - `options`: label, value 형태의 선택 옵션 배열
 * - `value`: 현재 선택된 항목의 value
 * - `onChange`: 선택 항목이 바뀔 때 호출되는 함수
 * - `placeholder`: 선택되지 않았을 때 표시할 텍스트
 */

type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  options: DropdownOption[];
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
        {options.find((opt) => opt.value === value)?.label || placeholder}
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
              aria-selected={option.value === value}
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`flex h-[4.6rem] w-full cursor-pointer items-center gap-g3 rounded-r3 px-p2 py-p4 text-b-md mobile:text-b-sm ${
                option.value === value
                  ? "bg-secondary-5 text-secondary-80"
                  : "text-gray-90 hover:bg-secondary-5 active:bg-secondary-10"
              }`}
            >
              {option.value === value && (
                <span className="mr-1">
                  <img src={CheckIcon} className="h-icon1 w-icon1" />
                </span>
              )}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
