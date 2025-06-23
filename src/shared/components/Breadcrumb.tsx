import { useLocation, useNavigate } from "react-router-dom";
import { SITE_MENU } from "@/shared/constant/sitemenu";
import HomeIcon from "@/assets/icon/home.svg?react";
import ArrowIcon from "@/assets/icon/arrow-down.svg?react";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

function findBreadcrumbPath(pathname: string): BreadcrumbItem[] {
  const result: BreadcrumbItem[] = [];

  function traverse(menu: any[], currentPath: BreadcrumbItem[] = []) {
    for (const item of menu) {
      const nextPath = [...currentPath, { label: item.label, path: item.path }];
      if (item.path === pathname) {
        result.push(...nextPath);
        return true;
      }
      if (item.children && traverse(item.children, nextPath)) {
        return true;
      }
    }
    return false;
  }

  traverse(SITE_MENU);
  return result;
}

export default function Breadcrumb() {
  const location = useLocation();
  const navigate = useNavigate();
  const breadcrumbItems = findBreadcrumbPath(location.pathname);

  return (
    <nav aria-label="브레드크럼">
      <ol className="flex gap-g2">
        <li className="flex items-center gap-g2">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-g2 px-p2 text-b-sm text-gray-90 underline mobile:gap-g3 mobile:text-b-xs"
          >
            <HomeIcon className="h-icon2 w-icon2 mobile:h-icon1 mobile:w-icon1" />홈
          </button>
        </li>

        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center gap-g2">
            <ArrowIcon className="h-icon2 w-icon2 -rotate-90 mobile:h-icon1 mobile:w-icon1" />
            <span className="flex items-center gap-g2 px-p2 text-b-sm text-gray-90 mobile:gap-g3 mobile:text-b-xs">
              {item.label}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
