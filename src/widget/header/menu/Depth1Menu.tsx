import clsx from "clsx";

import React from "react";
import type { MenuItem } from "@/shared/types/Menu.types";

import Arrow from "@/assets/icon/arrow-down.svg";
import NewWindow from "@/assets/icon/open-new-window.svg";
import { baseIconStyle, baseMenuStyle } from "@/widget/header/menuStyles";

interface Depth1MenuProps {
  items: MenuItem[];
  selectedDepth1: number | null;
  onClick: (index: number) => void;
}

const iconStyle = clsx(baseIconStyle);
const menuStyle = clsx(baseMenuStyle, "w-full justify-between px-p6 py-p5");
const menuActiveStyle =
  "text-secondary-80 after:absolute after:bottom-0 after:left-0 after:block after:h-[4px] after:w-full after:bg-secondary-80 after:content-['']";

function Depth1Menu({ items, selectedDepth1, onClick }: Depth1MenuProps) {
  return (
    <ul className="m-auto flex max-w-[1280px] flex-wrap px-p10 text-b-lg font-bold text-gray-70 lg:justify-between">
      {items.map((item, index) => {
        const isActive = selectedDepth1 === index;

        return (
          <li key={index} onClick={() => onClick(index)} className="relative">
            {item.children ? (
              <button type="button" className={clsx(menuStyle, isActive && menuActiveStyle)}>
                {item.label}
                <img
                  src={Arrow}
                  alt="메뉴 더보기 아이콘"
                  className={clsx(
                    iconStyle,
                    "transition-transform duration-300",
                    isActive ? "rotate-180" : "rotate-0",
                  )}
                />
              </button>
            ) : (
              <a href={item.path!} target="_blank" className={menuStyle}>
                {item.label}
                <img src={NewWindow} alt="새창열기 아이콘" className={iconStyle} />
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default React.memo(Depth1Menu);
