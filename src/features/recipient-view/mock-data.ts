export interface RecipientLetter {
  letterSeq: number;
  letterTitle: string;
  letterContents: string;
  letterWriter: string;
  recipientYear: string;
  readCount: number;
  writeTime: string;
  organCode: string;
}

export const recipientLetters: RecipientLetter[] = [
  {
    letterSeq: 172,
    letterTitle: "춥지도 뜨겁지도 않은 곳에서 잘 지내줘...",
    letterContents: `한 사람의 희생으로 또한 사람이 따뜻한 마음으로 같은 하늘 아래서 잘 살아가고 있다고 헤아리시어
    
    고인께서 헛되지 않은 결정에 위로를 받으셨음 하는 바램입니다.

    다시 한번 고인의 평안한 영면을 빌며, 가내로 밝은 빛이 넘치도록 비춰지길 진심으로 기원합니다.
    
    감사합니다.
    `,
    letterWriter: "조아름",
    organCode: "폐",
    readCount: 3,
    writeTime: "2025-05-15",
    recipientYear: "2025",
  },
];
