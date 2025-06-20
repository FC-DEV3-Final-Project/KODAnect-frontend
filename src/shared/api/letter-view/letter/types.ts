import type { ApiResponse } from "@/shared/api/common/types";
import type { CommentPagination } from "@/shared/api/recipient-view/comment/types";

/** 하늘나라 편지 상세 타입 */
export interface HeavenLetterDetail {
  letterSeq: number;
  donateSeq: number;
  letterTitle: string;
  donorName: string;
  letterWriter: string;
  anonymityFlag: "Y" | "N";
  readCount: number;
  letterContents: string;
  fileName: string;
  orgFileName: string;
  writeTime: string;
  cursorCommentPaginationResponse: CommentPagination;
}

/** 편지 전체 응답 구조*/
export interface HeavenLetterDetailResponse extends ApiResponse<HeavenLetterDetail> {}

/** 편지 수정 인증 요청 */
export interface VerifyLetterPayload {
  letterPasscode: string;
}

/** 편지 수정 인증 응답 */
export type VerifyLetterResponse = ApiResponse<null>;

/**편지 수정 응답 */
export type UpdateLetterResponse = ApiResponse<HeavenLetterDetail>;

/** 편지 삭제 요청 */
export interface DeleteLetterPayload {
  letterPasscode: string;
}

/**편지 삭제 응답 */
export type DeleteLetterResponse = ApiResponse<null>;
