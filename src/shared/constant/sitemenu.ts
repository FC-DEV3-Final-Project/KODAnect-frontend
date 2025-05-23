interface SiteMenu {
  label: string;
  path?: string;
  children?: SiteMenu[];
}

export const SITE_MENU: SiteMenu[] = [
  {
    label: "장기·조직기증",
    children: [
      {
        label: "장기·조직기증 안내",
        children: [
          { label: "장기·조직기증", path: "/" },
          { label: "KODA 코디네이터", path: "/" },
          { label: "뇌사판정", path: "/" },
          { label: "장기·조직기증 적합성 평가", path: "/" },
          { label: "통보센터", path: "/" },
          { label: "장기·조직기증 분배체계", path: "/" },
          { label: "기증 팩트 체크", path: "/" },
          { label: "기증 용어 설명", path: "/" },
        ],
      },
      {
        label: "협약기관",
        children: [
          { label: "뇌사자 관리업무 협약기관", path: "/" },
          { label: "기증 활성화 프로그램 협약기관", path: "/" },
        ],
      },
      {
        label: "기증자 예우",
        children: [
          { label: "기증자 예우 및 유가족 지원", path: "/" },
          { label: "기증 후 행정 절차", path: "/" },
          { label: "기증자 추모/유가족 행사", path: "/" },
        ],
      },
      {
        label: "기증활성화 프로그램",
        children: [
          { label: "기증 활성화 프로그램 소개", path: "/" },
          { label: "MRR/HAS", path: "/" },
        ],
      },
      {
        label: "검사실(KODA LAB)",
        path: "/",
      },
    ],
  },
  {
    label: "기증희망등록",
    children: [
      { label: "기증희망등록 방법 안내", path: "/" },
      { label: "온라인 신규 등록", path: "/" },
      { label: "기증희망등록 여부 확인", path: "/" },
    ],
  },
  {
    label: "추모공간",
    children: [
      { label: "기증자 추모관", path: "/" },
      { label: "하늘나라 편지", path: "/" },
      { label: "수혜자 편지", path: "/" },
      { label: "기증자 스토리", path: "/" },
    ],
  },
  {
    label: "희망우체통",
    path: "/",
  },
  {
    label: "홍보·알림",
    children: [
      { label: "동영상", path: "/" },
      { label: "연간보고서", path: "/" },
      { label: "간행물", path: "/" },
      { label: "생명나눔 도서관", path: "/" },
      { label: "생명나눔 이야기", path: "/" },
      { label: "보도자료", path: "/" },
      { label: "공지사항", path: "/" },
      { label: "기관일정", path: "/" },
      { label: "기관행사", path: "/" },
    ],
  },
  {
    label: "참여·정보",
    children: [
      {
        label: "기증통계",
        children: [
          { label: "기증자통계", path: "/" },
          { label: "5년간 기증통계 비교", path: "/" },
          { label: "연도별 기증 추이", path: "/" },
        ],
      },
      {
        label: "정보공개",
        children: [
          { label: "정보공개 제도안내", path: "/" },
          { label: "사전정보공개", path: "/" },
          { label: "사업실명제", path: "/" },
          { label: "경영공시", path: "/" },
          { label: "의료기관 뇌사추정자 신고현황", path: "/" },
          { label: "적극행정", path: "/" },
        ],
      },
      {
        label: "공공데이터개방",
        path: "/",
      },
      {
        label: "저작권정책",
        path: "/",
      },
      {
        label: "민원안내",
        path: "/",
      },
    ],
  },
  {
    label: "기관소개",
    children: [
      {
        label: "인사말",
        path: "/",
      },
      {
        label: "기관소개",
        children: [
          { label: "비전 및 목표", path: "/" },
          { label: "로고송", path: "/" },
          { label: "ESG 경영", path: "/" },
          { label: "CI 소개·연혁", path: "/" },
          { label: "캐릭터", path: "/" },
        ],
      },
      {
        label: "인권/윤리경영",
        children: [
          { label: "인권경영", path: "/" },
          { label: "윤리경영", path: "/" },
          { label: "인권·윤리경영 게시판", path: "/" },
          { label: "클린신고(부패·공익신고)", path: "/" },
        ],
      },
      {
        label: "조직안내",
        path: "/",
      },
      {
        label: "오시는길",
        path: "/",
      },
    ],
  },
];
