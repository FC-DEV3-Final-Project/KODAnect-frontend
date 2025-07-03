import SkeletonBox from "@/shared/components/skeleton/SkeletonBox";

export default function SkeletonLetterContent() {
  return (
    <section className="mx-auto mb-[5.6rem] mt-g11 w-full max-w-[1120px] rounded-r3 py-p8">
      {/* 제목 */}
      <SkeletonBox className="mb-g7 h-[36px] w-[60%] mobile:mx-p4 mobile:h-[28px] mobile:w-[80%]" />

      {/* InfoItems */}
      <div className="flex flex-col gap-g5 border-y border-gray-20 py-p8 mobile:gap-g4 mobile:px-p4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="grid grid-cols-[auto_1fr] gap-g7 text-b-lg">
            <SkeletonBox className="h-[30px] w-[120px]" />
            <SkeletonBox className="h-[30px] w-[160px]" />
          </div>
        ))}
      </div>

      {/* 본문 */}
      <article className="mb-g9 border-b border-gray-20 px-p4 py-p10 mobile:mb-g6 mobile:px-p5">
        <div className="flex flex-col gap-g3">
          <SkeletonBox className="h-[20px] w-[70%]" />
          <SkeletonBox className="h-[20px] w-[50%]" />
          <SkeletonBox className="h-[20px] w-[40%]" />
          <SkeletonBox className="h-[20px] w-[60%]" />
        </div>
      </article>

      {/* 하단 버튼 */}
      <div className="flex items-center justify-between">
        <SkeletonBox className="h-[48px] w-[100px] rounded-md" />
        <div className="flex gap-g5">
          <SkeletonBox className="h-[48px] w-[80px] rounded-md" />
          <SkeletonBox className="h-[48px] w-[80px] rounded-md" />
        </div>
      </div>
    </section>
  );
}
