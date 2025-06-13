import { useState } from "react";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

import clsx from "clsx";

import { TopArea } from "@/shared/components/TopArea";
import { Description } from "@/shared/components/Description";
import { Dropdown } from "@/shared/components/Dropdown";
import SearchInput from "@/shared/components/SearchInput";
import { Button } from "@/shared/components/Button";
import LetterCard from "@/shared/components/LetterCrad";

import PlusIcon from "@/assets/icon/btn-more.svg?react";

import { START_BEFORE, CHECK_ITEMS, DROPDOWN_OPTIONS } from "@/shared/constant/stories";
import { storyData } from "@/features/stories/mock-data";

export default function Letters() {
  const isMobile = useIsMobile(768);
  const pageCardCount = isMobile ? 16 : 20;

  const [selected, setSelected] = useState("");
  const [letterCount, setLetterCount] = useState(pageCardCount);

  const sortedData = [...storyData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // 더보기 버튼 클릭 핸들러
  const handleLoadMore = () => {
    setLetterCount((prev) => prev + pageCardCount);
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
        <Description startBefore={START_BEFORE} checkItems={CHECK_ITEMS} />

        {/* 검색 영역 */}
        <div className={clsx("my-[26px] flex gap-g5", "mobile:mb-g10 mobile:mt-g7 mobile:gap-g3")}>
          <div className="w-[124px] mobile:h-[40px] mobile:w-[104px]">
            <Dropdown
              options={DROPDOWN_OPTIONS}
              value={selected}
              onChange={setSelected}
              placeholder="전체"
            />
          </div>
          <div className="w-[313px] mobile:w-[208px]">
            <SearchInput
              onSubmit={(keyword: string) => {
                console.log(keyword);
              }}
              placeholder="검색어를 입력해 주세요."
            />
          </div>
        </div>

        {/* 검색 결과 및 편지쓰기 버튼 */}
        <div className={clsx("flex items-end justify-between", "mobile:items-center")}>
          <p className="text-b-lg font-bold text-gray-90">
            검색 결과 <span className="text-primary-60">12510</span>개
          </p>
          <Button size={isMobile ? "small" : "large"} children="이야기 쓰기" />
        </div>

        {/* 편지 카드 영역 */}
        <div
          className={clsx("mt-g7 flex flex-col items-center gap-g7", "mobile:mt-g8 mobile:gap-g7")}
        >
          <div
            className={clsx(
              "flex flex-wrap justify-center gap-g7",
              "mobile:gap-x-g3 mobile:gap-y-g4",
            )}
          >
            {sortedData.slice(0, letterCount).map((item, index) => (
              <LetterCard
                key={index}
                letterNumber={item.letterNumber}
                title={item.title}
                date={item.date}
                infoItems={item.infoItems}
                views={item.views}
              />
            ))}
          </div>
          <Button
            size={isMobile ? "medium" : "large"}
            variant="secondary"
            aria-label="카드 더보기"
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
