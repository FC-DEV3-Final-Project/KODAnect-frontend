import { forwardRef } from "react";
import CalendarIcon from "@/assets/icon/calendar.svg?react";
import { format } from "date-fns";

interface DateInputProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value?: Date;
  placeholder: string;
  onClick: () => void;
  onOpen?: () => void;
}

const DateInput = forwardRef<HTMLButtonElement, DateInputProps>(
  ({ value, placeholder, onClick, onOpen, ...props }, ref) => {
    const formatted = value ? format(value, "yyyy.MM.dd") : placeholder;

    return (
      <button
        ref={ref}
        onClick={() => {
          onClick();
          onOpen?.();
        }}
        onFocus={onOpen}
        aria-label={
          value
            ? `${formatted} 선택됨. 날짜 변경하려면 클릭하세요.`
            : "날짜 선택. 클릭하면 달력이 열립니다."
        }
        className="flex h-[4.8rem] w-full items-center justify-between rounded-r3 border border-gray-60 bg-white px-p6 text-left text-b-md text-gray-90 focus:border-2 focus:border-secondary-50 mobile:h-[4rem] mobile:w-full mobile:text-b-sm mobile:leading-[2]"
        {...props}
      >
        <span className={value ? "" : "text-gray-50"}>{formatted}</span>
        <CalendarIcon className="h-icon3 w-icon3 text-gray-80" />
      </button>
    );
  },
);

export default DateInput;
