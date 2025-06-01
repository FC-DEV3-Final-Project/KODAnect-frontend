import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { SITE_MENU } from "@/shared/constant/sitemenu";
import { useMenuStore } from "@/shared/stores/useMenuStore";

import Depth1Menu from "./Depth1Menu";
import Depth2Menu from "./Depth2Menu";
import Depth3Menu from "./Depth3Menu";

export default function HeaderMenu() {
  const { key } = useLocation();
  const subMenuRef = useRef<HTMLDivElement>(null);

  const { selectedDepth1, selectedDepth2, setSelectedDepth1, setSelectedDepth2, resetMenu } =
    useMenuStore();

  // 외부 클릭시 메뉴 닫기
  useEffect(() => {
    if (selectedDepth1 === null) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectedDepth1 !== null &&
        subMenuRef.current &&
        !subMenuRef.current.contains(event.target as Node)
      ) {
        resetMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [selectedDepth1, resetMenu]);

  // 페이지 변경 시 메뉴 닫기
  useEffect(() => {
    resetMenu();
  }, [key, resetMenu]);

  return (
    <nav ref={subMenuRef}>
      <div className="border-b border-gray-20">
        <Depth1Menu items={SITE_MENU} selectedDepth1={selectedDepth1} onClick={setSelectedDepth1} />
      </div>
      {selectedDepth1 !== null && (
        <div className="border-b border-gray-20">
          <div className="m-auto flex max-w-[1280px] px-p10 py-p6">
            <Depth2Menu
              items={SITE_MENU[selectedDepth1].children ?? []}
              selectedDepth2={selectedDepth2}
              onClick={setSelectedDepth2}
            />
            <Depth3Menu
              items={SITE_MENU[selectedDepth1].children?.[selectedDepth2].children ?? []}
            />
          </div>
        </div>
      )}
    </nav>
  );
}
