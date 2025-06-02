import { useEffect, useRef } from "react";

import { SITE_MENU } from "@/shared/constant/sitemenu";
import { useMenuStore } from "@/shared/stores/useMenuStore";

import Close from "@/assets/icon/close.svg";

import Depth1Menu from "./Depth1Menu";
import Depth2Menu from "./Depth2Menu";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const subMenuRef = useRef<HTMLDivElement>(null);

  const { selectedDepth1, setSelectedDepth1 } = useMenuStore();

  // 메뉴 열릴 때 첫 번째 메뉴 자동 선택
  useEffect(() => {
    if (isOpen && selectedDepth1 === null) {
      setSelectedDepth1(0);
    }
  }, [isOpen, selectedDepth1, setSelectedDepth1]);

  return (
    <>
      {isOpen && (
        <nav
          ref={subMenuRef}
          className="fixed top-0 z-50 h-dvh w-full bg-white"
          aria-label="모바일 전체 메뉴"
          role="navigation"
        >
          <div className="flex justify-end border-b border-gray-20 p-p6">
            <button
              type="button"
              className="m-g3 flex gap-p3 text-b-sm font-bold"
              onClick={() => setIsOpen(false)}
              aria-label="전체메뉴 닫기"
              aria-expanded={isOpen}
            >
              <img src={Close} className="w-8" alt="" aria-hidden="true" />
              닫기
            </button>
          </div>

          <div className="grid h-[calc(100dvh_-_72px)] grid-cols-[140px_1fr]">
            <Depth1Menu
              items={SITE_MENU}
              selectedDepth1={selectedDepth1}
              onClick={setSelectedDepth1}
            />
            {selectedDepth1 !== null && (
              <ul className="overflow-y-auto p-p6" role="menu" aria-label="2차 메뉴">
                {SITE_MENU[selectedDepth1].children?.map((item, index) => {
                  return <Depth2Menu item={item} key={index} />;
                })}
              </ul>
            )}
          </div>
        </nav>
      )}
    </>
  );
}
