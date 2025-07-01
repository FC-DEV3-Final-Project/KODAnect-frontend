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
  className?: string;
};

export function Dropdown({ options, value, onChange, placeholder, className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [focusIndex, setFocusIndex] = useState<number>(-1);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 키보드로 드롭다운 선택
  useEffect(() => {
    if (isOpen) {
      setFocusIndex(options.findIndex((opt) => opt.value === value));
    }
  }, [isOpen, options, value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    //화살표로 이동
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusIndex((prev) => (prev + 1) % options.length); // 순환(맨 아래에서 누르면 맨 위로 이동)
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusIndex((prev) => (prev - 1 + options.length) % options.length); //인덱스가 음수가 되지 않도록 조정
    } else if (e.key === "Enter") {
      //enter로 선택
      e.preventDefault();
      const selectedOption = options[focusIndex];
      if (selectedOption) {
        onChange(selectedOption.value);
        setIsOpen(false);
      }
    } else if (e.key === "Escape") {
      // esc로 닫기
      setIsOpen(false);
    }
  };

  const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <div ref={dropdownRef} className={`relative w-full min-w-[8rem] ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="dropdown-listbox"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="flex h-full w-full items-center justify-between gap-g3 rounded-r3 border border-gray-60 bg-white px-p6 py-p4 text-b-md text-gray-90 focus:outline focus:outline-2 focus:outline-secondary-50 mobile:text-b-sm"
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
          className="absolute z-10 mt-2 w-fit min-w-[10.4rem] rounded-r4 border border-gray-20 bg-white p-p3 shadow-s2 mobile:w-full"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isFocused = index === focusIndex;
            return (
              <li
                role="option"
                aria-selected={isSelected}
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex w-full cursor-pointer items-center gap-g3 rounded-r3 px-p6 py-p4 text-b-md mobile:text-b-sm ${isFocused ? "bg-secondary-10" : ""} ${isSelected ? "bg-secondary-5 text-secondary-80" : "text-gray-90 hover:bg-secondary-5 active:bg-secondary-10"} `}
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
