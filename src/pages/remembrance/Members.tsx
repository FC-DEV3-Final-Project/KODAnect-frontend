import { useRef, useState } from "react";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

import clsx from "clsx";

import { TopArea } from "@/shared/components/TopArea";
import { Label } from "@/shared/components/Label";
import DatePicker from "@/shared/components/calendar/DatePicker";
import TextInput from "@/shared/components/TextInput";
import { Button } from "@/shared/components/Button";
import DonorCard from "@/features/members/component/DonorCard";

import PlusIcon from "@/assets/icon/btn-more.svg?react";

import { donorData } from "@/features/members/mock-data";

export default function Members() {
  const isMobile = useIsMobile(768);
  const pageCardCount = isMobile ? 16 : 20;

  const [inputValue, setInputValue] = useState("");
  const [cardCount, setCardCount] = useState(pageCardCount);
  const [range, setRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });

  const fromRef = useRef<HTMLButtonElement>(null);

  const sortedData = [...donorData].sort(
    (a, b) => new Date(b.donationDate).getTime() - new Date(a.donationDate).getTime(),
  );

  // 더보기 버튼 클릭 핸들러
  const handleLoadMore = () => {
    setCardCount((prev) => prev + pageCardCount);
  };

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
        <div className={clsx("flex gap-g7 text-gray-90", "mobile:flex-col mobile:gap-g5")}>
          <div
            className={clsx(
              "flex items-center gap-g4",
              "mobile:flex-col mobile:items-start mobile:gap-g3",
            )}
          >
            <Label
              size="m"
              weight="bold"
              children="기증일"
              className="min-w-[45px]"
              onClick={() => fromRef.current?.focus()}
            ></Label>
            <DatePicker range={range} onRangeChange={setRange} fromRef={fromRef} />
          </div>
          <div
            className={clsx(
              "flex items-center gap-g4",
              "mobile:flex-col mobile:items-start mobile:gap-g3",
            )}
          >
            <Label
              size="m"
              weight="bold"
              children="기증자명"
              htmlFor="donorName"
              className="min-w-[60px]"
            ></Label>
            <TextInput
              id="donorName"
              placeholder="성함을 입력해주세요"
              height={isMobile ? "small" : "medium"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="mobile:flex mobile:justify-end">
            <Button
              type="submit"
              size={isMobile ? "small" : "medium"}
              aria-label="기증자 검색"
              className="w-[70px] mobile:-mt-g1"
            >
              검색
            </Button>
          </div>
        </div>

        {/* 검색 결과 표시 영역 */}
        <div className={clsx("mb-p8 mt-p10", "mobile:mb-g5 mobile:mt-p8")}>
          <p className="text-b-lg font-bold text-gray-90">
            검색 결과 <span className="text-primary-60">12510</span>개
          </p>
        </div>

        {/* 추모 카드 영역 */}
        <div className={clsx("flex flex-col items-center gap-g8", "mobile:gap-g5")}>
          <div
            className={clsx(
              "flex flex-wrap justify-center gap-g6",
              "mobile:gap-x-g3 mobile:gap-y-g5",
            )}
          >
            {sortedData.slice(0, cardCount).map((item, index) => (
              <DonorCard
                key={index}
                donorId={item.donorId}
                donorName={item.donorName}
                genderFlag={item.genderFlag}
                donorAge={item.donorAge}
                donationDate={item.donationDate}
                replyCount={item.replyCount}
                letterCount={item.letterCount}
              />
            ))}
          </div>
          <Button
            size={isMobile ? "medium" : "large"}
            variant="secondary"
            aria-label="추모 카드 더보기"
            className={clsx("flex w-full gap-g2 text-b-lg text-secondary-60", "mobile:text-b-md")}
            onClick={handleLoadMore}
          >
            더보기
            <PlusIcon
              className={clsx("h-icon4 w-icon4 text-secondary-50", "mobile:h-icon3 mobile:w-icon3")}
              aria-hidden="true"
              focusable="false"
            />
          </Button>
        </div>
      </section>
    </>
  );
}
