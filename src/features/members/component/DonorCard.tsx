import clsx from "clsx";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { Button } from "@/shared/components/Button";
import { NewBadge } from "@/shared/components/NewBadge";
import Message from "@/assets/icon/inquiry.svg?react";
import Letter from "@/assets/icon/mail.svg?react";
import blackRibbon from "@/assets/images/black-ribbon.png";

interface DonorCardProps {
  donorName: string;
  genderFlag: string;
  donorAge: number;
  donationDate: string;
  replyCount: number;
  letterCount: number;
}

export default function DonorCard({
  donorName,
  genderFlag,
  donorAge,
  donationDate,
  replyCount,
  letterCount,
}: DonorCardProps) {
  const isMobile = useIsMobile(768);

  return (
    <li
      className={clsx(
        "flex w-[284px] flex-col gap-g6 rounded-r6 border-2 border-transparent bg-white p-p8 text-gray-90",
        "shadow-[0_0_2px_0_theme('colors.secondary.10'),0_8px_16px_0_theme('colors.secondary.10')]",
        "mobile:w-[160px] mobile:py-p6 mobile:pl-p6 mobile:pr-p5",
      )}
    >
      <div
        className={clsx("relative flex items-center gap-g4", "mobile:flex-col mobile:items-start")}
      >
        <NewBadge
          size="sm"
          date={donationDate}
          className="-right-p2 -top-p2 mobile:right-p2 mobile:top-0"
        />

        {/* 추모리본 이미지 */}
        <img
          src={blackRibbon}
          alt="추모리본"
          className={clsx("h-[66px] w-[66px] rounded-r4", "mobile:h-[59px] mobile:w-[59px]")}
        />
        {/* 기증자 */}
        <div className="flex flex-col gap-g2">
          <div className="flex h-[52px] items-center mobile:h-[40px]">
            <span className="mr-g3 text-b-xs text-gray-40 mobile:min-w-[34px]">기증자</span>
            <p className="text-h-2xs font-bold">
              <span className="mr-g1">{donorName}</span>
              <span>
                ({genderFlag}/{donorAge})
              </span>
            </p>
          </div>
          {/* 기증일 */}
          <div>
            <span className="mr-g3 text-b-xs text-gray-40 mobile:min-w-[34px]">기증일</span>
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
