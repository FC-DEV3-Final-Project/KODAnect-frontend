import type { ApiResponse } from "@/shared/api/common/types";
import type { CommentPagination } from "@/shared/api/recipient-view/comment/types";

/** 기증자 스토리 상세 타입 */
export interface StoryLetterDetail {
  storySeq: number;
  title: string;
  storyWriter: string;
  uploadDate: string;
  areaCode: string;
  readCount: number;
  storyContent: string;
  fileName: string;
  orgFileName: string;
  comments: CommentPagination; // 구조 동일
}

/** 상세 조회 응답 */
export interface StoryLetterDetailResponse extends ApiResponse<StoryLetterDetail> {}

/** 수정 인증 요청 */
export interface VerifyStoryPayload {
  storyPasscode: string;
}

/** 수정 인증 응답 */
export type VerifyStoryResponse = ApiResponse<StoryLetterDetail>; // data 안에 상세 데이터가 옴

/** 수정 요청 */
export interface UpdateStoryPayload {
  storyTitle: string;
  storyWriter: string;
  storyContents: string;
  storyPasscode: string;
  imageFile?: File | null;
}

/** 수정 응답 */
export type UpdateStoryResponse = ApiResponse<null>;

/** 삭제 요청 */
export interface DeleteStoryPayload {
  storyPasscode: string;
}

/** 삭제 응답 */
export type DeleteStoryResponse = ApiResponse<null>;
