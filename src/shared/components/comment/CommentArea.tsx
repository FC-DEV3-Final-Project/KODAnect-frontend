import { useState } from "react";
import type {
  Comment as CommentType,
  CommentPagination,
  CreateCommentPayload,
  CreateCommentResponse,
  UpdateCommentPayload,
  UpdateCommentResponse,
  VerifyCommentPayload,
  VerifyCommentResponse,
  DeleteCommentPayload,
  DeleteCommentResponse,
} from "@/shared/api/recipient-view/comment/types";
import { getMoreComments } from "@/shared/api/recipient-view/comment/commentApi";

import MemorialIconGroup from "@/features/members-view/component/MemorialIconGroup";

import CommentForm from "@/shared/components/comment/CommentForm";
import CommentList from "@/shared/components/comment/CommentList";

interface CommentAreaProps {
  variant?: "default" | "memorial" | "story";
  initialCommentData: CommentPagination;
  letterId: number;
  createComment: (payload: CreateCommentPayload) => Promise<CreateCommentResponse>;
  updateComment: (
    letterId: number,
    commentId: number,
    payload: UpdateCommentPayload,
  ) => Promise<UpdateCommentResponse>;
  verifyComment: (
    letterId: number,
    commentId: number,
    payload: VerifyCommentPayload,
  ) => Promise<VerifyCommentResponse>;
  deleteComment: (
    letterId: number,
    commentId: number,
    payload: DeleteCommentPayload,
  ) => Promise<DeleteCommentResponse>;
}

function CommentArea({
  variant = "default",
  initialCommentData,
  letterId,
  createComment,
  updateComment,
  verifyComment,
  deleteComment,
}: CommentAreaProps) {
  const isMemorial = variant === "memorial";
  const title = variant === "memorial" ? "추모 메세지" : "댓글";

  const [comments, setComments] = useState(initialCommentData.content);
  const [cursor, setCursor] = useState(initialCommentData.commentNextCursor);
  const [hasNext, setHasNext] = useState(initialCommentData.commentHasNext);

  const [isLoading, setIsLoading] = useState(false);
  const [editingComment, setEditingComment] = useState<CommentType | null>(null);

  const idParam =
    variant === "default"
      ? { letterSeq: letterId }
      : variant === "memorial"
        ? { donateSeq: letterId }
        : { storySeq: letterId };

  const handleLoadMore = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await getMoreComments({ ...idParam, cursor, size: 3 });
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
        {isMemorial && <MemorialIconGroup />}
      </div>
      <div className="mb-g9">
        <CommentForm
          variant={variant}
          letterId={letterId}
          editingComment={editingComment}
          createComment={createComment}
          updateComment={updateComment}
          onCommentSubmit={(newComment) => {
            if (editingComment) {
              setComments((prev) =>
                prev.map((c) => (c.commentSeq === newComment.commentSeq ? newComment : c)),
              );
              setEditingComment(null);
            } else {
              setComments((prev) => [newComment, ...prev]);
            }
          }}
        />
      </div>
      <CommentList
        comments={comments}
        hasNext={hasNext}
        nextCursor={cursor}
        onLoadMore={handleLoadMore}
        letterId={letterId}
        onDeleteComment={handleDeleteComment}
        onStartEdit={(comment: CommentType) => setEditingComment(comment)}
        verifyComment={verifyComment}
        deleteComment={deleteComment}
      />
    </section>
  );
}

export default CommentArea;
