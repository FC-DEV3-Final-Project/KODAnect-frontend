import clsx from "clsx";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import type { SiteMenu } from '@/shared/types/SiteMenu.types';
import { baseMenuStyle, menuDotStyle } from "@/widget/header/menuStyles";

interface Depth3MenuProps {
  items: SiteMenu[];
}

const menuStyle = clsx(baseMenuStyle, "px-p3 py-p4 rounded-r3");

function Depth3Menu({ items }: Depth3MenuProps) {
  const { pathname } = useLocation();

  return (
    <>
      {items.length > 0 && (
        <ul
          className="grid h-full w-[1000px] grid-cols-2 gap-x-g7 gap-y-g3 overflow-y-auto border-l border-gray-20 py-p3 pl-p8"
          role="menu"
          aria-label="3차 메뉴"
        >
          {items.map((item, index) => {
            const isActive = pathname === item.path;

            return (
              <li key={index} role="menuitem">
                <Link
                  to={item.path!}
                  aria-label={`${item.label} 페이지`}
                  className={clsx(menuDotStyle, menuStyle, isActive && "bg-secondary-5")}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default React.memo(Depth3Menu);
