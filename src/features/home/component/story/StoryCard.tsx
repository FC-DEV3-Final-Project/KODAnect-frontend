import Visible from "@/assets/icon/visibility.svg?react";

interface StoryCardProps {
  imageUrl: string;
  title: string;
  date: string;
  view: number;
}

export function StoryCard({ imageUrl, title, date, view }: StoryCardProps) {
  return (
    <div className="overflow-hidden rounded-r6 shadow-s2">
      <img src={imageUrl} aria-label="대표 이미지" className="h-[274px] w-full" />
      <div className="flex flex-col gap-g2 p-p6">
        <h3 className="line-clamp-2 whitespace-normal break-keep text-b-sm font-bold">{title}</h3>
        <div className="flex items-center justify-between text-b-xs text-gray-40">
          <time>{date}</time>
          <span className="flex items-center gap-g2">
            <Visible
              className="h-icon3 w-icon3 text-gray-40"
              aria-label="조회수 아이콘"
              role="img"
              focusable="false"
            />
            <span aria-label={`조회수 ${view}회`}>{view}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
