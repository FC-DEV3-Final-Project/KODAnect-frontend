import heavenImg from "@/assets/images/heaven.png";
import receiverImg from "@/assets/images/receiver.png";
import donorImg from "@/assets/images/donor.png";

type TopVisiaulProps = {
  type: "heaven" | "receiver" | "donor";
};

const CONTENT = {
  heaven: {
    imgUrl: heavenImg,
    title: "하늘나라 편지",
    description: "생명 나눔을 실천할 분들의 고귀한 뜻, 잊지 않겠습니다.",
  },
  receiver: {
    imgUrl: receiverImg,
    title: "수혜자 편지",
    description: "새로운 삶을 선물 받은 감사의 마음을 전합니다.",
  },
  donor: {
    imgUrl: donorImg,
    title: "기증자 스토리",
    description: "고인의 숭고한 나눔, 아름다운 기억으로 남깁니다.",
  },
} as const;

function TopVisiaul({ type }: TopVisiaulProps) {
  const { imgUrl, title, description } = CONTENT[type];

  return (
    <header className="relative mx-auto h-[27.6rem] w-[1200px] overflow-hidden">
      {/* 배경 이미지*/}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imgUrl})` }}
        aria-hidden="true"
      >
        {/* 좌우 그라데이션 */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-[150px] bg-[linear-gradient(90deg,_#ffffff_0%,_rgba(255,255,255,0)_100%)]" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-[150px] bg-[linear-gradient(270deg,_#ffffff_0%,_rgba(255,255,255,0)_100%)]" />

        {/* 텍스트 콘텐츠 */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="text-d-md font-bold leading-tight tracking-1">{title}</h1>
          <p className="mt-2 text-b-lg">{description}</p>
        </div>
      </div>
    </header>
  );
}

export default TopVisiaul;
