import type { CommentPagination } from "@/shared/api/recipient-view/comment/types";
import type { HeavenLetterPagination } from "@/shared/api/members-view/letter/types";
import type { ApiResponse } from "@/shared/api/common/types";

export interface MemberDetail {
  donateSeq: number;
  donorName: string;
  donateTitle: string;
  contents: string;
  fileName: string | null;
  orgFileName: string | null;
  writer: string;
  donateDate: string;
  genderFlag: "M" | "F";
  donateAge: number;
  flowerCount: number;
  loveCount: number;
  seeCount: number;
  missCount: number;
  proudCount: number;
  hardCount: number;
  sadCount: number;
  writeTime: string;
  memorialCommentResponses: CommentPagination;
  heavenLetterResponses: HeavenLetterPagination;
  // 편의상 이름 맞춤: memorialCommentResponses → initialCommentData
}

/** 전체 응답 구조 */
export type MemberDetailResponse = ApiResponse<MemberDetail>;
