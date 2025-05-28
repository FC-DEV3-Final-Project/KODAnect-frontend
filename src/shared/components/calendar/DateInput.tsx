import CalendarIcon from "@/assets/icon/calendar.svg?react";

type DateInputProps = {
  value?: Date;
  placeholder: string;
  onClick: () => void;
};

function DateInput({ value, placeholder, onClick }: DateInputProps) {
  const formatted = value ? value.toLocaleDateString("ko-KR") : placeholder;

  return (
    <button
      onClick={onClick}
      className="flex h-[4.8rem] w-[22.3rem] items-center justify-between rounded-r3 border border-gray-30 bg-white px-p5 text-left text-b-md text-gray-90"
    >
      <span className={value ? "" : "text-gray-50"}>{formatted}</span>
      <CalendarIcon className="h-icon3 w-icon3 text-gray-80" />
    </button>
  );
}

export default DateInput;
