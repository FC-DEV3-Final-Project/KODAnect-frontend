import api from "@/shared/api/axios/axiosInstance";
import type {
  HeavenLetterDetailResponse,
  VerifyLetterPayload,
  VerifyLetterResponse,
  UpdateLetterPayload,
  UpdateLetterResponse,
  DeleteLetterPayload,
  DeleteLetterResponse,
} from "@/shared/api/letter-view/letter/types";

/** 편지 상세 조회 */
export const getHeavenLetterDetail = (letterId: number) =>
  api.get<HeavenLetterDetailResponse>(`/heavenLetters/${letterId}`);

/** 편지 수정 인증 */
export const verifyHeavenLetter = (letterId: number, payload: VerifyLetterPayload) =>
  api.post<VerifyLetterResponse>(`/heavenLetters/${letterId}/verifyPwd`, payload);

/** 편지 수정 (아직 미완) */
export const updateHeavenLetter = (letterId: number, payload: UpdateLetterPayload) => {
  const formData = new FormData();
  formData.append("letterTitle", payload.letterTitle);
  formData.append("letterWriter", payload.letterWriter);
  formData.append("letterContents", payload.letterContents);
  formData.append("letterPasscode", payload.letterPasscode);
  if (payload.imageFile) {
    formData.append("imageFile", payload.imageFile);
  }

  return api.patch<UpdateLetterResponse>(`/heavenLetters/${letterId}`, formData);
};

/** 편지 삭제 */
export const deleteHeavenLetter = (letterId: number, payload: DeleteLetterPayload) =>
  api.delete<DeleteLetterResponse>(`/heavenLetters/${letterId}`, {
    data: payload,
  });
