import { useState } from "react";
import { Button } from "@krds-ui/core";
import { Checkbox } from "@/shared/components/Checkbox";

function App() {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <Checkbox id="agree" label="익명" checked={checked} onChange={() => setChecked(!checked)} />
    </>
  );
}

export default App;
