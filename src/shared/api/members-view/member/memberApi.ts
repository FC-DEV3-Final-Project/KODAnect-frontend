import api from "@/shared/api/axios/axiosInstance";
import type { MemberDetail, MemberDetailResponse } from "@/shared/api/members-view/member/types";

/** 추모관 상세 조회 */
export const getMemberDetail = async (donateSeq: number): Promise<MemberDetail> => {
  const res = await api.get<MemberDetailResponse>(`/remembrance/${donateSeq}`);
  return res.data.data;
};
