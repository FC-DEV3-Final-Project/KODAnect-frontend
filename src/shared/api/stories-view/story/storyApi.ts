import api from "@/shared/api/axios/axiosInstance";
import type {
  StoryLetterDetailResponse,
  VerifyStoryPayload,
  VerifyStoryResponse,
  UpdateStoryPayload,
  UpdateStoryResponse,
  DeleteStoryPayload,
  DeleteStoryResponse,
} from "@/shared/api/stories-view/story/types";

/** 스토리 상세 조회 */
export const getStoryLetterDetail = (storySeq: number) =>
  api.get<StoryLetterDetailResponse>(`/donationLetters/${storySeq}`);

/** 스토리 수정 인증 */
export const verifyStoryLetter = (storySeq: number, payload: VerifyStoryPayload) =>
  api.post<VerifyStoryResponse>(`/donationLetters/${storySeq}/verifyPwd`, payload);

/** 스토리 수정 */
export const updateStoryLetter = (storySeq: number, payload: UpdateStoryPayload) => {
  const formData = new FormData();
  formData.append("storyTitle", payload.storyTitle);
  formData.append("storyWriter", payload.storyWriter);
  formData.append("storyContents", payload.storyContents);
  formData.append("storyPasscode", payload.storyPasscode);
  if (payload.imageFile) {
    formData.append("imageFile", payload.imageFile);
  }

  return api.patch<UpdateStoryResponse>(`/donationLetters/${storySeq}`, formData);
};

/** 스토리 삭제 */
export const deleteStoryLetter = (storySeq: number, payload: DeleteStoryPayload) =>
  api.delete<DeleteStoryResponse>(`/donationLetters/${storySeq}`, {
    data: payload,
  });
