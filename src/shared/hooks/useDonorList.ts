import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchDonorData } from "@/shared/api/members/donorApi";
import type { DonorListResponse } from "@/shared/types/remembrance/DonorData.types";

export interface UseDonorListParams {
  startDate: string;
  endDate: string;
  keyword?: string;
  pageSize: number;
}

export interface DonorCursor {
  cursor?: number;
  date?: string;
}

export function useDonorList({ startDate, endDate, keyword, pageSize }: UseDonorListParams) {
  return useInfiniteQuery<DonorListResponse, Error>({
    queryKey: ["donorList", startDate, endDate, keyword, pageSize],
    queryFn: async ({ pageParam }) => {
      const cursorParam = (pageParam as DonorCursor) ?? {};
      return fetchDonorData({
        startDate,
        endDate,
        keyWord: keyword,
        cursor: cursorParam.cursor,
        date: cursorParam.date,
        size: pageSize,
      });
    },
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    initialPageParam: undefined,
  });
}
