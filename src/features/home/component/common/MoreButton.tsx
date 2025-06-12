import Arrow from "@/assets/icon/arrow-down.svg?react";
import { Link } from "react-router-dom";

type MoreButtonProps = {
  to?: string;
  className?: string;
};

export function MoreButton({ to = "#", className = "", ...props }: MoreButtonProps) {
  return (
    <Link to={to} className={`flex items-center gap-g1 ${className}`} {...props}>
      <span className="text-gray-50">더보기</span>
      <Arrow
        className="h-icon2 w-icon2 -rotate-90 text-gray-40"
        aria-hidden="true"
        focusable="false"
      />
    </Link>
  );
}
