import { useLocation } from "react-router-dom";
import TopVisual from "@/shared/components/TopVisual";
import { Tab, TABS } from "@/shared/components/Tab";

export function TobArea() {
  const { pathname } = useLocation();
  const activeTab = TABS.find((tab) => tab.path === pathname) ?? TABS[0];

  return (
    <div className="relative">
      <TopVisual type={activeTab.type} />
      <div className="absolute bottom-0 left-1/2 mb-[-28px] w-[1062px] -translate-x-1/2 mobile:w-full mobile:px-p6">
        <Tab type={activeTab.type} />
      </div>
    </div>
  );
}
