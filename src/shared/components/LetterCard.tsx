import clsx from "clsx";
import { NewBadge } from "@/shared/components/NewBadge";
import Mail from "@/assets/icon/mail.svg?react";
import Visibility from "@/assets/icon/visibility.svg?react";

import type { LetterData } from "../types/LetterData.types";

// 스타일 프리셋
const letterCardPresets = {
  lg: {
    layout:
      "gap-g5 max-w-[282px] basis-1/4 grow-0 shrink-0 mobile:basis-1/2 mobile:max-w-[160px] mobile:p-p6 mobile:gap-g4",
    fontTitle: "text-h-sm mobile:text-h-xs",
    fontDate: "mobile:text-b-xs",
    icon: "h-[30px] w-[30px] mobile:w-icon3 mobile:h-icon3",
    gapIcon: "gap-g3 mobile:flex-col mobile:items-start",
    label: "mobile:text-b-xs",
    valueFont: "mobile:text-b-xs",
  },
  sm: {
    layout: "gap-g4 basis-1/5 max-w-[230px] mobile:w-[208px]",
    fontTitle: "text-b-sm",
    fontDate: "text-b-xs",
    icon: "h-icon4 w-icon4",
    gapIcon: "gap-g2",
    label: "text-b-xs",
    valueFont: "text-b-xs",
  },
} as const;

// 컴포넌트 정의
export default function LetterCard({
  labelType = "letter",
  size = "lg",
  infoItems,
  letterSeq,
  title,
  date,
  views,
}: LetterData) {
  const preset = letterCardPresets[size];

  return (
    <a
      href="#"
      className={clsx(
        "flex flex-col rounded-r6 border-2 border-transparent bg-gray-0 p-p8 text-gray-90",
        "shadow-[0_0_2px_0_theme('colors.secondary.10'),0_8px_16px_0_theme('colors.secondary.10')]",
        "hover:border-2 hover:border-secondary-40 active:border-2 active:border-secondary-40 active:bg-secondary-5",
        preset.layout,
      )}
    >
      {/* 상단 영역: 아이콘, 편지 번호, 새 편지(N) 뱃지 */}
      <div className={clsx("relative flex items-center", preset.gapIcon)}>
        <Mail className={preset.icon} aria-hidden="true" focusable="false" />
        <span
          className={clsx(
            "line-clamp-1 text-gray-70 mobile:text-b-xs",
            size === "sm" && "text-b-xs",
          )}
          aria-label={labelType === "story" ? `${letterSeq}번째 이야기` : `${letterSeq}번째 편지`}
        >
          {letterSeq}
          {labelType === "story" ? "번째 이야기" : "번째 편지"}
        </span>
        <NewBadge size="sm" date={date} />
      </div>

      {/* 중간 영역: 제목, 작성일 */}
      <div className="flex flex-col gap-g5 mobile:gap-g2">
        <h3 className={clsx("line-clamp-2 min-h-[46px] font-bold", preset.fontTitle)}>{title}</h3>
        <time
          className={clsx("text-gray-70", preset.fontDate)}
          dateTime={date}
          aria-label={`작성일: ${date}`}
        >
          {date}
        </time>
      </div>

      {/* 하단 정보 영역 */}
      <div className={clsx("flex flex-col gap-g2", size === "lg" && "relative mobile:mb-[20px]")}>
        {infoItems?.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className={clsx("mr-g3 text-gray-40", preset.label)}>{item.label}</span>
            <span className={preset.valueFont}>{item.value}</span>
          </div>
        ))}
        {/* 조회수: size가 'lg'일 때만 우측 하단에 표시 */}
        {size === "lg" && (
          <div
            className="absolute bottom-0 right-0 flex gap-g2 text-gray-50 mobile:bottom-[-20px] mobile:text-b-xs"
            aria-label="조회수"
          >
            <Visibility
              className="h-icon4 w-icon4 mobile:h-icon3 mobile:w-icon3"
              aria-hidden="true"
              focusable="false"
            />
            <span>{views}</span>
          </div>
        )}
      </div>
    </a>
  );
}
