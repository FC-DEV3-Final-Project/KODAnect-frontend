import { useState } from "react";
import DatePicker from "./shared/components/calendar/DatePicker";

function App() {
  const [range, setRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });

  return (
    <div>
      <DatePicker range={range} onRangeChange={setRange} />
    </div>
  );
}

export default App;
