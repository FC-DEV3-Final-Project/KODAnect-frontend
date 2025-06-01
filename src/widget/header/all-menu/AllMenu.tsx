import { createPortal } from "react-dom";
import { modalStyle, overlayStyle } from "@/widget/header/menuStyles";
import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";

import Close from "@/assets/icon/close.svg";
import { SITE_MENU } from "@/shared/constant/sitemenu";

import RecursiveMenuItem from "./RecursiveMenuItem";

interface AllMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AllMenu({ isOpen, setIsOpen }: AllMenuProps) {
  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  return createPortal(
    <div className={overlayStyle} onClick={() => setIsOpen(false)}>
      <div className={modalStyle} onClick={(event) => event.stopPropagation()}>
        <div className="mb-g8 flex items-center justify-between px-p10 pt-p10">
          <h2 className="text-d-md font-bold">전체메뉴</h2>
          <button type="button" onClick={() => setIsOpen(false)}>
            <img src={Close} className="w-icon5" alt="전체메뉴 닫기 아이콘" />
          </button>
        </div>
        <nav className="max-h-[calc(100dvh_-_200px)] overflow-y-auto px-p10 pb-p10">
          <ul className="list-none">
            {SITE_MENU.map((item, idx) => (
              <RecursiveMenuItem key={idx} item={item} />
            ))}
          </ul>
        </nav>
      </div>
    </div>,
    document.querySelector("body")!,
  );
}
