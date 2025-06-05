import clsx from "clsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useRef } from "react";

import Slider from "react-slick";
import BlackRibbon from "@/assets/images/black-ribbon.png";
import { NewBadge } from "@/shared/components/NewBadge";
import SliderNextArrow from "../common/SliderNextArrow";
import { donorData } from "./mock-data";

export default function DonorMemorial() {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    variableWidth: true,
    nextArrow: <SliderNextArrow />,
    prevArrow: <></>,
  };

  return (
    <article
      className="flex flex-col items-center justify-between gap-g4 rounded-r6 mobile:mt-g6"
      aria-labelledby="donor-memorial-heading"
    >
      <div className="flex w-full flex-col gap-g3">
        <div className="flex items-center justify-between">
          <h2 id="donor-memorial-heading" className="text-h-md font-bold mobile:text-h-sm">
            기증자 추모
          </h2>
          {/* 지선님 컴포넌트로 교체 예정 */}
          <span className="text-b-sm">더보기</span>
        </div>
        <p className="text-b-sm text-gray-70 mobile:text-b-xs">
          생명 나눔을 실천한 분들의 고귀한 뜻, 잊지 않겠습니다.
        </p>
      </div>
      <div className="relative -my-p6 -ml-p4 w-full">
        <Slider
          ref={sliderRef}
          {...settings}
          className={clsx(
            "[&_.slick-track]:!flex",
            "[&_.slick-track]:!whitespace-nowrap",
            "[&_.slick-slide]:!w-[280px]",
            "[&_.slick-slide]:!shrink-0",
            "[&_.slick-slide]:px-p4 [&_.slick-slide]:py-p6",
            "mobile:[&_.slick-slide]:!w-[220px]",
            "mobile:[&_.slick-slide]:px-p2",
          )}
        >
          {donorData.map((item) => (
            <div
              key={item.donateSeq}
              className={clsx(
                "!flex w-full shrink-0 items-center gap-g5 mobile:gap-g4",
                "shadow-2 relative z-10 rounded-r6 bg-white p-p6",
              )}
              aria-label={`기증자 ${item.donorName}`}
            >
              {/* 상세 페이지 이동 필요하면 donateSeq, Link 사용하면 될것 같습니다 */}
              <NewBadge donateDate={item.donateDate} />
              <img src={BlackRibbon} alt="검은 리본 이미지" className="h-full mobile:w-[45px]" />
              <div>
                <p className="mb-g2 text-b-lg font-bold text-gray-90 mobile:text-b-sm">
                  {item.donorName}
                </p>
                <p className="flex items-center gap-g5 text-b-sm text-gray-40 mobile:gap-g3 mobile:text-b-xs">
                  <span>기증일</span>
                  <time dateTime={item.donateDate}>{item.donateDate}</time>
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </article>
  );
}
