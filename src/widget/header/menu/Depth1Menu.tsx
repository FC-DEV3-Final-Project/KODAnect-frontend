import clsx from "clsx";

import React from "react";
import type { SiteMenu } from '@/shared/types/SiteMenu.types';

import Arrow from "@/assets/icon/arrow-down.svg";
import NewWindow from "@/assets/icon/open-new-window.svg";
import { baseIconStyle, baseMenuStyle } from "@/widget/header/menuStyles";

interface Depth1MenuProps {
  items: SiteMenu[];
  selectedDepth1: number | null;
  onClick: (index: number) => void;
}

const iconStyle = clsx(baseIconStyle);
const menuStyle = clsx(baseMenuStyle, "w-full justify-between px-p6 py-p5");
const menuActiveStyle =
  "text-secondary-80 after:absolute after:bottom-0 after:left-0 after:block after:h-[4px] after:w-full after:bg-secondary-80 after:content-['']";

function Depth1Menu({ items, selectedDepth1, onClick }: Depth1MenuProps) {
  return (
    <ul
      className="m-auto flex max-w-[1280px] flex-wrap px-p10 text-b-lg font-bold text-gray-70 justify-between"
      role="menu"
      aria-label="1차 메뉴"
    >
      {items.map((item, index) => {
        const isActive = selectedDepth1 === index;

        return (
          <li key={index} className="relative" role="menuitem">
            {item.children ? (
              <button
                type="button"
                className={clsx(menuStyle, isActive && menuActiveStyle)}
                onClick={() => onClick(index)}
                aria-label={`${item.label} 메뉴 더보기`}
                aria-expanded={isActive}
              >
                {item.label}
                <img
                  src={Arrow}
                  alt=""
                  aria-hidden="true"
                  className={clsx(
                    iconStyle,
                    "transition-transform duration-300",
                    isActive ? "rotate-180" : "rotate-0",
                  )}
                />
              </button>
            ) : (
              <a
                href={item.path!}
                target="_blank"
                rel="noopener noreferrer"
                className={menuStyle}
                aria-label={`${item.label} 새창열기`}
              >
                {item.label}
                <img src={NewWindow} alt="" aria-hidden="true" className={iconStyle} />
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default React.memo(Depth1Menu);
