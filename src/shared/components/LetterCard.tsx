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
    gap: "gap-g5",
    fontTitle: "text-h-sm",
    fontDate: "",
    icon: "h-[30px] w-[30px]",
    gapIcon: "gap-g3",
    lineHeight: "h-[25.5px]",
    label: "",
    valueFont: "",
  },
  sm: {
    gap: "gap-g4",
    fontTitle: "text-b-sm",
    fontDate: "text-b-xs",
    icon: "h-icon4 w-icon4",
    gapIcon: "gap-g2",
    lineHeight: "h-[19.5px]",
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

  return (
    <div>
      <a
        href="#"
        className={
          "flex flex-col rounded-r6 bg-gray-0 p-p8 text-gray-90 shadow-[0_0_2px_0_theme('colors.primary.10'),0_8px_16px_0_theme('colors.primary.10')] " +
          preset.gap
        }
      >
        {/* 상단: 아이콘, 편지 번호, N 뱃지 */}
        <div className={"relative flex items-center " + preset.gapIcon}>
          <Mail className={preset.icon} aria-hidden="true" />
          {/* 편지 번호 */}
          <span className={`${size === "sm" ? "text-b-xs" : ""} text-gray-70`}>
            {letterNumber}
            {labelType === "story" ? "번째 이야기" : "번째 편지"}
          </span>
          {/* 새 편지 뱃지 */}
          <NewBadge size="sm" date={date} />
        </div>
        {/* 편지 제목 */}
        <h3 className={"min-h-[46px] font-bold " + preset.fontTitle}>{title}</h3>
        {/* 날짜 */}
        <time className={"text-gray-70 " + preset.fontDate}>{date}</time>
        {/* 정보 영역 */}
        <div className={`${size === "lg" ? "relative" : ""} flex flex-col gap-g2`}>
          {displayInfoItems?.map((item, index) => (
            <div key={index} className={"flex items-center " + preset.lineHeight}>
              <span className={"mr-g3 text-gray-40 " + preset.label}>{item.label}</span>
              <span className={preset.valueFont}>{item.value}</span>
            </div>
          ))}
          {/* 조회수: lg 카드에서만 표시 (API 데이터로 대체 가능) */}
          {size === "lg" && (
            <div className="absolute bottom-0 right-0 flex gap-g2 text-gray-50">
              <Visibility className="h-icon4 w-icon4" />
              <span>{views}</span>
            </div>
          )}
        </div>
      </a>
    </div>
  );
}
