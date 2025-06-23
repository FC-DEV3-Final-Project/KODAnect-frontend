import type { ApiResponse } from "@/shared/api/common/types";

/** 기증자 추모관 편지 미리보기 타입 */
export interface HeavenLetter {
  letterSeq: number;
  letterTitle: string;
  readCount: number;
  writeTime: string;
}

/** 편지 더보기 요청 */
export interface GetMoreHeavenLettersPayload {
  donateSeq: number;
  cursor: number;
  size?: number;
}

/** 페이징 응답 */
export interface HeavenLetterPagination {
  content: HeavenLetter[];
  nextCursor: number;
  hasNext: boolean;
  totalCount: number;
}

/** 편지 더보기 전체 응답 */
export type HeavenLetterListResponse = ApiResponse<HeavenLetterPagination>;
