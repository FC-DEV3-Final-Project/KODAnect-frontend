import { createContext, useContext } from "react";
import type {
  Comment,
  CreateCommentPayload,
  CreateCommentResponse,
  UpdateCommentPayload,
  UpdateCommentResponse,
  VerifyCommentPayload,
  VerifyCommentResponse,
  DeleteCommentPayload,
  DeleteCommentResponse,
} from "@/shared/api/recipient-view/comment/types";

type CommentContextType = {
  /**타입 정의 */
  letterId: number; // 어떤 편지/스토리/기증자에 대한 댓글인지 구분
  variant: "default" | "memorial" | "story"; // 댓글 종류 구분
  editingComment: Comment | null; // 수정 중인 댓글 보관
  setEditingComment: (comment: Comment | null) => void;

  /**API 함수 */
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
};

export const CommentContext = createContext<CommentContextType | undefined>(undefined);

/**커스텀 훅 (context 편하게 쓸 수 있도록) */
export const useCommentContext = () => {
  const context = useContext(CommentContext);
  if (!context) throw new Error("useCommentContext must be used within a CommentProvider");
  return context;
};
