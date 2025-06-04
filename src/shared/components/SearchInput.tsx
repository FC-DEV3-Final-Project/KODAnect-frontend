import { useState } from "react";
import type { FormEvent } from "react";
import SearchIcon from "@/assets/icon/search.svg?react";

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
          className="w-full rounded-r3 border border-gray-60 py-p4 pl-p6 pr-p10 text-b-md text-gray-90 placeholder:text-gray-40 focus:outline-2 focus:outline-primary-50"
        />

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
