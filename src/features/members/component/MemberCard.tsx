import clsx from "clsx";
import { Button } from "@/shared/components/Button";
import Message from "@/assets/icon/inquiry.svg?react";
import Letter from "@/assets/icon/mail.svg?react";

interface DonorCardProps {
  donorName?: string;
  donationDate?: string;
  messageCount?: number;
  letterCount?: number;
}

export default function DonorCard({
  donorName = "홍길동 (F,30)",
  donationDate = "2025-06-09",
  messageCount = 5,
  letterCount = 10,
}: DonorCardProps) {
  return (
    <li
      className={clsx(
        "flex w-[284px] flex-col gap-g6 rounded-r6 border-2 border-transparent bg-white p-p8 text-gray-90",
        "shadow-[0_0_2px_0_theme('colors.primary.10'),0_8px_16px_0_theme('colors.primary.10')]",
      )}
    >
      <div className="flex items-center gap-g4">
        {/* 추모리본 이미지 */}
        <div className="h-[66px] w-[66px] rounded-r4 bg-gray-10"></div>
        {/* 기증자 */}
        <div className="flex flex-col gap-g2">
          <div className="flex h-[52px] items-center">
            <span className="mr-g3 text-b-xs text-gray-40">기증자</span>
            <span className="text-h-xs font-bold">{donorName}</span>
          </div>
          {/* 기증일 */}
          <div>
            <span className="mr-g3 text-b-xs text-gray-40">기증일</span>
            <span className="text-b-sm">{donationDate}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-g2">
        {/* 추모 메시지 */}
        <div className="flex gap-g3">
          <Message className="h-icon3 w-icon3 text-gray-40" />
          <span className="text-b-xs text-gray-70">추모 메시지</span>
          <span className="text-b-xs text-gray-40">{messageCount}</span>
        </div>
        {/* 하늘나라 편지 */}
        <div className="flex gap-g3">
          <Letter className="h-icon3 w-icon3 text-gray-40" />
          <span className="text-b-xs text-gray-70">하늘나라 편지</span>
          <span className="text-b-xs text-gray-40">{letterCount}</span>
        </div>
      </div>
      <div className="flex gap-g4">
        {/* 추모관 버튼 */}
        <Button variant="secondary" size="small" children="추모관" className="flex-1" />
        {/* 하늘나라 편지쓰기 버튼 */}
        <Button variant="tertiary" size="small" children="하늘나라 편지쓰기" />
      </div>
    </li>
  );
}
