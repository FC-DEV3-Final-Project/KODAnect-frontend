import type { ApiResponse } from "@/shared/api/common/types";
import type { CommentPagination } from "@/shared/api/recipient-view/comment/types";

export interface RecipientLetterDetail {
  letterSeq: number;
  organCode: string;
  organEtc: string | null;
  letterTitle: string;
  recipientYear: string;
  letterWriter: string;
  anonymityFlag: "Y" | "N";
  readCount: number;
  letterContents: string;
  fileName: string;
  orgFileName: string;
  writerId: string | null;
  modifierId: string | null;
  delFlag: "Y" | "N";
  commentCount: number;
  hasMoreComments: boolean;
  imageUrl?: string;
  initialCommentData: CommentPagination;
  writeTime: string;
  modifyTime: string;
}

/** 편지 전체 응답 구조*/
export type RecipientLetterDetailResponse = ApiResponse<RecipientLetterDetail>;

/** 편지 수정 인증 요청 */
export interface VerifyLetterPayload {
  letterPasscode: string;
}

/** 편지 수정 인증 응답 */
export type VerifyLetterResponse = ApiResponse<null>;

/**편지 수정 응답 */
export type UpdateLetterResponse = ApiResponse<RecipientLetterDetail>;

/** 편지 삭제 요청 */
export interface DeleteLetterPayload {
  letterPasscode: string;
}

/**편지 삭제 응답 */
export type DeleteLetterResponse = ApiResponse<null>;
