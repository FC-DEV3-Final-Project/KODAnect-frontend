import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { formatDateToYMD } from "@/shared/utils/formatDate";
import { fetchDonorData } from "@/shared/api/members/donorApi";
import type { DonorData } from "@/shared/types/remembrance/DonorData.types";

import TopArea from "@/shared/components/TopArea";
import { Label } from "@/shared/components/Label";
import DatePicker from "@/shared/components/calendar/DatePicker";
import TextInput from "@/shared/components/TextInput";
import Button from "@/shared/components/Button";
import DonorCard from "@/features/remembrance/members/component/DonorCard";

import clsx from "clsx";
import PlusIcon from "@/assets/icon/btn-more.svg?react";

export default function Members() {
  const navigate = useNavigate();
  const isDesktop = !useIsMobile(768);
  const pageSize = isDesktop ? 20 : 16;

  const [range, setRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");

  const [donorData, setDonorData] = useState<DonorData[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [nextCursor, setNextCursor] = useState<{ cursor: number; date: string } | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fromRef = useRef<HTMLButtonElement>(null);
  const nextCursorRef = useRef(nextCursor);

  // 데이터 불러오기
  useEffect(() => {
    handleLoadMore();
  }, []);

  const handleDateChange = (range: { from: Date | null; to: Date | null }) => {
    setRange(range);
    setStartDate(range.from ? formatDateToYMD(range.from) : "");
    setEndDate(range.to ? formatDateToYMD(range.to) : "");
  };

  const fetchAndSetData = async (isLoadMore = false) => {
    try {
      const result = await fetchDonorData({
        startDate,
        endDate,
        keyWord: keyword,
        cursor: isLoadMore ? nextCursorRef.current?.cursor : undefined,
        date: isLoadMore ? nextCursorRef.current?.date : undefined,
        size: pageSize,
      });

      // 더보기라면 기존 데이터에 추가, 아니라면 새로 설정
      setDonorData((prev) => (isLoadMore ? [...prev, ...result.content] : result.content));
      setHasNext(result.hasNext);
      setNextCursor(result.nextCursor);
      nextCursorRef.current = result.nextCursor;
      setTotalCount(result.totalCount);
    } catch (error) {
      navigate("/error");
    }
  };

  // 검색 핸들러
  const handleSearch = () => fetchAndSetData(false);

  // 더보기 버튼 클릭 시 실행
  const handleLoadMore = () => fetchAndSetData(true);

  return (
    <>
      {/* 상단 배너 & 탭 메뉴 */}
      <TopArea />

      <section
        className={clsx(
          "mx-auto mb-g12 mt-[102px] max-w-[1280px] px-p10",
          "mobile:mb-[60px] mobile:mt-[56px] mobile:px-p6",
        )}
      >
        {/* 기증일 & 기증자 검색 영역 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className={clsx("flex gap-g7 text-gray-90", "mobile:flex-col mobile:gap-g5")}
        >
          <div
            className={clsx(
              "flex items-center gap-g4",
              "mobile:flex-col mobile:items-start mobile:gap-g3",
            )}
          >
            <Label size="m" weight="bold" htmlFor="donorName" className="min-w-[60px]">
              기증자명
            </Label>
            <TextInput
              id="donorName"
              placeholder="성함을 입력해주세요"
              height={isDesktop ? "medium" : "small"}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
          </div>
          <div
            className={clsx(
              "flex basis-1/2 items-center gap-g4",
              "mobile:flex-col mobile:items-start mobile:gap-g3",
            )}
          >
            <Label
              size="m"
              weight="bold"
              className="min-w-[45px]"
              onClick={() => fromRef.current?.focus()}
            >
              기증일
            </Label>
            <DatePicker range={range} onRangeChange={handleDateChange} fromRef={fromRef} />
          </div>
          <div className="mobile:flex mobile:justify-end">
            <Button
              type="submit"
              size={isDesktop ? "medium" : "small"}
              aria-label="기증자 검색"
              className="w-[70px] mobile:-mt-g1 mobile:w-full"
            >
              검색
            </Button>
          </div>
        </form>

        {/* 검색 결과 표시 영역 */}
        <div className={clsx("mb-p8 mt-p10", "mobile:mb-g5 mobile:mt-p8")}>
          <p className="text-b-lg font-bold text-gray-90">
            검색 결과 <span className="text-primary-60">{totalCount}</span>개
          </p>
        </div>

        {/* 추모 카드 영역 */}
        <div className={clsx("flex flex-col gap-g8", "mobile:gap-g5")}>
          <div
            className={clsx(
              "flex flex-wrap justify-center gap-g6",
              "mobile:gap-x-g3 mobile:gap-y-g5",
            )}
          >
            {donorData.map((item, index) => (
              <DonorCard
                key={index}
                donateSeq={item.donateSeq}
                donorName={item.donorName}
                genderFlag={item.genderFlag}
                donateAge={item.donateAge}
                donateDate={item.donateDate}
                commentCount={item.commentCount}
                letterCount={item.letterCount}
              />
            ))}
          </div>
          {hasNext && (
            <Button
              size={isDesktop ? "large" : "medium"}
              variant="secondary"
              aria-label="추모 카드 더보기"
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
