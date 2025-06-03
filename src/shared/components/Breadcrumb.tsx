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
                <ArrowIcon className="h-icon2 w-icon2 -rotate-90 mobile:h-icon1 mobile:w-icon1" />
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
                    <HomeIcon className="h-icon2 w-icon2 mobile:h-icon1 mobile:w-icon1" />
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
