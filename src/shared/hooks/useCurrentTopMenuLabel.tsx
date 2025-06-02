import { useLocation } from "react-router-dom";
import { SITE_MENU } from "../constant/sitemenu";

export function useCurrentTopMenuLabel(): string | undefined {
  const { pathname } = useLocation();

  for (const topMenu of SITE_MENU) {
    const stack = [...(topMenu.children || [])];
    while (stack.length) {
      const current = stack.pop();
      if (!current) continue;
      if (current.path && pathname.startsWith(current.path)) {
        return topMenu.label;
      }
      if (current.children) {
        stack.push(...current.children);
      }
    }
  }

  return undefined;
}
