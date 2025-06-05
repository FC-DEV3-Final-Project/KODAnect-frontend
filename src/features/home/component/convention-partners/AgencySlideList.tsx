import clsx from "clsx";
import Slider from "react-slick";
import SliderNextArrow from "../common/SliderNextArrow";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

interface Agency {
  name: string;
  imageSrc: string;
}

interface AgencySlideListProps {
  items: Agency[];
}

// 기관 6개씩 묶기 함수
const chunkArray = (arr: Agency[], size: number) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export default function AgencySlideList({ items }: AgencySlideListProps) {
  const isMobile = useIsMobile();
  const groupedItems = chunkArray(items, isMobile ? 4 : 6); // 슬라이드 한 장에 6개씩(PC), 4개씩(Mobile)

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SliderNextArrow />,
    prevArrow: <></>,
  };

  return (
    <Slider {...settings}>
      {groupedItems.map((group, index) => (
        <div key={index}>
          <div className="grid grid-cols-3 gap-4 p-4 mobile:grid-cols-2">
            {group.map((agency, index) => (
              <div
                key={index}
                className={clsx(
                  "!flex h-[85px] w-full shrink-0 items-center justify-center gap-g5 mobile:h-[70px] mobile:gap-g4",
                  "shadow-1 relative z-10 rounded-r6 bg-white p-p5",
                )}
              >
                <img
                  src={`src/assets/images/partners/${agency.imageSrc}`}
                  alt={agency.name}
                  className="h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </Slider>
  );
}
