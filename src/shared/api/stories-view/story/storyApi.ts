import api from "@/shared/api/axios/axiosInstance";
import type {
  StoryLetterDetailResponse,
  VerifyStoryPayload,
  VerifyStoryResponse,
  DeleteStoryPayload,
  DeleteStoryResponse,
} from "@/shared/api/stories-view/story/types";

/** 스토리 상세 조회 */
export const getStoryLetterDetail = (storySeq: number) =>
  api.get<StoryLetterDetailResponse>(`/donationLetters/${storySeq}`);

/** 스토리 수정 인증 */
export const verifyStoryLetter = (storySeq: number, payload: VerifyStoryPayload) =>
  api.post<VerifyStoryResponse>(`/donationLetters/${storySeq}/verifyPwd`, payload);

/** 스토리 삭제 */
export const deleteStoryLetter = (storySeq: number, payload: DeleteStoryPayload) =>
  api.delete<DeleteStoryResponse>(`/donationLetters/${storySeq}`, {
    data: payload,
  });
