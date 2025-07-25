import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { fetchLetterData } from "@/shared/api/letters/letterApi";
import { heavenLetter } from "@/features/remembrance/dataMapping";
import type { LetterData, LetterListResponse } from "@/shared/types/remembrance/LetterData.types";

import TopArea from "@/shared/components/TopArea";
import Description from "@/shared/components/Description";
import { Dropdown } from "@/shared/components/Dropdown";
import SearchInput from "@/shared/components/SearchInput";
import Button from "@/shared/components/Button";
import LetterCard from "@/shared/components/LetterCard";

import { START_BEFORE, CHECK_ITEMS_CASE1 } from "@/shared/constant/letters";
import { DROPDOWN_OPTIONS } from "@/shared/constant/dropdownOptions";

import clsx from "clsx";
import PlusIcon from "@/assets/icon/btn-more.svg?react";

export default function Letters() {
  const navigate = useNavigate();
  const isDesktop = !useIsMobile(768);
  const pageSize = isDesktop ? 20 : 16;

  const [selectedType, setSelectedType] = useState("ALL");
  const [keyword, setKeyword] = useState("");

  const [data, setData] = useState<ReturnType<typeof heavenLetter>[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const nextCursorRef = useRef<number | null>(null);

  // 엔드포인트 결정 함수
  const getEndpoint = () => {
    // 검색 조건: 키워드가 있거나, 타입이 기본값이 아니면 검색 엔드포인트 사용
    return keyword !== "" || selectedType !== "ALL" ? "/heavenLetters/search" : "/heavenLetters";
  };

  // 데이터 패칭 및 상태 업데이트
  const fetchAndSetData = async (isLoadMore = false) => {
    try {
      const result = await fetchLetterData<LetterListResponse<LetterData>>(getEndpoint(), {
        cursor: isLoadMore ? nextCursorRef.current : null,
        size: pageSize,
        type: selectedType,
        keyWord: keyword,
      });
      const mappedData = result.content.map(heavenLetter);
      setData((prev) => (isLoadMore ? [...prev, ...mappedData] : mappedData));
      setHasNext(result.hasNext);
      nextCursorRef.current = result.nextCursor;
      setTotalCount(result.totalCount);
    } catch (error) {
      navigate("/error");
    }
  };

  // 검색 핸들러
  const handleSearch = () => {
    (console.log("🔎 검색 실행"), fetchAndSetData(false));
  };

  // 더보기 핸들러
  const handleLoadMore = () => {
    (console.log("📦 데이터 불러오기"), fetchAndSetData(true));
  };

  // 초기 데이터 조회
  useEffect(() => {
    handleLoadMore();
  }, []);

  // 검색어 또는 드롭다운 변경 시 검색 실행
  useEffect(() => {
    if (keyword !== "" || selectedType !== "ALL") {
      handleSearch();
    }
  }, [keyword, selectedType]);

  const handleClick = () => {
    navigate(`/remembrance/letters-form`);
  };

  return (
    <>
      {/* 상단 배너 & 탭 메뉴 */}
      <TopArea />

      <section
        className={clsx(
          "mx-auto mb-g12 mt-[76px] max-w-[1280px] px-p10",
          "mobile:my-[60px] mobile:min-w-[360px] mobile:px-p6",
        )}
      >
        {/* 설명 콜아웃 */}
        <Description startBefore={START_BEFORE} checkItems={CHECK_ITEMS_CASE1} />

        {/* 검색 영역 */}
        <div className={clsx("my-[26px] flex gap-g5", "mobile:mb-g10 mobile:mt-g7 mobile:gap-g3")}>
          <div className="w-[124px] mobile:h-[40px] mobile:w-[104px]">
            <Dropdown
              options={DROPDOWN_OPTIONS}
              value={selectedType}
              onChange={setSelectedType}
              placeholder="전체"
            />
          </div>
          <div className="w-[313px] mobile:w-[208px]">
            <SearchInput onSubmit={setKeyword} placeholder="검색어를 입력해 주세요." />
          </div>
        </div>

        {/* 검색 결과 및 편지쓰기 버튼 */}
        <div className={clsx("flex items-end justify-between", "mobile:items-center")}>
          <p className="text-b-lg font-bold text-gray-90">
            검색 결과 <span className="text-primary-60">{totalCount}</span>개
          </p>
          <Button size={isDesktop ? "large" : "small"} onClick={handleClick}>
            하늘나라 편지쓰기
          </Button>
        </div>

        {/* 편지 카드 영역 */}
        <div className={clsx("mt-g7 flex flex-col gap-g7", "mobile:mt-g8 mobile:gap-g7")}>
          <div className={clsx("flex w-full flex-wrap gap-g7", "mobile:gap-x-g3 mobile:gap-y-g4")}>
            {data.map((item, index) => (
              <LetterCard
                key={index}
                letterSeq={item.letterSeq}
                letterNumber={totalCount - index}
                title={item.title}
                date={item.date}
                infoItems={item.infoItems}
                views={item.views}
                toBase="/remembrance/letters-view"
              />
            ))}
          </div>
          {hasNext && (
            <Button
              size={isDesktop ? "large" : "medium"}
              variant="secondary"
              aria-label="카드 더보기"
              className={clsx("flex w-full gap-g2 text-b-lg text-secondary-60", "mobile:text-b-md")}
              onClick={handleLoadMore}
            >
              더보기
              <PlusIcon
                className={clsx(
                  "h-icon4 w-icon4 text-secondary-50",
                  "mobile:h-icon3 mobile:w-icon3",
                )}
                aria-hidden="true"
                focusable="false"
              />
            </Button>
          )}
        </div>
      </section>
    </>
  );
}
