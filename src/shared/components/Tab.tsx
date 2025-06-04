import { useState } from "react";
import clsx from "clsx";

interface TabProps {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabProps[];
}

const TabButton: React.FC<{
  label: string;
  isSelected: boolean;
  onClick: () => void;
  id: string;
  panelId: string;
}> = ({ label, isSelected, onClick, id, panelId }) => {
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
};

const TabPanel: React.FC<{
  children: React.ReactNode;
  id: string;
  tabId: string;
  isSelected: boolean;
}> = ({ children, id, tabId, isSelected }) => {
  return (
    <div
      role="tabpanel"
      id={id}
      aria-labelledby={tabId}
      className={`${isSelected ? "" : "hidden"}`}
    >
      {children}
    </div>
  );
};

export const Tab: React.FC<TabsProps> = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      <ul
        role="tablist"
        aria-label="Tab Navigation"
        className="flex w-full flex-wrap overflow-hidden rounded-r3 border border-gray-30"
      >
        {tabs.map((tab, index) => {
          const isFirstLine = index === 0 || index === 1;
          const isLast = index === tabs.length - 1;

          return (
            <li
              key={index}
              className={clsx(
                "w-1/4 border-gray-30 mobile:w-1/2",
                isFirstLine ? "mobile:border-0" : "mobile:border-t",
                isLast ? "border-0" : "border-r mobile:border-0 mobile:odd:border-r",
              )}
            >
              <TabButton
                label={tab.label}
                isSelected={index === selectedTab}
                onClick={() => setSelectedTab(index)}
                id={`tab-${index}`}
                panelId={`panel-${index}`}
              />
            </li>
          );
        })}
      </ul>
      {tabs.map((tab, index) => (
        <TabPanel
          key={index}
          id={`panel-${index}`}
          tabId={`tab-${index}`}
          isSelected={index === selectedTab}
        >
          {tab.content}
        </TabPanel>
      ))}
    </>
  );
};
