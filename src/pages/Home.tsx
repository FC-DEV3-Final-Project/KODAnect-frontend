import { useState } from "react";
import DatePicker from "@/shared/components/calendar/DatePicker";

export default function Home() {
  const [range, setRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });
  return (
    <div>
      Home
      <DatePicker range={range} onRangeChange={setRange} />
    </div>
  );
}
