export interface LetterCardData {
  letterNumber: number;
  letterSeq: number;
  labelType?: "letter" | "story";
  size?: "lg" | "sm";
  infoItems: { label: string; value: string }[];
  title: string;
  date: string;
  views?: number;
  toBase?: string;
}
