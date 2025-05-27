// hooks/useMenuState.ts
import { useEffect, useRef, useState } from "react";

interface SiteMenu {
  label: string;
  path?: string;
  children?: SiteMenu[];
}

/**
 * 다단계 네비게이션 메뉴 상태 관리를 위한 커스텀 훅
 * - 선택된 1차, 2차 메뉴 상태 관리
 * - 외부 클릭 시 메뉴 초기화
 * - 선택된 메뉴에 따라 하위 메뉴 리스트 반환
 */
export function useMenuState(items: SiteMenu[], mode: "pc" | "mobile" = "pc") {
  // 선택된 1차 메뉴 인덱스
  const [selectedDepth1, setSelectedDepth1] = useState<number | null>(mode === "pc" ? null : 0);

  // 선택된 2차 메뉴 인덱스
  const [selectedDepth2, setSelectedDepth2] = useState<number | null>(null);

  // 메뉴 영역 참조 (외부 클릭 감지용)
  const menuRef = useRef<HTMLDivElement>(null);

  /**
   * 메뉴 외부 클릭 시, 선택 상태 초기화
   */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setSelectedDepth1(null);
        setSelectedDepth2(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * 선택된 1차 메뉴에 따라 2차 메뉴 목록 반환
   */
  const secondLevelItems = selectedDepth1 !== null ? (items[selectedDepth1]?.children ?? []) : [];

  /**
   * 선택된 2차 메뉴에 따라 3차 메뉴 목록 반환
   */
  const thirdLevelItems =
    selectedDepth1 !== null && selectedDepth2 !== null && secondLevelItems[selectedDepth2]?.children
      ? secondLevelItems[selectedDepth2].children!
      : [];

  /**
   * 1차 메뉴 클릭 핸들러
   * - 동일 메뉴 클릭 시 토글
   * - 새로운 메뉴 클릭 시 선택 상태 갱신
   */
  const handleDepth1Click = (idx: number) => {
    if (selectedDepth1 === idx) {
      // 같은 메뉴 다시 누르면 닫기
      setSelectedDepth1(null);
      setSelectedDepth2(null);
    } else {
      // 새 메뉴 열기 + 2차 메뉴가 있을 경우 첫 번째 선택
      setSelectedDepth1(idx);
      const hasChildren = items[idx].children && items[idx].children.length > 0;
      setSelectedDepth2(hasChildren ? 0 : null);
    }
  };

  return {
    selectedDepth1, // 현재 선택된 1차 메뉴 인덱스
    selectedDepth2, // 현재 선택된 2차 메뉴 인덱스
    setSelectedDepth2, // 외부에서 2차 메뉴 설정 가능
    secondLevelItems, // 현재 선택된 1차 메뉴의 하위(2차) 목록
    thirdLevelItems, // 현재 선택된 2차 메뉴의 하위(3차) 목록
    handleDepth1Click, // 1차 메뉴 클릭 핸들러
    menuRef, // 메뉴 DOM 참조 (외부 클릭 감지용)
  };
}
