/** 편지 데이터 타입 */
export interface LetterData {
  letterSeq: number;
  letterTitle: string;
  donorName: string;
  letterWriter: string;
  anonymityFlag: "N" | "Y";
  readCount: number;
  writeTime: string;
}

/** 스토리 데이터 타입 */
export interface StoryData {
  storySeq: number;
  storyTitle: string;
  donorName: string;
  storyWriter: string;
  readCount: number;
  writeTime: string;
}

/** 검색 결과 응답 타입 */
export interface LetterListResponse<T> {
  content: T[];
  nextCursor: number | null;
  hasNext: boolean;
  totalCount: number;
}
