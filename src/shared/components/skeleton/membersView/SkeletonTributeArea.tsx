import SkeletonBox from "@/shared/components/skeleton/SkeletonBox";
import clsx from "clsx";

export default function SkeletonTributeArea() {
  return (
    <article className={clsx("flex w-full flex-col pb-[60px] pt-[54px]", "mobile:pt-p10")}>
      <div
        className={clsx(
          "relative flex gap-g10 px-p8 pb-[66px]",
          "mobile:flex-col mobile:items-center mobile:gap-g7 mobile:px-0 mobile:pb-[160px]",
        )}
      >
        {/* 리본 이미지 자리 */}
        <SkeletonBox className="h-[280px] w-[250px] rounded-r6 mobile:h-[175px] mobile:w-[156px]" />

        <div className="flex w-full flex-col gap-g6">
          {/* 제목 */}
          <SkeletonBox className="h-[32px] w-[140px] mobile:mx-auto mobile:h-[24px] mobile:w-[120px]" />

          {/* 기증자 이름 + 기증일 */}
          <div className="flex gap-g10 mobile:flex-col mobile:gap-g4">
            <SkeletonBox className="h-[24px] w-[160px]" />
            <SkeletonBox className="h-[24px] w-[180px]" />
          </div>

          {/* 추모글 여러 줄 */}
          <div className="flex flex-col gap-g3">
            <SkeletonBox className="h-[20px] w-[90%]" />
            <SkeletonBox className="h-[20px] w-[75%]" />
            <SkeletonBox className="h-[20px] w-[60%]" />
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className={clsx("flex justify-end gap-g7", "mobile:gap-g4")}>
        <SkeletonBox className="h-[48px] w-[140px] rounded-[8px] mobile:h-[40px] mobile:w-[110px]" />
        <SkeletonBox className="h-[48px] w-[100px] rounded-[8px] mobile:h-[40px] mobile:w-[80px]" />
      </div>
    </article>
  );
}
