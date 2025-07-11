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
export const getMoreComments = ({ letterSeq, cursor }: GetMoreCommentsPayload) =>
  api.get<CommentListResponse>(`/heavenLetters/${letterSeq}/comments`, {
    params: {
      ...(cursor !== undefined && { cursor }),
    },
  });

/** 댓글 등록 */
export const createComment = (payload: CreateCommentPayload) =>
  api.post<CreateCommentResponse>(`/heavenLetters/${payload.letterSeq}/comments`, payload);

/** 댓글 수정/삭제 인증 */
export const verifyComment = (
  letterSeq: number,
  commentId: number,
  payload: VerifyCommentPayload,
) =>
  api.post<VerifyCommentResponse>(
    `/heavenLetters/${letterSeq}/comments/${commentId}/verifyPwd`,
    payload,
  );

/** 댓글 수정 */
export const updateComment = (
  letterSeq: number,
  commentId: number,
  payload: UpdateCommentPayload,
) => api.put<UpdateCommentResponse>(`/heavenLetters/${letterSeq}/comments/${commentId}`, payload);

/** 댓글 삭제 */
export const deleteComment = (
  letterSeq: number,
  commentId: number,
  payload: DeleteCommentPayload,
) =>
  api.delete<DeleteCommentResponse>(`/heavenLetters/${letterSeq}/comments/${commentId}`, {
    data: payload,
  });
