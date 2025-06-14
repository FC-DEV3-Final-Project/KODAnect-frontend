import type { RecipientLetter } from "@/features/recipient-view/mock-data";

export function getRecipientInfoItems(data: RecipientLetter) {
  return [
    { label: "수혜자", value: data.letterWriter },
    {
      label: "수혜장기 / 연도",
      value: `${data.organCode} / ${data.recipientYear}`,
    },
    { label: "작성일", value: data.writeTime },
    { label: "조회수", value: data.readCount },
  ];
}
