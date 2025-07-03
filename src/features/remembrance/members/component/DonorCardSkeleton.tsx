import clsx from "clsx";

interface DonorCardSkeletonListProps {
  count?: number;
}

function DonorCardSkeleton() {
  return (
    <article
      className={clsx(
        "flex h-[250px] max-w-[284px] basis-1/4 flex-col gap-g6 overflow-hidden rounded-r6 border-2 border-transparent bg-white p-p8 text-gray-90",
        "shadow-[0_0_2px_0_theme('colors.secondary.10'),0_8px_16px_0_theme('colors.secondary.10')]",
        "mobile:h-[300px] mobile:max-w-[160px] mobile:basis-1/2 mobile:py-p6 mobile:pl-p6 mobile:pr-p5",
        "animate-pulse",
      )}
      aria-label="기증자 정보 스켈레톤 카드"
    >
      <div
        className={clsx("relative flex items-center gap-g4", "mobile:flex-col mobile:items-start")}
      >
        <div
          className={clsx(
            "h-[66px] w-[66px] rounded-r4 bg-gray-10",
            "mobile:h-[59px] mobile:w-[59px]",
          )}
        ></div>
        <div
          className={clsx(
            "flex w-1/2 flex-col justify-center gap-g4",
            "mobile:w-full mobile:gap-g2",
          )}
        >
          <div className={clsx("min-h-[22px] rounded-md bg-gray-10")}></div>
          <div className={clsx("min-h-[20px] rounded-md bg-gray-10")}></div>
        </div>
      </div>
      <div className={clsx("flex w-1/2 flex-col gap-g4", "mobile:w-3/4 mobile:gap-g2")}>
        <div className={clsx("min-h-[16px] rounded-md bg-gray-10")}></div>
        <div className={clsx("min-h-[16px] rounded-md bg-gray-10")}></div>
      </div>
      <div className={clsx("flex gap-g4", "mobile:flex-col")}>
        <div
          className={clsx(
            "min-h-[40px] min-w-[64px] basis-2/5 rounded-r3 bg-gray-10",
            "mobile:min-h-[32px] mobile:basis-0",
          )}
        ></div>
        <div
          className={clsx(
            "min-h-[40px] min-w-[64px] basis-3/5 rounded-r3 bg-gray-10",
            "mobile:min-h-[32px] mobile:basis-0",
          )}
        ></div>
      </div>
    </article>
  );
}

export default function DonorCardSkeletonList({ count = 20 }: DonorCardSkeletonListProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <DonorCardSkeleton key={idx} />
      ))}
    </>
  );
}
