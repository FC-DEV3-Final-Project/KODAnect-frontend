import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

export const TABS = [
  { label: "기증자 추모관", type: "members", path: "/remembrance/members" },
  { label: "하늘나라 편지", type: "letters", path: "/remembrance/letters" },
  { label: "수혜자 편지", type: "recipients", path: "/remembrance/recipients" },
  { label: "기증자 스토리", type: "stories", path: "/remembrance/stories" },
] as const;

export type TabType = (typeof TABS)[number]["type"];

interface TabProps {
  type: TabType;
}

interface TabButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  id: string;
  panelId: string;
}

function TabButton({ label, isSelected, onClick, id, panelId }: TabButtonProps) {
  return (
    <button
      role="tab"
      aria-selected={isSelected}
      aria-controls={panelId}
      id={id}
      onClick={onClick}
      className={clsx(
        "h-full w-full flex-auto cursor-pointer p-[14px] text-h-sm font-bold mobile:p-[12px] mobile:text-h-2xs",
        isSelected ? "bg-secondary-80 text-gray-0" : "bg-gray-0 text-gray-70",
      )}
    >
      {label}
      {isSelected && <span className="sr-only">선택됨</span>}
    </button>
  );
}

export function Tab({ type }: TabProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const index = TABS.findIndex((tab) => tab.type === type);
    if (index !== -1) setSelectedTab(index);
  }, [type]);

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
    navigate(TABS[index].path);
  };

  return (
    <ul
      role="tablist"
      aria-label="Tab Navigation"
      className="flex w-full flex-wrap overflow-hidden rounded-r3 border border-gray-30"
    >
      {TABS.map((tab, index) => {
        const isFirstLine = index < 2;
        const isLast = index === TABS.length - 1;

        return (
          <li
            key={tab.type}
            className={clsx(
              "w-1/4 border-gray-30 mobile:w-1/2",
              isFirstLine ? "mobile:border-0" : "mobile:border-t",
              isLast ? "border-0" : "border-r mobile:border-0 mobile:odd:border-r",
            )}
          >
            <TabButton
              label={tab.label}
              isSelected={index === selectedTab}
              onClick={() => handleTabClick(index)}
              id={`tab-${index}`}
              panelId={`panel-${index}`}
            />
          </li>
        );
      })}
    </ul>
  );
}
