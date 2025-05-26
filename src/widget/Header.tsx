import { useState } from "react";
import { Link } from "react-router-dom";
import { SITE_MENU } from "@/shared/constant/sitemenu";

import Logo from "@/assets/logo.svg";
import Menu from "@/assets/icon/menu.svg";
import HeaderMenu from "./HeaderMenu";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white mobile:fixed" aria-label="사이트 헤더">
      {/* Header Branding */}
      <div className="border-b border-gray-20">
        {/* Header Branding Inner */}
        <div className="m-auto flex max-w-[1280px] justify-between p-p6">
          {/* Header Branding Contents */}
          <h2>
            <Link to="/" title="홈으로">
              <img src={Logo} className="h-[6rem] mobile:h-[4rem]" alt="한국장기조직기증원 로고" />
            </Link>
          </h2>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-g3 px-p5 py-p4"
            title="전체메뉴"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <img src={Menu} className="w-[2rem]" alt="메뉴 아이콘" />
            <h2 className="text-b-sm font-bold">전체메뉴</h2>
          </button>
        </div>
      </div>

      {/* Header Navigation Menu */}
      <HeaderMenu items={SITE_MENU} />
    </header>
  );
}
