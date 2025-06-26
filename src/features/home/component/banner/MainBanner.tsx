import { useState, useRef } from "react";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

import clsx from "clsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Play from "@/assets/icon/play.svg";
import Stop from "@/assets/icon/stop.svg";
import BannerLogo from "@/assets/images/banner-logo.svg";
import Banner01 from "@/assets/images/mainBanner/main-banner-01.png";
import Banner02 from "@/assets/images/mainBanner/main-banner-02.png";
import Banner03 from "@/assets/images/mainBanner/main-banner-03.png";

import Slider from "react-slick";
import QuickInfoCard from "./QuickInfoCard";

const bannerItems = [
  {
    title: "내일을 이어주는 기적, \n당신의 마음에서 시작됩니다",
    subtitle: "기적은 멀리 있지 않습니다. \n당신의 선택에서 시작됩니다.",
    imageSrc: Banner01,
  },
  {
    title: "더 많은 삶이, \n당신의 따뜻한 결심으로 시작됩니다.",
    subtitle: "생명을 기다리는 이들에게 \n희망이 되어 주세요.",
    imageSrc: Banner02,
  },
  {
    title: "기증으로 이어지는 하나의 삶, \n또 다른 삶의 시작입니다",
    subtitle: "생명을 잇는 가장 아름다운 선택, \n지금 함께해 주세요",
    imageSrc: Banner03,
  },
];

export default function MainBanner() {
  const isMobile = useIsMobile(1075);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    draggable: true,
    swipeToSlide: true,
    beforeChange: (_oldIndex: number, newIndex: number) => setActiveIndex(newIndex),
    nextArrow: <></>,
    prevArrow: <></>,
  };

  const handlePlay = () => {
    sliderRef.current?.slickPlay();
    setIsPlaying(true);
  };

  const handlePause = () => {
    sliderRef.current?.slickPause();
    setIsPlaying(false);
  };

  return (
    <>
      <section
        className="relative mb-g11 text-gray-90 mobile:mb-g8"
        aria-label="한국장기조직기증원 메인 배너"
        aria-roledescription="carousel"
        aria-live="polite"
      >
        <Slider ref={sliderRef} {...settings} className="overflow-hidden">
          {bannerItems.map((item, index) => (
            <article
              key={index}
              className="relative flex h-[500px] items-center justify-center text-white mobile:h-[450px]"
              role="group"
              aria-roledescription="slide"
              aria-label={`배너 ${index + 1} / ${bannerItems.length}`}
              aria-hidden={activeIndex !== index}
            >
              <img
                src={item.imageSrc}
                alt={item.title.replace(/\n/g, " ")}
                className="absolute inset-0 h-full w-dvw object-cover"
                draggable={false}
              />
              <div
                className={clsx(
                  "flex h-full max-w-[1280px] justify-between",
                  "relative z-10 mx-auto p-[95px] px-p10 mobile:pb-[90px] mobile:pt-[32px]",
                )}
              >
                <div className="flex flex-col gap-g9 pl-p10 mobile:h-full mobile:justify-between mobile:pl-0">
                  <div className="w-[180px] mobile:w-[120px]" aria-hidden="true">
                    <img src={BannerLogo} alt="" />
                  </div>
                  <div>
                    <p className="whitespace-pre-line text-d-sm font-bold mobile:text-h-md">
                      {item.title}
                    </p>
                    <p className="mt-g3 text-b-md mobile:whitespace-pre-line mobile:text-b-sm">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </Slider>

        <div
          className={clsx(
            "h-[500px] max-w-[1280px] text-gray-90 mobile:h-[450px]",
            "pointer-events-none absolute inset-0 m-auto grid grid-rows-1 px-p10 py-p5",
            isMobile ? "grid-cols-1" : "grid-cols-[1fr_400px]",
          )}
        >
          <div className="pointer-events-none mb-g8 flex w-full items-end justify-center gap-g3 mobile:mb-g4">
            {/* 슬라이드 인디케이터 */}
            <nav
              aria-label="배너 슬라이드 페이지 선택"
              className="pointer-events-auto flex gap-2 rounded-full bg-white p-p6"
            >
              {bannerItems.map((_, index) => (
                <button
                  key={index}
                  className={clsx(
                    "h-[8px] rounded-full transition-all duration-300",
                    activeIndex === index
                      ? "w-[20px] rounded-r4 bg-secondary-50"
                      : "w-[8px] bg-gray-50",
                  )}
                  onClick={() => sliderRef.current?.slickGoTo(index)}
                  aria-current={activeIndex === index ? "true" : undefined}
                  aria-label={`배너 ${index + 1} 보기`}
                />
              ))}
            </nav>

            {/* 자동재생 버튼 */}
            <div className="pointer-events-auto flex justify-center gap-4">
              {isPlaying ? (
                <button
                  onClick={handlePause}
                  className="rounded-full bg-white p-p3"
                  aria-label="자동재생 정지"
                >
                  <img src={Stop} alt="" className="w-[24px]" />
                </button>
              ) : (
                <button
                  onClick={handlePlay}
                  className="rounded-full bg-white p-p3"
                  aria-label="자동재생 실행"
                >
                  <img src={Play} alt="" className="w-[24px]" />
                </button>
              )}
            </div>
          </div>

          {/* 카드 리스트 : PC - 배너 위 */}
          {!isMobile && <QuickInfoCard isMobile={isMobile} />}
        </div>
      </section>

      {/* 카드 리스트 : Mobile - 배너 영역 밖에 */}
      {isMobile && <QuickInfoCard isMobile={isMobile} />}
    </>
  );
}
