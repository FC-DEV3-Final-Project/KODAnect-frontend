import Mail from "@/assets/icon/mail.svg?react";
import Visibility from "@/assets/icon/visibility.svg?react";

// 정보 아이템 타입 (라벨/값 한 쌍)
type InfoItem = {
  label: string;
  value: string;
};

type LetterCardSize = "lg" | "sm";

// 컴포넌트에 전달할 props 타입 정의
interface LetterCardProps {
  labelType?: "letter" | "story"; // 기본값은 "letter"
  isNew?: boolean;
  size?: LetterCardSize;
  infoItems?: InfoItem[]; // 기증자/추모자 등 정보 (lg에서만 커스텀, sm은 무시)
  letterNumber?: number;
  title?: string;
  date?: string;
  views?: number; // 조회수 (lg에서만 표시)
}

// 스타일 프리셋
const letterCardPresets = {
  lg: {
    minWidth: "min-w-[282px]",
    gap: "gap-g5",
    fontTitle: "text-h-sm",
    fontDate: "",
    icon: "h-[30px] w-[30px]",
    badge: "rounded-r2 px-p3",
    gapIcon: "gap-g3",
    lineHeight: "h-[25.5px]",
    label: "",
    valueFont: "",
  },
  sm: {
    minWidth: "min-w-[230px]",
    gap: "gap-g4",
    fontTitle: "text-b-sm",
    fontDate: "text-b-xs",
    icon: "h-icon4 w-icon4",
    badge: "rounded-r1 px-p2 text-b-xs",
    gapIcon: "gap-g2",
    lineHeight: "h-[19.5px]",
    label: "text-b-xs",
    valueFont: "text-b-xs",
  },
} as const;

// 기본 정보 (데이터 연동 시 삭제)
const defaultInfoItems: InfoItem[] = [
  { label: "기증자", value: "홍길동" },
  { label: "추모자", value: "홍길동" },
];

// 컴포넌트 정의
export default function LetterCard({
  labelType = "letter",
  isNew = false,
  size = "lg",
  infoItems, // lg에서만 사용, 없으면 기본값
  letterNumber = 11793,
  title = "요즘은 잘 지내는지 궁금하네",
  date = "2025-05-21",
  views = 25,
}: LetterCardProps) {
  const preset = letterCardPresets[size];

  // sm이거나, lg인데 infoItems가 없으면 기본 infoItems 사용
  const displayInfoItems =
    size === "sm" || !infoItems || infoItems.length === 0 ? defaultInfoItems : infoItems;

  return (
    <li>
      <a
        href="#"
        className={
          "flex flex-col rounded-r6 bg-gray-0 p-p8 text-gray-90 shadow-[0_0_2px_0_theme('colors.primary.10'),0_8px_16px_0_theme('colors.primary.10')] " +
          preset.minWidth +
          " " +
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
          {isNew && (
            <span
              className={"absolute right-0 bg-primary-5 text-primary-60 " + preset.badge}
              aria-label="새로운 편지"
              title="새로운 편지"
            >
              N
            </span>
          )}
        </div>
        {/* 편지 제목 */}
        <h3 className={"min-h-[46px] font-bold " + preset.fontTitle}>{title}</h3>
        {/* 날짜 */}
        <time className={"text-gray-70 " + preset.fontDate}>{date}</time>
        {/* 정보 영역 */}
        <div className={`${size === "lg" ? "relative" : ""} flex flex-col gap-g2`}>
          {displayInfoItems.map((item, idx) => (
            <div key={idx} className={"flex items-center " + preset.lineHeight}>
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
    </li>
  );
}
