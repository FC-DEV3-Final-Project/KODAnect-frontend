import { useState } from "react";
import Arrow from "@/assets/icon/arrow-down.svg";

interface SiteMenu {
  label: string;
  path?: string;
  children?: SiteMenu[];
}

function AccordionMenu({ menu, defaultOpen = true }: { menu: SiteMenu; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const hasChildren = menu.children && menu.children.length > 0;

  return (
    <div className="border-b border-gray-200">
      {/* Toggle button for accordion */}
      <button
        className="flex w-full items-center justify-between px-p3 py-p6 font-bold text-gray-90"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={`${menu.label} 하위 메뉴 ${isOpen ? "닫기" : "펼치기"}`}
      >
        {menu.label}
        {hasChildren && (
          <img
            src={Arrow}
            alt={isOpen ? "펼치기 아이콘" : "접기 아이콘"}
            className={`w-6 transition-transform duration-300 mobile:w-5 ${isOpen ? "rotate-180" : "rotate-0"} `}
          />
        )}
      </button>

      {/* Submenu list */}
      {hasChildren && isOpen && (
        <ul className="py-p3" aria-label={`${menu.label} 하위 메뉴`}>
          {menu.children!.map((child, index) => (
            <li
              key={index}
              className="relative pl-p9 hover:rounded-r3 hover:bg-secondary-5 hover:font-bold hover:text-secondary-80"
            >
              <span className="absolute left-p6 top-[20.5px] h-[4px] w-[4px] -translate-y-1/2 rounded-full bg-gray-90 hover:bg-secondary-80"></span>
              <a
                href={child.path || "#"}
                onClick={() => {
                  alert(`${child.label} 메뉴 클릭`);
                }}
                className="block break-keep py-p3 pr-p6 text-gray-90"
              >
                {child.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AccordionMenu;
