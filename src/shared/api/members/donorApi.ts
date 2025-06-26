import api from "@/shared/api/axios/axiosInstance";
import type { DonorListResponse } from "@/shared/types/remembrance/DonorData.types";

/** 기증자 목록 조회 API */

export const fetchDonorData = async (params: {
  startDate: string;
  endDate: string;
  keyWord?: string;
  cursor?: number;
  date?: string;
  size: number;
}) => {
  const response = await api.get<{ data: DonorListResponse }>("/remembrance/search", { params });
  return response.data.data;
};
