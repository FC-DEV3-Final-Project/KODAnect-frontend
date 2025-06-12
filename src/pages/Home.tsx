import { Modal } from "@/shared/components/Modal";

import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("입력된 비밀번호:", password);
    // 비밀번호 유효성 검사 로직 추가 가능
    setIsModalOpen(false);
  };

  return (
    <div>
      Home
      <div>
        <button onClick={() => setIsModalOpen(true)}>모달 열기</button>

        {isModalOpen && (
          <Modal
            type="input"
            title="비밀번호 확인"
            placeholder="비밀번호를 입력하세요"
            password={password}
            setPassword={setPassword}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
