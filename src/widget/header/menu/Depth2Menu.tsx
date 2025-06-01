import clsx from "clsx";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import type { MenuItem } from "@/shared/types/Menu.types";

import Arrow from "@/assets/icon/arrow-down.svg";
import { baseIconStyle, baseMenuStyle } from "@/widget/header/menuStyles";

interface Depth2MenuProps {
  items: MenuItem[];
  selectedDepth2: number | null;
  onClick: (index: number) => void;
}

const iconStyle = clsx(baseIconStyle, "-rotate-90");
const menuStyle = clsx(baseMenuStyle, "w-full rounded-r4 p-p6 justify-between");
const menuActiveStyle = "bg-secondary-5 font-bold text-secondary-70";

function Depth2Menu({ items, selectedDepth2, onClick }: Depth2MenuProps) {
  const { pathname } = useLocation();

  return (
    <ul className="min-w-[280px] py-p3 pr-p8" role="menu" aria-label="2차 메뉴">
      {items.map((item, index) => {
        const isSelected = selectedDepth2 === index;
        const isActive = pathname === item.path;

        return (
          <li key={index} role="menuitem">
            {item.children ? (
              <button
                type="button"
                className={clsx(menuStyle, isSelected && menuActiveStyle)}
                onClick={() => onClick(index)}
                aria-label={`${item.label} 메뉴 더보기`}
              >
                {item.label}
                <img src={Arrow} alt="" aria-hidden="true" className={iconStyle} />
              </button>
            ) : (
              <Link
                to={item.path!}
                aria-label={`${item.label} 페이지`}
                className={clsx(menuStyle, isActive && menuActiveStyle)}
              >
                {item.label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default React.memo(Depth2Menu);
