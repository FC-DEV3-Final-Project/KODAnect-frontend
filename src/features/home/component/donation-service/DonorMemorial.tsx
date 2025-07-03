import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "@/shared/api/axios/axiosInstance";
import type { DonorData } from "@/shared/types/remembrance/DonorData.types";

import NewBadge from "@/shared/components/NewBadge";
import BlackRibbon from "@/assets/images/black-ribbon.png";
import MoreButton from "@/features/home/component/common/MoreButton";
import { SliderNextArrow } from "@/features/home/component/common/SliderArrow";
import clsx from "clsx";

// 1. 함수 분리
async function fetchDonorList() {
  const response = await api.get("/remembrance", {
    params: { size: 10 },
  });
  return response.data.data.content as DonorData[];
}

export default function DonorMemorial() {
  const sliderRef = useRef<Slider | null>(null);

  // 2. React Query로 데이터 패칭
  const { data: donor = [], isError } = useQuery({
    queryKey: ["donorList", 10],
    queryFn: fetchDonorList,
  });

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    variableWidth: true,
    nextArrow: <SliderNextArrow />,
    prevArrow: <></>,
  };

  if (isError) {
    return <div>데이터를 불러오지 못했습니다.</div>;
  }

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
          <MoreButton to="/remembrance/members" className="text-b-sm" />
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
          {donor.map((item) => (
            <div
              key={item.donateSeq}
              className={clsx(
                "!flex w-full shrink-0 items-center gap-g5 mobile:gap-g4",
                "relative z-10 rounded-r6 bg-white p-p6 shadow-2",
              )}
              aria-label={`기증자 ${item.donorName}`}
            >
              {/* 상세 페이지 이동 필요하면 donateSeq, Link 사용하면 될것 같습니다 */}
              <NewBadge
                date={item.donateDate}
                className="right-[16px] top-[16px] py-p1 mobile:right-[12px] mobile:top-[12px] mobile:py-0 mobile:text-b-xs"
              />
              <img
                src={BlackRibbon}
                alt="검은 리본 이미지"
                className="h-[87px] w-[65px] object-cover mobile:h-[60px] mobile:w-[45px]"
              />
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
