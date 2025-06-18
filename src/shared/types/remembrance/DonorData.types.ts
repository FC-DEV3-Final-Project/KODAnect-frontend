/** 기증자 데이터 타입 */
export interface DonorData {
  donateSeq: number;
  donorName: string;
  genderFlag: "M" | "F";
  donateAge: number;
  donateDate: string;
  commentCount: number;
  letterCount: number;
}

/** 검색 결과 응답 타입 */
export interface DonorListResponse {
  content: DonorData[];
  hasNext: boolean;
  nextCursor: { cursor: number; date: string } | null;
  totalCount: number;
}
