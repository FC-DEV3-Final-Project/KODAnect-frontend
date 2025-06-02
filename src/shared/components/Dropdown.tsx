import { useState, useRef, useEffect } from "react";
import ArrowIcon from "@/assets/icon/arrow-down.svg";
import CheckIcon from "@/assets/icon/check.svg";

/**
 * Example usage:
 *
 * const [selected, setSelected] = useState("");
 *
 * <div className="h-[4.8rem] w-[15rem]">
 *     <Dropdown
 *        options={[
 *         { label: "공지사항", value: "notice" },
 *         { label: "이벤트", value: "event" },
 *       ]}
 *       value={selected}
 *       onChange={setSelected}
 *       placeholder="전체"
 *     />
 *   </div>
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

  const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <div
      ref={dropdownRef}
      className="relative w-full min-w-[8rem] mobile:w-full mobile:min-w-[8rem]"
    >
      <button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="dropdown-listbox"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-g3 rounded-r3 border border-gray-60 bg-white px-p6 py-p4 text-b-md text-gray-90 focus:outline focus:outline-2 focus:outline-primary-50 mobile:h-full mobile:text-b-sm"
      >
        {selectedLabel}
        <img
          src={ArrowIcon}
          alt="arrow"
          className={`h-icon2 w-icon2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          id="dropdown-listbox"
          aria-labelledby="dropdown-button"
          className="absolute z-10 mt-2 w-fit min-w-[13rem] rounded-r4 border border-gray-20 bg-white p-p3 shadow-s2 mobile:w-full"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li
                role="option"
                aria-selected={isSelected}
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex w-full cursor-pointer items-center gap-g3 rounded-r3 px-p6 py-p4 text-b-md mobile:text-b-sm ${
                  isSelected
                    ? "bg-secondary-5 text-secondary-80"
                    : "text-gray-90 hover:bg-secondary-5 active:bg-secondary-10"
                }`}
              >
                {isSelected && (
                  <img src={CheckIcon} className="mr-1 h-icon2 w-icon2" alt="선택됨" />
                )}
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
