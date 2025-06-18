import api from "@/shared/api/axios/axiosInstance";
import type {
  RecipientLetterDetailResponse,
  VerifyLetterPayload,
  VerifyLetterResponse,
  UpdateLetterPayload,
  UpdateLetterResponse,
  DeleteLetterPayload,
  DeleteLetterResponse,
} from "@/shared/api/recipient-view/letter/types";

/** 편지 상세 조회 */
export const getLetterDetail = (letterId: number) =>
  api.get<RecipientLetterDetailResponse>(`/recipientLetters/${letterId}`);

/** 편지 수정 인증 */
export const verifyLetter = (letterId: number, payload: VerifyLetterPayload) =>
  api.post<VerifyLetterResponse>(`/recipientLetters/${letterId}/verifyPwd`, payload);

/** 편지 수정 */
export const updateLetter = (letterId: number, payload: UpdateLetterPayload) => {
  const formData = new FormData();
  formData.append("letterTitle", payload.letterTitle);
  formData.append("letterWriter", payload.letterWriter);
  formData.append("letterContents", payload.letterContents);
  formData.append("letterPasscode", payload.letterPasscode);
  if (payload.imageFile) {
    formData.append("imageFile", payload.imageFile);
  }

  return api.patch<UpdateLetterResponse>(`/recipientLetters/${letterId}`, formData);
};

/** 편지 삭제 */
export const deleteLetter = (letterId: number, payload: DeleteLetterPayload) =>
  api.delete<DeleteLetterResponse>(`/recipientLetters/${letterId}`, {
    data: payload,
  });
