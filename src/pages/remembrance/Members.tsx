import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { format } from "date-fns";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { useDonorList } from "@/shared/hooks/useDonorList";

import TopArea from "@/shared/components/TopArea";
import { Label } from "@/shared/components/Label";
import DatePicker from "@/shared/components/calendar/DatePicker";
import TextInput from "@/shared/components/TextInput";
import Button from "@/shared/components/Button";
import DonorCard from "@/features/remembrance/members/component/DonorCard";
import DonorCardSkeletonList from "@/features/remembrance/members/component/DonorCardSkeleton";

import clsx from "clsx";
import PlusIcon from "@/assets/icon/btn-more.svg?react";

export default function Members() {
  const navigate = useNavigate();
  const isDesktop = !useIsMobile(768);
  const pageSize = isDesktop ? 20 : 16;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");

  const [range, setRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });
  const fromRef = useRef<HTMLButtonElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } =
    useDonorList({ startDate, endDate, keyword, pageSize });

  const donorData = data ? data.pages.flatMap((page) => page.content) : [];
  const totalCount = data?.pages?.[0]?.totalCount ?? 0;

  useEffect(() => {
    if (isError) navigate("/error");
  }, [isError, navigate]);

  const handleDateChange = (range: { from: Date | null; to: Date | null }) => {
    setRange(range);
    setStartDate(range.from ? format(range.from, "yyyy-MM-dd") : "");
    setEndDate(range.to ? format(range.to, "yyyy-MM-dd") : "");
  };

  const handleSearch = () => refetch();
  const handleLoadMore = () => fetchNextPage();

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
            <DatePicker
              range={range}
              onRangeChange={handleDateChange}
              fromRef={fromRef}
              yearRange={{ start: 2020, end: 2025 }}
            />
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
              "flex flex-wrap gap-g6",
              "mobile:justify-center mobile:gap-x-g3 mobile:gap-y-g5",
            )}
          >
            {isLoading ? (
              <DonorCardSkeletonList count={isDesktop ? 20 : 8} />
            ) : (
              donorData.map((item, index) => (
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
              ))
            )}
          </div>
          {hasNextPage && (
            <Button
              size={isDesktop ? "large" : "medium"}
              variant="secondary"
              aria-label="추모 카드 더보기"
              className={clsx("flex w-full gap-g2 text-b-lg text-secondary-60", "mobile:text-b-md")}
              onClick={handleLoadMore}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "로딩 중..." : "더보기"}
              <PlusIcon
                className={clsx(
                  "h-icon4 w-icon4 text-secondary-50",
                  "mobile:h-icon3 mobile:w-icon3",
                  isFetchingNextPage && "hidden",
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
