import HomeIcon from "@/assets/icon/home.svg?react";
import ArrowIcon from "@/assets/icon/arrow-down.svg?react";

interface BreadcrumbItem {
  label: string;
  onClick: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  maxLength?: number;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="브레드크럼">
      <ol className="flex gap-g2">
        {items.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-g2">
              {index > 0 && (
                <ArrowIcon
                  transform="rotate(-90)"
                  className="h-[16px] w-[16px] mobile:h-[12px] mobile:w-[12px]"
                />
              )}
              {isLast ? (
                <span className="flex items-center gap-g2 px-p2 text-b-sm text-gray-90 mobile:gap-g3 mobile:text-b-xs">
                  {item.label}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="flex items-center gap-g2 px-p2 text-b-sm text-gray-90 underline mobile:gap-g3 mobile:text-b-xs"
                >
                  {isFirst && (
                    <HomeIcon className="h-[16px] w-[16px] mobile:h-[12px] mobile:w-[12px]" />
                  )}
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
