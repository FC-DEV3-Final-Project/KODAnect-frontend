import AccordionMenu from "@/widget/sideMenu/AccordionMenu";
// 추후 sitemenu.ts 파일 merge되면 경로 수정 예정
import { SITE_MENU } from "@/shared/constant/mockSiteMenu";
import OpenNewWindow from "@/assets/icon/open-new-window.svg";

interface SideMenuProps {
  selectedLabel: string;
}

function SideMenu({ selectedLabel }: SideMenuProps) {
  const selectedMenu = SITE_MENU.find((menu) => menu.label === selectedLabel);
  const topVisual = [
    { label: "장기·조직기증", imageUrl: "/src/assets/images/장기·조직기증.png" },
    { label: "참여·정보", imageUrl: "/src/assets/images/참여·정보.png" },
    { label: "홍보·알림", imageUrl: "/src/assets/images/홍보·알림.png" },
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
    <aside className="h-screen w-[248px] shrink-0 mobile:hidden" aria-label="사이드 메뉴">
      {/* Top visual area */}
      <div
        className="flex h-[125px] w-full items-center justify-center rounded-r-[30px] rounded-bl-[30px] bg-cover bg-center"
        style={{
          backgroundImage: selectedVisual ? `url(${selectedVisual.imageUrl})` : undefined,
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
            <a
              key={index}
              href={menu.path}
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
            </a>
          ),
        )}
      </nav>
    </aside>
  );
}

export default SideMenu;
