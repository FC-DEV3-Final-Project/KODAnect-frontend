import type { RecipientLetterDetail } from "@/shared/api/recipient-view/letter/types";
import { getOrganName } from "./getOrganName";

export function getRecipientInfoItems(data: RecipientLetterDetail) {
  return [
    { label: "수혜자", value: data.letterWriter },
    {
      label: "수혜장기 / 연도",
      value: `${getOrganName(data.organCode, data.organEtc)} / ${data.recipientYear}`,
    },
    { label: "작성일", value: data.writeTime },
    { label: "조회수", value: data.readCount.toLocaleString() },
  ];
}
