import type { HeavenLetterDetail } from "@/shared/api/letter-view/letter/types";

export function getHeavenInfoItems(data: HeavenLetterDetail) {
  const items = [
    { label: "기증자", value: data.donorName ?? "-" },
    { label: "추모자", value: data.letterWriter },
    { label: "등록일", value: data.writeTime },
    { label: "조회수", value: data.readCount.toLocaleString() },
  ];

  // null 또는 false인 항목 제거
  return items.filter(Boolean);
}
