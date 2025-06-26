import { useRef, useState } from "react";
import Slider from "react-slick";

import clsx from "clsx";
import MoreButton from "@/features/home/component/common/MoreButton";
import StoryCard from "@/features/home/component/story/StoryCard";
import Arrow from "@/assets/icon/round-arrow.svg?react";
import { storiesData } from "@/features/home/mock-data";

export default function Story() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    afterChange: (index: number) => {
      setCurrentSlide(index);
    },
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    variableWidth: true,
    draggable: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="relative mx-auto mb-g10 flex max-w-[1280px] gap-g7 px-p10 text-gray-90 mobile:mb-g8 mobile:flex-col mobile:gap-0 mobile:px-p6">
      <div className="relative mt-[64px] flex-auto mobile:mt-0 mobile:w-full">
        <h2 className="text-d-sm font-bold mobile:text-h-sm">생명나눔 이야기</h2>
        <p className="mb-g5 mt-g2 text-b-lg mobile:text-b-xs">
          가슴 따뜻해지는 생명나눔 이야기를 소개합니다.
        </p>
        <MoreButton
          to="/announcement/05"
          className="text-b-sm mobile:absolute mobile:right-0 mobile:top-0 mobile:text-b-xs"
        />
        {/* pagination + custom-button */}
        <div className="absolute bottom-[70px] right-0 flex gap-g5 mobile:hidden">
          <button onClick={() => sliderRef.current?.slickPrev()} aria-label="이전">
            <Arrow className="h-icon6 w-icon6" />
          </button>

          <div className="flex gap-g2 rounded-full border border-gray-20 px-p6 py-p3 font-bold">
            <span className="text-secondary-80">{currentSlide + 1}</span>
            <span>/</span>
            <span>{storiesData.length}</span>
          </div>

          <button onClick={() => sliderRef.current?.slickNext()} aria-label="다음">
            <Arrow className="h-icon6 w-icon6 rotate-180" />
          </button>
        </div>
      </div>

      <div className="relative basis-2/3 overflow-x-hidden">
        <Slider
          ref={sliderRef}
          {...settings}
          className={clsx(
            "[&_.slick-track]:!flex",
            "[&_.slick-track]:!whitespace-nowrap",
            "[&_.slick-slide]:!w-[240px]",
            "[&_.slick-slide]:!shrink-0",
            "[&_.slick-slide]:px-p3",
            "[&_.slick-slide]:pb-p3",
            "mobile:[&_.slick-slide]:px-2",
          )}
        >
          {storiesData.map((item, index) => (
            <StoryCard
              key={index}
              imageUrl={item.imageUrl}
              title={item.title}
              date={item.date}
              view={item.view}
            />
          ))}
        </Slider>
      </div>
    </section>
  );
}
