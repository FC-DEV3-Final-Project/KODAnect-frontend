import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import Button from "@/shared/components/Button";
import Notification from "@/assets/icon/exclamation.svg?react";

export default function Error() {
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

  // 고정값으로 에러 코드와 메시지 설정
  const errorCode = 500;
  const errorMessage = "데이터를 불러오는 중 문제가 발생했습니다.";

  return (
    <section
      className={clsx(
        "flex w-full flex-col items-center gap-[56px] py-[100px] text-gray-90",
        "mobile:gap-[36px]",
      )}
    >
      <div className="flex flex-col items-center gap-g5">
        <Notification className="h-icon6 w-icon6" aria-hidden="true" />
        <div className="text-center">
          <h2 className="text-h-lg font-bold text-gray-70">{errorCode}</h2>
          <p className="mobile:mt-pag-g3 text-b-md">{errorMessage}</p>
        </div>
      </div>
      <div className={clsx("flex gap-g6", "mobile:gap-g4")}>
        <Button size={isMobile ? "medium" : "large"} variant="tertiary" onClick={handleGoBack}>
          이전 페이지로
        </Button>
        <Button size={isMobile ? "medium" : "large"} variant="primary" onClick={handleGoHome}>
          홈으로 가기
        </Button>
      </div>
    </section>
  );
}
