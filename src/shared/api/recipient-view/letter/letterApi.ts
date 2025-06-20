import api from "@/shared/api/axios/axiosInstance";
import type {
  RecipientLetterDetailResponse,
  VerifyLetterPayload,
  VerifyLetterResponse,
  DeleteLetterPayload,
  DeleteLetterResponse,
} from "@/shared/api/recipient-view/letter/types";

/** 편지 상세 조회 */
export const getLetterDetail = (letterId: number) =>
  api.get<RecipientLetterDetailResponse>(`/recipientLetters/${letterId}`);

/** 편지 수정 인증 */
export const verifyLetter = (letterId: number, payload: VerifyLetterPayload) =>
  api.post<VerifyLetterResponse>(`/recipientLetters/${letterId}/verifyPwd`, payload);

/** 편지 삭제 */
export const deleteLetter = (letterId: number, payload: DeleteLetterPayload) =>
  api.delete<DeleteLetterResponse>(`/recipientLetters/${letterId}`, {
    data: payload,
  });
