import { useState } from "react";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

import clsx from "clsx";

import { Description } from "@/shared/components/Description";
import { Dropdown } from "@/shared/components/Dropdown";
import SearchInput from "@/shared/components/SearchInput";
import { Button } from "@/shared/components/Button";
import LetterCard from "@/shared/components/LetterCrad";

import PlusIcon from "@/assets/icon/btn-more.svg?react";

export default function Letters() {
  const [selected, setSelected] = useState("");
  const isMobile = useIsMobile(768);

  const startBefore =
    "기증자에 대한 그리움과 사랑을 담은 '하늘나라 편지'는 언제 어디서나 시간과 장소에 제약을 받지 않고 추모를 할 수 있는 온라인 공간으로 익명 작성이 가능합니다.";
  const checkItems = [
    "기증자에 대한 추모 분위기를 해치거나, 비방의 글 등이 게시가 될 경우 삭제 될 수 있습니다. 경건한 분위기에서 기증자분을 추모할 수 있도록 많은 노력 부탁드립니다.",
    "개인정보 노출의 우려가 있으니 게시글 작성 시 개인정보 등록은 자제하여 주시기 바랍니다.",
    "하늘나라편지에 쓰신 글을 <b class='underline'>기증활성화를 위해 장기조직 기증원 뉴스레터 및 타 매체</b>에 익명 표기와 뜻을 훼손하지 않는 범위의 수정을 통해 게재될 수 있습니다.",
    "<기증자 가족 안내> 한국장기조직기증원에서는 기증자 가족, 수혜자, 한국장기조직기증원 코디네이터 및 임직원의 이야기를 모은 여섯 번째 생명나눔 사례집 <별이 빛나는 밤에>를 출간하였습니다.",
    "도서를 직접 받아보고 싶은 분은 대외 협력팀(02-765-8736)으로 연락주시거나 <a href='/' class='underline'>신청서(링크)</a>를 작성하여 주세요.",
  ];
  const options = [
    { label: "제목", value: "title" },
    { label: "내용", value: "content" },
  ];
  const mockData = {
    letterNumber: 11793,
    title: "요즘은 잘 지내는지 궁금하네",
    date: "2025-06-07",
    infoItems: [
      { label: "기증자", value: "홍길동" },
      { label: "추모자", value: "홍길동" },
    ],
    views: 25,
  };

  return (
    <>
      {/* 상단 배너 & 탭 메뉴 */}

      <section
        className={clsx(
          "mx-auto mb-g12 mt-[76px] max-w-[1280px] px-p10",
          "mobile:my-[60px] mobile:min-w-[360px] mobile:px-p6",
        )}
      >
        {/* 설명 콜아웃 */}
        <Description startBefore={startBefore} checkItems={checkItems} />

        {/* 검색 영역 */}
        <div className={clsx("my-[26px] flex gap-g5", "mobile:mb-g10 mobile:mt-g7 mobile:gap-g3")}>
          <div className="w-[124px] mobile:w-[104px]">
            <Dropdown
              options={options}
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
        <div className="flex items-end justify-between mobile:items-center">
          <p className="text-b-lg font-bold text-gray-90">
            검색 결과 <span className="text-primary-60">12510</span>개
          </p>
          <Button size={isMobile ? "small" : "large"} children="하늘나라 편지쓰기" />
        </div>

        {/* 편지 카드 영역 */}
        <div
          className={clsx("mt-g7 flex flex-col items-center gap-g7", "mobile:mt-g8 mobile:gap-g7")}
        >
          <div className="flex flex-wrap gap-g7 mobile:gap-x-g3 mobile:gap-y-g4">
            <LetterCard
              letterNumber={mockData.letterNumber}
              title={mockData.title}
              date={mockData.date}
              infoItems={mockData.infoItems}
              views={mockData.views}
            />
            <LetterCard
              letterNumber={mockData.letterNumber}
              title={mockData.title}
              date={mockData.date}
              infoItems={mockData.infoItems}
              views={mockData.views}
            />
            <LetterCard
              letterNumber={mockData.letterNumber}
              title={mockData.title}
              date={mockData.date}
              infoItems={mockData.infoItems}
              views={mockData.views}
            />
            <LetterCard
              letterNumber={mockData.letterNumber}
              title={mockData.title}
              date={mockData.date}
              infoItems={mockData.infoItems}
              views={mockData.views}
            />
            <LetterCard
              letterNumber={mockData.letterNumber}
              title={mockData.title}
              date={mockData.date}
              infoItems={mockData.infoItems}
              views={mockData.views}
            />
            <LetterCard
              letterNumber={mockData.letterNumber}
              title={mockData.title}
              date={mockData.date}
              infoItems={mockData.infoItems}
              views={mockData.views}
            />
            <LetterCard
              letterNumber={mockData.letterNumber}
              title={mockData.title}
              date={mockData.date}
              infoItems={mockData.infoItems}
              views={mockData.views}
            />
            <LetterCard
              letterNumber={mockData.letterNumber}
              title={mockData.title}
              date={mockData.date}
              infoItems={mockData.infoItems}
              views={mockData.views}
            />
          </div>
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
      </section>
    </>
  );
}
