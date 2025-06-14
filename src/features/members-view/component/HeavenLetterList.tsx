import { useState } from "react";
import { Button } from "@/shared/components/Button";
import PlusIcon from "@/assets/icon/btn-more.svg?react";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

interface Letter {
  id: number;
  title: string;
  date: string;
  views: number;
}

const dummyLetters: Letter[] = [
  { id: 1, title: "보고싶다…", date: "YYYY-MM-DD", views: 100 },
  { id: 2, title: "잘 지내지?", date: "YYYY-MM-DD", views: 555 },
  {
    id: 3,
    title: "길동아 네가 떠난지 벌써 1년이 지났어...",
    date: "YYYY-MM-DD",
    views: 222,
  },
];

export default function HeavenLetterList() {
  const [letters] = useState<Letter[]>(dummyLetters);
  const isMobile = useIsMobile();

  return (
    <section className="mx-auto mb-g11 w-full max-w-[1200px]" aria-labelledby="letter-heading">
      <div className="mb-g5 flex items-center justify-between">
        <h2 id="letter-heading" className="text-h-md font-bold text-gray-90">
          하늘나라 편지
        </h2>
        <Button
          variant="tertiary"
          size={isMobile ? "small" : "medium"}
          aria-label="하늘나라 편지쓰기"
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
              <th scope="col" className="w-[73.33%] px-p6 py-p5 mobile:w-[55%]">
                제목
              </th>
              <th scope="col" className="w-[17.5%] px-p6 py-p5 mobile:w-[26%] mobile:text-center">
                작성일
              </th>
              <th scope="col" className="w-[9.17%] px-p6 py-p5 mobile:w-[19%] mobile:text-center">
                {isMobile ? "조회" : "조회수"}
              </th>
            </tr>
          </thead>
          <tbody>
            {letters.length > 0 ? (
              letters.map((letter) => (
                <tr
                  key={letter.id}
                  className="h-[76px] cursor-pointer border-t border-gray-20 text-b-lg text-gray-70 hover:bg-gray-5 mobile:text-b-sm"
                  onClick={() => {
                    // navigate(`/letters-form`);
                  }}
                >
                  <td className="break-words px-p6 mobile:line-clamp-2 mobile:py-p5">
                    {letter.title}
                  </td>
                  <td className="px-p6 mobile:text-center">{letter.date}</td>
                  <td className="px-p6 mobile:text-center">{letter.views}</td>
                </tr>
              ))
            ) : (
              <tr className="h-[76px] border-t border-gray-20">
                <td colSpan={3} className="text-center text-b-lg text-gray-40" role="status">
                  아직 등록된 편지가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {letters.length > 2 && (
        <div className="flex justify-center">
          <Button variant="secondary" size="medium" className="w-full" aria-label="편지 더보기">
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
