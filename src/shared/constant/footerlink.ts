import Youtube from "@/assets/icon/youtube.svg";
import FaceBook from "@/assets/icon/facebook.svg";
import Blog from "@/assets/icon/naver-blog.svg";
import Instagram from "@/assets/icon/instagram.svg";

export const RELATED_SITES = [
  { title: "보건복지부", url: "https://www.mohw.go.kr/" },
  { title: "보건복지 상담센터", url: "https://www.129.go.kr/" },
  { title: "국립장기조직 혈액관리원", url: "https://www.konos.go.kr/" },
  { title: "대한이식학회", url: "https://mykst.org/" },
];

export const SOCIAL_LINKS = [
  {
    href: "https://www.youtube.com/channel/UCbhsMbBEOm1vIpOZXbaZR7g",
    icon: Youtube,
    label: "유튜브",
    alt: "한국장기조직기증원 유튜브 바로가기",
  },
  {
    href: "https://www.facebook.com/%ED%95%9C%EA%B5%AD%EC%9E%A5%EA%B8%B0%EC%A1%B0%EC%A7%81%EA%B8%B0%EC%A6%9D%EC%9B%90-102968767953316/?ref=pages_you_manage",
    icon: FaceBook,
    label: "페이스북",
    alt: "한국장기조직기증원 페이스북 바로가기",
  },
  {
    href: "https://blog.naver.com/koda1458",
    icon: Blog,
    label: "네이버 블로그",
    alt: "한국장기조직기증원 네이버 블로그 바로가기",
  },
  {
    href: "https://www.instagram.com/koda1458/?hl=ko",
    icon: Instagram,
    label: "인스타그램",
    alt: "한국장기조직기증원 인스타그램 바로가기",
  },
];

export const POLICY_LINKS = [
  { title: "개인정보처리방침", url: "https://koda1458.kr/footer/privacy.do" },
  { title: "위치안내", url: "#" },
  { title: "경영고시", url: "#" },
  { title: "기증희망등록", url: "/donation/donation-registration/empty" },
  { title: "저작권정책", url: "#" },
];
