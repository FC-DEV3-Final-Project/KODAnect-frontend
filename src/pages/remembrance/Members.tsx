import { useState } from "react";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

import clsx from "clsx";
import PlusIcon from "@/assets/icon/btn-more.svg?react";

import { Tab } from "@/shared/components/Tab";
import DatePicker from "@/shared/components/calendar/DatePicker";
import TextInput from "@/shared/components/TextInput";
import TopVisual from "@/shared/components/TopVisual";
import { Button } from "@/shared/components/Button";

import DonorCard from "@/features/members/component/DonorCard";

export default function Members() {
  const isMobile = useIsMobile(768);
  const [range, setRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });

  return (
    <>
      {/* 상단 배너 & 탭 메뉴 */}
      <div
        className={clsx(
          "absolute left-1/2 top-[390px] z-10 w-[1062px] -translate-x-1/2",
          "mobile:top-[330px] mobile:w-[328px]",
        )}
      >
        <Tab
          tabs={[
            { label: "기증자 추모관", content: "" },
            { label: "하늘나라 편지", content: "" },
            { label: "수혜자 편지", content: "" },
            { label: "기증자 스토리", content: "" },
          ]}
        />
      </div>
      <TopVisual type="memorial" />

      <div className="mx-auto mb-g12 mt-[102px] max-w-[1280px] px-p10 mobile:mb-[60px] mobile:mt-[56px] mobile:px-p6">
        {/* 기증일 & 기증자 검색 영역 */}
        <div className="flex gap-g7 text-gray-90 mobile:flex-col mobile:gap-g5">
          <div className="flex items-center gap-g4 mobile:flex-col mobile:items-start mobile:gap-g3">
            <span className="font-bold mobile:text-b-sm">기증일</span>
            <DatePicker range={range} onRangeChange={setRange} />
          </div>
          <div className="flex items-center gap-g4 mobile:flex-col mobile:items-start mobile:gap-g3">
            <span className="font-bold mobile:text-b-sm">기증자명</span>
            <TextInput
              id=""
              placeholder="성함을 입력해주세요"
              height={isMobile ? "small" : "medium"}
            />
          </div>
          <div className="mobile:flex mobile:justify-end">
            <Button
              size={isMobile ? "small" : "medium"}
              children="검색"
              className="w-[70px] mobile:-mt-g1"
            />
          </div>
        </div>

        {/* 검색 결과 표시 영역 */}
        <div className="mb-p8 mt-p10 mobile:mb-g5 mobile:mt-p8">
          <p className="text-b-lg font-bold text-gray-90">
            검색 결과 <span className="text-primary-60">12510</span>개
          </p>
        </div>

        {/* 추모 카드 영역 */}
        <div className="flex flex-col items-center gap-g8 mobile:gap-g5">
          <ul className="flex flex-wrap gap-g6 mobile:gap-x-3 mobile:gap-y-g5">
            <DonorCard />
            <DonorCard />
            <DonorCard />
            <DonorCard />
            <DonorCard />
            <DonorCard />
            <DonorCard />
            <DonorCard />
            <DonorCard />
            <DonorCard />
            <DonorCard />
            <DonorCard />
            <DonorCard />
            <DonorCard />
            <DonorCard />
            <DonorCard />
            <DonorCard />
            <DonorCard />
            <DonorCard />
            <DonorCard />
          </ul>
          <Button
            size={isMobile ? "medium" : "large"}
            variant="secondary"
            aria-label="댓글 더보기"
            className="flex w-full gap-g2"
          >
            <span className="text-b-lg text-secondary-60 mobile:text-b-md">더보기</span>
            <PlusIcon
              className="h-icon4 w-icon4 text-secondary-50 mobile:h-icon3 mobile:w-icon3"
              aria-hidden="true"
              focusable="false"
            />
          </Button>
        </div>
      </div>
    </>
  );
}
