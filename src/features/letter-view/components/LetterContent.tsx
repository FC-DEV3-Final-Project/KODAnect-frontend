import Button from "@/shared/components/Button";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import ReactHtmlParser from "html-react-parser";

type InfoItem = {
  label: string;
  value: string | number;
};

type LetterContentProps = {
  title: string;
  content: string;
  infoItems: InfoItem[];
  imageUrl?: string;
  mobileWidth?: string;
  onGoList?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function LetterContent({
  title,
  content,
  infoItems,
  imageUrl,
  mobileWidth,
  onGoList,
  onEdit,
  onDelete,
}: LetterContentProps) {
  const isMobile = useIsMobile();

  return (
    <section
      aria-labelledby="letter-heading"
      className="mx-auto mb-[5.6rem] mt-g11 w-full max-w-[1120px] rounded-r3 py-p8 mobile:my-g9"
    >
      <h2 id="letter-heading" className="mb-g7 text-h-lg font-bold mobile:px-p4 mobile:text-h-md">
        {title}
      </h2>

      <dl className="grid gap-y-g5 border-y border-gray-20 py-p8 mobile:gap-y-g4 mobile:px-p4">
        {infoItems.map(({ label, value }) => (
          <div
            key={label}
            role="group"
            className="grid grid-cols-[auto_1fr] gap-g7 text-b-lg text-gray-95 mobile:text-b-sm"
            aria-label={`${label}: ${value}`}
          >
            <dt
              className="w-[18rem] font-bold"
              style={isMobile ? { width: mobileWidth } : undefined}
            >
              {label}
            </dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <article
        aria-label="추모 편지 본문"
        className="letter-content mb-g9 whitespace-pre-line border-b border-gray-20 px-p4 py-p10 text-b-md text-black mobile:mb-g6 mobile:px-p5 mobile:text-b-sm"
      >
        <div>{ReactHtmlParser(content)}</div>

        {imageUrl && (
          <div className="mt-g7 w-full overflow-hidden">
            <img src={imageUrl} alt="편지 이미지" className="h-auto max-w-full" loading="lazy" />
          </div>
        )}
      </article>

      <div className="flex items-center justify-between">
        <Button variant="tertiary" size={isMobile ? "small" : "large"} onClick={onGoList}>
          목록
        </Button>

        <div className="flex gap-g5 mobile:gap-g3">
          <Button
            variant="primary"
            size={isMobile ? "small" : "large"}
            onClick={onEdit}
            aria-label="편지 수정"
          >
            수정
          </Button>
          <Button
            variant="tertiary"
            size={isMobile ? "small" : "large"}
            onClick={onDelete}
            aria-label="편지 삭제"
          >
            삭제
          </Button>
        </div>
      </div>
    </section>
  );
}
