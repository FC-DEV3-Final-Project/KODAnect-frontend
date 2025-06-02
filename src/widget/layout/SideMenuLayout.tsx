import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import SideMenu from "../sideMenu/SideMenu";
import Footer from "../Footer";

export default function SideMenuLayout() {
  return (
    <>
      <Header />

      <main>
        {/* BreadCrumb */}
        <div className="bg-gray-5 py-p8 mobile:py-p5">
          <div className="mx-auto max-w-[1280px] pl-[328px] mobile:pl-p6">
            {/* <BreadCrumb /> */}
            {/* 예시로 넣어뒀습니다. 컴포넌트 추가 시 빼주세요! */}홈 &gt; 홍보·알림 &gt; 공지사항
          </div>
        </div>

        <div className="mx-auto flex max-w-[1280px] gap-g9 px-p10 mobile:px-p6">
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
