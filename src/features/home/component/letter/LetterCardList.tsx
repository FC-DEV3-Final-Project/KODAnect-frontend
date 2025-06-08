import { useRef, useState } from "react";
import Slider from "react-slick";

import { lettersData } from "@/features/home/component/letter/mock-data";
import LetterCard from "@/features/home/component/letter/LetterCard";
import clsx from "clsx";

interface Letter {
  letterNumber: number;
  title: string;
  date: string;
  infoItems: { label: string; value: string }[];
}

// 카드 2개씩 묶기
function groupByCount<T>(arr: T[], count: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += count) {
    result.push(arr.slice(i, i + count));
  }
  return result;
}

export default function LetterCardList() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<Slider | null>(null);
  const lettersGroup = groupByCount<Letter>(lettersData, 2);

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_oldIndex: number, newIndex: number) => setActiveIndex(newIndex),
  };

  return (
    <>
      {/* PC: 전체 카드 노출 */}
      <div className="grid w-full grid-cols-5 gap-g4 mobile:hidden">
        {lettersData.map((item, index) => (
          <LetterCard
            key={index}
            size="sm"
            letterNumber={item.letterNumber}
            title={item.title}
            infoItems={item.infoItems}
            date={item.date}
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
            "[&_.slick-slide]:!w-[208px]",
            "[&_.slick-slide]:!shrink-0",
            "[&_.slick-slide]:py-p3",
            "[&_.slick-slide]:px-p2",
          )}
        >
          {lettersGroup.map((group, index) => (
            <div key={index} className="!grid grid-rows-2 gap-g3">
              {group.map((item) => (
                <LetterCard
                  key={item.letterNumber}
                  size="sm"
                  letterNumber={item.letterNumber}
                  title={item.title}
                  infoItems={item.infoItems}
                  date={item.date}
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
                activeIndex === index ? "w-[20px] rounded-r4 bg-primary-50" : "w-[8px] bg-gray-50",
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
