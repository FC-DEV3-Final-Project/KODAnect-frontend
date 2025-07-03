import clsx from "clsx";
import ArrowDropdown from "@/assets/icon/arrow-drop-down.svg?react";
import CheckIcon from "@/assets/icon/check.svg?react";

interface DropdownSelectProps {
  items: number[];
  selectedItem: number;
  formatItem: (item: number) => string;
  onSelect: (item: number) => void;
  buttonLabel: string;
  open: boolean;
  onToggle: () => void;
}

export function DropdownSelect({
  items,
  selectedItem,
  formatItem,
  onSelect,
  buttonLabel,
  open,
  onToggle,
}: DropdownSelectProps) {
  return (
    <div className="relative">
      <button
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={onToggle}
        className="flex items-center gap-g2 text-h-sm font-bold text-gray-70"
      >
        {buttonLabel}
        <ArrowDropdown className="h-icon2 w-icon2" />
      </button>

      {open && (
        <ul className="absolute left-1/2 top-full z-10 mt-[0.4rem] w-[14.4rem] -translate-x-1/2 rounded-r4 border border-gray-30 bg-white p-p3 shadow-s3">
          {items.map((item) => {
            const isSelected = item === selectedItem;
            return (
              <li
                key={item}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onSelect(item);
                  onToggle();
                }}
                className={clsx(
                  "flex h-[4.2rem] cursor-pointer items-center rounded-r3 px-p4 text-b-sm",
                  {
                    "bg-secondary-10": isSelected,
                    "text-gray-90 hover:bg-secondary-5 active:bg-secondary-10": !isSelected,
                  },
                )}
              >
                <div className="flex w-full items-center justify-center gap-g3">
                  {isSelected && <CheckIcon className="h-icon2 w-icon2" />}
                  <span>{formatItem(item)}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
