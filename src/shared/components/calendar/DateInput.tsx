import CalendarIcon from "@/assets/icon/calendar.svg?react";
import { format } from "date-fns";

type DateInputProps = {
  value?: Date;
  placeholder: string;
  onClick: () => void;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value">;

function DateInput({ value, placeholder, onClick }: DateInputProps) {
  const formatted = value ? format(value, "yyyy.MM.dd") : placeholder;

  return (
    <button
      onClick={onClick}
      aria-label={
        value
          ? `${formatted} 선택됨. 날짜 변경하려면 클릭하세요.`
          : "날짜 선택. 클릭하면 달력이 열립니다."
      }
      className="flex h-[4.8rem] w-[22.3rem] items-center justify-between rounded-r3 border border-gray-60 bg-white px-p6 text-left text-b-md text-gray-90 focus:border-2 focus:border-primary-50 mobile:h-[4rem] mobile:w-[15.6rem] mobile:text-b-sm"
    >
      <span className={value ? "" : "text-gray-50"}>{formatted}</span>
      <CalendarIcon className="h-icon3 w-icon3 text-gray-80 mobile:hidden" />
    </button>
  );
}

export default DateInput;
