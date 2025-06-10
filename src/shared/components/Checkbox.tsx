import CheckIcon from "@/assets/icon/check.svg?react";

type CheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
};

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
        className={`flex h-[2rem] w-[2rem] items-center justify-center rounded-r2 border border-gray-60 bg-white transition-colors duration-150 peer-checked:border-secondary-50 peer-checked:bg-secondary-50 peer-disabled:bg-gray-10 mobile:h-[1.6rem] mobile:w-[1.6rem]`}
      >
        {checked && (
          <CheckIcon className="h-icon2 w-icon2 text-white mobile:h-icon1 mobile:w-icon1" />
        )}
      </div>

      {/* 라벨 텍스트 */}
      <span className="text-b-lg text-gray-95 mobile:text-b-md">{label}</span>
    </label>
  );
}
