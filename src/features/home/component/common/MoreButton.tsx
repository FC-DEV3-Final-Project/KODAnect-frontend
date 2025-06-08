import Arrow from "@/assets/icon/arrow-down.svg?react";

type MoreButtonProps = {
  href?: string;
  className?: string;
};

export function MoreButton({ href = "#", className = "", ...props }: MoreButtonProps) {
  return (
    <a href={href} className={`flex items-center gap-g1 ${className}`} {...props}>
      <span className="text-gray-50">더보기</span>
      <Arrow
        className="h-icon2 w-icon2 -rotate-90 text-gray-40"
        aria-hidden="true"
        focusable="false"
      />
    </a>
  );
}
