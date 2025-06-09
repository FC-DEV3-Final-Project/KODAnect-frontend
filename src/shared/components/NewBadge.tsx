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

export const NewBadge = ({ size = "lg", date, className = "" }: NewBadgeProps) => {
  const preset = badgePresets[size];

  if (!date) return null;

  const now = new Date();
  const donated = typeof date === "string" ? new Date(date) : date;
  const diffDays = (now.getTime() - donated.getTime()) / (1000 * 60 * 60 * 24);

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
};
