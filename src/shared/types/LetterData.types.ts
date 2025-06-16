type LetterCardSize = "lg" | "sm";

type InfoItem = {
  label: string;
  value: string;
};

export interface LetterData {
  labelType?: "letter" | "story";
  size?: LetterCardSize;
  infoItems: InfoItem[];
  letterSeq: number;
  title: string;
  date: string;
  views?: number;
}
