import type { SiteMenu } from "@/shared/types/SiteMenu.types";

export const SITE_MENU: SiteMenu[] = [
  {
    label: "장기·조직기증",
    children: [
      {
        label: "장기·조직기증 안내",
        children: [
          { label: "장기·조직기증", path: "/organ/info/organ-donation" },
          { label: "KODA 코디네이터", path: "/organ/info/01" },
          { label: "뇌사판정", path: "/organ/info/brain-death" },
          { label: "장기·조직기증 적합성 평가", path: "/organ/info/02" },
          { label: "통보센터", path: "/organ/info/03" },
          { label: "장기·조직기증 분배체계", path: "/organ/info/04" },
          { label: "기증 팩트 체크", path: "/organ/info/05" },
          { label: "기증 용어 설명", path: "/organ/info/06" },
        ],
      },
      {
        label: "협약기관",
        children: [
          { label: "뇌사자 관리업무 협약기관", path: "/organ/agreement/01" },
          { label: "기증 활성화 프로그램 협약기관", path: "/organ/agreement/02" },
        ],
      },
      {
        label: "기증자 예우",
        children: [
          { label: "기증자 예우 및 유가족 지원", path: "/organ/honor/01" },
          { label: "기증 후 행정 절차", path: "/organ/honor/02" },
          { label: "기증자 추모/유가족 행사", path: "/organ/honor/03" },
        ],
      },
      {
        label: "기증활성화 프로그램",
        children: [
          { label: "기증 활성화 프로그램 소개", path: "/organ/program/01" },
          { label: "MRR/HAS", path: "/organ/program/02" },
        ],
      },
      {
        label: "검사실(KODA LAB)",
        path: "/organ/01",
      },
    ],
  },
  {
    label: "기증희망등록",
    children: [
      { label: "등록 방법 안내", path: "/donation-registration/01" },
      { label: "온라인 신규 등록", path: "/donation-registration/02" },
      { label: "등록 여부 확인", path: "/donation-registration/03" },
    ],
  },
  {
    label: "추모공간",
    children: [
      { label: "기증자 추모관", path: "/remembrance/members" },
      { label: "하늘나라 편지", path: "/remembrance/letters" },
      { label: "수혜자 편지", path: "/remembrance/recipients" },
      { label: "기증자 스토리", path: "/remembrance/stories" },
    ],
  },
  {
    label: "희망우체통",
    path: "https://koda1458.kr/post/mem/memLogin.c",
  },
  {
    label: "홍보·알림",
    children: [
      { label: "동영상", path: "/announcement/01" },
      { label: "연간보고서", path: "/announcement/02" },
      { label: "간행물", path: "/announcement/03" },
      { label: "생명나눔 도서관", path: "/announcement/04" },
      { label: "생명나눔 이야기", path: "/announcement/05" },
      { label: "보도자료", path: "/announcement/06" },
      { label: "공지사항", path: "/announcement/notices" },
      { label: "기관일정", path: "/announcement/07" },
      { label: "기관행사", path: "/announcement/08" },
    ],
  },
  {
    label: "참여·정보",
    children: [
      {
        label: "기증통계",
        children: [
          { label: "기증자통계", path: "/participation/donation-stats/donors" },
          { label: "5년간 기증통계 비교", path: "/participation/donation-stats/comparison-5years" },
          { label: "연도별 기증 추이", path: "/participation/donation-stats/yearly-trend" },
        ],
      },
      {
        label: "정보공개",
        children: [
          { label: "정보공개 제도안내", path: "/participation/disclosure/01" },
          { label: "사전정보공개", path: "/participation/disclosure/02" },
          { label: "사업실명제", path: "/participation/disclosure/03" },
          { label: "경영공시", path: "/participation/disclosure/04" },
          { label: "의료기관 뇌사추정자 신고현황", path: "/participation/disclosure/05" },
          { label: "적극행정", path: "/participation/disclosure/06" },
        ],
      },
      {
        label: "공공데이터개방",
        path: "https://www.data.go.kr/index.do",
      },
      {
        label: "저작권정책",
        path: "/participation/01",
      },
      {
        label: "민원안내",
        path: "/participation/02",
      },
    ],
  },
  {
    label: "기관소개",
    children: [
      {
        label: "인사말",
        path: "/about/01",
      },
      {
        label: "기관소개",
        children: [
          { label: "비전 및 목표", path: "/about/koda/01" },
          { label: "로고송", path: "/about/koda/02" },
          { label: "ESG 경영", path: "/about/koda/03" },
          { label: "CI 소개·연혁", path: "/about/koda/04" },
          { label: "캐릭터", path: "/about/koda/05" },
        ],
      },
      {
        label: "인권/윤리경영",
        children: [
          { label: "인권경영", path: "/about/compliance/01" },
          { label: "윤리경영", path: "/about/compliance/02" },
          { label: "인권·윤리경영 게시판", path: "/about/compliance/03" },
          { label: "클린신고(부패·공익신고)", path: "/about/compliance/04" },
        ],
      },
      {
        label: "조직안내",
        path: "/about/02",
      },
      {
        label: "오시는길",
        path: "/about/03",
      },
    ],
  },
];
