import api from "@/shared/api/axios/axiosInstance";
import type {
  GetMoreHeavenLettersPayload,
  HeavenLetterListResponse,
} from "@/shared/api/members-view/letter/types";

/** 하늘나라 편지 더보기 (커서 기반 페이징) */
export const getMoreHeavenLetters = ({ donateSeq, cursor, size }: GetMoreHeavenLettersPayload) =>
  api.get<HeavenLetterListResponse>(`/heavenLetters/${donateSeq}/remembrance`, {
    params: { cursor, size },
  });
