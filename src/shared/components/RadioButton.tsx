interface RadioOption {
  label: string;
  value: string;
}

interface RadioButtonProps {
  name: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function RadioButton({
  name,
  options,
  selectedValue,
  onChange,
  className,
}: RadioButtonProps) {
  return (
    <div className={`flex gap-g6 mobile:flex-col mobile:gap-g3 ${className}`}>
      {options.map((option) => {
        const isSelected = selectedValue === option.value;

        return (
          <label
            key={option.value}
            className="relative flex cursor-pointer select-none items-center gap-g3"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
              className="absolute h-0 w-0 opacity-0"
            />
            <span
              className={`flex h-icon3 w-icon3 items-center justify-center rounded-full border transition-colors ${isSelected ? "border-primary-50" : "border-gray-60"}`}
            >
              <span
                className={`h-icon1 w-icon1 rounded-full bg-primary-50 transition-opacity ${isSelected ? "opacity-100" : "opacity-0"}`}
              />
            </span>
            <span className="text-b-lg text-gray-95 mobile:text-b-sm">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}
