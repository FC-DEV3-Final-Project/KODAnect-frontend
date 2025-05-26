import CheckIcon from "@/assets/icon/check.svg?react";
import type { CheckboxProps } from "@/shared/types/checkbox.types";

export function Checkbox({ id, label, checked, onChange, disabled = false }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={`inline-flex cursor-pointer select-none items-center gap-g3 ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      <input
        id={id}
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={() => onChange()}
        disabled={disabled}
        aria-disabled={disabled}
      />

      <div
        className={`mobile:w-[1.6rem] mobile:h-[1.6rem] flex h-[2rem] w-[2rem] items-center justify-center rounded-r2 border border-gray-60 bg-white transition-colors duration-150 peer-checked:border-primary-50 peer-checked:bg-primary-50 peer-disabled:bg-gray-10`}
      >
        {checked && (
          <CheckIcon className="mobile:h-icon1 mobile:w-icon1 h-icon2 w-icon2 text-white" />
        )}
      </div>

      {/* 라벨 텍스트 */}
      <span className="mobile:text-b-md text-b-lg text-gray-95">{label}</span>
    </label>
  );
}
