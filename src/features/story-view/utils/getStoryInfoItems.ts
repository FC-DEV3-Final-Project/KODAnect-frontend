import type { StoryLetterDetail } from "@/shared/api/stories-view/story/types";
import { getAreaName } from "@/features/story-view/utils/getAreaName";

export function getStoryInfoItems(data: StoryLetterDetail) {
  return [
    { label: "코디네이터", value: data.storyWriter },
    { label: "등록일", value: data.uploadDate },
    { label: "권역", value: getAreaName(data.areaCode) },
    { label: "조회수", value: data.readCount },
  ];
}
