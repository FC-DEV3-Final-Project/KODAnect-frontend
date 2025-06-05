import clsx from "clsx";
import { Link } from "react-router-dom";

import Calendar from "@/assets/icon/calendar.svg";
import NewFolder from "@/assets/icon/new-folder.svg";
import Map from "@/assets/icon/map.svg";
import Identity from "@/assets/icon/identity.svg";
import Analytics from "@/assets/icon/analytics.svg";
import LocationAway from "@/assets/icon/location-away.svg";

const items = [
  { name: "기증자 예우", path: "/organ/honor", icon: Calendar },
  { name: "기증희망 등록", path: "/donation-registration", icon: NewFolder },
  { name: "KODA LAB", path: "/organ/01", icon: Map },
  { name: "장기·조직기증", path: "/organ/info/organ-donation", icon: Identity },
  { name: "홍보자료", path: "/announcement", icon: Analytics },
  { name: "기관안내", path: "/about/koda", icon: LocationAway },
];

export default function PopularMenu() {
  return (
    <section
      className="m-auto mb-g11 max-w-[1280px] px-p10 text-gray-90 mobile:mb-g8 mobile:px-p6"
      aria-labelledby="popular-menu-heading"
    >
      <h2 id="popular-menu-heading" className="text-h-md font-bold mobile:text-h-sm">
        자주찾는 메뉴
      </h2>
      <nav
        className={clsx(
          "mt-g5 grid gap-g7",
          "grid-cols-[repeat(auto-fit,minmax(100px,1fr))]",
          "mobile:gap-g4",
        )}
        aria-label="자주찾는 메뉴 목록"
      >
        {items.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={clsx(
              "flex flex-col items-center gap-g2",
              "rounded-r6 border border-gray-30 px-p5 py-p8",
              "mobile:text-center",
            )}
          >
            <img src={item.icon} alt="" className="w-icon6 mobile:w-icon5" />
            <span className="break-keep text-center font-bold mobile:text-b-xs">{item.name}</span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
