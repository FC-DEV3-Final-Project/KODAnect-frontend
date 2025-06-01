import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { SITE_MENU } from "@/shared/constant/sitemenu";

import Depth1Menu from "./Depth1Menu";
import Depth2Menu from "./Depth2Menu";
import Depth3Menu from "./Depth3Menu";

export default function HeaderMenu() {
  const { pathname } = useLocation();
  const [selectedDepth1, setSelectedDepth1] = useState<null | number>(null);
  const [selectedDepth2, setSelectedDepth2] = useState(0);
  const subMenuRef = useRef<HTMLDivElement>(null);

  const onSelectDepth1 = useCallback(
    (index: number) => {
      if (selectedDepth1 === index) {
        // 같은 메뉴 클릭 시 닫기
        setSelectedDepth1(null);
      } else {
        // 다른 메뉴 클릭 시 열기 및 선택 변경
        setSelectedDepth1(index);
        setSelectedDepth2(0);
      }
    },
    [selectedDepth1],
  );

  const onSelectDepth2 = useCallback(
    (index: number) => {
      setSelectedDepth2(index);
    },
    [selectedDepth2],
  );

  // 외부 클릭시 메뉴 닫기
  useEffect(() => {
    if (selectedDepth1 === null) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectedDepth1 !== null &&
        subMenuRef.current &&
        !subMenuRef.current.contains(event.target as Node)
      ) {
        setSelectedDepth1(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectedDepth1]);

  // 페이지 변경 시 선택상태 초기화
  useEffect(() => {
    setSelectedDepth1(null);
    setSelectedDepth2(0);
  }, [pathname]);

  return (
    <nav ref={subMenuRef} className="mobile:hidden">
      <div className="border-b border-gray-20">
        <Depth1Menu items={SITE_MENU} selectedDepth1={selectedDepth1} onClick={onSelectDepth1} />
      </div>
      {selectedDepth1 !== null && (
        <div className="border-b border-gray-20">
          <div className="m-auto flex max-w-[1280px] px-p10 py-p6">
            <Depth2Menu
              items={SITE_MENU[selectedDepth1].children ?? []}
              selectedDepth2={selectedDepth2}
              onClick={onSelectDepth2}
            />
            {/* Depth3Menu 만들기 */}
            <Depth3Menu
              items={SITE_MENU[selectedDepth1].children?.[selectedDepth2].children ?? []}
            />
          </div>
        </div>
      )}
    </nav>
  );
}
