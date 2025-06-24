import Instagram from "@/assets/icon/instagram.svg?react";

interface SnsCardProps {
  imageUrl: string;
  title: string;
}

export default function SnsCard({ imageUrl, title }: SnsCardProps) {
  return (
    <div className="w-[240px] overflow-hidden rounded-r6 shadow-s2">
      <img src={imageUrl} className="h-[240px] w-full" />
      <div className="flex flex-col gap-g2 p-p6">
        <h3 className="line-clamp-2 whitespace-normal break-keep text-b-sm font-bold">{title}</h3>
        <div className="flex items-center gap-g2">
          <Instagram
            className="h-icon4 w-icon4 text-gray-40"
            role="img"
            aria-label="인스타그램 아이콘"
            focusable="false"
          />
          <span className="text-b-xs text-gray-40" aria-label="플랫폼: 인스타그램">
            Instagram
          </span>
        </div>
      </div>
    </div>
  );
}
