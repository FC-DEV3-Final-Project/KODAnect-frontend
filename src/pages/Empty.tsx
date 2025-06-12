import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Button } from "@/shared/components/Button";

import construction from "@/assets/images/under-construction.png";
import Notification from "@/assets/icon/exclamation.svg?react";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

export default function Empty() {
  const isMobile = useIsMobile(768);
  const navigate = useNavigate();
  const location = useLocation();

  // 이전 페이지로 이동
  const handleGoBack = () => {
    // history stack이 비어있지 않으면 뒤로가기, 아니면 홈으로
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/home");
    }
  };

  // 홈으로 이동
  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <section
      className={clsx(
        "flex w-full flex-col items-center pb-[500px] pt-[175px] text-gray-90",
        "mobile:pb-[158px] mobile:pt-[68px]",
      )}
    >
      <img
        src={construction}
        className={clsx("h-[277px] w-[277px]", "mobile:h-[108px] mobile:w-[108px]")}
      />
      <h2
        className={clsx(
          "mt-[45px] flex items-center gap-g4 text-h-lg font-bold text-gray-80",
          "mobile:mt-[42px] mobile:gap-g3 mobile:text-h-sm",
        )}
      >
        <Notification
          className={clsx("h-icon5 w-icon5 text-gray-80", "w-icon4 mobile:h-icon4")}
          aria-hidden="true"
        />
        페이지 <span className="text-secondary-80">준비중</span> 입니다.
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
        <Button size={isMobile ? "small" : "large"} variant="tertiary" onClick={handleGoBack}>
          이전 페이지로
        </Button>
        <Button size={isMobile ? "small" : "large"} variant="primary" onClick={handleGoHome}>
          홈으로 가기
        </Button>
      </div>
    </section>
  );
}
