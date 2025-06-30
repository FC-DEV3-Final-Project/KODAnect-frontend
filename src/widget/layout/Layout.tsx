import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { useScrollToTop } from "@/shared/hooks/useScrollToTop";

import clsx from "clsx";
import Header from "@/widget/header/Header";
import Footer from "@/widget/Footer";

import { useMenuStore } from "@/shared/stores/useMenuStore";

export default function Layout() {
  const isMobile = useIsMobile(1075);
  useScrollToTop(); // 훅 추가

  // 딤 처리를 위한 상태
  const { selectedDepth1, resetMenu } = useMenuStore();

  return (
    <>
      <Header />
      {/* dim */}
      {selectedDepth1 !== null && (
        <div
          className="fixed left-0 right-0 z-40 bg-black bg-opacity-50"
          style={{
            top: 0,
            bottom: 0,
          }}
          onClick={resetMenu}
          aria-label="배경 닫기"
        />
      )}
      <main className={clsx(isMobile ? "pt-[92px]" : "pt-[146px]", "mobile:pt-[72px]")}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
