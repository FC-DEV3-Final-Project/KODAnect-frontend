import memorialImg from "@/assets/images/memorial.gif";
import heavenImg from "@/assets/images/heaven.png";
import receiverImg from "@/assets/images/receiver.png";
import donorImg from "@/assets/images/donor.png";

type ContentType = {
  imgUrl: string;
  title: string;
  description: string | string[];
  isRepeatImage?: boolean;
};

type TopVisualProps = {
  type: "memorial" | "heaven" | "receiver" | "donor";
};

const CONTENT: Record<TopVisualProps["type"], ContentType> = {
  memorial: {
    imgUrl: memorialImg,
    title: "기증자 추모관",
    description: ["생명 나눔을 실천한 분들의 고귀한 뜻,", "잊지 않겠습니다."],
    isRepeatImage: true,
  },
  heaven: {
    imgUrl: heavenImg,
    title: "하늘나라 편지",
    description: ["하늘에 있는 그리운 당신에게 편지를 보냅니다.", "당신이 보고 싶습니다."],
  },
  receiver: {
    imgUrl: receiverImg,
    title: "수혜자 편지",
    description: "감사합니다.",
  },
  donor: {
    imgUrl: donorImg,
    title: "기증 후 스토리",
    description: ["영원히 기억될 기증자의 숭고한 나눔의 순간과", "아름다운 이야기"],
  },
} as const;

function TopVisual({ type }: TopVisualProps) {
  const content = CONTENT[type];

  return (
    <header className="relative mx-auto h-[27.6rem] max-w-[1920px] overflow-hidden mobile:h-[32rem]">
      {/* 배경 이미지*/}

      {content.isRepeatImage ? (
        <div className="absolute inset-0 flex" aria-hidden="true">
          <img src={content.imgUrl} alt="" className="h-full w-[99rem] object-cover" />
          <img src={content.imgUrl} alt="" className="h-full w-[93.1rem] object-cover" />
          {/* 검정 오버레이 */}
          <div className="pointer-events-none absolute inset-0 bg-black opacity-60" />
        </div>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${content.imgUrl})` }}
          aria-hidden="true"
        />
      )}

      {/* 텍스트 콘텐츠 */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white mobile:items-start mobile:px-p9 mobile:text-left">
        <h1 className="text-d-md font-bold leading-tight tracking-1 mobile:text-d-md">
          {content.title}
        </h1>
        <p className="mt-g3 text-b-lg leading-snug mobile:max-w-[27.5rem] mobile:text-b-sm">
          {Array.isArray(content.description)
            ? content.description.map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))
            : content.description}
        </p>
      </div>
    </header>
  );
}

export default TopVisual;
