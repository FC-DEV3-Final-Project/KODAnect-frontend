import { useState } from "react";
import { Modal } from "@/shared/components/Modal";

export default function MembersView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDelete = () => {
    console.log("삭제 확정");
    setIsModalOpen(false);
  };

  return (
    <>
      기증자 추모관 상세 페이지
      <button onClick={() => setIsModalOpen(true)}>모달 열기</button>
      {isModalOpen && (
        <Modal
          type="text"
          title="정말 삭제하시겠어요?"
          description={`삭제하면 되돌릴 수 없습니다.`}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleDelete}
        />
      )}
    </>
  );
}
