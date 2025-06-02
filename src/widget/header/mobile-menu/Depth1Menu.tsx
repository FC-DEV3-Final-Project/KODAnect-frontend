import clsx from "clsx";

import React from "react";
import type { SiteMenu } from '@/shared/types/SiteMenu.types';

import NewWindow from "@/assets/icon/open-new-window.svg";
import { baseIconStyle, baseMobileMenuStyle } from "@/widget/header/menuStyles";

interface Depth1MenuProps {
  items: SiteMenu[];
  selectedDepth1: number | null;
  onClick: (index: number) => void;
}

const iconStyle = clsx(baseIconStyle);
const menuStyle = clsx(baseMobileMenuStyle, "w-full justify-between px-p7 py-p6");
const menuActiveStyle = "text-secondary-80 bg-white";

function Depth1Menu({ items, selectedDepth1, onClick }: Depth1MenuProps) {
  return (
    <ul className="bg-secondary-5 text-b-md font-bold" role="menu" aria-label="1차 메뉴">
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
