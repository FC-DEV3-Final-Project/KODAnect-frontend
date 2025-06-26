import api from "@/shared/api/axios/axiosInstance";

/** 편지 & 스토리 목록 조회 API*/

export const fetchLetterData = async <T>(
  endpoint: string,
  params: {
    type?: string;
    keyWord?: string;
    cursor?: number | null;
    size: number;
  },
): Promise<T> => {
  const response = await api.get<{ data: T }>(endpoint, { params });
  return response.data.data;
};
