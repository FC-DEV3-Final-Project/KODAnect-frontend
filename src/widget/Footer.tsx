import { useState } from "react";
import Logo from "@/assets/logo.svg";
import Arrow from "@/assets/icon/arrow-down.svg";
import OpenNewWindow from "@/assets/icon/open-new-window.svg";
import { RELATED_SITES, SOCIAL_LINKS, POLICY_LINKS } from "@/shared/constant/footerlink";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer className="mt-auto w-full">
      {/* Footer Related Sites */}
      <section aria-label="관련 사이트" className="relative flex w-full flex-col-reverse">
        {/* Related Sites Toggle Button */}
        <div className="w-full border-t border-gray-20">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "관련 사이트 닫기" : "관련 사이트 펼치기"}
            className={`mx-auto flex w-full max-w-[1200px] items-center justify-between border-x border-gray-20 px-p8 py-p6 mobile:border-x-0`}
          >
            <span>관련 사이트</span>
            <img
              src={Arrow}
              alt={isOpen ? "접기 아이콘" : "펼치기 아이콘"}
              className={`w-icon3 transition-transform duration-300 mobile:w-icon2 ${isOpen ? "rotate-0" : "rotate-180"} `}
            />
          </button>
        </div>

        <ul
          className={`absolute bottom-full left-1/2 z-10 w-full max-w-[1200px] -translate-x-1/2 overflow-hidden bg-white transition-all duration-300 ${
            isOpen ? "border-x border-t border-gray-20 py-g6" : "max-h-0"
          }`}
        >
          {RELATED_SITES.map(({ title, url }) => (
            <li key={title} className="mb-p4 last:mb-0 hover:bg-gray-5 hover:font-bold mobile:mb-0">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-between px-p8 py-p6 mobile:py-p3"
              >
                <span className="text-gray-50 mobile:text-b-sm">{title}</span>
                <img
                  src={OpenNewWindow}
                  alt=""
                  aria-hidden="true"
                  className="w-icon3 mobile:w-icon2"
                />
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer Inner */}
      <section className="w-full border-y border-gray-20 bg-gray-5">
        <div className="mx-auto w-full max-w-[1248px] px-p8 pb-p8 pt-p10 mobile:px-p6 mobile:pt-p8">
          {/* Footer Logo */}
          <img src={Logo} alt="한국장기조직기증원 로고" className="mb-g9 h-[60px] mobile:mb-g5" />

          {/* Footer Center */}
          <div
            className="mb-g9 flex w-full justify-between mobile:mb-g5 mobile:flex-col"
            aria-label="기관 정보 및 SNS 링크"
          >
            {/* Footer Info */}
            <address className="flex flex-col gap-g5 not-italic text-gray-90 mobile:mb-g7 mobile:text-b-sm">
              <p>
                서울시 서대문구 충정로 36 국민연금공단 <br />
                충정로사옥5층 한국장기조직기능원 (우)03741
              </p>
              <ul>
                <li className="mb-g3 flex gap-g3">
                  <span className="font-bold">대표전화</span>
                  <a href="tel:02-3444-5632">02-3444-5632</a>
                </li>
                <li className="flex gap-g3">
                  <span className="font-bold">대표이메일</span>
                  <a href="mailto:koda@koda14583.kr">koda@koda14583.kr</a>
                </li>
              </ul>
            </address>

            {/* Footer Link */}
            <nav aria-label="SNS 바로가기">
              <ul className="flex gap-g3">
                {SOCIAL_LINKS.map(({ href, icon, label, alt }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-full border border-gray-20 p-p3 transition-colors hover:bg-gray-20"
                      aria-label={label}
                    >
                      <img src={icon} alt={alt} />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Footer Bottom */}
          <section
            className="flex w-full justify-between border-t border-gray-20 pt-p6 text-b-sm mobile:flex-col mobile:gap-g6"
            aria-label="법적 고지 및 저작권"
          >
            <nav aria-label="법적 고지사항">
              <ul className="flex flex-wrap gap-g3 text-gray-90">
                {POLICY_LINKS.map(({ title, url }) => {
                  const isExternal = url.startsWith("http");

                  return (
                    <li key={title}>
                      <a
                        href={url}
                        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {title}
                      </a>
                    </li>
                  );
                })}
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
