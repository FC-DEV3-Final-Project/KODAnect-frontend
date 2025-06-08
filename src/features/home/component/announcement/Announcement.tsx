import clsx from "clsx";

import { executiveSchedules } from "@/features/home/component/announcement/mock-data";

import announceImage from "@/assets/images/announcement-image.png";
import ArticleCard from "@/features/home/component/announcement/ArticleCard";
import SocialNetwork from "@/features/home/component/sns/SocialNetwork";

export default function Announcement() {
  return (
    <section
      className={clsx(
        "relative m-auto mb-g8 grid max-w-[1280px] grid-cols-3 gap-g7 px-p10 text-gray-90",
        "mobile:mb-g9 mobile:flex mobile:flex-col mobile:gap-g8 mobile:px-p6",
      )}
    >
      {/* 홍보영상 */}
      <ArticleCard
        title="홍보영상"
        moreLabel="홍보영상 더보기"
        children={
          <>
            <img
              src={announceImage}
              alt=""
              className="h-[189px] w-full overflow-hidden rounded-r4 bg-gray-10 mobile:h-[162px]"
            />
            <div>
              <p className="mb-g3 mobile:text-b-sm">
                가족을 위한 맥가이버였던 남편 그리고 아빠를 추억하며 ｢생명나눔 감동 이야기 신길승 님
                편｣
              </p>
              <time className="text-gray-40 mobile:text-b-xs">2025-05-21</time>
            </div>
          </>
        }
      />

      {/* 기관일정 */}
      <ArticleCard
        title="기관일정"
        moreLabel="기관일정 더보기"
        children={
          <ul className="flex flex-col gap-g5 mobile:gap-g4" aria-label="기관일정 목록">
            {executiveSchedules.map((item, index) => (
              <li key={index} className="flex flex-col gap-g1 py-p2">
                <span className="line-clamp-1 text-b-sm">{item.title}</span>
                <time className="text-b-xs text-gray-40">{item.date}</time>
              </li>
            ))}
          </ul>
        }
      />

      {/* SNS */}
      <SocialNetwork />
    </section>
  );
}
