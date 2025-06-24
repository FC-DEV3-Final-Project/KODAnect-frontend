import { useIsMobile } from "@/shared/hooks/useIsMobile";
import MoreButton from "@/features/home/component/common/MoreButton";
import LetterCardList from "@/features/home/component/letter/LetterCardList";

export default function Letter() {
  const isMobile = useIsMobile(768);
  return (
    <section className="relative mb-g11 text-gray-90 mobile:mb-g8">
      <div className="m-auto max-w-[1280px] px-p10 mobile:px-p6">
        <div className="relative mb-g6 flex-col gap-g2">
          <h2 className="text-h-md font-bold mobile:text-h-sm">하늘나라 편지</h2>
          <p className="text-b-sm mobile:text-b-xs">
            그리움과 사랑을 담아 소중한 이들을 기억하는 공간입니다.
          </p>
          <MoreButton
            to="/remembrance/letters"
            className="absolute bottom-0 right-0 text-b-xs mobile:bottom-auto mobile:top-0"
          />
        </div>
        <LetterCardList />
      </div>
      <div
        className="pointer-events-none absolute -top-[90px] -z-10 min-h-[728px] w-full bg-cover bg-center bg-no-repeat mobile:top-[16px] mobile:min-h-[570px]"
        style={{
          backgroundImage: isMobile ? "url(/letters-bg-mo.svg)" : "url(/letters-bg.svg)",
        }}
      ></div>
    </section>
  );
}
