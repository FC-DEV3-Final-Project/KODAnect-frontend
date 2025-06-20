import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import api from "@/shared/api/axios/axiosInstance";
import clsx from "clsx";
import LetterCard from "@/shared/components/LetterCard";
import { heavenLetterMain } from "@/features/remembrance/dataMapping";
import type { LetterCardData } from "@/shared/types/LetterCard.types";

// 카드 2개씩 묶기
function groupByCount<T>(arr: T[], count: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += count) {
    result.push(arr.slice(i, i + count));
  }
  return result;
}

export default function LetterCardList() {
  const [letters, setLetters] = useState<LetterCardData[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const sliderRef = useRef<Slider | null>(null);
  const lettersGroup = groupByCount<LetterCardData>(letters, 2);

  useEffect(() => {
    const loadData = async () => {
      const response = await api.get("/heavenLetters", {
        params: {
          size: 10,
        },
      });
      // 매핑 적용
      const mappedData = response.data.data.content.map(heavenLetterMain);
      setLetters(mappedData);
      setTotalCount(response.data.data.totalCount);
    };
    loadData();
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    beforeChange: (_oldIndex: number, newIndex: number) => setActiveIndex(newIndex),
  };

  return (
    <>
      {/* PC: 전체 카드 노출 */}
      <div className="grid w-full grid-cols-5 items-center gap-g4 mobile:hidden">
        {letters.map((item, index) => (
          <LetterCard
            key={item.letterSeq}
            size="sm"
            letterSeq={item.letterSeq}
            letterNumber={totalCount - index}
            title={item.title}
            infoItems={item.infoItems}
            date={item.date}
            toBase="/remembrance/Letter-view"
          />
        ))}
      </div>

      {/* 모바일: 2장씩 묶은 카드 그룹 슬라이드 */}
      <div className="hidden w-full overflow-x-hidden mobile:block">
        <Slider
          ref={sliderRef}
          {...settings}
          className={clsx(
            "[&_.slick-track]:!flex",
            "[&_.slick-track]:!whitespace-nowrap",
            "[&_.slick-track]:!gap-0",
            "[&_.slick-slide]:!w-[216px]",
            "[&_.slick-slide]:!shrink-0",
            "[&_.slick-slide]:py-p3",
            "[&_.slick-slide]:px-p2",
          )}
        >
          {lettersGroup.map((group, index) => (
            <div key={index} className="!grid grid-rows-2 gap-g3">
              {group.map((item, index) => (
                <LetterCard
                  key={item.letterSeq}
                  size="sm"
                  letterSeq={item.letterSeq}
                  letterNumber={totalCount - index}
                  title={item.title}
                  infoItems={item.infoItems}
                  date={item.date}
                  toBase="/remembrance/Letter-view"
                />
              ))}
            </div>
          ))}
        </Slider>
      </div>

      <div className="mb-g8 mt-g3 hidden w-full justify-center mobile:flex">
        {/* 슬라이드 인디케이터 */}
        <nav aria-label="배너 슬라이드 페이지 선택" className="flex gap-2 p-p6">
          {lettersGroup.map((_, index) => (
            <button
              key={index}
              className={clsx(
                "h-[8px] rounded-full transition-all duration-300",
                activeIndex === index
                  ? "w-[20px] rounded-r4 bg-secondary-50"
                  : "w-[8px] bg-gray-50",
              )}
              onClick={() => sliderRef.current?.slickGoTo(index)}
              aria-current={activeIndex === index ? "true" : undefined}
              aria-label={`배너 ${index + 1} 보기`}
            />
          ))}
        </nav>
      </div>
    </>
  );
}
