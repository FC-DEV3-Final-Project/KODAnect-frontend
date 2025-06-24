import { useState } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";

interface TabPanelProps {
  tabs: string[];
  children: ReactNode | ReactNode[];
  className?: string;
}

export default function TabPanel({ tabs, children, className }: TabPanelProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const panels = Array.isArray(children) ? children : [children];

  // 접근성 관련
  const tabIds = tabs.map((_, i) => `tabpanel-${i}`);
  const buttonIds = tabs.map((_, i) => `tab-${i}`);

  return (
    <section>
      {/* 탭 메뉴 */}
      <nav className={`flex ${className}`} role="tablist" aria-label="탭 메뉴">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={clsx(
              "flex-1 py-p4 text-b-md font-semibold",
              activeIndex === idx
                ? "border-b-[3px] border-secondary-70 text-secondary-80"
                : "text-gray-70",
            )}
            role="tab"
            aria-selected={activeIndex === idx}
            aria-controls={tabIds[idx]}
            tabIndex={activeIndex === idx ? 0 : -1}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* 콘텐츠 영역 */}
      <div className="relative mx-auto mt-g5 w-full max-w-[1280px]">
        {panels.map((panel, idx) => (
          <div
            key={idx}
            role="tabpanel"
            aria-labelledby={buttonIds[idx]}
            hidden={activeIndex !== idx}
          >
            {panel}
          </div>
        ))}
      </div>
    </section>
  );
}
