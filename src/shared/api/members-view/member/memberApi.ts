import api from "@/shared/api/axios/axiosInstance";
import type {
  MemberDetail,
  MemberDetailResponse,
  EmotionType,
  PatchEmotionResponse,
} from "@/shared/api/members-view/member/types";

/** 추모관 상세 조회 */
export const getMemberDetail = async (donateSeq: number): Promise<MemberDetail> => {
  const res = await api.get<MemberDetailResponse>(`/remembrance/${donateSeq}`);
  return res.data.data;
};

/** 이모지 카운팅 */
export const patchEmotionCount = async (
  donateSeq: number,
  emotion: EmotionType,
): Promise<PatchEmotionResponse> => {
  const res = await api.patch(`/remembrance/${donateSeq}/${emotion}`);
  return res.data;
};
