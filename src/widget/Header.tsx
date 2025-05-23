import { useState } from "react";
import { LinkButton } from "@krds-ui/core";
import Logo from "@/assets/logo.svg";
import Menu from "@/assets/icon/menu.svg";
import Navbar from "./Navbar";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="flex h-full w-full justify-between border-b-[1px] border-[#CDD1D5] bg-white p-p6 md:items-end">
        <LinkButton link="/" title="홈으로">
          <h1>
            <img src={Logo} className="h-[4rem] md:h-[6rem]" alt="한국장기조직기증원 로고" />
          </h1>
        </LinkButton>
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
      </header>
      {isOpen && <Navbar />}
    </>
  );
}
