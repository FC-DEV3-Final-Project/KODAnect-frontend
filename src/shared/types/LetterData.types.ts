export interface LetterData {
  letterSeq: number;
  labelType?: "letter" | "story";
  size?: "lg" | "sm";
  letterNumber: number;
  infoItems: Array<{ label: string; value: string }>;
  title: string;
  date: string;
  views?: number;
  toBase?: string;
}

export interface FetchDataResult {
  mappedData: LetterData[];
  hasNext: boolean;
  nextCursor: number;
  totalCount: number;
}
