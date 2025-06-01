import clsx from "clsx";

import React from "react";
import { Link } from "react-router-dom";
import type { MenuItem } from "@/shared/types/Menu.types";

import { baseMobileDepth2Style } from "@/widget/header/menuStyles";

interface Depth2MenuProps {
  item: MenuItem;
}

function Depth2Menu({ item }: Depth2MenuProps) {
  return (
    <li className="mb-g6 list-none">
      {item.children ? (
        <>
          <div className={baseMobileDepth2Style}>{item.label}</div>
          <ul className="py-p3">
            {item.children.map((menu, index) => {
              return (
                <li key={index}>
                  <Link to={menu.path!} className="block px-p3 py-p4">
                    {menu.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <Link to={item.path!} className={clsx(baseMobileDepth2Style, "block")}>
          {item.label}
        </Link>
      )}
    </li>
  );
}

export default React.memo(Depth2Menu);
