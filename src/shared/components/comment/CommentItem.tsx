import { useState } from "react";

import OptionIcon from "@/assets/icon/ellipsis-vertical.svg?react";
import { Modal } from "@/shared/components/Modal";

type CommentItemProps = {
  id: string;
  content: string;
  date: string;
  author: string;
  isOpen: boolean;
  onToggle: () => void;
};

function CommentItem({ id, content, date, author, isOpen, onToggle }: CommentItemProps) {
  const dropdownId = `comment-dropdown-${author}-${date}`;

  const [isModalOpen, setIsModalOpen] = useState<"edit" | "delete" | null>(null);
  const [password, setPassword] = useState("");

  const handleDelete = () => {
    setIsModalOpen("delete");
    onToggle();
  };

  const handleEdit = () => {
    setIsModalOpen("edit");
    onToggle();
  };

  return (
    <article className="flex flex-col gap-g7 rounded-r6 border border-gray-30 px-6 py-p7 mobile:gap-g4 mobile:p-p6">
      <div className="flex items-start justify-between">
        <p className="text-b-md text-gray-90 mobile:text-b-sm">{content}</p>
        <div className="relative">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={isOpen}
            aria-controls={dropdownId}
            aria-label="댓글 옵션 열기"
            onClick={onToggle}
            className="flex items-center justify-center"
          >
            <OptionIcon className="h-icon4 w-icon4 rotate-90 text-gray-60" />
          </button>

          {isOpen && (
            <ul className="absolute left-1/2 top-full z-10 mt-g2 w-[8.6rem] -translate-x-1/2 rounded-r3 border border-gray-30 bg-white p-p3 shadow-s1">
              <li
                role="menuitem"
                tabIndex={0}
                onClick={handleEdit}
                className="flex cursor-pointer items-center justify-center px-p4 py-p3 text-b-sm text-gray-90 hover:rounded-r3 hover:bg-secondary-5 active:bg-secondary-10"
              >
                수정
              </li>
              <li
                role="menuitem"
                tabIndex={0}
                onClick={handleDelete}
                className="flex cursor-pointer items-center justify-center px-p4 py-p3 text-b-sm text-gray-90 hover:rounded-r3 hover:bg-secondary-5 active:bg-secondary-10"
              >
                삭제
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="flex items-center text-b-sm text-gray-60 mobile:text-b-xs">
        <time className="relative pr-p5 after:absolute after:right-0 after:top-1/2 after:h-[16px] after:w-[1px] after:-translate-y-1/2 after:bg-gray-20 after:content-['']">
          {date?.slice(0, 10)}
        </time>
        <span className="ml-p5">{author}</span>
      </div>

      {isModalOpen && (
        <Modal
          type="input"
          title="비밀번호 확인"
          placeholder="비밀번호를 입력하세요"
          password={password}
          setPassword={setPassword}
          onClose={() => {
            setIsModalOpen(null);
            setPassword("");
          }}
          onSubmit={async () => {
            try {
              // 🔐 비밀번호 확인 후 요청
              if (isModalOpen === "delete") {
                console.log(`댓글 ${id} 삭제 요청 with password: ${password}`);
                // TODO: 삭제 API 호출
              } else {
                console.log(`댓글 ${id} 수정 요청 with password: ${password}`);
                // TODO: 수정 모드 전환
              }

              setIsModalOpen(null);
              setPassword("");
            } catch (e) {
              alert("비밀번호가 일치하지 않습니다.");
            }
          }}
        />
      )}
    </article>
  );
}

export default CommentItem;
