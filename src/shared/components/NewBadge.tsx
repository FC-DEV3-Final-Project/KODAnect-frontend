import { parseISO, differenceInDays } from "date-fns";

type BadgeSize = "lg" | "sm";

type NewBadgeProps = {
  size?: BadgeSize;
  date?: string | Date;
  className?: string;
};

const badgePresets = {
  lg: {
    badge: "px-p3 text-b-sm mobile:rounded-r1 px-p2 text-b-xs",
  },
  sm: {
    badge: "px-p2 text-b-xs",
  },
} as const;

export default function NewBadge({ size = "lg", date, className = "" }: NewBadgeProps) {
  const preset = badgePresets[size];

  if (!date) return null;

  const now = new Date();
  const donated = typeof date === "string" ? parseISO(date) : date;
  const diffDays = differenceInDays(now, donated);

  if (diffDays > 7) return null;

  return (
    <span
      className={
        "absolute right-0 rounded-r2 bg-primary-5 text-primary-60 " +
        preset.badge +
        (className ? " " + className : " ")
      }
    >
      N
    </span>
  );
}
