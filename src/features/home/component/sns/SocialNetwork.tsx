import { useRef, useState } from "react";
import Slider from "react-slick";

import clsx from "clsx";
import { snsData } from "@/features/home/component/sns/mock-data";
import { SnsCard } from "@/features/home/component/sns/SnsCard";

import Arrow from "@/assets/icon/round-arrow.svg?react";

export default function SocialNetwork() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    afterChange: (index: number) => {
      setCurrentSlide(index);
    },
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
  };

  return (
    <article className="relative flex flex-col mobile:gap-g3">
      <h2 className="text-b-lg font-bold">SNS</h2>
      <div className="-ml-p1 w-full overflow-x-hidden">
        <Slider
          ref={sliderRef}
          {...settings}
          className={clsx(
            "[&_.slick-track]:!flex",
            "[&_.slick-track]:gap-g4",
            "[&_.slick-track]:!whitespace-nowrap",
            "[&_.slick-slide]:!w-[240px]",
            "[&_.slick-slide]:!shrink-0",
            "[&_.slick-slide]:py-p3 [&_.slick-slide]:pl-p1 [&_.slick-slide]:pr-p4",
            "mobile:[&_.slick-slide]:px-p2",
          )}
        >
          {snsData.map((item, index) => (
            <SnsCard imageUrl={item.imageUrl} key={index} title={item.title} />
          ))}
        </Slider>

        {/* custom-button */}
        <div className="absolute right-0 top-[-1px] flex gap-g5">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            aria-label="이전"
            disabled={currentSlide === 0}
            className={clsx(
              "transition-opacity",
              currentSlide === 0 && "pointer-events-none opacity-60",
            )}
          >
            <Arrow className="h-icon5 w-icon5" />
          </button>

          <button
            onClick={() => sliderRef.current?.slickNext()}
            aria-label="다음"
            disabled={currentSlide === snsData.length - 1}
            className={clsx(
              "transition-opacity",
              currentSlide === snsData.length - 1 && "pointer-events-none opacity-60",
            )}
          >
            <Arrow className="h-icon5 w-icon5 rotate-180" />
          </button>
        </div>
      </div>
    </article>
  );
}
