import AccordionMenu from "@/shared/components/AccordionMenu";
// 추후 sitemenu.ts 파일 merge되면 경로 수정 예정
import { SITE_MENU } from "@/shared/constant/mockSiteMenu";

interface SideMenuProps {
  selectedLabel: string;
}

function SideMenu({ selectedLabel }: SideMenuProps) {
  const selectedMenu = SITE_MENU.find((menu) => menu.label === selectedLabel);

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
      <div className="flex h-[125px] w-full items-center justify-center rounded-r-[30px] rounded-bl-[30px] bg-secondary-10">
        <span className="text-h-lg font-bold">{selectedMenu.label}</span>
      </div>

      {/* Navigation menu */}
      <nav aria-label={`${selectedMenu.label} 메뉴`} className="bg-white">
        {selectedMenu?.children?.map((menu, index) =>
          menu.children ? (
            <AccordionMenu key={index} menu={menu} defaultOpen />
          ) : (
            <a
              key={index}
              href={menu.path}
              className="block border-b border-gray-200 px-p3 py-p6 font-bold hover:border-b-[3px] hover:border-secondary-70 hover:bg-secondary-5 hover:font-bold hover:text-secondary-80"
            >
              {menu.label}
            </a>
          ),
        )}
      </nav>
    </aside>
  );
}

export default SideMenu;
