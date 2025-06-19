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
export const getMoreComments = ({ storySeq, cursor, size = 3 }: GetMoreCommentsPayload) =>
  api.get<CommentListResponse>(`/donationLetters/${storySeq}/comments`, {
    params: {
      cursor: cursor,
      size,
    },
  });

/** 댓글 등록 */
export const createComment = (payload: CreateCommentPayload) =>
  api.post<CreateCommentResponse>(`/donationLetters/${payload.storySeq}/comments`, payload);

/** 댓글 수정/삭제 인증 */
export const verifyComment = (storySeq: number, commentId: number, payload: VerifyCommentPayload) =>
  api.post<VerifyCommentResponse>(
    `/donationLetters/${storySeq}/comments/${commentId}/verifyPwd`,
    payload,
  );

/** 댓글 수정 */
export const updateComment = (storySeq: number, commentId: number, payload: UpdateCommentPayload) =>
  api.patch<UpdateCommentResponse>(`/donationLetters/${storySeq}/comments/${commentId}`, payload);

/** 댓글 삭제 */
export const deleteComment = (storySeq: number, commentId: number, payload: DeleteCommentPayload) =>
  api.delete<DeleteCommentResponse>(`/donationLetters/${storySeq}/comments/${commentId}`, {
    data: payload,
  });
