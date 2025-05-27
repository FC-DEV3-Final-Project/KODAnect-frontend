import { useState } from "react";
import { Dropdown } from "@/shared/components/Dropdown";

const options = [
  { label: "공지사항", value: "notice" },
  { label: "채용·입찰", value: "hiring" },
  { label: "이벤트", value: "event" },
];
function App() {
  const [selected, setSelected] = useState("");
  return (
    <>
      <Dropdown options={options} value={selected} onChange={setSelected} placeholder="전체" />
    </>
  );
}

export default App;
