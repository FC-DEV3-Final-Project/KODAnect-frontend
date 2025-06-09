import { MoreButton } from "@/features/home/component/common/MoreButton";
import LetterCardList from "@/features/home/component/letter/LetterCardList";

export default function Letter() {
  return (
    <section className="m-auto mb-g11 max-w-[1280px] px-p10 text-gray-90 mobile:mb-g8 mobile:px-p6">
      <div className="relative mb-g6 flex-col gap-g2">
        <h2 className="text-h-md font-bold mobile:text-h-sm">하늘나라 편지</h2>
        <p className="text-b-sm mobile:text-b-xs">
          그리움과 사랑을 담아 소중한 이들을 기억하는 공간입니다.
        </p>
        <MoreButton className="absolute bottom-0 right-0 text-b-xs mobile:bottom-auto mobile:top-0" />
      </div>
      <LetterCardList />
    </section>
  );
}
