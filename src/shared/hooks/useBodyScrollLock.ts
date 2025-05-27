import { useEffect } from "react";

export function useBodyScrollLock(minWidth: number = 767) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < minWidth) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    // 초기 실행
    handleResize();

    // 리사이즈 이벤트 등록
    window.addEventListener("resize", handleResize);

    // 언마운트 시 정리
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = ""; // 원래대로 복구
    };
  }, [minWidth]);
}
