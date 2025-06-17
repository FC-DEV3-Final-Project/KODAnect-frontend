import { useState, useRef, useEffect } from "react";
import api from "@/shared/api/axios/axiosInstance";
import { useIsMobile } from "./useIsMobile";

export const useFetchData = (
  endpoint: string,
  dataMapping: (item: any) => any,
  defaultType = "ALL",
) => {
  const isDesktop = !useIsMobile(768);
  const pageSize = isDesktop ? 20 : 16;

  const [data, setData] = useState<any[]>([]);
  const [rawData, setRawData] = useState<any[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [nextCursor, setNextCursor] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const nextCursorRef = useRef(nextCursor);

  const [selectedType, setSelectedType] = useState<string>(defaultType);
  const [keyword, setKeyword] = useState<string>("");

  const fetchData = async (params: {
    cursor?: any;
    size?: number;
    type?: string;
    keyWord?: string;
  }) => {
    try {
      const response = await api.get(endpoint, { params });
      setRawData(response.data.data.content); // 디버깅용 원본 데이터 저장
      const mappedData = response.data.data.content.map(dataMapping);
      return {
        mappedData,
        hasNext: response.data.data.hasNext,
        nextCursor: response.data.data.nextCursor,
        totalCount: response.data.data.totalCount,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const fetchAndSetData = async (isLoadMore = false) => {
    const result = await fetchData({
      cursor: isLoadMore ? nextCursorRef.current : null,
      size: pageSize,
      type: selectedType,
      keyWord: keyword,
    });
    setData((prev) => (isLoadMore ? [...prev, ...result.mappedData] : result.mappedData));
    setHasNext(result.hasNext);
    setNextCursor(result.nextCursor);
    nextCursorRef.current = result.nextCursor;
    setTotalCount(result.totalCount);
  };

  const handleSearch = () => {
    console.log("handleSearch 실행");
    fetchAndSetData(false);
  };
  const handleLoadMore = () => {
    console.log("handleLoadMore 실행");
    fetchAndSetData(true);
  };

  // 초기 데이터 조회 (처음 렌더링 시 1회)
  useEffect(() => {
    handleLoadMore(); // 처음에는 handleLoadMore로 데이터 조회
  }, []);

  // 검색어 또는 드롭다운 변경 시 검색 실행
  useEffect(() => {
    if (keyword !== "" || selectedType !== defaultType) {
      handleSearch();
    }
  }, [keyword, selectedType]);

  return {
    data,
    rawData,
    hasNext,
    totalCount,
    selectedType,
    setSelectedType,
    keyword,
    setKeyword,
    handleLoadMore,
    handleSearch,
  };
};
