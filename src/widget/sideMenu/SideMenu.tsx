import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import AccordionMenu from "@/widget/sideMenu/AccordionMenu";
import { SITE_MENU } from "@/shared/constant/sitemenu";
import { TOP_VISUAL } from "@/shared/constant/topvisual";
import { useCurrentTopMenuLabel } from "@/shared/hooks/useCurrentTopMenuLabel";

import OpenNewWindow from "@/assets/icon/open-new-window.svg";

function SideMenu() {
  const location = useLocation();
  const topMenuLabel = useCurrentTopMenuLabel();

  const selectedMenu = useMemo(
    () => SITE_MENU.find((menu) => menu.label === topMenuLabel),
    [topMenuLabel],
  );

  const selectedVisual = selectedMenu
    ? TOP_VISUAL.find((item) => item.label === selectedMenu.label)
    : undefined;

  if (!selectedMenu) return null;

  // 레이아웃을 flex로 감싸야 사이드 메뉴가 좌측에 정상적으로 표시됩니다.
  /*
  <div className="flex">
    <SideMenu selectedLabel="장기·조직기증" />
    <main className="flex-grow">
      {children}
    </main>
  </div>
  */

  return (
    <aside className="w-[248px] shrink-0 mobile:hidden" aria-label="사이드 메뉴">
      {/* Top visual area */}
      <div
        className="flex h-[125px] w-full items-center justify-center rounded-r-[30px] rounded-bl-[30px] bg-secondary-10 bg-cover bg-center"
        style={{
          ...(selectedVisual?.imageUrl
            ? { backgroundImage: `url(${selectedVisual.imageUrl})` }
            : {}),
        }}
      >
        <span className="text-h-lg font-bold text-secondary-80">{selectedMenu.label}</span>
      </div>

      {/* Navigation menu */}
      <nav aria-label={`${selectedMenu.label} 메뉴`} className="bg-white text-gray-90">
        {selectedMenu?.children?.map((menu, index) => {
          if (menu.children) {
            return (
              <AccordionMenu key={index} menu={menu} defaultOpen currentPath={location.pathname} />
            );
          } else {
            const isActive = location.pathname === menu.path;
            const baseClass =
              "flex justify-between border-b border-gray-200 px-p3 py-p6 font-bold hover:border-secondary-70 hover:bg-secondary-5 hover:font-bold hover:text-secondary-80 hover:shadow-[inset_0_-2px_0_0_theme('colors.secondary.70')]";
            const activeClass =
              "border-secondary-70 bg-secondary-5 font-bold text-secondary-80 shadow-[inset_0_-2px_0_0_theme('colors.secondary.70')]";

            return (
              <Link
                key={index}
                to={menu.path ?? "#"}
                className={`${baseClass} ${isActive ? activeClass : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <span>{menu.label}</span>
                {menu.label === "공공데이터개방" && (
                  <img src={OpenNewWindow} alt="새 창에서 열기" className="w-icon3" />
                )}
              </Link>
            );
          }
        })}
      </nav>
    </aside>
  );
}

export default SideMenu;
