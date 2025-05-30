import { useMenuState } from "@/shared/hooks/useMenuState";
import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";

import Close from "@/assets/icon/close.svg";
import NewWindow from "@/assets/icon/open-new-window.svg";

interface SiteMenu {
  label: string;
  path?: string;
  children?: SiteMenu[];
}

interface MobileMenuProps {
  items: SiteMenu[];
  isOpenMobileMenu: boolean;
  setIsOpenMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileMenu({
  items,
  isOpenMobileMenu,
  setIsOpenMobileMenu,
}: MobileMenuProps) {
  // 모바일 메뉴 활성화되면 body에 스크롤 제거
  useBodyScrollLock(767);

  const { selectedDepth1, secondLevelItems, handleDepth1Click } = useMenuState(items, "mobile");

  return (
    <nav
      id="nav-mobile"
      className={`fixed top-0 z-50 h-dvh w-full bg-white text-gray-90 ${isOpenMobileMenu ? "block" : "hidden"}`}
    >
      <div className="flex justify-end border-b border-gray-20 p-p6">
        <button
          type="button"
          className="m-g3 flex gap-p3 text-b-sm font-bold text-gray-90"
          onClick={() => setIsOpenMobileMenu(!isOpenMobileMenu)}
        >
          <img src={Close} className="w-8" alt="닫기 아이콘" />
          닫기
        </button>
      </div>

      <div className="grid h-full grid-cols-[140px_1fr]">
        {/* 1depth 메뉴 영역 */}
        <ul className="bg-secondary-5 text-b-md font-bold">
          {items.map((item, idx) => {
            const isOpen = selectedDepth1 === idx;
            const hasChildren = item.children && item.children.length > 0;

            if (hasChildren) {
              // 자식 메뉴가 있는 1depth 메뉴는 버튼으로 표시
              return (
                <li key={item.label} className="relative">
                  <button
                    type="button"
                    className={`${isOpen && "bg-white text-secondary-80"} flex w-full cursor-pointer items-center justify-between px-p6 py-p5`}
                    onClick={() => handleDepth1Click(idx)}
                    aria-expanded={isOpen}
                    aria-label={`${item.label} 하위 메뉴 ${isOpen ? "닫기" : "펼치기"}`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            }

            // 자식 메뉴가 없는 1depth 메뉴는 새창 링크
            return (
              <li key={item.label}>
                <a
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full cursor-pointer items-center justify-between px-p6 py-p5"
                  aria-label={`${item.label} 바로가기`}
                >
                  {item.label}
                  <img src={NewWindow} alt="새창열기 아이콘" className="ml-g3 w-8" />
                </a>
              </li>
            );
          })}
        </ul>

        {/* 2depth, 3depth 메뉴 영역 (1depth 메뉴가 선택된 경우) */}
        {selectedDepth1 !== null && (
          <>
            {/* 2depth 메뉴 리스트 */}
            <ul className="h-[calc(100%-71.5px)] w-full overflow-y-scroll bg-white p-p6">
              {secondLevelItems.map((secondLevelItem) => (
                <li key={secondLevelItem.label}>
                  {secondLevelItem.children && secondLevelItem.children.length > 0 ? (
                    <p className="border-b border-gray-40 px-p3 pb-p5 pt-p2 text-b-lg font-bold">
                      {secondLevelItem.label}
                    </p>
                  ) : (
                    <a
                      href={secondLevelItem.path}
                      className="block border-b border-gray-40 px-p3 pb-p5 pt-p2 text-b-lg font-bold"
                    >
                      {secondLevelItem.label}
                    </a>
                  )}
                  {/* 3depth 메뉴 리스트 */}
                  <ul className="py-p3">
                    {secondLevelItem.children?.map((thirdLevelItem) => (
                      <li key={thirdLevelItem.label}>
                        <a href={thirdLevelItem.path} className="block px-p3 py-p5">
                          {thirdLevelItem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </nav>
  );
}
