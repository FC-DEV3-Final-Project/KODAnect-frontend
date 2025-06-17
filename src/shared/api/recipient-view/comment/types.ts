import type { ApiResponse } from "@/shared/api/common/types";

/** 댓글 조회 요청 */
export interface Comment {
  commentSeq: number;
  letterSeq: number;
  commentWriter: string;
  commentContents: string;
  delFlag: "Y" | "N";
  writeTime: string;
  modifyTime: string;
}

/** 더보기 요청*/
export interface GetMoreCommentsPayload {
  letterId: number;
  cusor: number;
  size?: number;
}

/** 더보기 응답*/
export interface CommentPagination {
  content: Comment[];
  commentNextCursor: number;
  commentHasNext: boolean; // 댓글이 없으면 더보기 버튼 숨김
}

/** 댓글 전체 응답*/
export type CommentListResponse = ApiResponse<CommentPagination>;

/** 댓글 등록 요청*/
export interface CreateCommentPayload {
  letterSeq: number;
  commentWriter: string;
  commentContents: string;
  commentPasscode: string;
}

/** 댓글 등록 응답*/
export type CreateCommentResponse = ApiResponse<Comment>;

/** 댓글 수정 인증 요청*/
export interface VerifyCommentPayload {
  commentPasscode: string;
}

/** 댓글 인증 응답*/
export type VerifyCommentResponse = ApiResponse<null>;

/** 댓글 수정 요청*/
export interface UpdateCommentPayload {
  commentWriter: string;
  commentContents: string;
}

/**  댓글 수정 응답*/
export type UpdateCommentResponse = ApiResponse<Comment>;

/** 댓글 삭제 요청 (passcode 포함)*/
export interface DeleteCommentPayload {
  commentPasscode: string;
}

/** 댓글 삭제 응답*/
export type DeleteCommentResponse = ApiResponse<null>;
