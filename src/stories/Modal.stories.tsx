import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "@/shared/components/Modal";
import { useState } from "react";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Modal>;

// 비밀번호 입력용 모달
export const InputModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [password, setPassword] = useState("");

    return (
      <>
        <button onClick={() => setIsOpen(true)}>비밀번호 모달 열기</button>
        {isOpen && (
          <Modal
            type="input"
            title="비밀번호 확인"
            placeholder="비밀번호를 입력하세요"
            password={password}
            setPassword={setPassword}
            onClose={() => setIsOpen(false)}
            onSubmit={() => {
              setIsOpen(false);
            }}
          />
        )}
      </>
    );
  },
};

// 텍스트 안내형 모달
export const TextModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button onClick={() => setIsOpen(true)}>안내 모달 열기</button>
        {isOpen && (
          <Modal
            type="text"
            description={`삭제하면 되돌릴 수 없습니다.\n정말 삭제하시겠어요?`}
            onClose={() => setIsOpen(false)}
            onSubmit={() => {
              setIsOpen(false);
            }}
          />
        )}
      </>
    );
  },
};
