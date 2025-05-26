import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import Arrow from "@/assets/icon/arrow-down.svg";
import NewWindow from "@/assets/icon/open-new-window.svg";

interface SiteMenu {
  label: string;
  path?: string;
  children?: SiteMenu[];
}

export default function HeaderMenu({ items }: { items: SiteMenu[] }) {
  const location = useLocation();

  // 선택된 1depth, 2depth 메뉴 인덱스 상태 관리 (null이면 선택 안 된 상태)
  const [selectedDepth1, setSelectedDepth1] = useState<number | null>(null);
  const [selectedDepth2, setSelectedDepth2] = useState<number | null>(null);

  // 메뉴 바깥 클릭 감지를 위한 ref
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 메뉴 외부 클릭 시 선택 해제 함수
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setSelectedDepth1(null);
        setSelectedDepth2(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 현재 선택된 1depth의 2depth 메뉴 목록
  const secondLevelItems = selectedDepth1 !== null ? (items[selectedDepth1]?.children ?? []) : [];
  // 현재 선택된 2depth의 3depth 메뉴 목록
  const thirdLevelItems =
    selectedDepth1 !== null && selectedDepth2 !== null && secondLevelItems[selectedDepth2]?.children
      ? secondLevelItems[selectedDepth2].children!
      : [];

  // 1depth 메뉴 클릭 처리
  const handleDepth1Click = (idx: number) => {
    if (selectedDepth1 === idx) {
      // 같은 메뉴 클릭 시 선택 해제
      setSelectedDepth1(null);
      setSelectedDepth2(null);
    } else {
      // 새로 선택
      setSelectedDepth1(idx);
      // 자식 메뉴가 있으면 2depth 첫 번째 메뉴 선택, 없으면 null
      const hasChildren = items[idx].children && items[idx].children.length > 0;
      setSelectedDepth2(hasChildren ? 0 : null);
    }
  };

  return (
    <nav ref={menuRef}>
      {/* 1depth 메뉴 영역 */}
      <div className="border-b border-gray-20">
        <ul className="m-auto flex max-w-[1280px] flex-wrap gap-g7 text-gray-70">
          {items.map((item, idx) => {
            const isOpen = selectedDepth1 === idx;
            const hasChildren = item.children && item.children.length > 0;

            if (hasChildren) {
              // 자식 메뉴가 있는 1depth 메뉴는 버튼으로 표시
              return (
                <li key={item.label} className="relative text-b-lg font-bold">
                  <button
                    type="button"
                    className={`flex w-full cursor-pointer items-center justify-between px-p6 py-p5 hover:bg-secondary-5 active:bg-secondary-10`}
                    onClick={() => handleDepth1Click(idx)}
                    aria-expanded={isOpen}
                    aria-label={`${item.label} 하위 메뉴 ${isOpen ? "닫기" : "펼치기"}`}
                  >
                    {item.label}
                    <img
                      src={Arrow}
                      alt={isOpen ? "펼치기 아이콘" : "접기 아이콘"}
                      className={`ml-g3 w-6 transition-transform duration-300 mobile:w-5 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="absolute bottom-0 h-[4px] w-full bg-secondary-70"></div>
                  )}
                </li>
              );
            }

            // 자식 메뉴가 없는 1depth 메뉴는 새창 링크
            return (
              <li key={item.label} className="text-b-lg font-bold">
                <a
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full cursor-pointer items-center justify-between px-p6 py-p5 hover:bg-secondary-5"
                  aria-label={`${item.label} 바로가기`}
                >
                  {item.label}
                  <img src={NewWindow} alt="새창열기 아이콘" className="ml-g3 w-6 mobile:w-5" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 2depth, 3depth 메뉴 영역 (1depth 메뉴가 선택된 경우) */}
      {selectedDepth1 !== null && (
        <div className="relative text-gray-90">
          <div className="absolute w-full border-b border-gray-20 bg-white py-p5">
            <div className="m-auto flex max-w-[1280px]">
              {/* 2depth 메뉴 리스트 */}
              <ul className="w-1/4 py-p3 pr-p7">
                {secondLevelItems.map((item, idx) => {
                  const isOpen = selectedDepth2 === idx;
                  const hasChildren = item.children && item.children.length > 0;

                  // 2depth 버튼 기본 클래스
                  const baseClass =
                    "flex w-full cursor-pointer items-center justify-between rounded-r4 p-p6 hover:bg-secondary-5 active:bg-secondary-10";
                  // 선택되었고 자식 메뉴가 있으면 강조 스타일
                  const activeClass =
                    hasChildren && isOpen ? "bg-secondary-5 font-bold text-secondary-70" : "";
                  // 자식 메뉴 없고 현재 경로와 일치하면 강조 스타일
                  const locationMatchClass =
                    !hasChildren && location.pathname === item.path
                      ? "bg-secondary-5 font-bold text-secondary-80"
                      : "";

                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        className={`${baseClass} ${activeClass} ${locationMatchClass}`}
                        onClick={() => setSelectedDepth2(idx)}
                        aria-expanded={isOpen}
                        aria-label={`${item.label} 하위 메뉴 ${isOpen ? "닫기" : "펼치기"}`}
                      >
                        {item.label}
                        {hasChildren && (
                          <img src={Arrow} alt="더보기 아이콘" className="h-6 w-6 -rotate-90" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* 3depth 메뉴 리스트 */}
              {thirdLevelItems.length > 0 && (
                <ul className="grid h-full w-3/4 grid-cols-2 gap-x-g7 gap-y-g3 overflow-y-auto border-l border-gray-20 px-p8 py-p3">
                  {thirdLevelItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const linkClass = isActive ? "bg-secondary-5 font-bold text-secondary-80" : "";

                    return (
                      <li key={item.label}>
                        <a
                          href={item.path}
                          className={`flex items-center gap-g3 rounded-r3 px-p3 py-p4 hover:bg-secondary-5 active:bg-secondary-10 ${linkClass}`}
                        >
                          <div className="h-[4px] w-[4px] rounded-full bg-gray-80"></div>
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
