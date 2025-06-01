import clsx from "clsx";

import React from "react";
import type { MenuItem } from "@/shared/types/Menu.types";

import NewWindow from "@/assets/icon/open-new-window.svg";
import { baseIconStyle, baseMobileMenuStyle } from "@/widget/header/menuStyles";

interface Depth1MenuProps {
  items: MenuItem[];
  selectedDepth1: number | null;
  onClick: (index: number) => void;
}

const iconStyle = clsx(baseIconStyle);
const menuStyle = clsx(baseMobileMenuStyle, "w-full justify-between px-p7 py-p6");
const menuActiveStyle = "text-secondary-80 bg-white";

function Depth1Menu({ items, selectedDepth1, onClick }: Depth1MenuProps) {
  return (
    <ul className="bg-secondary-5 text-b-md font-bold">
      {items.map((item, index) => {
        const isActive = selectedDepth1 === index;

        return (
          <li key={index} onClick={() => onClick(index)} className="relative">
            {item.children ? (
              <button type="button" className={clsx(menuStyle, isActive && menuActiveStyle)}>
                {item.label}
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
