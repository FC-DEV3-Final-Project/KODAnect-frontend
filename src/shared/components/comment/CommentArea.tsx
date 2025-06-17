import { useState } from "react";
import type { CommentPagination } from "@/shared/api/recipient-view/comment/types";
import { getMoreComments } from "@/shared/api/recipient-view/comment/commentApi";

import CommentForm from "@/shared/components/comment/CommentForm";
import CommentList from "@/shared/components/comment/CommentList";
import Flower from "@/assets/images/memorialIcon/flower.svg?react";
import Sad from "@/assets/images/memorialIcon/sad.svg?react";
import Proud from "@/assets/images/memorialIcon/proud.svg?react";
import Miss from "@/assets/images/memorialIcon/miss.svg?react";
import Love from "@/assets/images/memorialIcon/love.svg?react";
import See from "@/assets/images/memorialIcon/see.svg?react";
import Hard from "@/assets/images/memorialIcon/hard.svg?react";

interface CommentAreaProps {
  variant?: "default" | "memorial";
  initialCommentData: CommentPagination;
  letterId: number;
}

const memorialIcons = [
  { label: "헌화", icon: <Flower className="h-icon3 w-icon3" />, count: 1 },
  { label: "사랑해요", icon: <Love className="h-icon3 w-icon3" />, count: 0 },
  { label: "보고싶어요", icon: <See className="h-icon3 w-icon3" />, count: 10 },
  { label: "그리워요", icon: <Miss className="h-icon3 w-icon3" />, count: 15 },
  { label: "자랑스러워요", icon: <Proud className="h-icon3 w-icon3" />, count: 7 },
  { label: "힘들어요", icon: <Hard className="h-icon3 w-icon3" />, count: 0 },
  { label: "슬퍼요", icon: <Sad className="h-icon3 w-icon3" />, count: 9 },
];

function CommentArea({ variant = "default", initialCommentData, letterId }: CommentAreaProps) {
  const isMemorial = variant === "memorial";
  const title = variant === "memorial" ? "추모 메세지" : "댓글";

  const [comments, setComments] = useState(initialCommentData.content);
  const [cursor, setCursor] = useState(initialCommentData.commentNextCursor);
  const [hasNext, setHasNext] = useState(initialCommentData.commentHasNext);

  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await getMoreComments({ letterId, cursor, size: 3 });
      const data = res.data.data;
      setComments((prev) => [...prev, ...data.content]);
      setCursor(data.commentNextCursor);
      setHasNext(data.commentHasNext);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = (commentId: number) => {
    setComments((prev) => prev.filter((comment) => comment.commentSeq !== commentId));
  };

  return (
    <section className="mx-auto h-full w-full max-w-[1200px]" aria-labelledby="comment-heading">
      <div className="mb-[24px] gap-g3">
        <h2 id="comment-heading" className="text-h-md font-bold text-gray-90">
          {title}
        </h2>
        <p id="comment-guideline" className="text-b-md text-gray-70 mobile:text-b-sm">
          기증자에 대한 추모 분위기를 해치거나, 비방의 글 등이 게시가 될 경우 관리자에 의해 삭제 될
          수 있습니다.
        </p>
        {isMemorial && (
          <div
            className="mt-g7 flex flex-wrap gap-g4 mobile:gap-g2"
            role="group"
            aria-labelledby="memorial-icon-group"
          >
            <h3 id="memorial-icon-group" className="sr-only">
              추모 표현 아이콘 선택
            </h3>
            {memorialIcons.map(({ label, icon, count }) => (
              <button
                key={label}
                type="button"
                className="mb-[8px] flex items-center gap-g4 rounded-full border border-gray-20 px-p7 py-p3 text-b-md text-gray-90 hover:bg-secondary-10 mobile:px-p4 mobile:py-p3 mobile:text-b-sm"
              >
                {icon}
                {label}
                {typeof count === "number" && count > 0 && (
                  <span className="font-medium text-gray-60">{count}</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="mb-g9">
        <CommentForm
          letterId={letterId}
          onCommentSubmit={(newComment) => setComments((prev) => [newComment, ...prev])} //등록한 댓글 바로 반영
        />
      </div>
      <CommentList
        comments={comments}
        hasNext={hasNext}
        nextCursor={cursor}
        onLoadMore={handleLoadMore}
        letterId={letterId}
        onDeleteComment={handleDeleteComment}
      />
    </section>
  );
}

export default CommentArea;
