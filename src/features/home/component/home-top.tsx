import { useIsMobile } from "@/shared/hooks/useIsMobile";
import MainBanner from "./banner/MainBanner";
import ConventionPartner from "./convention-partners/ConventionPartners";
import DonationService from "./donation-service/DonationService";
import KodaNews from "./koda-news/KodaNews";
import PopularMenu from "./popular-menu/PopularMenu";
import clsx from "clsx";

export default function HomeTop() {
  const isMobile = useIsMobile(1075);

  return (
    <div>
      <MainBanner />
      <DonationService />
      <PopularMenu />
      <div
        className={clsx(
          "mx-auto mb-g11 flex min-w-0 max-w-[1280px] px-p10 mobile:mb-g8 mobile:px-p6",
          isMobile ? "flex-col gap-g11 mobile:gap-g8" : "gap-g7",
        )}
      >
        <div className="min-w-0 basis-3/5">
          <ConventionPartner />
        </div>
        <div className="min-w-0 basis-2/5">
          <KodaNews />
        </div>
      </div>
    </div>
  );
}
