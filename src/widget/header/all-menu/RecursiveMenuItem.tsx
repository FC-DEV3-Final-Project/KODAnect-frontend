import clsx from "clsx";

import { Link } from "react-router-dom";
import type { SiteMenu } from "@/shared/types/SiteMenu.types";
import { baseIconStyle, menuDotStyle } from "@/widget/header/menuStyles";

import NewWindow from "@/assets/icon/open-new-window.svg";

interface RecursiveMenuItemProps {
  item: SiteMenu;
  depth?: number; // 기본값 1로 할 예정
}

export default function RecursiveMenuItem({ item, depth = 1 }: RecursiveMenuItemProps) {
  const hasChildren = item.children && item.children.length > 0;

  if (depth === 1) {
    return (
      <section
        className="mb-g9 flex items-start text-gray-90"
        aria-label={`${item.label} 관련 메뉴`}
      >
        <h1 className="min-w-[165px] py-p6 pr-p6 text-h-md font-bold">{item.label}</h1>
        <ul
          className="flex w-full flex-wrap gap-g3 border-l border-gray-20 p-p6"
          role="menu"
          aria-label="2차 메뉴"
        >
          {hasChildren ? (
            item.children!.map((child) => (
              <RecursiveMenuItem key={child.label} item={child} depth={depth + 1} />
            ))
          ) : (
            <a
              href={item.path}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-[180px] max-w-[205px] flex-1 items-center justify-center rounded-r3 border border-gray-20 bg-white px-p6 py-p3 text-b-lg font-bold"
              aria-label={`${item.label} 바로가기`}
            >
              {item.label}
              <img
                src={NewWindow}
                alt=""
                aria-hidden="true"
                className={clsx(baseIconStyle, "ml-g3 w-8")}
              />
            </a>
          )}
        </ul>
      </section>
    );
  }

  if (depth === 2) {
    return (
      <li className="min-w-[180px] max-w-[205px] flex-1" role="menuitem">
        {hasChildren ? (
          <>
            <h2 className="block w-full rounded-r3 border border-gray-20 bg-white p-p3 text-center text-b-lg font-bold">
              {item.label}
            </h2>
            <ul
              className="mt-g5 min-w-[180px] max-w-[205px] flex-1 break-keep"
              role="menu"
              aria-label="3차 메뉴"
            >
              {item.children!.map((child) => (
                <RecursiveMenuItem key={child.label} item={child} depth={depth + 1} />
              ))}
            </ul>
          </>
        ) : (
          <Link
            to={item.path!}
            aria-label={`${item.label} 페이지`}
            className="block w-full rounded-r3 border border-gray-20 bg-white p-p3 text-center text-b-lg font-bold"
          >
            {item.label}
          </Link>
        )}
      </li>
    );
  }

  // depth === 3 이상 (마지막 depth)
  return (
    <li className="min-w-[180px] max-w-[205px] flex-1" role="menuitem">
      <Link
        to={item.path!}
        aria-label={`${item.label} 페이지`}
        className={clsx(
          menuDotStyle,
          "flex items-start gap-g3 rounded-r3 px-p6 py-p3 before:mt-[10px]",
        )}
      >
        {item.label}
      </Link>
    </li>
  );
}
