import Mail from "@/assets/icon/mail.svg?react";
import Visibility from "@/assets/icon/visibility.svg?react";

type LetterCardSize = "lg" | "sm";

interface LetterCardProps {
  isNew?: boolean;
  size?: LetterCardSize;
}

const letterCardPresets = {
  lg: {
    minWidth: "min-w-[282px]",
    gap: "gap-g5",
    fontTitle: "text-h-sm",
    fontDate: "text-gray-70",
    icon: "h-[30px] w-[30px]",
    badge: "rounded-r2 px-p3",
    gapIcon: "gap-g3",
    label: "",
    valueFont: "",
  },
  sm: {
    minWidth: "min-w-[230px]",
    gap: "gap-g4",
    fontTitle: "text-b-sm",
    fontDate: "text-b-xs text-gray-70",
    icon: "h-icon4 w-icon4",
    badge: "rounded-r1 px-p2 text-b-xs",
    gapIcon: "gap-g2",
    label: "text-b-xs",
    valueFont: "text-b-xs",
  },
} as const;

export default function LetterCard({ isNew = false, size = "sm" }: LetterCardProps) {
  const preset = letterCardPresets[size];

  return (
    <li>
      <a
        href="#"
        className={
          "flex flex-col rounded-r6 border bg-gray-0 p-p8 shadow-[0_0_2px_0_theme('colors.primary.10'),0_8px_16px_0_theme('colors.primary.10')] " +
          preset.minWidth +
          " " +
          preset.gap
        }
      >
        <header className={"relative flex items-center " + preset.gapIcon}>
          <Mail className={preset.icon} aria-hidden="true" />
          <span className={`${size === "sm" ? "text-b-xs" : ""} text-gray-70`}>11793번째 편지</span>
          {isNew && (
            <span
              className={"absolute right-0 bg-primary-5 text-primary-60 " + preset.badge}
              aria-label="새로운 편지"
              title="새로운 편지"
            >
              N
            </span>
          )}
        </header>
        <h3 className={"min-h-[46px] font-bold " + preset.fontTitle}>
          요즘은 잘 지내는지 궁금하네
        </h3>
        <span className={preset.fontDate}>2025-05-21</span>
        <div className="relative flex flex-col gap-g2" aria-label="기증자 정보">
          <div>
            <span className={"mr-g3 text-gray-40 " + preset.label}>기증자</span>
            <span className={preset.valueFont}>홍길동</span>
          </div>
          <div>
            <span className={"mr-g3 text-gray-40 " + preset.label}>추모자</span>
            <span className={preset.valueFont}>홍길동</span>
          </div>
          {size === "lg" && (
            <div className="absolute bottom-0 right-0 flex gap-g2 text-gray-50">
              <Visibility className="h-icon4 w-icon4" />
              <span>25</span>
            </div>
          )}
        </div>
      </a>
    </li>
  );
}
