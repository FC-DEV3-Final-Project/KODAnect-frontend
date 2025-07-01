import { useState, useRef, useEffect } from "react";
import DateInput from "@/shared/components/calendar/DateInput";
import Calendar from "@/shared/components/calendar/Calendar";

/**
 * Example usage:
 *
 * const [range, setRange] = useState<{ from: Date | null; to: Date | null }>({
 *   from: null,
 *   to: null,
 * });
 *
 * const fromRef = useRef<HTMLButtonElement>(null);
 *
 * <Label onClick={() => fromRef.current?.focus()}>시작일</Label>
 * <DatePicker range={range} onRangeChange={setRange} fromRef={fromRef}/>
 *
 * - `range`: 날짜 범위 객체 (from, to)
 * - `onRangeChange`: 날짜가 선택될 때 호출되는 콜백
 * - `fromRef`: label 클릭 시 포커스 이동을 위한 버튼 참조
 */

type DateRange = { from: Date | null; to: Date | null };

type DatePickerProps = {
  range: DateRange;
  onRangeChange: (range: DateRange) => void;
  fromRef?: React.Ref<HTMLButtonElement>;
  yearRange?: { start: number; end: number };
};

function DatePicker({ range, onRangeChange, fromRef, yearRange }: DatePickerProps) {
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
      onRangeChange({ ...range, from: date });
      setOpen(null);
    } else if (open === "to") {
      onRangeChange({ ...range, to: date });
      setOpen(null);
    } else {
      // 방어로직
      console.warn(`handleSelect: 예상하지 못한 open 값 "${open}"입니다.`);
      setOpen(null); // UI 복구
    }
  };

  const handleTodayClick = () => {
    const today = new Date();
    setCurrentMonth(today);
  };

  return (
    <div className="relative w-full" ref={ref}>
      <div className="inline-flex w-full items-center gap-g3">
        <DateInput
          ref={fromRef}
          aria-haspopup="dialog"
          aria-expanded={open === "from"}
          aria-controls="calendar-dialog"
          value={range.from ?? undefined}
          placeholder="YYYY.MM.DD"
          onClick={() => {
            setOpen("from");
            if (range.from) setCurrentMonth(range.from);
          }}
          onOpen={() => {
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
          className="absolute z-50 mt-2"
        >
          <Calendar
            selected={open === "from" ? (range.from ?? undefined) : (range.to ?? undefined)}
            onSelect={handleSelect}
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
            onCancel={() => {
              if (open === "from") {
                onRangeChange({ ...range, from: null }); // null -> 입력값 초기화
              } else if (open === "to") {
                onRangeChange({ ...range, to: null });
              }
              setOpen(null);
            }}
            onTodayClick={handleTodayClick}
            yearRange={yearRange}
          />
        </div>
      )}
    </div>
  );
}

export default DatePicker;
