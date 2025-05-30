import { Link } from "react-router-dom";

import Logo from "@/assets/logo.svg";
import Menu from "@/assets/icon/menu.svg";

interface HeaderBrandingProps {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  isOpenMobileMenu: boolean;
  setIsOpenMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HeaderBranding({
  buttonRef,
  isOpenMobileMenu,
  setIsOpenMobileMenu,
}: HeaderBrandingProps) {
  return (
    <div className="relative z-50 border-b border-gray-20 bg-white">
      {/* Header Branding Inner */}
      <div className="m-auto flex max-w-[1280px] justify-between px-p10 py-p6 mobile:px-p6">
        {/* Header Branding Contents */}
        <h2>
          <Link to="/" title="홈으로">
            <img src={Logo} className="h-[60px] mobile:h-[40px]" alt="한국장기조직기증원 로고" />
          </Link>
        </h2>
        <button
          ref={buttonRef}
          type="button"
          className="flex cursor-pointer items-center gap-g3 px-p5 py-p4 text-gray-90"
          title="전체메뉴"
          onClick={() => {
            setIsOpenMobileMenu(!isOpenMobileMenu);
          }}
        >
          <img src={Menu} className="w-[2rem]" alt="메뉴 아이콘" />
          <h2 className="text-b-sm font-bold">전체메뉴</h2>
        </button>
      </div>
    </div>
  );
}
