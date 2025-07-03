import SkeletonBox from "@/shared/components/skeleton/SkeletonBox";

export default function SkeletonHeavenLetterList() {
  const ROW_COUNT = 3; // 기본 3줄 정도 스켈레톤 렌더링

  return (
    <section className="mx-auto mb-g11 w-full max-w-[1200px]" aria-labelledby="letter-heading">
      {/* 제목 + 버튼 */}
      <div className="mb-g5 flex items-center justify-between">
        <SkeletonBox className="h-[28px] w-[160px]" />
        <SkeletonBox className="h-[40px] w-[120px] rounded-md" />
      </div>

      {/* 테이블 */}
      <div className="mb-g5 flex justify-center">
        <table className="w-full max-w-[1200px] table-fixed border-b border-gray-20 text-left">
          <thead className="border-b border-secondary-10 bg-secondary-5 text-b-lg font-bold text-gray-95 mobile:text-b-sm">
            <tr>
              <th className="w-[73.33%] px-p6 py-p5 mobile:w-[55%] mobile:py-p3">제목</th>
              <th className="w-[17.5%] px-p6 py-p5 mobile:w-[26%] mobile:py-p3 mobile:text-center">
                작성일
              </th>
              <th className="w-[9.17%] px-p6 py-p5 mobile:w-[19%] mobile:py-p3 mobile:text-center">
                조회
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: ROW_COUNT }).map((_, idx) => (
              <tr key={idx} className="border-t border-gray-20">
                <td className="px-p6 py-p8">
                  <SkeletonBox className="h-[20px] w-[70%]" />
                </td>
                <td className="px-p6">
                  <SkeletonBox className="mx-auto h-[20px] w-[60px]" />
                </td>
                <td className="px-p6">
                  <SkeletonBox className="mx-auto h-[20px] w-[40px]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
