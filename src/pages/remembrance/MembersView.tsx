import { useState, useRef } from "react";
import DatePicker from "@/shared/components/calendar/DatePicker";
import { Label } from "@/shared/components/Label";

export default function MembersView() {
  const [range, setRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });
  const fromRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      기증자 추모관 상세 페이지
      <Label onClick={() => fromRef.current?.focus()}>시작일</Label>
      <DatePicker range={range} onRangeChange={setRange} fromRef={fromRef} />
    </>
  );
}
