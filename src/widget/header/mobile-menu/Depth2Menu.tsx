import clsx from "clsx";

import React from "react";
import { Link } from "react-router-dom";
import type { SiteMenu } from "@/shared/types/SiteMenu.types";

import { baseMobileDepth2Style } from "@/widget/header/menuStyles";

interface Depth2MenuProps {
  item: SiteMenu;
}

function Depth2Menu({ item }: Depth2MenuProps) {
  return (
    <li className="mb-g6 list-none" role="menuitem">
      {item.children ? (
        <>
          <div className={baseMobileDepth2Style} role="heading" aria-level={2}>
            {item.label}
          </div>
          <ul className="py-p3" role="menu" aria-label="3차 메뉴">
            {item.children.map((child, index) => {
              return (
                <li key={index} role="menuitem">
                  <Link
                    to={child.path!}
                    aria-label={`${item.label} 페이지`}
                    className="block px-p3 py-p4"
                  >
                    {child.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <Link
          to={item.path!}
          aria-label={`${item.label} 페이지`}
          className={clsx(baseMobileDepth2Style, "block")}
        >
          {item.label}
        </Link>
      )}
    </li>
  );
}

export default React.memo(Depth2Menu);
