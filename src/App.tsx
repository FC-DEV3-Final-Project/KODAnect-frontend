import { useState } from "react";
import { Dropdown } from "@/shared/components/Dropdown";

const options = ["공지사항", "채용·입찰", "테스트"];
function App() {
  const [selected, setSelected] = useState("");
  return (
    <>
      <Dropdown options={options} value={selected} onChange={setSelected} placeholder="전체" />
    </>
  );
}

export default App;
