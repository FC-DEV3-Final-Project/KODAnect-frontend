import { Outlet } from "react-router-dom";

export default function SideMenuLayout() {
  return (
    <>
      {/* <Header /> */}
      <div>
        {/* <SideMenu /> */}
        <main>
          <Outlet />
        </main>
      </div>
      {/* <Footer /> */}
    </>
  );
}
