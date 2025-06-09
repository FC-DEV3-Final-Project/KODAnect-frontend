import type { ReactNode } from "react";
import { MoreButton } from "@/features/home/component/common/MoreButton";

interface ArticleCardProps {
  title: string;
  moreLabel: string;
  children: ReactNode;
}

export default function ArticleCard({ title, moreLabel, children }: ArticleCardProps) {
  return (
    <article className="flex flex-col gap-g5 rounded-r5 border border-gray-30 p-p8 mobile:px-p7">
      <div className="flex items-center justify-between">
        <h2 className="text-h-sm font-bold">{title}</h2>
        <MoreButton className="text-b-sm" aria-label={moreLabel} />
      </div>
      {children}
    </article>
  );
}
