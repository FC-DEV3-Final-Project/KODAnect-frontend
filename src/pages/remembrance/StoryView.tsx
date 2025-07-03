import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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
  getMoreComments,
} from "@/shared/api/stories-view/comment/commentApi";

import Description from "@/shared/components/Description";
import { START_BEFORE, CHECK_ITEMS } from "@/shared/constant/stories";
import LetterContent from "@/features/remembrance/letter-view/components/LetterContent";
import CommentArea from "@/shared/components/comment/CommentArea";
import TopArea from "@/shared/components/TopArea";
import { getStoryInfoItems } from "@/features/remembrance/story-view/utils/getStoryInfoItems";
import { Modal } from "@/shared/components/Modal";
import { withData } from "@/shared/utils/withData";
import { toast } from "react-toastify";

import SkeletonLetterContent from "@/shared/components/skeleton/SkeletonLetterContent";
import SkeletonCommentArea from "@/shared/components/skeleton/membersView/SkeletonCommentArea";

export default function StoryView() {
  const { storySeq } = useParams<{ storySeq: string }>();
  const navigate = useNavigate();

  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);
  const [password, setPassword] = useState("");

  const {
    data: story,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["storyLetterDetail", storySeq],
    queryFn: () => getStoryLetterDetail(Number(storySeq)),
    enabled: !!storySeq,
    select: (res) => res.data.data,
  });

  useEffect(() => {
    if (error) {
      navigate("/error");
    }
  }, [error, navigate]);

  return (
    <div className="mx-auto w-full">
      <TopArea />
      <div className="mx-auto mt-[76px] max-w-[1280px] px-p10 mobile:my-[60px] mobile:min-w-[360px] mobile:px-p6">
        <Description startBefore={START_BEFORE} checkItems={CHECK_ITEMS} />

        {isLoading ? (
          <>
            <SkeletonLetterContent />
            <SkeletonCommentArea />
          </>
        ) : story ? (
          <>
            <LetterContent
              title={story.storyTitle}
              content={story.storyContents}
              infoItems={getStoryInfoItems(story)}
              onGoList={() => navigate(`/remembrance/stories`)}
              onEdit={() => setModalType("edit")}
              onDelete={() => setModalType("delete")}
              mobileWidth="7rem"
            />

            <CommentArea
              variant="story"
              initialCommentData={story.comments}
              letterId={story.storySeq}
              createComment={(payload) => withData(createComment(payload))}
              updateComment={(letterId, commentId, payload) =>
                withData(updateComment(letterId, commentId, payload))
              }
              verifyComment={(letterId, commentId, payload) =>
                withData(verifyComment(letterId, commentId, payload))
              }
              deleteComment={(letterId, commentId, payload) =>
                withData(deleteComment(letterId, commentId, payload))
              }
              getMoreComments={(cursor, size = 3) =>
                getMoreComments({ storySeq: story.storySeq, cursor, size })
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
                  if (!storySeq || !story) return;

                  try {
                    if (modalType === "edit") {
                      await verifyStoryLetter(Number(storySeq), { storyPasscode: password });
                      console.log("수정 페이지로 전달할 데이터:", story);
                      navigate(`/remembrance/stories-form/${story.storySeq}`, { state: story });
                    } else {
                      await deleteStoryLetter(Number(storySeq), { storyPasscode: password });
                      toast.success("편지가 삭제되었습니다.");
                      navigate(`/remembrance/stories`);
                    }
                  } catch (err) {
                    alert("비밀번호가 올바르지 않거나 삭제에 실패했습니다.");
                  } finally {
                    setModalType(null);
                    setPassword("");
                  }
                }}
                confirmText={modalType === "edit" ? "수정" : "삭제"}
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
