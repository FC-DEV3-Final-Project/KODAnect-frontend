import api from "@/shared/api/axios/axiosInstance";
import type {
  HeavenLetterDetailResponse,
  VerifyLetterPayload,
  VerifyLetterResponse,
  DeleteLetterPayload,
  DeleteLetterResponse,
} from "@/shared/api/letter-view/letter/types";

/** 편지 상세 조회 */
export const getHeavenLetterDetail = (letterId: number) =>
  api.get<HeavenLetterDetailResponse>(`/heavenLetters/${letterId}`);

/** 편지 수정 인증 */
export const verifyHeavenLetter = (letterId: number, payload: VerifyLetterPayload) =>
  api.post<VerifyLetterResponse>(`/heavenLetters/${letterId}/verifyPwd`, payload);

/** 편지 삭제 */
export const deleteHeavenLetter = (letterId: number, payload: DeleteLetterPayload) =>
  api.delete<DeleteLetterResponse>(`/heavenLetters/${letterId}`, {
    data: payload,
  });
