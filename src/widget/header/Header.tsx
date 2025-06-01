import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useIsMobile } from "@/shared/hooks/useIsMobile";

import { baseIconStyle } from "./menuStyles";
import Logo from "@/assets/logo.svg";
import Menu from "@/assets/icon/menu.svg";

import HeaderMenu from "./menu/HeaderMenu";
import MobileMenu from "./mobile-menu/MobileMenu";
import AllMenu from "./all-menu/AllMenu";

export default function Header() {
  const { key } = useLocation();

  const isMobile = useIsMobile();
  const [isOpenAllMenu, setIsOpenAllMenu] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  // 페이지 변경 시 메뉴 닫기
  useEffect(() => {
    setIsOpenAllMenu(false);
  }, [key]);

  return (
    <header aria-label="사이트 헤더" className="bg-white text-gray-90">
      <div className="border-b border-gray-20">
        <div className="m-auto flex max-w-[1280px] items-center justify-between px-p10 py-p6 mobile:px-p6">
          <h2>
            <Link to={"/home"}>
              <img src={Logo} className="h-[60px] mobile:h-[40px]" alt="한국장기기증원 로고" />
            </Link>
          </h2>
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setIsOpenAllMenu(true)}
            className="flex h-full items-center gap-g3 font-bold"
          >
            <img src={Menu} alt="전체메뉴 아이콘" className={baseIconStyle} />
            전체메뉴
          </button>
        </div>
      </div>

      {isMobile ? (
        <MobileMenu isOpen={isOpenAllMenu} setIsOpen={setIsOpenAllMenu} />
      ) : (
        <>
          <HeaderMenu />
          <AllMenu isOpen={isOpenAllMenu} setIsOpen={setIsOpenAllMenu} />
        </>
      )}
    </header>
  );
}
