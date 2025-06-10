import clsx from "clsx";
import ArrowIcon from "@/assets/icon/arrow-down.svg?react";
import EllipsisIcon from "@/assets/icon/ellipsis-vertical.svg?react";

function generateSequence(current: number, count: number): number[] {
  const result: number[] = [];
  const start = current - Math.floor((count - 1) / 2);

  for (let i = 0; i < count; i++) {
    result.push(start + i);
  }

  return result;
}

function generateRangeGuaranteedSequence(
  current: number,
  count: number,
  min: number,
  max: number,
): (number | string)[] {
  const initialSequence = generateSequence(current, count);
  const filteredSequence = initialSequence.filter((num) => num >= min && num <= max);
  const result: (number | "ellipsis")[] = [...filteredSequence];

  if (!filteredSequence.includes(min)) {
    if (filteredSequence[0] - min > 1) {
      result.unshift(min, "ellipsis");
    } else {
      result.unshift(min);
    }
  }

  if (!filteredSequence.includes(max)) {
    if (max - filteredSequence[filteredSequence.length - 1] > 1) {
      result.push("ellipsis", max);
    } else {
      result.push(max);
    }
  }

  return result;
}

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  visiblePages?: number;
}

export function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  visiblePages: propVisiblePages = 5,
}: PaginationProps) {
  const visiblePages = Math.max(
    propVisiblePages % 2 === 0 ? propVisiblePages + 1 : propVisiblePages,
    1,
  );
  const pageNumbers = generateRangeGuaranteedSequence(currentPage, visiblePages, 1, totalPages);

  const renderPageNumbers = () => (
    <ul className="flex items-center gap-g3 mobile:order-3 mobile:mt-2 mobile:w-full mobile:justify-center mobile:gap-g2">
      {pageNumbers.map((page, index) => (
        <li key={`${page}-${index}`}>
          {page === "ellipsis" ? (
            <EllipsisIcon className="rotate-90" />
          ) : (
            <button
              type="button"
              onClick={() => onPageChange(page as number)}
              className={clsx(
                "h-[40px] w-[40px] mobile:text-b-sm",
                currentPage === page
                  ? "rounded-r2 bg-secondary-70 font-bold text-gray-0"
                  : "text-gray-70 hover:rounded-r2 hover:bg-secondary-70 hover:text-gray-0",
              )}
              aria-current={currentPage === page ? "page" : undefined}
              aria-label={`${page}페이지`}
            >
              {page}
            </button>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <nav
      aria-label="페이지 네비게이션"
      className="flex gap-g3 mobile:flex-wrap mobile:justify-center mobile:gap-g5"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center text-gray-70 disabled:text-gray-40 mobile:px-3 mobile:text-b-xs"
        aria-label="이전 페이지"
      >
        <ArrowIcon
          className={clsx(
            "h-icon3 w-icon3 rotate-90",
            currentPage === 1 ? "text-gray-40" : "text-gray-80",
          )}
        />
        이전
      </button>

      {renderPageNumbers()}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center text-gray-70 disabled:text-gray-40 mobile:px-3 mobile:text-b-xs"
        aria-label="다음 페이지"
      >
        다음
        <ArrowIcon
          className={clsx(
            "h-icon3 w-icon3 -rotate-90",
            currentPage === totalPages ? "text-gray-40" : "text-gray-80",
          )}
        />
      </button>
    </nav>
  );
}
