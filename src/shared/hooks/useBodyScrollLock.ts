import { useEffect } from "react";

export function useBodyScrollLock(isLock: boolean) {
  useEffect(() => {
    if (isLock) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLock]);
}
