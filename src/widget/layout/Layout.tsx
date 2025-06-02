import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1280px] gap-g9 p-p10 mobile:px-p6 mobile:py-p8">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
