import SkeletonBox from "@/shared/components/skeleton/SkeletonBox";

export default function SkeletonCommentArea() {
  return (
    <section className="mx-auto h-full w-full max-w-[1200px]" aria-labelledby="comment-heading">
      {/* 제목 + 안내 */}
      <div className="mb-[24px] gap-g3">
        <SkeletonBox className="mb-2 h-[28px] w-[140px]" />
        <SkeletonBox className="h-[20px] w-[80%]" />
      </div>

      {/* 댓글 작성 폼 */}
      <div className="mb-g9 flex flex-col gap-g5 rounded-r6 bg-gray-5 px-p10 py-p8 mobile:p-p6">
        <div className="flex flex-row gap-g7 mobile:flex-col">
          <SkeletonBox className="h-[48px] w-full rounded-md" />
          <SkeletonBox className="h-[48px] w-full rounded-md" />
        </div>
        <SkeletonBox className="h-[185px] w-full rounded-md" />
        <div className="flex flex-col gap-g3">
          <SkeletonBox className="h-[20px] w-[160px]" />
          <div className="flex flex-row items-center gap-g3 mobile:flex-col">
            <SkeletonBox className="h-[40px] w-full rounded-md" />
            <SkeletonBox className="h-[40px] w-[100px] rounded-md mobile:self-end" />
          </div>
        </div>
      </div>

      {/* 댓글 목록 (3개 정도) */}
      <div className="mb-g11 flex flex-col gap-g5 px-p10 mobile:mb-[6rem] mobile:px-0">
        <SkeletonBox className="mb-2 h-[24px] w-[120px]" />
        <ul className="flex flex-col gap-g3">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i}>
              <div className="flex flex-col gap-g7 rounded-r6 border border-gray-30 px-6 py-p7 mobile:gap-g4 mobile:p-p6">
                <SkeletonBox className="h-[60px] w-[90%] rounded" />
                <SkeletonBox className="h-[18px] w-[30%]" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
