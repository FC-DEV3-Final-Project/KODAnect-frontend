import { useState } from "react";
import type { FormEvent } from "react";
import SearchIcon from "@/assets/icon/search.svg?react";
import DeleteIcon from "@/assets/icon/delete.svg?react";

/**
 * Example usage:
 *
 * <div className="w-[31.3rem]">
 *   <SearchInput
 *     onSubmit={(keyword: string) => {
 *       // 여기에 검색 결과 필터링 등 실행
 *     }}
 *     placeholder="검색어를 입력해 주세요"
 *   />
 * }
 */

type SearchInputProps = {
  placeholder: string;
  onSubmit: (query: string) => void;
};

function SearchInput({ onSubmit, placeholder }: SearchInputProps) {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    onSubmit(inputValue);
  };

  const handleClear = () => setInputValue("");

  const getPaddingRight = () => {
    if (!inputValue) return "pr-p10"; // SearchIcon만 있을 때
    return "pr-[6.5rem]"; // DeleteIcon + SearchIcon 있을 때
  };

  return (
    <form role="search" onSubmit={handleSubmit} className="w-full">
      <label htmlFor="search-input" className="sr-only">
        검색
      </label>
      <div className="relative w-full">
        <input
          id="search-input"
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={(e) => setInputValue(e.target.value)}
          className={`${getPaddingRight()} w-full rounded-r3 border border-gray-60 py-p4 pl-p6 text-b-md text-gray-90 placeholder:text-gray-40 focus:outline-2 focus:outline-primary-50`}
        />
        {/* 삭제 버튼 */}
        {inputValue && (
          <DeleteIcon
            onClick={handleClear}
            role="button"
            tabIndex={0}
            aria-label="입력값 지우기"
            className="absolute right-[4rem] top-1/2 h-icon3 w-icon3 -translate-y-1/2 cursor-pointer"
          />
        )}
        {/* 검색 버튼 */}
        <SearchIcon
          onClick={() => handleSubmit()}
          role="button"
          className="absolute right-p6 top-1/2 h-icon3 w-icon3 -translate-y-1/2 cursor-pointer hover:text-primary-50"
          aria-label="검색"
        />
      </div>
    </form>
  );
}

export default SearchInput;
