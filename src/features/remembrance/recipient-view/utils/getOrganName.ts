export const getOrganName = (organCode: string, organEtc: string | null): string => {
  if (organCode === "ORGAN000") {
    return organEtc || "기타";
  }

  const ORGAN_CODE_MAP: Record<string, string> = {
    ORGAN001: "신장",
    ORGAN002: "간장",
    ORGAN003: "췌장",
    ORGAN004: "심장",
    ORGAN005: "폐",
    ORGAN006: "췌도",
    ORGAN007: "소장",
    ORGAN008: "대장",
    ORGAN009: "위장",
    ORGAN010: "십이지장",
    ORGAN011: "비장",
    ORGAN012: "손, 팔",
    ORGAN013: "안구",
    ORGAN014: "인체조직",
  };

  return ORGAN_CODE_MAP[organCode] || "기타";
};
