import clsx from "clsx";
import DonorMemorial from "./DonorMemorial";
import QuickLinkCard from "./QuickLinkCard";

import donate from "@/assets/images/donate-icon.png";
import mailBox from "@/assets/images/mainBox-icon.png";

export default function DonationService() {
  return (
    <section
      className={clsx(
        "m-auto mb-g11 grid max-w-[1280px] grid-cols-3 gap-g7 px-p10 text-gray-90",
        "mobile:mb-g8 mobile:flex mobile:flex-col mobile:gap-g6 mobile:px-p6",
      )}
      aria-labelledby="donation-service-heading"
    >
      <h2 id="donation-service-heading" className="sr-only">
        기증자 관련 서비스
      </h2>
      <QuickLinkCard
        icon={donate}
        title="기증희망등록 신청"
        description="기증희망등록은 누군가에게 새로운 시작이 될 수 있는 소중한 약속입니다."
        path="/"
        isNewTap={false}
      />
      <QuickLinkCard
        icon={mailBox}
        title="생명 나눔 희망 우체통 서비스"
        description="기증자 유과족과 이식수혜자가 서로의 안부를 물으며 싹트는 생명 나눔의 기적 그 기행의 시작을 생명 나눔 작성 우체통이 함께합니다."
        path="https://koda1458.kr/post/mem/memLogin.c"
        isNewTap={true}
      />
      <DonorMemorial />
    </section>
  );
}
