import clsx from "clsx";
import { Button } from "@/shared/components/Button";
import Message from "@/assets/icon/inquiry.svg?react";
import Letter from "@/assets/icon/mail.svg?react";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

interface DonorCardProps {
  donorName?: string;
  genderFlag?: string;
  donorAge?: number;
  donationDate?: string;
  replyCount?: number;
  letterCount?: number;
}

export default function DonorCard({
  donorName = "홍길동",
  genderFlag = "F",
  donorAge = 30,
  donationDate = "2025-06-09",
  replyCount = 5,
  letterCount = 10,
}: DonorCardProps) {
  const isMobile = useIsMobile(768);

  return (
    <li
      className={clsx(
        "flex w-[284px] flex-col gap-g6 rounded-r6 border-2 border-transparent bg-white p-p8 text-gray-90",
        "shadow-[0_0_2px_0_theme('colors.primary.10'),0_8px_16px_0_theme('colors.primary.10')]",
        "mobile:w-[160px] mobile:p-p6",
      )}
    >
      <div
        className={clsx("relative flex items-center gap-g4", "mobile:flex-col mobile:items-start")}
      >
        {/*
        <NewBadge size="sm" date={donationDate} className="-right-p2 -top-p2 mobile:top-0 mobile:right-p2"/>
        */}
        <span className="absolute -right-p2 -top-p2 rounded-r2 bg-primary-5 px-p2 text-b-xs text-primary-60 mobile:right-p2 mobile:top-0">
          N
        </span>

        {/* 추모리본 이미지 */}
        <div
          className={clsx(
            "h-[66px] w-[66px] rounded-r4 bg-gray-10",
            "mobile:h-[59px] mobile:w-[59px]",
          )}
        ></div>
        {/* 기증자 */}
        <div className="flex flex-col gap-g2">
          <div className="flex h-[52px] items-center mobile:h-[40px]">
            <span className="mr-g3 text-b-xs text-gray-40">기증자</span>
            <p className="text-h-2xs font-bold">
              {donorName}
              <span className="ml-g2">
                ({genderFlag}/{donorAge})
              </span>
            </p>
          </div>
          {/* 기증일 */}
          <div>
            <span className="mr-g3 text-b-xs text-gray-40">기증일</span>
            <span className="text-b-sm mobile:text-b-xs">{donationDate}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-g2">
        {/* 추모 메시지 */}
        <div className="flex gap-g3">
          <Message className="h-icon3 w-icon3 text-gray-40" />
          <span className="text-b-xs text-gray-70">추모 메시지</span>
          <span className="text-b-xs text-gray-40">{replyCount}</span>
        </div>
        {/* 하늘나라 편지 */}
        <div className="flex gap-g3">
          <Letter className="h-icon3 w-icon3 text-gray-40" />
          <span className="text-b-xs text-gray-70">하늘나라 편지</span>
          <span className="text-b-xs text-gray-40">{letterCount}</span>
        </div>
      </div>

      <div className="flex gap-g4 mobile:flex-col">
        {/* 추모관 버튼 */}
        <Button
          variant="secondary"
          size={isMobile ? "x-small" : "small"}
          children="추모관"
          className="flex-1 mobile:text-b-xs"
        />
        {/* 하늘나라 편지쓰기 버튼 */}
        <Button
          variant="tertiary"
          size={isMobile ? "x-small" : "small"}
          children="하늘나라 편지쓰기"
          className="mobile:text-b-xs"
        />
      </div>
    </li>
  );
}
