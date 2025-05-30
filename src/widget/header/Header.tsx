import React, { useState } from "react";
import { SITE_MENU } from "@/shared/constant/sitemenu";
import HeaderBranding from "./HeaderBranding";

const HeaderMenu = React.lazy(() => import("./HeaderMenu"));
const AllMenu = React.lazy(() => import("./AllMenu"));

function Header() {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);

  return (
    <header className="w-full bg-white mobile:fixed" aria-label="사이트 헤더">
      {/* Header Branding */}
      <HeaderBranding
        isOpenMobileMenu={isOpenMobileMenu}
        setIsOpenMobileMenu={setIsOpenMobileMenu}
      />

      {/* Header Navigation Menu : PC Menu */}
      <HeaderMenu items={SITE_MENU} />

      {/* Header Navigation Menu : Mobile Menu, PC All Menu */}
      <AllMenu
        items={SITE_MENU}
        isOpenMobileMenu={isOpenMobileMenu}
        setIsOpenMobileMenu={setIsOpenMobileMenu}
      />
    </header>
  );
}

export default React.memo(Header);
