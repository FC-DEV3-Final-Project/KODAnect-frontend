import { useState, useRef, useEffect } from "react";
import DateInput from "@/shared/components/calendar/DateInput";
import Calendar from "@/shared/components/calendar/Calendar";
function DatePicker() {
  const [range, setRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });
  const [open, setOpen] = useState<"from" | "to" | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    document.addEventListener("mousedown", closeOnClickOutside);
    return () => document.removeEventListener("mousedown", closeOnClickOutside);
  }, []);

  const handleSelect = (date: Date) => {
    if (open === "from") {
      setRange((prev) => ({ ...prev, from: date }));
      setOpen(null);
    } else if (open === "to") {
      setRange((prev) => ({ ...prev, to: date }));
      setOpen(null);
    }
  };

  const handleTodayClick = () => {
    const today = new Date();

    setCurrentMonth(today); // 오늘 날짜가 있는 월로 이동
    if (open === "from") {
      setRange((prev) => ({ ...prev, from: today }));
    } else if (open === "to") {
      setRange((prev) => ({ ...prev, to: today }));
    }
  };

  return (
    <div className="relative" ref={ref}>
      <div className="inline-flex items-center gap-g3">
        <DateInput
          aria-haspopup="dialog"
          aria-expanded={open === "from"}
          aria-controls="calendar-dialog"
          value={range.from ?? undefined}
          placeholder="YYYY.MM.DD"
          onClick={() => {
            setOpen("from");
            if (range.from) setCurrentMonth(range.from);
          }}
        />
        <span className="text-b-sm text-gray-70">-</span>
        <DateInput
          aria-haspopup="dialog"
          aria-expanded={open === "to"}
          aria-controls="calendar-dialog"
          value={range.to ?? undefined}
          placeholder="YYYY.MM.DD"
          onClick={() => {
            setOpen("to");
            if (range.to) setCurrentMonth(range.to);
          }}
        />
      </div>

      {open && (
        <div
          id="calendar-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="날짜 선택 달력"
          className="z-50 mt-2"
        >
          <Calendar
            selected={open === "from" ? (range.from ?? undefined) : (range.to ?? undefined)}
            onSelect={handleSelect}
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
            onCancel={() => setOpen(null)}
            onTodayClick={handleTodayClick}
          />
        </div>
      )}
    </div>
  );
}

export default DatePicker;
