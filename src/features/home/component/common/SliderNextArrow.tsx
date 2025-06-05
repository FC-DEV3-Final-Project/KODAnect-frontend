import clsx from 'clsx';
import Arrow from "@/assets/icon/arrow-down.svg";

export default function SliderNextArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className={clsx(
        "absolute bottom-0 right-0 top-0 z-10 h-full w-[64px]",
        "flex items-center justify-end pr-p3 mobile:-mr-g3 mobile:pr-0",
        "bg-gradient-to-l from-white via-white/90 to-white/0",
      )}
    >
      <button
        aria-label="다음 슬라이드 이동"
        onClick={onClick}
        className="rounded-full border-[0.8px] border-gray-20 bg-white p-[6px]"
      >
        <img src={Arrow} alt="" className="w-icon3 -rotate-90" />
      </button>
    </div>
  );
}
