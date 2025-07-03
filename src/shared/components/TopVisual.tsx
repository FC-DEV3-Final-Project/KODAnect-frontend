import memorialImg from "@/assets/images/memorial.gif";
import heavenImg from "@/assets/images/heaven.webp";
import receiverImg from "@/assets/images/receiver.webp";
import donorImg from "@/assets/images/donor.webp";
import memorialMobile from "@/assets/images/memorial_m.gif";
import heavenMobile from "@/assets/images/heaven_m.webp";
import receiverMobile from "@/assets/images/receiver_m.webp";
import donorMobile from "@/assets/images/donor_m.webp";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

interface ContentType {
  imgUrl: string;
  title: string;
  description: string | string[];
  mobileImgUrl?: string;
}

interface TopVisualProps {
  type: "members" | "letters" | "recipients" | "stories";
}

const CONTENT: Record<TopVisualProps["type"], ContentType> = {
  members: {
    imgUrl: memorialImg,
    mobileImgUrl: memorialMobile,
    title: "기증자 추모관",
    description: ["생명 나눔을 실천한 분들의 고귀한 뜻,", "잊지 않겠습니다."],
  },
  letters: {
    imgUrl: heavenImg,
    mobileImgUrl: heavenMobile,
    title: "하늘나라 편지",
    description: ["하늘에 있는 그리운 당신에게 편지를 보냅니다.", "당신이 보고 싶습니다."],
  },
  recipients: {
    imgUrl: receiverImg,
    mobileImgUrl: receiverMobile,
    title: "수혜자 편지",
    description: "감사합니다.",
  },
  stories: {
    imgUrl: donorImg,
    mobileImgUrl: donorMobile,
    title: "기증자 스토리",
    description: ["영원히 기억될 기증자의 숭고한 나눔의 순간과", "아름다운 이야기"],
  },
} as const;

function TopVisual({ type }: TopVisualProps) {
  const content = CONTENT[type];
  const isMobile = useIsMobile();
  const imgUrl = isMobile && content.mobileImgUrl ? content.mobileImgUrl : content.imgUrl;

  return (
    <section
      className="relative mx-auto h-[27.6rem] max-w-[1920px] overflow-hidden mobile:h-[32rem]"
      role="region"
      aria-label="상단 비주얼 영역"
    >
      {/* 배경 이미지 */}
      <img
        src={imgUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />

      {/* members 전용 오버레이 */}
      {type === "members" && (
        <div
          className="pointer-events-none absolute inset-0 bg-black opacity-60"
          aria-hidden="true"
        />
      )}

      {/* 텍스트 콘텐츠 */}
      <div className="relative flex h-full w-full flex-col items-center justify-center text-center text-white mobile:items-start mobile:px-p9 mobile:text-left">
        <h1 className="text-d-md font-bold leading-tight tracking-1 mobile:text-d-md">
          {content.title}
        </h1>
        <p
          className="mt-g3 text-b-lg leading-snug mobile:max-w-[27.5rem] mobile:text-b-sm"
          id="description"
        >
          {Array.isArray(content.description)
            ? isMobile
              ? content.description.map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))
              : content.description.join(" ")
            : content.description}
        </p>
      </div>
    </section>
  );
}

export default TopVisual;
