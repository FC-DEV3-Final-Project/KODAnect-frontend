import api from "@/shared/api/axios/axiosInstance";
import type {
  GetMoreCommentsPayload,
  CommentListResponse,
  CreateCommentPayload,
  CreateCommentResponse,
  VerifyCommentPayload,
  VerifyCommentResponse,
  UpdateCommentPayload,
  UpdateCommentResponse,
  DeleteCommentPayload,
  DeleteCommentResponse,
} from "@/shared/api/recipient-view/comment/types";

/** 댓글 더보기 (커서 기반 페이징) */
export const getMoreComments = ({ letterSeq, cursor, size = 3 }: GetMoreCommentsPayload) =>
  api.get<CommentListResponse>(`/recipientLetters/${letterSeq}/comments`, {
    params: {
      cursor: cursor,
      size,
    },
  });

/** 댓글 등록 */
export const createComment = (payload: CreateCommentPayload) =>
  api.post<CreateCommentResponse>(`/recipientLetters/${payload.letterSeq}/comments`, payload);

/** 댓글 수정/삭제 인증 */
export const verifyComment = (
  letterSeq: number,
  commentId: number,
  payload: VerifyCommentPayload,
) =>
  api.post<VerifyCommentResponse>(
    `/recipientLetters/${letterSeq}/comments/${commentId}/verifyPwd`,
    payload,
  );

/** 댓글 수정 */
export const updateComment = (
  letterSeq: number,
  commentId: number,
  payload: UpdateCommentPayload,
) =>
  api.put<UpdateCommentResponse>(`/recipientLetters/${letterSeq}/comments/${commentId}`, payload);

/** 댓글 삭제 */
export const deleteComment = (
  letterSeq: number,
  commentId: number,
  payload: DeleteCommentPayload,
) =>
  api.delete<DeleteCommentResponse>(`/recipientLetters/${letterSeq}/comments/${commentId}`, {
    data: payload,
  });
