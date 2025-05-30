import React, { useRef, useState } from "react";
import { SITE_MENU } from "@/shared/constant/sitemenu";
import HeaderBranding from "./HeaderBranding";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import MobileMenu from "./MobileMenu";

const HeaderMenu = React.lazy(() => import("./HeaderMenu"));
const AllMenu = React.lazy(() => import("./AllMenu"));

function Header() {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 모바일 여부
  const isMobile = useIsMobile();

  return (
    <header className="w-full bg-white mobile:fixed" aria-label="사이트 헤더">
      {/* Header Branding */}
      <HeaderBranding
        buttonRef={buttonRef}
        isOpenMobileMenu={isOpenMobileMenu}
        setIsOpenMobileMenu={setIsOpenMobileMenu}
      />

      {/* Header Navigation Menu : PC Menu */}
      <HeaderMenu items={SITE_MENU} />

      {/* Header Navigation Menu : Mobile Menu, PC All Menu */}
      {isMobile ? (
        <MobileMenu
          items={SITE_MENU}
          isOpenMobileMenu={isOpenMobileMenu}
          setIsOpenMobileMenu={setIsOpenMobileMenu}
        />
      ) : (
        <AllMenu
          items={SITE_MENU}
          buttonRef={buttonRef}
          isOpenMobileMenu={isOpenMobileMenu}
          setIsOpenMobileMenu={setIsOpenMobileMenu}
        />
      )}
    </header>
  );
}

export default React.memo(Header);
