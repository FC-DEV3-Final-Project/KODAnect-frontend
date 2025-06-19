import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  getStoryLetterDetail,
  verifyStoryLetter,
  deleteStoryLetter,
} from "@/shared/api/stories-view/story/storyApi";
import {
  createComment,
  updateComment,
  verifyComment,
  deleteComment,
} from "@/shared/api/stories-view/comment/commentApi";

import type { StoryLetterDetail } from "@/shared/api/stories-view/story/types";

import { Description } from "@/shared/components/Description";
import LetterContent from "@/features/letter-view/components/LetterContent";
import CommentArea from "@/shared/components/comment/CommentArea";
import { TopArea } from "@/shared/components/TopArea";
import { getStoryInfoItems } from "@/features/story-view/utils/getStoryInfoItems";
import { Modal } from "@/shared/components/Modal";

function StoryView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [story, setStory] = useState<StoryLetterDetail | null>(null);
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchStory = async () => {
      try {
        setIsLoading(true);
        const response = await getStoryLetterDetail(Number(id));
        setStory(response.data.data);
      } catch (err) {
        console.error("스토리 조회 실패:", err);
        setError("스토리 정보를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  return (
    <div className="mx-auto w-full">
      <TopArea />
      <div className="mx-auto mt-[76px] max-w-[1280px] px-p10 mobile:min-w-[360px] mobile:px-p6">
        <Description
          startBefore="한국장기조직기증원 장기구득 코디네이터가 함께 한 영원히 기억되는 기증자의 숭고한 나눔의 순간과 아름다운 이야기를 적는 공간입니다."
          checkItems={[
            "KODA 장기구득 코디네이터들의 공간입니다.",
            "개인정보 노출의 우려가 있으니 게시글 작성 시 개인정보 등록은 자제하여 주시기 바랍니다.",
          ]}
        />

        {isLoading ? (
          <p className="mt-10 text-center">불러오는 중...</p>
        ) : error ? (
          <p className="mt-10 text-center text-red-500">{error}</p>
        ) : story ? (
          <>
            <LetterContent
              title={story.title}
              content={story.storyContent}
              infoItems={getStoryInfoItems(story)}
              onGoList={() => navigate(`/remembrance/stories`)}
              onEdit={() => setModalType("edit")}
              onDelete={() => setModalType("delete")}
              mobileWidth="7rem"
            />

            <CommentArea
              variant="default"
              initialCommentData={story.comments}
              letterId={story.storySeq}
              createComment={(payload) => createComment(payload).then((res) => res.data)}
              updateComment={(letterId, commentId, payload) =>
                updateComment(letterId, commentId, payload).then((res) => res.data)
              }
              verifyComment={(letterId, commentId, payload) =>
                verifyComment(letterId, commentId, payload).then((res) => res.data)
              }
              deleteComment={(letterId, commentId, payload) =>
                deleteComment(letterId, commentId, payload).then((res) => res.data)
              }
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
                onSubmit={async () => {
                  if (!id || !story) return;

                  try {
                    if (modalType === "edit") {
                      await verifyStoryLetter(Number(id), { storyPasscode: password });
                      navigate(`/remembrance/stories/edit/${id}`, { state: story });
                    } else {
                      await deleteStoryLetter(Number(id), { storyPasscode: password });
                      navigate(`/remembrance/stories`);
                    }
                  } catch (err) {
                    alert("비밀번호가 올바르지 않거나 삭제에 실패했습니다.");
                  } finally {
                    setModalType(null);
                    setPassword("");
                  }
                }}
              />
            )}
          </>
        ) : (
          <p className="mt-10 text-center">스토리를 찾을 수 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default StoryView;
