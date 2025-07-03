import type { EmotionType } from "@/shared/api/members-view/member/types";
import type { MemberDetail } from "@/shared/api/members-view/member/types";

export const EMOTION_COUNT_KEYS: Record<EmotionType, keyof MemberDetail> = {
  flower: "flowerCount",
  love: "loveCount",
  see: "seeCount",
  miss: "missCount",
  proud: "proudCount",
  hard: "hardCount",
  sad: "sadCount",
};
