import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { HeavenLetter, HeavenLetterPagination } from "@/shared/api/members-view/letter/types";
import { getMoreHeavenLetters } from "@/shared/api/members-view/letter/letterApi";

import { Button } from "@/shared/components/Button";
import PlusIcon from "@/assets/icon/btn-more.svg?react";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

interface HeavenLetterListProps {
  donateSeq: number;
  initialData: HeavenLetterPagination;
  donorName: string;
}

export default function HeavenLetterList({
  donateSeq,
  initialData,
  donorName,
}: HeavenLetterListProps) {
  const [letters, setLetters] = useState<HeavenLetter[]>(initialData.content);
  const [cursor, setCursor] = useState(initialData.nextCursor);
  const [hasNext, setHasNext] = useState(initialData.hasNext);
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // 편지 더보기 핸들러
  const handleLoadMore = async () => {
    if (!hasNext || isLoading) return;
    setIsLoading(true);
    try {
      const res = await getMoreHeavenLetters({ donateSeq, cursor, size: 5 });
      const data = res.data.data;
      setLetters((prev) => [...prev, ...data.content]);
      setCursor(data.nextCursor);
      setHasNext(data.hasNext);
    } catch (e) {
      console.error("하늘나라 편지 더보기 실패:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWriteLetter = () => {
    navigate("/remembrance/letters-form", {
      state: {
        donateSeq,
        donorName,
      },
    });
  };

  return (
    <section className="mx-auto mb-g11 w-full max-w-[1200px]" aria-labelledby="letter-heading">
      <div className="mb-g5 flex items-center justify-between">
        <h2 id="letter-heading" className="text-h-md font-bold text-gray-90">
          하늘나라 편지
        </h2>
        <Button
          variant="tertiary"
          size={isMobile ? "small" : "medium"}
          onClick={handleWriteLetter}
          aria-label={`${donorName}에게 하늘나라 편지 쓰기`}
        >
          하늘나라 편지쓰기
        </Button>
      </div>

      <div className="mb-g5 flex justify-center">
        <table
          className="w-full max-w-[1200px] table-fixed border-b border-gray-20 text-left"
          aria-describedby="letter-heading"
        >
          <thead className="border-b border-secondary-10 bg-secondary-5 text-b-lg font-bold text-gray-95 mobile:text-b-sm">
            <tr>
              <th scope="col" className="w-[73.33%] px-p6 py-p5 mobile:w-[55%] mobile:py-p3">
                제목
              </th>
              <th
                scope="col"
                className="w-[17.5%] px-p6 py-p5 mobile:w-[26%] mobile:py-p3 mobile:text-center"
              >
                작성일
              </th>
              <th
                scope="col"
                className="w-[9.17%] px-p6 py-p5 mobile:w-[19%] mobile:py-p3 mobile:text-center"
              >
                {isMobile ? "조회" : "조회수"}
              </th>
            </tr>
          </thead>
          <tbody>
            {letters.length > 0 ? (
              letters.map((letter) => (
                <tr
                  key={letter.letterSeq}
                  className="cursor-pointer border-t border-gray-20 text-b-lg text-gray-70 hover:bg-gray-5 mobile:text-b-sm"
                  onClick={() => navigate(`/remembrance/letters-view/${letter.letterSeq}`)}
                >
                  <td className="px-p6 py-p8 mobile:flex mobile:min-h-[64px] mobile:items-center mobile:py-0">
                    <div className="line-clamp-1 mobile:line-clamp-2">{letter.letterTitle}</div>
                  </td>
                  <td className="px-p6 mobile:text-center">{letter.writeTime}</td>
                  <td className="px-p6 mobile:text-center">{letter.readCount}</td>
                </tr>
              ))
            ) : (
              <tr className="border-t border-gray-20">
                <td
                  colSpan={3}
                  className="py-p5 text-center text-b-lg text-gray-40 mobile:text-b-sm"
                  role="status"
                >
                  아직 등록된 편지가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {hasNext && (
        <div className="flex justify-center">
          <Button
            variant="secondary"
            size="medium"
            className="w-full"
            aria-label="편지 더보기"
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            <span className="text-b-md mobile:text-b-sm">더보기</span>
            <PlusIcon
              className="h-icon3 w-icon3 text-secondary-50 mobile:h-icon2 mobile:w-icon2"
              aria-hidden="true"
              focusable="false"
            />
          </Button>
        </div>
      )}
    </section>
  );
}
