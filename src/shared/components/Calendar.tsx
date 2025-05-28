// components/DateRangePicker.tsx
import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import CalendarIcon from "@/assets/icon/calendar.svg";

function DateInput({
  value,
  placeholder,
  onClick,
}: {
  value: Date | null;
  placeholder: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex h-[4.8rem] w-[22.3rem] items-center justify-between rounded-r3 border border-gray-30 bg-white px-p5 text-left text-b-md text-gray-90"
    >
      <span className={value ? "" : "text-gray-50"}>
        {value ? format(value, "yyyy.MM.dd") : placeholder}
      </span>
      <img src={CalendarIcon} alt="calendaricon" className="h-icon2 w-icon2" />
    </button>
  );
}

// DateRangePicker.tsx
export default function DateRangePicker() {
  const [range, setRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });
  const [open, setOpen] = useState<"from" | "to" | null>(null);
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

  return (
    <div className="relative" ref={ref}>
      <div className="inline-flex items-center gap-g3">
        <DateInput value={range.from} placeholder="YYYY.MM.DD" onClick={() => setOpen("from")} />
        <span className="text-b-md text-gray-40">-</span>
        <DateInput value={range.to} placeholder="YYYY.MM.DD" onClick={() => setOpen("to")} />
      </div>

      {open && (
        <div className="absolute mt-2 h-[52rem] w-[38.4rem] rounded-r6 border border-gray-30 bg-white shadow-s2">
          <DayPicker
            mode="single"
            selected={open === "from" ? (range.from ?? undefined) : (range.to ?? undefined)}
            onSelect={(date) => date && handleSelect(date)}
            locale={ko}
            captionLayout="dropdown"
            fromYear={2000}
            toYear={2035}
            showOutsideDays
            classNames={{
              root: "bg-gray-5 rounded-r3 pt-p6 w-full h-[44.8rem]",
              nav: "hidden",

              caption: "flex items-center justify-between px-p5 mb-p3",
              caption_dropdowns: "flex items-center gap-g2",

              caption_label: "",
              dropdown_month: "rounded border border-gray-30 px-p3 py-p2 text-b-md",
              dropdown_year: "rounded border border-gray-30 px-p3 py-p2 text-b-md",

              head_row: "grid grid-cols-7 text-center mt-g3 mb-g1",
              head_cell: "text-gray-40",
              row: "grid grid-cols-7 text-center",
              cell: "w-[4.4rem] h-[4.4rem] flex items-center justify-center",
              day: "w-full h-full rounded-full hover:bg-gray-10 text-b-md",
              day_selected: "bg-primary-50 text-white",
              day_today: "relative border border-gray-30",
              day_outside: "text-gray-30",

              footer: "flex justify-between",
            }}
            modifiersClassNames={{
              today:
                "after:content-[''] after:absolute after:bottom-[0.3rem] after:w-[0.4rem] after:h-[0.4rem] after:rounded-full after:bg-point-40",
              selected: "bg-primary-50 text-white",
            }}
            className="text-b-md"
          />

          <div className="flex justify-between px-p8 py-p6">
            <button className="text-b-md text-gray-70">오늘</button>
            <div className="flex gap-g3">
              <button
                onClick={() => setOpen(null)}
                className="rounded-r3 border border-gray-30 px-p5 py-p3 text-b-md text-gray-90"
              >
                취소
              </button>
              <button
                onClick={() => setOpen(null)}
                className="rounded-r3 bg-primary-50 px-p5 py-p3 text-b-md text-white"
              >
                선택
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
