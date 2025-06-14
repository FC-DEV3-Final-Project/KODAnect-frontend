import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { useScrollToTop } from "@/shared/hooks/useScrollToTop";

import clsx from "clsx";
import Header from "@/widget/header/Header";
import { Breadcrumb } from "@/shared/components/Breadcrumb";
import SideMenu from "@/widget/sideMenu/SideMenu";
import Footer from "@/widget/Footer";

export default function SideMenuLayout() {
  const isMobile = useIsMobile(1075);
  useScrollToTop();

  return (
    <>
      <Header />

      <main className={clsx(isMobile ? "pt-[92px]" : "pt-[146px]", "mobile:pt-[72px]")}>
        {/* BreadCrumb */}
        <div className="bg-gray-5 py-p8 mobile:py-p5">
          <div className="mx-auto max-w-[1280px] pl-[328px] mobile:pl-p6">
            <Breadcrumb />
          </div>
        </div>

        <div className="mx-auto flex max-w-[1280px] gap-[54px] px-p10 mobile:px-p6">
          <SideMenu />
          <div className="flex-1 py-p10 mobile:py-p9">
            <Outlet />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
