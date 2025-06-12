import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { useScrollToTop } from "@/shared/hooks/useScrollToTop";

import clsx from "clsx";
import Header from "@/widget/header/Header";
import Footer from "@/widget/Footer";

export default function Layout() {
  const isMobile = useIsMobile(1075);
  useScrollToTop(); // 훅 추가

  return (
    <>
      <Header />
      <main className={clsx(isMobile ? "pt-[92px]" : "pt-[146px]", "mobile:pt-[72px]")}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
