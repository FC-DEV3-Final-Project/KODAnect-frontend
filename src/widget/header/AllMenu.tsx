import { useMenuState } from "@/shared/hooks/useMenuState";
import { useEffect } from "react";

import NewWindow from "@/assets/icon/open-new-window.svg";

interface SiteMenu {
  label: string;
  path?: string;
  children?: SiteMenu[];
}

interface AllMenuProps {
  items: SiteMenu[];
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  isOpenMobileMenu: boolean;
  setIsOpenMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AllMenu({
  items,
  buttonRef,
  isOpenMobileMenu,
  setIsOpenMobileMenu,
}: AllMenuProps) {
  const { menuRef } = useMenuState(items);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      // 메뉴가 열려 있는 상태일 때만 처리
      if (
        isOpenMobileMenu &&
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpenMobileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenMobileMenu]);

  return (
    <>
      <div className={`fixed inset-0 bg-alpha-black25 ${isOpenMobileMenu ? "block" : "hidden"}`} />

      <nav
        ref={menuRef}
        id="menu-all"
        className={`absolute left-1/2 z-50 max-h-[550px] w-full max-w-[1200px] -translate-x-1/2 overflow-auto bg-white p-p9 pb-0 text-gray-90 drop-shadow-md ${isOpenMobileMenu ? "block" : "hidden"}`}
      >
        {items.map((firstLevelItem) => (
          <div key={firstLevelItem.label} className="mb-g9 flex items-start text-gray-90">
            <div className="w-[165px] py-p6 pr-p6 text-h-lg font-bold">{firstLevelItem.label}</div>

            {/* 1depth 메뉴에 자식이 없으면 링크로 표시 */}
            {!firstLevelItem.children || firstLevelItem.children.length === 0 ? (
              <div className="flex flex-1 flex-wrap gap-g3 border-l border-gray-20 p-p6">
                <a
                  href={firstLevelItem.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-[180px] items-center justify-center rounded-r3 border border-gray-20 bg-white px-p6 py-p3 text-b-lg font-bold"
                  aria-label={`${firstLevelItem.label} 바로가기`}
                >
                  {firstLevelItem.label}
                  <img src={NewWindow} alt="새창열기 아이콘" className="ml-g3 w-8" />
                </a>
              </div>
            ) : (
              <ul className="flex flex-1 flex-wrap gap-g3 border-l border-gray-20 p-p6">
                {firstLevelItem.children.map((secondLevelItem) => (
                  <li key={secondLevelItem.label} className="min-w-[180px]">
                    {/* 2depth 메뉴에 자식이 없으면 링크, 있으면 제목만 표시 */}
                    {secondLevelItem.children && secondLevelItem.children.length > 0 ? (
                      <p className="w-full rounded-r3 border border-gray-20 bg-white p-p3 text-center text-b-lg font-bold">
                        {secondLevelItem.label}
                      </p>
                    ) : (
                      <a
                        href={secondLevelItem.path}
                        className="block w-full rounded-r3 border border-gray-20 bg-white p-p3 text-center text-b-lg font-bold"
                      >
                        {secondLevelItem.label}
                      </a>
                    )}

                    {/* 3depth 메뉴 리스트 */}
                    {secondLevelItem.children && secondLevelItem.children.length > 0 && (
                      <ul className="mt-g5 max-w-[180px] break-keep">
                        {secondLevelItem.children.map((thirdLevelItem) => (
                          <li key={thirdLevelItem.label}>
                            <a
                              href={thirdLevelItem.path}
                              className="flex items-center gap-g3 rounded-r3 px-p6 py-p3"
                            >
                              <div className="h-[4px] w-[4px] rounded-full bg-gray-80"></div>
                              {thirdLevelItem.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
