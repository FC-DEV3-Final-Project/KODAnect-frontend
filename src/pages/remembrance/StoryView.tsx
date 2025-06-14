import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Description } from "@/shared/components/Description";
import LetterContent from "@/features/letter-view/components/LetterContent";
import CommentArea from "@/shared/components/comment/CommentArea";
import { stories } from "@/features/story-view/mock-data";
import { TopArea } from "@/shared/components/TopArea";
import { getStoryInfoItems } from "@/features/story-view/utils/getStoryInfoItems";
import { Modal } from "@/shared/components/Modal";

function StoryView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const story = stories.find((s) => s.storySeq === Number(id));

  if (!story) {
    return <p className="mt-10 text-center">스토리를 찾을 수 없습니다.</p>;
  }

  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);
  const [password, setPassword] = useState("");

  return (
    <div className="mx-auto w-full">
      <TopArea />
      <div className="mx-auto mt-[76px] max-w-[1280px] px-p10 mobile:min-w-[360px] mobile:px-p6">
        <Description
          startBefore="한국장기조직기증원 장기구득 코디네이터가 함께 한 영원히 기억되는 기증자의 숭고한 나눔의 순간과 아름다운 이야기를 적는 공간입니다."
          checkItems={[
            "KODA 장기구득 코디네이터들의 공간입니다.",
            "개인정보 노출의 우려가 있으니 게시글 작성 시 개인정보 등록은 자제하 여 주시기 바랍니다.",
          ]}
        />
        <LetterContent
          title={story.title}
          content={story.storyContent}
          infoItems={getStoryInfoItems(story)}
          onGoList={() => navigate(`/remembrance/stories`)}
          onEdit={() => setModalType("edit")}
          onDelete={() => setModalType("delete")}
          mobileWidth="7rem"
        />
        {modalType && (
          <Modal
            type="input"
            title="비밀번호 확인"
            placeholder="비밀번호를 입력하세요"
            password={password}
            setPassword={setPassword}
            onClose={() => {
              setModalType(null);
              setPassword("");
            }}
            onSubmit={() => {
              if (modalType === "edit") {
                // 편지 수정 페이지로 이동
              } else {
                // 삭제 요청 → 성공 시 목록으로 이동
                navigate(`/remembrance/stories`);
              }
              setModalType(null);
              setPassword("");
            }}
          />
        )}

        <CommentArea />
      </div>
    </div>
  );
}

export default StoryView;
