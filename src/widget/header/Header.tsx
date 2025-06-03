import clsx from "clsx";

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

  const isMobile = useIsMobile(1058);
  const [isOpenAllMenu, setIsOpenAllMenu] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  // 페이지 변경 시 메뉴 닫기
  useEffect(() => {
    setIsOpenAllMenu(false);
  }, [key]);

  // 스크롤 이벤트
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
      // 아래로 스크롤 중 & 150 이상일 때
      setShowHeader(false);
    } else {
      // 위로 스크롤 중이거나 150 이하일 때
      setShowHeader(true);
    }

    lastScrollY.current = currentScrollY; // ref에 값 저장
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // 빈 배열: 한 번만 등록

  return (
    <header
      aria-label="사이트 헤더"
      className={clsx(
        showHeader ? "translate-y-0" : "-translate-y-full",
        "fixed left-0 right-0 top-0 z-50 bg-white text-gray-90",
        "transition-transform duration-300 ease-in-out",
      )}
    >
      <div className="border-b border-gray-20">
        <div className="m-auto flex max-w-[1280px] items-center justify-between px-p10 py-p6 mobile:px-p6">
          <h1>
            <Link to={"/home"} aria-label="메인 페이지">
              <img src={Logo} className="h-[60px] mobile:h-[40px]" alt="한국장기기증원 로고" />
            </Link>
          </h1>
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setIsOpenAllMenu(true)}
            className="flex h-full items-center gap-g3 font-bold"
            aria-label="전체메뉴 열기"
            aria-expanded={isOpenAllMenu}
          >
            <img src={Menu} alt="" aria-hidden="true" className={baseIconStyle} />
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
