import clsx from "clsx";
import { Button } from "@/shared/components/Button";

import construction from "@/assets/images/under-construction.png";
import Notification from "@/assets/icon/exclamation.svg?react";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

export default function Empty() {
  const isMobile = useIsMobile(768);

  return (
    <section
      className={clsx(
        "flex w-full flex-col items-center pb-[200px] pt-[175px] text-gray-90",
        "mobile:pb-[158px] mobile:pt-[68px]",
      )}
    >
      <img
        src={construction}
        className={clsx("h-[277px] w-[277px]", "h-[108px] mobile:w-[108px]")}
      />
      <h2 className={clsx("mt-[45px] flex items-center gap-g4", "mobile:mt-[42px] mobile:gap-g3")}>
        <Notification className={clsx("h-icon5 w-icon5 text-gray-80", "w-icon4 mobile:h-icon4")} />
        <p className={clsx("text-h-lg font-bold text-gray-80", "mobile:text-h-sm")}>
          페이지 <span className="text-secondary-80">준비중</span> 입니다.
        </p>
      </h2>
      <p
        className={clsx(
          "mb-[58px] mt-[12px] text-center",
          "mobile:mb-[22px] mobile:mt-0 mobile:text-b-sm",
        )}
      >
        보다 나은 서비스를 위해 작업중입니다.
        <br />
        곧 완성된 페이지를 만나실 수 있습니다.
        <br />
        감사합니다.
      </p>
      <div className={clsx("flex gap-g6", "mobile:gap-g5")}>
        <Button size={isMobile ? "small" : "large"} variant="tertiary" children="이전 페이지로" />
        <Button size={isMobile ? "small" : "large"} variant="primary" children="홈으로 가기" />
      </div>
    </section>
  );
}
