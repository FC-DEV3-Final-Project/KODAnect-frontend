import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/shared/components/Button";
import TextInput from "@/shared/components/TextInput";
import CloseIcon from "@/assets/icon/close.svg?react";

/**
 * Example usage:
 *
 * // 1. 비밀번호 입력 모달 (type: "input")
 * const [isModalOpen, setIsModalOpen] = useState(false);
 * const [password, setPassword] = useState("");
 *
 * const handleSubmit = () => {
 *   console.log("입력된 비밀번호:", password);
 *   setIsModalOpen(false);
 * };
 *
 * <button onClick={() => setIsModalOpen(true)}>모달 열기</button>
 *
 * {isModalOpen && (
 *   <Modal
 *     type="input"
 *     title="비밀번호 확인"
 *     placeholder="비밀번호를 입력하세요"
 *     password={password}
 *     setPassword={setPassword}
 *     onClose={() => setIsModalOpen(false)}
 *     onSubmit={handleSubmit}
 *   />
 * )}
 *
 * // 2. 단순 안내 모달 (type: "text")
 * const [isModalOpen, setIsModalOpen] = useState(false);
 *
 * const handleDelete = () => {
 *   console.log("삭제 확정");
 *   setIsModalOpen(false);
 * };
 *
 * <button onClick={() => setIsModalOpen(true)}>모달 열기</button>
 *
 * {isModalOpen && (
 *   <Modal
 *     type="text"
 *     description={`삭제하면 되돌릴 수 없습니다.\n정말 삭제하시겠어요?`}
 *     onClose={() => setIsModalOpen(false)}
 *     onSubmit={handleDelete}
 *   />
 * )}
 */

interface ModalProps {
  type?: "text" | "input";
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  password?: string;
  description?: string;
  setPassword?: (value: string) => void;
  placeholder?: string;
}

export function Modal({
  type,
  onClose,
  onSubmit,
  title = "비밀번호 확인",
  password,
  description,
  setPassword,
  placeholder = "비밀번호를 입력하세요",
}: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);

    // 모달 열릴 때 스크롤 막기
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={type === "text" ? "modal-description" : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <div className="relative w-[510px] rounded-r6 border border-gray-30 bg-white px-p9 pb-p9 pt-p8 mobile:w-[328px] mobile:pb-p8">
        <div className="mb-g5 flex justify-end">
          {/* 닫기 버튼 */}
          <button onClick={onClose} aria-label="모달 닫기">
            <CloseIcon className="h-icon4 w-icon4 text-gray-80" />
          </button>
        </div>

        {/* 텍스트 설명 */}
        {type === "text" && (
          <div className="mb-g7 text-center">
            {title && (
              <h2
                id="modal-title"
                className="mb-g5 text-h-md font-bold text-gray-90 mobile:text-h-sm"
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                id="modal-description"
                className="text-h-sm text-gray-80 mobile:whitespace-pre-line mobile:text-b-md"
              >
                {description}
              </p>
            )}
          </div>
        )}

        {/* 타이틀 + 입력창 */}
        {type === "input" && (
          <div className="mb-g7">
            {title && (
              <label
                id="modal-title"
                htmlFor="modal-password"
                className="mb-g5 block text-h-md font-bold text-gray-90"
              >
                {title}
              </label>
            )}
            <TextInput
              id="modal-password"
              type={isVisible ? "text" : "password"}
              height="medium"
              placeholder={placeholder}
              value={password}
              onChange={(e) => setPassword?.(e.target.value)}
              iconToggle
              isVisible={isVisible}
              onToggleIconClick={() => setIsVisible((prev) => !prev)}
            />
          </div>
        )}

        {/* 버튼 영역 */}
        <div className="flex justify-end gap-[12px]">
          <Button variant="primary" size="medium" onClick={onSubmit}>
            삭제
          </Button>
          <Button variant="tertiary" size="medium" onClick={onClose}>
            취소
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
