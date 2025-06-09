import { NewBadge } from "@/shared/components/NewBadge";

import Mail from "@/assets/icon/mail.svg?react";
import Visibility from "@/assets/icon/visibility.svg?react";

// 정보 아이템 타입
type InfoItem = {
  label: string;
  value: string;
};

type LetterCardSize = "lg" | "sm";

// 컴포넌트에 전달할 props 타입 정의
interface LetterCardProps {
  labelType?: "letter" | "story"; // 기본값은 "letter"
  size?: LetterCardSize;
  infoItems?: InfoItem[]; // lg에서만 사용
  letterNumber?: number;
  title?: string;
  date?: string;
  views?: number; // 조회수 (lg에서만 표시)
}

// 스타일 프리셋
const letterCardPresets = {
  lg: {
    layout: "gap-g5 mobile:gap-g4 mobile:w-[160px] mobile:p-p6",
    fontTitle: "text-h-sm mobile:text-h-xs",
    fontDate: "mobile:text-b-xs",
    icon: "h-[30px] w-[30px] mobile:w-icon3 mobile:h-icon3",
    gapIcon: "gap-g3",
    label: "mobile:text-b-xs",
    valueFont: "mobile:text-b-xs",
  },
  sm: {
    layout: "gap-g4",
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
  infoItems, // lg에서만 사용, 없으면 기본값
  letterNumber,
  title,
  date,
  views,
}: LetterCardProps) {
  const preset = letterCardPresets[size];
  const displayInfoItems = infoItems;
  const infoCount = displayInfoItems?.length ?? 0;

  // infoItems가 2줄 이상이면 mb와 조회수 위치 유지, 1줄이면 mb 제거 및 조회수 바로 아래
  const infoAreaClass =
    (size === "lg" ? "relative " : "") +
    "flex flex-col gap-g2 " +
    (size === "lg" && infoCount > 1 ? "mobile:mb-[20px]" : "");
  const viewsClass =
    "absolute right-0 flex gap-g2 text-gray-50 mobile:text-b-xs " +
    (infoCount > 1 ? "bottom-0 mobile:bottom-[-20px]" : "bottom-0");

  return (
    <a
      href="#"
      className={
        "flex flex-col rounded-r6 border-2 border-transparent bg-gray-0 p-p8 text-gray-90 shadow-[0_0_2px_0_theme('colors.primary.10'),0_8px_16px_0_theme('colors.primary.10')] hover:border-2 hover:border-primary-40 active:border-2 active:border-primary-40 active:bg-secondary-5 " +
        preset.layout
      }
    >
      {/* 상단: 아이콘, 편지 번호, N 뱃지 */}
      <div
        className={
          "relative flex items-center mobile:flex-col mobile:items-start " + preset.gapIcon
        }
      >
        <Mail className={preset.icon} aria-hidden="true" />
        {/* 편지 번호 */}
        <span className={`${size === "sm" ? "text-b-xs" : ""} text-gray-70 mobile:text-b-xs`}>
          {letterNumber}
          {labelType === "story" ? "번째 이야기" : "번째 편지"}
        </span>
        {/* 새 편지 뱃지 */}
        <NewBadge size="sm" date={date} />
      </div>
      {/* 편지 제목 */}
      <h3 className={"line-clamp-2 min-h-[46px] font-bold " + preset.fontTitle}>{title}</h3>
      {/* 날짜 */}
      <time className={"text-gray-70 " + preset.fontDate}>{date}</time>
      {/* 정보 영역 */}
      <div className={infoAreaClass}>
        {displayInfoItems?.map((item, index) => {
          const infoItemClass =
            infoCount === 1 ? "flex items-start mobile:flex-col" : "flex items-center";
          return (
            <div key={index} className={infoItemClass}>
              <span className={"mr-g3 text-gray-40 " + preset.label}>{item.label}</span>
              <span className={preset.valueFont}>{item.value}</span>
            </div>
          );
        })}
        {/* 조회수: lg 카드에서만 표시 (API 데이터로 대체 가능) */}
        {size === "lg" && (
          <div className={viewsClass}>
            <Visibility className="h-icon4 w-icon4 mobile:h-icon3 mobile:w-icon3" />
            <span>{views}</span>
          </div>
        )}
      </div>
    </a>
  );
}
