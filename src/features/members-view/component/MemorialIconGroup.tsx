import { useMemo } from "react";
import type { ReactElement } from "react";
import { throttle } from "lodash";

import Flower from "@/assets/images/memorialIcon/flower.svg?react";
import Sad from "@/assets/images/memorialIcon/sad.svg?react";
import Proud from "@/assets/images/memorialIcon/proud.svg?react";
import Miss from "@/assets/images/memorialIcon/miss.svg?react";
import Love from "@/assets/images/memorialIcon/love.svg?react";
import See from "@/assets/images/memorialIcon/see.svg?react";
import Hard from "@/assets/images/memorialIcon/hard.svg?react";

import type { EmotionType } from "@/shared/api/members-view/member/types";

interface MemorialIconGroupProps {
  onClickEmotion: (emotion: EmotionType) => void;
  counts: Record<EmotionType, number>;
}

const memorialIcons: { emotion: EmotionType; label: string; icon: ReactElement }[] = [
  { emotion: "flower", label: "헌화", icon: <Flower className="h-icon3 w-icon3" /> },
  { emotion: "love", label: "사랑해요", icon: <Love className="h-icon3 w-icon3" /> },
  { emotion: "see", label: "보고싶어요", icon: <See className="h-icon3 w-icon3" /> },
  { emotion: "miss", label: "그리워요", icon: <Miss className="h-icon3 w-icon3" /> },
  {
    emotion: "proud",
    label: "자랑스러워요",
    icon: <Proud className="h-icon3 w-icon3" />,
  },
  { emotion: "hard", label: "힘들어요", icon: <Hard className="h-icon3 w-icon3" /> },
  { emotion: "sad", label: "슬퍼요", icon: <Sad className="h-icon3 w-icon3" /> },
];

export default function MemorialIconGroup({ onClickEmotion, counts }: MemorialIconGroupProps) {
  const throttledClick = useMemo(() => {
    return throttle(onClickEmotion, 1500);
  }, [onClickEmotion]);

  return (
    <div
      className="mt-g7 flex flex-wrap gap-g4 mobile:gap-g2"
      role="group"
      aria-labelledby="memorial-icon-group"
    >
      <h3 id="memorial-icon-group" className="sr-only">
        추모 표현 아이콘 선택
      </h3>
      {memorialIcons.map(({ emotion, label, icon }) => (
        <button
          key={emotion}
          type="button"
          onClick={() => throttledClick(emotion)}
          className="mb-[8px] flex items-center gap-g4 rounded-full border border-gray-20 px-p7 py-p3 text-b-md text-gray-90 hover:bg-secondary-10 mobile:px-p4 mobile:py-p3 mobile:text-b-sm"
        >
          {icon}
          {label}
          {counts[emotion] > 0 && (
            <span className="font-medium text-gray-60">{counts[emotion]}</span>
          )}
        </button>
      ))}
    </div>
  );
}
