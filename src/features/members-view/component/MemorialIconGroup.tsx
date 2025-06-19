// shared/components/comment/MemorialIconGroup.tsx
import Flower from "@/assets/images/memorialIcon/flower.svg?react";
import Sad from "@/assets/images/memorialIcon/sad.svg?react";
import Proud from "@/assets/images/memorialIcon/proud.svg?react";
import Miss from "@/assets/images/memorialIcon/miss.svg?react";
import Love from "@/assets/images/memorialIcon/love.svg?react";
import See from "@/assets/images/memorialIcon/see.svg?react";
import Hard from "@/assets/images/memorialIcon/hard.svg?react";

const memorialIcons = [
  { label: "헌화", icon: <Flower className="h-icon3 w-icon3" />, count: 1 },
  { label: "사랑해요", icon: <Love className="h-icon3 w-icon3" />, count: 0 },
  { label: "보고싶어요", icon: <See className="h-icon3 w-icon3" />, count: 10 },
  { label: "그리워요", icon: <Miss className="h-icon3 w-icon3" />, count: 15 },
  { label: "자랑스러워요", icon: <Proud className="h-icon3 w-icon3" />, count: 7 },
  { label: "힘들어요", icon: <Hard className="h-icon3 w-icon3" />, count: 0 },
  { label: "슬퍼요", icon: <Sad className="h-icon3 w-icon3" />, count: 9 },
];

export default function MemorialIconGroup() {
  return (
    <div
      className="mt-g7 flex flex-wrap gap-g4 mobile:gap-g2"
      role="group"
      aria-labelledby="memorial-icon-group"
    >
      <h3 id="memorial-icon-group" className="sr-only">
        추모 표현 아이콘 선택
      </h3>
      {memorialIcons.map(({ label, icon, count }) => (
        <button
          key={label}
          type="button"
          className="mb-[8px] flex items-center gap-g4 rounded-full border border-gray-20 px-p7 py-p3 text-b-md text-gray-90 hover:bg-secondary-10 mobile:px-p4 mobile:py-p3 mobile:text-b-sm"
        >
          {icon}
          {label}
          {typeof count === "number" && count > 0 && (
            <span className="font-medium text-gray-60">{count}</span>
          )}
        </button>
      ))}
    </div>
  );
}
