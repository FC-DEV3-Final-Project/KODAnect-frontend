import clsx from "clsx";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

import MainBanner from "@/features/home/component/banner/MainBanner";
import DonationService from "@/features/home/component/donation-service/DonationService";
import PopularMenu from "@/features/home/component/popular-menu/PopularMenu";
import ConventionPartner from "@/features/home/component/convention-partners/ConventionPartners";
import KodaNews from "@/features/home/component/koda-news/KodaNews";
import Letter from "@/features/home/component/letter/Letter";
import Story from "@/features/home/component/story/Story";
import Announcement from "@/features/home/component/announcement/Announcement";

export default function Home() {
  const isMobile = useIsMobile(1075);

  return (
    <>
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
      <Letter />
      <Story />
      <Announcement />
    </>
  );
}
