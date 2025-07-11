import clsx from "clsx";

import { useIsMobile } from "@/shared/hooks/useIsMobile";
import Button from "@/shared/components/Button";
import NewBadge from "@/shared/components/NewBadge";

import Message from "@/assets/icon/inquiry.svg?react";
import Letter from "@/assets/icon/mail.svg?react";
import blackRibbon from "@/assets/images/black-ribbon.png";
import { useNavigate } from "react-router-dom";

import type { DonorData } from "@/shared/types/remembrance/DonorData.types";

export default function DonorCard({
  donateSeq,
  donorName,
  genderFlag,
  donateAge,
  donateDate,
  commentCount,
  letterCount,
}: DonorData) {
  const isMobile = useIsMobile(768);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/remembrance/members-view/${donateSeq}`);
  };

  const handleWriteLetter = () => {
    navigate(`/remembrance/letters-form`, {
      state: {
        donateSeq: donateSeq,
        donorName: donorName,
      },
    });
  };

  return (
    <article
      className={clsx(
        "flex max-w-[284px] basis-1/4 flex-col gap-g6 overflow-hidden rounded-r6 border-2 border-transparent bg-white p-p8 text-gray-90",
        "shadow-[0_0_2px_0_theme('colors.secondary.10'),0_8px_16px_0_theme('colors.secondary.10')]",
        "mobile:max-w-[160px] mobile:basis-1/2 mobile:py-p6 mobile:pl-p6 mobile:pr-p5",
      )}
      aria-label={`기증자 ${donorName} 정보 카드`}
      key={donateSeq}
    >
      <div
        className={clsx("relative flex items-center gap-g4", "mobile:flex-col mobile:items-start")}
      >
        <NewBadge
          size="sm"
          date={donateDate}
          className={clsx("-right-p2 -top-p2", "mobile:right-p2 mobile:top-0")}
        />

        {/* 추모리본 이미지 */}
        <img
          src={blackRibbon}
          alt="기증자 추모리본 이미지"
          className={clsx("h-[66px] w-[66px] rounded-r4", "mobile:h-[59px] mobile:w-[59px]")}
        />
        {/* 기증자 */}
        <div className={clsx("flex h-[80px] flex-col justify-center gap-g2", "mobile:h-[64px]")}>
          <div className={clsx("flex flex-wrap items-center", "mobile:flex-nowrap")}>
            <h2 className="mr-g3 min-w-[34px] text-b-xs text-gray-40">기증자</h2>
            <p className={clsx("text-h-xs font-bold", "mobile:text-h-2xs")}>
              <span className="mr-g1">{donorName}</span>
              <span>
                ({genderFlag},{donateAge})
              </span>
            </p>
          </div>
          {/* 기증일 */}
          <div className="flex flex-wrap mobile:flex-nowrap">
            <span className="mr-g3 min-w-[34px] text-b-xs text-gray-40">기증일</span>
            <time className="text-b-sm mobile:text-b-xs">{donateDate}</time>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-g2">
        {/* 추모 메시지 */}
        <div className="flex gap-g3">
          <Message className="h-icon3 w-icon3 text-gray-40" aria-hidden="true" />
          <span className="text-b-xs text-gray-70">추모 메시지</span>
          <span className="text-b-xs text-gray-40">{commentCount}</span>
        </div>
        {/* 하늘나라 편지 */}
        <div className="flex gap-g3">
          <Letter className="h-icon3 w-icon3 text-gray-40" aria-hidden="true" />
          <span className="text-b-xs text-gray-70">하늘나라 편지</span>
          <span className="text-b-xs text-gray-40">{letterCount}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-g4 mobile:flex-col mobile:flex-nowrap">
        {/* 추모관 버튼 */}
        <Button
          variant="secondary"
          size={isMobile ? "x-small" : "small"}
          className="grow mobile:text-b-xs"
          aria-label={`${donorName} 추모관 바로가기`}
          onClick={handleClick}
        >
          추모관
        </Button>
        {/* 하늘나라 편지쓰기 버튼 */}
        <Button
          variant="tertiary"
          size={isMobile ? "x-small" : "small"}
          className="grow mobile:text-b-xs"
          aria-label={`${donorName}에게 하늘나라 편지 쓰기`}
          onClick={handleWriteLetter}
        >
          하늘나라 편지쓰기
        </Button>
      </div>
    </article>
  );
}
