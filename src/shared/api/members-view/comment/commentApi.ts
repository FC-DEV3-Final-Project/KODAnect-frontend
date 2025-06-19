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
export const getMoreComments = ({ donateSeq, cursor, size }: GetMoreCommentsPayload) =>
  api.get<CommentListResponse>(`/remembrance/${donateSeq}/comments`, {
    params: {
      cursor: cursor,
      size,
    },
  });

/** 댓글 등록 */
export const createComment = (payload: CreateCommentPayload) =>
  api.post<CreateCommentResponse>(`/remembrance/${payload.donateSeq}/comments`, payload);

/** 댓글 수정/삭제 인증 */
export const verifyComment = (
  donateSeq: number,
  commentId: number,
  payload: VerifyCommentPayload,
) =>
  api.post<VerifyCommentResponse>(
    `/remembrance/${donateSeq}/comments/${commentId}/verifyPwd`,
    payload,
  );

/** 댓글 수정 */
export const updateComment = (
  donateSeq: number,
  commentId: number,
  payload: UpdateCommentPayload,
) => api.put<UpdateCommentResponse>(`/remembrance/${donateSeq}/comment/${commentId}`, payload);

/** 댓글 삭제 */
export const deleteComment = (
  donateSeq: number,
  commentId: number,
  payload: DeleteCommentPayload,
) =>
  api.delete<DeleteCommentResponse>(`/remembrance/${donateSeq}/comment/${commentId}`, {
    data: payload,
  });
