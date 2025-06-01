import { useEffect, useState } from "react";

export function useIsMobile(minWidth = 768): boolean {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < minWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < minWidth);
    };

    // 초기 체크
    handleResize();

    // 이벤트 등록
    window.addEventListener("resize", handleResize);

    // 정리
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [minWidth]);

  return isMobile;
}
