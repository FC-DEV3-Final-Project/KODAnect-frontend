import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import SideMenu from "../sideMenu/SideMenu";
import Footer from "../Footer";

export default function SideMenuLayout() {
  return (
    <>
      <Header />
      <div className="mx-auto flex w-full max-w-[1280px] gap-g9 p-p10 mobile:px-p6 mobile:py-p8">
        <SideMenu />
        <main className="flex-1">
          {/* <BreadCrumb /> */}
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}
