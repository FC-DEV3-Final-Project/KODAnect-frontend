import type { Story } from "@/features/story-view/mock-data";

export function getStoryInfoItems(data: Story) {
  return [
    { label: "코디네이터", value: data.storyWriter },
    { label: "등록일", value: data.uploadDate },
    { label: "권역", value: data.areaCode },
    { label: "조회수", value: data.readCount },
  ];
}
