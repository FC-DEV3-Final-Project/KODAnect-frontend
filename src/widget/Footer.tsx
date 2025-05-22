import Logo from "@/assets/logo.svg";
import Youtube from "@/assets/icon/youtube.svg";
import FaceBook from "@/assets/icon/facebook.svg";
import Blog from "@/assets/icon/naver_blog.svg";
import Instagram from "@/assets/icon/instagram.svg";

function Footer() {
  const socialLinks = [
    { href: "#", icon: Youtube, label: "유튜브" },
    { href: "#", icon: FaceBook, label: "페이스북" },
    { href: "#", icon: Blog, label: "네이버 블로그" },
    { href: "#", icon: Instagram, label: "인스타그램" },
  ];

  // layout.tsx 혹은 page.tsx 같은 상위 컴포넌트를 flex로 감싸줘야 footer 하단에 고정됩니다.
  /*
  <body className="flex min-h-screen flex-col">
    <main className="flex-grow"> 페이지 내용 </main>
    <Footer />
  </body>
  */

  return (
    <footer className="mt-auto w-full">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Footer Quick */}
        <div></div>

        {/* Footer Inner */}
        <div>
          {/* Footer Logo */}
          <div>
            <img src={Logo} alt="한국장기조직기증원" className="w-[175px]" />
          </div>

          {/* Footer Center */}
          <div className="mb-g9 mt-g9 flex justify-between">
            {/* Footer Info */}
            <div>
              <p className="text-[17px] text-gray-90">
                서울시 서대문구 충정로 36 국민연금공단
                <br />
                충정로사옥5층 한국장기조직기능원 (우)03741
              </p>
              <ul className="mt-g5 flex flex-col gap-g3 text-[17px]">
                <li>
                  <strong>대표전화 </strong>
                  <span>02-3444-5632</span>
                </li>
                <li>
                  <strong>대표이메일 </strong>
                  <span>koda@koda14583.kr</span>
                </li>
              </ul>
            </div>

            {/* Footer Link */}
            <div>
              <ul className="flex gap-g3">
                {socialLinks.map(({ href, icon, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="block rounded-full border border-gray-20 p-p3 transition-colors hover:bg-gray-10"
                      aria-label={label}
                    >
                      <img src={icon} alt="" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="flex justify-between border-t border-gray-20 pb-p8 pt-p6 text-[15px]">
            <ul className="flex gap-g3 text-gray-90">
              {["개인정보처리방침", "위치안내", "경영고시", "기증희망등록", "저작권정책"].map(
                (item, index) => (
                  <li key={index} className="pl-p1 pr-p1">
                    <a href="#">{item}</a>
                  </li>
                ),
              )}
            </ul>
            <p className="text-gray-70">Copyright &copy; 2015 All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
