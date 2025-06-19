import { useState } from "react";
import type {
  Comment,
  VerifyCommentPayload,
  VerifyCommentResponse,
  DeleteCommentPayload,
  DeleteCommentResponse,
} from "@/shared/api/recipient-view/comment/types";

import CommentItem from "@/shared/components/comment/CommentItem";
import { Button } from "@/shared/components/Button";
import PlusIcon from "@/assets/icon/btn-more.svg?react";

interface CommentListProps {
  comments: Comment[];
  hasNext: boolean;
  nextCursor: number;
  onLoadMore: () => void;
  letterId: number;
  onDeleteComment: (commentId: number) => void; // 삭제 콜백
  onStartEdit?: (comment: Comment) => void; // 수정 콜백
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

function CommentList({
  comments,
  hasNext,
  onLoadMore,
  letterId,
  onDeleteComment,
  onStartEdit,
  verifyComment,
  deleteComment,
}: CommentListProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      className="mb-g11 flex flex-col gap-g5 px-p10 mobile:mb-[6rem] mobile:px-0"
      aria-labelledby="comment-list-heading"
    >
      <h3 id="comment-list-heading" className="text-h-sm font-bold text-gray-90">
        등록된 댓글
        {comments.length > 0 && (
          <span className="ml-[7px] text-b-md font-normal text-gray-70">{comments.length}</span>
        )}
      </h3>

      {comments.length === 0 ? (
        <p className="mt-[8px] text-center text-b-lg text-gray-40">아직 등록된 댓글이 없습니다.</p>
      ) : (
        <>
          <ul className="flex flex-col gap-g3" aria-label="댓글 목록">
            {comments.map((item) => (
              <li key={item.commentSeq}>
                <CommentItem
                  comment={item}
                  isOpen={openId === item.commentSeq.toString()}
                  onToggle={() =>
                    setOpenId(
                      openId === item.commentSeq.toString() ? null : item.commentSeq.toString(),
                    )
                  }
                  letterId={letterId}
                  onDelete={onDeleteComment}
                  onStartEdit={onStartEdit}
                  verifyComment={verifyComment}
                  deleteComment={deleteComment}
                />
              </li>
            ))}
          </ul>

          {hasNext && (
            <div className="flex justify-center">
              <Button
                variant="secondary"
                size="medium"
                className="w-full"
                aria-label="댓글 더보기"
                onClick={onLoadMore}
              >
                <span className="text-b-md mobile:text-b-sm">더보기</span>
                <PlusIcon
                  className="h-icon3 w-icon3 text-secondary-50 mobile:h-icon2 mobile:w-icon2"
                  aria-hidden="true"
                  focusable="false"
                />
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default CommentList;
