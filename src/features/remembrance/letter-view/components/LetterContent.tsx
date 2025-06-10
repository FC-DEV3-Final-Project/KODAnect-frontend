import { mockLetter } from "@/features/remembrance/letter-view/components/mockLetter";
import { Button } from "@/shared/components/Button";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

function LetterContent() {
  const { title, donorName, receiver, date, views, content } = mockLetter;
  const isMobile = useIsMobile();

  return (
    <section
      aria-labelledby="letter-heading"
      className="mx-auto mb-[5.6rem] mt-g11 w-full max-w-[1120px] rounded-r3 py-p8 mobile:my-g9"
    >
      <h2 id="letter-heading" className="mb-g7 text-h-lg font-bold mobile:px-p4 mobile:text-h-md">
        {title}
      </h2>

      <dl className="mb-p10 grid gap-y-g5 border-y border-gray-20 py-p8 mobile:gap-y-g4 mobile:px-p4">
        {[
          { label: "기증자", value: donorName },
          { label: "추모자", value: receiver },
          { label: "등록일", value: date },
          { label: "조회", value: views },
        ].map(({ label, value }) => (
          <div
            key={label}
            role="group"
            className="grid grid-cols-[auto_1fr] gap-g7 text-b-lg text-gray-95 mobile:text-b-sm"
          >
            <dt className="w-[18rem] font-bold mobile:w-[6rem]">{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <article
        aria-label="추모 편지 본문"
        className="mb-g9 whitespace-pre-line border-b border-gray-20 px-p4 py-p10 text-b-md text-black mobile:mb-g6 mobile:px-p5 mobile:text-b-sm"
      >
        {content}
      </article>

      <div className="flex items-center justify-between">
        <Button variant="tertiary" size={isMobile ? "small" : "large"}>
          목록
        </Button>

        <div className="flex gap-g5 mobile:gap-g3">
          <Button variant="secondary" size={isMobile ? "small" : "large"}>
            수정
          </Button>
          <Button variant="primary" size={isMobile ? "small" : "large"}>
            삭제
          </Button>
        </div>
      </div>
    </section>
  );
}

export default LetterContent;
