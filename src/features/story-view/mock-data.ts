export interface Story {
  storySeq: number;
  title: string;
  storyWriter: string;
  uploadDate: string;
  areaCode: string;
  storyContent: string;
  readCount: number;
}

export const stories: Story[] = [
  {
    storySeq: 172,
    title: "춥지도 뜨겁지도 않은 곳에서 잘 지내줘...",
    storyContent: `한 사람의 희생으로 또한 사람이 따뜻한 마음으로 같은 하늘 아래서 잘 살아가고 있다고 헤아리시어
    
    고인께서 헛되지 않은 결정에 위로를 받으셨음 하는 바램입니다.

    다시 한번 고인의 평안한 영면을 빌며, 가내로 밝은 빛이 넘치도록 비춰지길 진심으로 기원합니다.
    
    감사합니다.
    `,
    storyWriter: "조아름",
    uploadDate: "2025-05-07",
    areaCode: "1권역 (수도권, 강원, 제주)",
    readCount: 148,
  },
];
