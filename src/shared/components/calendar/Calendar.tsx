import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  isSameDay,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import clsx from "clsx";
import Arrow from "@/assets/icon/round-arrow.svg?react";
import ArrowDropdown from "@/assets/icon/arrow-drop-down.svg?react";
import { Button } from "@/shared/components/Button";

type CalendarProps = {
  selected: Date | undefined;
  onSelect: (date: Date) => void;
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  onCancel: () => void;
  onTodayClick: () => void;
};

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

const getCalendarDays = (currentMonth: Date) => {
  const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });
  return eachDayOfInterval({ start, end });
};

function Calendar({
  selected,
  onSelect,
  currentMonth,
  onMonthChange,
  onCancel,
  onTodayClick,
}: CalendarProps) {
  const calendarDays = getCalendarDays(currentMonth);
  const [yearOpen, setYearOpen] = useState(false);
  const [monthOpen, setMonthOpen] = useState(false);
  const years = Array.from({ length: 6 }, (_, i) => 2020 + i).reverse(); // 2020~2025
  const months = Array.from({ length: 12 }, (_, i) => i + 1); //1 ~ 12

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + (direction === "prev" ? -1 : 1));
    onMonthChange(newMonth);
  };

  const weeks: Date[][] = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  return (
    <div className="flex h-[48.2rem] w-[38.4rem] flex-col rounded-r6 border border-gray-30 bg-white">
      <div className="h-[41rem] rounded-t-r6 bg-secondary-5 pt-p6">
        {/* 헤더 */}
        <div className="relative flex items-center justify-between px-p8 py-p3">
          <button
            onClick={() => navigateMonth("prev")}
            aria-label="이전 달"
            className="rounded-full hover:bg-white"
          >
            <Arrow className="h-icon5 w-icon5" />
          </button>
          <div className="flex items-center gap-g5">
            {/* 연도 드롭다운 */}
            <div className="relative">
              <button
                id="year-button"
                aria-haspopup="listbox"
                aria-expanded={yearOpen}
                aria-controls="year-listbox"
                onClick={() => {
                  setYearOpen((prev) => !prev);
                  setMonthOpen(false);
                }}
                className="flex items-center gap-g2 text-h-sm font-bold text-gray-70"
              >
                {format(currentMonth, "yyyy년")}
                <ArrowDropdown className="h-icon2 w-icon2" />
              </button>

              {/* 연도  선택 드롭다운*/}
              {yearOpen && (
                <ul
                  id="year-listbox"
                  role="listbox"
                  aria-labelledby="year-button"
                  className="absolute left-1/2 top-full z-10 mt-[0.4rem] w-[14.4rem] -translate-x-1/2 rounded-r4 border border-gray-30 bg-white p-p3 shadow-s3"
                >
                  {years.map((y) => (
                    <li
                      key={y}
                      role="option"
                      aria-selected={y === currentMonth.getFullYear()}
                      onClick={() => {
                        const newDate = new Date(currentMonth);
                        newDate.setFullYear(y);
                        onMonthChange(newDate);
                        setYearOpen(false);
                      }}
                      className="h-[4.2rem] cursor-pointer rounded-r3 p-p4 text-center text-b-sm text-gray-90 hover:bg-secondary-5 active:bg-secondary-10"
                    >
                      {y}년
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 월 드롭다운 */}
            <div className="relative">
              <button
                id="month-button"
                aria-haspopup="listbox"
                aria-expanded={monthOpen}
                aria-controls="month-listbox"
                onClick={() => {
                  setMonthOpen((prev) => !prev);
                  setYearOpen(false);
                }}
                className="relative flex items-center gap-g2 text-h-sm font-bold text-gray-70"
              >
                {format(currentMonth, "M월")}
                <ArrowDropdown className="h-icon2 w-icon2" />
              </button>

              {/* 월 선택 드롭다운 */}
              {monthOpen && (
                <ul
                  id="month-listbox"
                  role="listbox"
                  aria-labelledby="month-button"
                  className="absolute left-1/2 top-full z-10 mt-[0.4rem] w-[10rem] -translate-x-1/2 rounded-r4 border border-gray-30 bg-white p-p3 shadow-s3"
                >
                  {months.map((m) => (
                    <li
                      key={m}
                      role="option"
                      aria-selected={m === currentMonth.getMonth() + 1}
                      onClick={() => {
                        const newDate = new Date(currentMonth);
                        newDate.setMonth(m - 1);
                        onMonthChange(newDate);
                        setMonthOpen(false);
                      }}
                      className="h-[4.2rem] cursor-pointer rounded-r3 p-p4 text-center text-b-sm text-gray-90 hover:bg-secondary-5 active:bg-secondary-10"
                    >
                      {m}월
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <button
            onClick={() => navigateMonth("next")}
            aria-label="다음 달"
            className="rounded-full hover:bg-white"
          >
            <Arrow className="h-icon5 w-icon5 -rotate-180" />
          </button>
        </div>

        {/* 날짜 */}
        <div className="flex-1 gap-y-g3 px-p6 py-p6">
          <table className="w-full border-collapse" role="grid" aria-label="날짜 선택 달력">
            <thead>
              <tr>
                {weekdays.map((day) => (
                  <th
                    key={day}
                    scope="col"
                    role="columnheader"
                    className="h-[4.4rem] w-[4.4rem] text-center text-b-sm text-gray-90"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, weekIdx) => (
                <tr key={weekIdx} role="row">
                  {week.map((date) => {
                    const isSelectedDate = selected && isSameDay(date, selected);
                    const isTodayDate = isToday(date);
                    const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                    return (
                      <td key={date.toISOString()} role="gridcell" className="text-center">
                        <button
                          onClick={() => onSelect(date)}
                          aria-label={format(date, "yyyy년 M월 d일")}
                          aria-selected={isSelectedDate}
                          className={clsx(
                            "relative flex h-[4.4rem] w-[4.4rem] items-center justify-center rounded-full text-b-md transition-all duration-150",
                            {
                              "bg-secondary-80 text-white": isSelectedDate,
                              "bg-white text-blue-700": isTodayDate && !isSelectedDate,
                              "text-gray-90 hover:text-blue-600":
                                !isTodayDate && isCurrentMonth && !isSelectedDate,
                              "text-gray-30": !isTodayDate && !isCurrentMonth && !isSelectedDate,
                            },
                          )}
                        >
                          {date.getDate()}
                          {isTodayDate && !isSelectedDate && (
                            <span className="absolute bottom-[0.6rem] h-[0.4rem] w-[0.4rem] rounded-full bg-point-50" />
                          )}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="flex items-center justify-between gap-g5 border-t border-gray-20 px-p8 py-p6">
        <button
          onClick={onTodayClick}
          aria-label="오늘 날짜로 이동"
          className="text-b-sm text-gray-90 hover:text-gray-50"
        >
          오늘
        </button>
        <div className="flex gap-g3">
          <Button size="small" variant="tertiary" onClick={onCancel}>
            취소
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
