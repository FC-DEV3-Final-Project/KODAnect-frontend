import AccordionMenu from "@/widget/sideMenu/AccordionMenu";
import { SITE_MENU } from "@/shared/constant/sitemenu.ts";
import OpenNewWindow from "@/assets/icon/open-new-window.svg";
import { useCurrentTopMenuLabel } from "@/shared/hooks/useCurrentTopMenuLabel";
import { useMemo } from "react";
import { Link } from "react-router-dom";

function SideMenu() {
  const topMenuLabel = useCurrentTopMenuLabel();
  const selectedMenu = useMemo(
    () => SITE_MENU.find((menu) => menu.label === topMenuLabel),
    [topMenuLabel],
  );

  const topVisual = [
    { label: "장기·조직기증", imageUrl: "/src/assets/images/organ.png" },
    { label: "참여·정보", imageUrl: "/src/assets/images/participation.png" },
    { label: "홍보·알림", imageUrl: "/src/assets/images/announcement.png" },
  ];

  const selectedVisual = selectedMenu
    ? topVisual.find((item) => item.label === selectedMenu.label)
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
        className="flex h-[125px] w-full items-center justify-center rounded-r-[30px] rounded-bl-[30px] bg-primary-10 bg-cover bg-center"
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
        {selectedMenu?.children?.map((menu, index) =>
          menu.children ? (
            <AccordionMenu key={index} menu={menu} defaultOpen />
          ) : (
            <Link
              key={index}
              to={menu.path ?? "#"}
              className="flex justify-between border-b border-gray-200 px-p3 py-p6 font-bold hover:border-secondary-70 hover:bg-secondary-5 hover:font-bold hover:text-secondary-80 hover:shadow-[inset_0_-2px_0_0_theme('colors.secondary.70')]"
            >
              <span>{menu.label}</span>
              {menu.label === "공공데이터개방" && (
                <img
                  src={OpenNewWindow} // 아이콘 이미지
                  alt="새 창에서 열기"
                  className="w-icon3"
                />
              )}
            </Link>
          ),
        )}
      </nav>
    </aside>
  );
}

export default SideMenu;
