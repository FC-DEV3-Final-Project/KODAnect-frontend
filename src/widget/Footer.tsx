import Logo from "@/assets/logo.svg";
import Youtube from "@/assets/icon/youtube.svg";
import FaceBook from "@/assets/icon/facebook.svg";
import Blog from "@/assets/icon/naver-blog.svg";
import Instagram from "@/assets/icon/instagram.svg";
import Arrow from "@/assets/icon/arrow-down.svg";
import OpenNewWindow from "@/assets/icon/open-new-window.svg";
import { useState } from "react";

function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const relatedSites = [
    { title: "보건복지부", url: "#" },
    { title: "보건복지 상담센터", url: "#" },
    { title: "국립장기조직 혈액관리원", url: "#" },
    { title: "대한이식학회", url: "#" },
  ];
  const socialLinks = [
    {
      href: "#",
      icon: Youtube,
      label: "유튜브",
      alt: "한국장기조직기증원 유튜브 바로가기",
    },
    {
      href: "#",
      icon: FaceBook,
      label: "페이스북",
      alt: "한국장기조직기증원 페이스북 바로가기",
    },
    {
      href: "#",
      icon: Blog,
      label: "네이버 블로그",
      alt: "한국장기조직기증원 네이버 블로그 바로가기",
    },
    {
      href: "#",
      icon: Instagram,
      label: "인스타그램",
      alt: "한국장기조직기증원 인스타그램 바로가기",
    },
  ];

  // layout.tsx 혹은 page.tsx 같은 상위 컴포넌트를 flex로 감싸줘야 footer 하단에 고정됩니다.
  /*
  <body className="flex min-h-screen flex-col">
    <main className="flex-grow"> 페이지 내용 </main>
    <Footer />
  </body>
  */

  return (
    <footer className={`mt-auto w-full border-gray-20 ${isOpen ? "border-0" : "border-t"}`}>
      {/* Footer Related Sites */}
      <section aria-label="관련 사이트" className="w-full">
        <ul
          className={`mx-auto w-full max-w-[1200px] overflow-hidden transition-all duration-300 ${isOpen ? "border-x border-t border-gray-20 py-g6" : "max-h-0 pt-0"}`}
        >
          {relatedSites.map(({ title, url }) => (
            <li key={title} className="mb-p4 last:mb-0">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-between px-p8 py-p6 mobile:py-0"
              >
                <span className="text-b-md text-gray-50 mobile:text-b-sm">{title}</span>
                <img
                  src={OpenNewWindow}
                  alt={`${title} 바로가기`}
                  className="w-icon3 mobile:w-icon2"
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Related Sites Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "관련 사이트 닫기" : "관련 사이트 펼치기"}
          className={`mx-auto flex w-full max-w-[1200px] items-center justify-between border-x border-gray-20 px-p8 py-p6 text-b-md mobile:border-x-0 ${isOpen ? "border-t" : "border-t-0"}`}
        >
          <span>관련 사이트</span>
          <img
            src={Arrow}
            alt={isOpen ? "접기 아이콘" : "펼치기 아이콘"}
            className={`w-icon3 transition-transform duration-300 mobile:w-icon2 ${isOpen ? "rotate-0" : "rotate-180"} `}
          />
        </button>
      </section>

      {/* Footer Inner */}
      <section className="w-full border border-gray-20 bg-gray-5">
        <div className="mx-auto w-full max-w-[1280px] px-p10 pb-p8 pt-p10 mobile:px-p6 mobile:pt-p8">
          {/* Footer Logo */}
          <img src={Logo} alt="한국장기조직기증원 로고" className="mb-g9 h-[60px] mobile:mb-g5" />

          {/* Footer Center */}
          <section
            className="mb-g9 flex w-full justify-between mobile:mb-g5 mobile:flex-col"
            aria-label="기관 정보 및 SNS 링크"
          >
            {/* Footer Info */}
            <address className="flex flex-col gap-g5 text-b-md not-italic text-gray-90 mobile:mb-g7 mobile:text-b-sm">
              <p>
                서울시 서대문구 충정로 36 국민연금공단 <br />
                충정로사옥5층 한국장기조직기능원 (우)03741
              </p>
              <dl className="flex flex-col gap-g3">
                <div className="flex gap-g3">
                  <dt className="font-bold">대표전화</dt>
                  <dd>
                    <a href="tel:02-3444-5632">02-3444-5632</a>
                  </dd>
                </div>
                <div className="flex gap-g3">
                  <dt className="font-bold">대표이메일</dt>
                  <dd>
                    <a href="mailto:koda@koda14583.kr">koda@koda14583.kr</a>
                  </dd>
                </div>
              </dl>
            </address>

            {/* Footer Link */}
            <nav aria-label="SNS 바로가기">
              <ul className="flex gap-g3">
                {socialLinks.map(({ href, icon, label, alt }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="block rounded-full border border-gray-20 p-p3 transition-colors hover:bg-gray-20"
                      aria-label={label}
                    >
                      <img src={icon} alt={alt} />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          {/* Footer Bottom */}
          <section
            className="flex w-full justify-between border-t border-gray-20 pt-p6 text-b-sm mobile:flex-col mobile:gap-g6"
            aria-label="법적 고지 및 저작권"
          >
            <nav aria-label="법적 고지사항">
              <ul className="flex flex-wrap gap-g3 text-gray-90">
                {["개인정보처리방침", "위치안내", "경영고시", "기증희망등록", "저작권정책"].map(
                  (item, index) => (
                    <li key={index}>
                      <a href="#">{item}</a>
                    </li>
                  ),
                )}
              </ul>
            </nav>
            <small className="text-b-sm text-gray-70 mobile:text-b-xs">
              Copyright &copy; 2015 All Rights Reserved.
            </small>
          </section>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
