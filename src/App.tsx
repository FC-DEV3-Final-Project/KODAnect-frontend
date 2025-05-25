import { Button } from "@krds-ui/core";
import { TextInput } from "@/shared/components/TextInput";
import { useState } from "react";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <h1 className="text-[42px] font-bold text-red-500">폰트 적용 테스트 합니다</h1>
      <Button children="버튼" size="small" variant="secondary" />
      <TextInput
        id="password"
        height="medium"
        title="레이블"
        description="입력시 필요한 정보를 입력해 주세요"
        placeholder="비밀번호를 입력하세요"
        type={isVisible ? "text" : "password"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        isVisible={isVisible}
        iconToggle
        focusMessage="입력하세요"
        onToggleIconClick={() => setIsVisible((prev) => !prev)}
      />
    </>
  );
}

export default App;
