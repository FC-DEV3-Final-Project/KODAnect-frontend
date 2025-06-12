import type { HeavenLetter } from "@/features/letter-view/mock-data";

export function getHeavenInfoItems(data: HeavenLetter) {
  return [
    { label: "기증자", value: data.letterWriter },
    { label: "추모자", value: data.donorName },
    { label: "등록일", value: data.writeTime },
    { label: "조회수", value: data.readCount },
  ];
}
