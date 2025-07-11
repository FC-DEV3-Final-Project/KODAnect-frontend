import BtnShortcut from "@/assets/icon/btn-shortcut.svg";
import { Link } from "react-router-dom";

interface QuickLinkCardProps {
  icon: string;
  title: string;
  description: string;
  path: string;
  isNewTap: boolean;
}

export default function QuickLinkCard({
  icon,
  title,
  description,
  path,
  isNewTap,
}: QuickLinkCardProps) {
  return (
    <article
      className="flex flex-col items-center justify-between gap-g4 rounded-r6 bg-primary-5 p-p8"
      aria-labelledby={`${title}-heading`}
    >
      <div className="flex w-full flex-col gap-g3">
        <div className="flex items-center gap-g3">
          <img src={icon} alt="" className="h-[48px] w-auto object-fill" />
          <h2 id={`${title}-heading`} className="text-h-sm font-bold mobile:text-h-xs">
            {title}
          </h2>
        </div>
        <p className="text-b-sm text-gray-70 mobile:text-b-xs">{description}</p>
      </div>
      <div className="flex w-full justify-end">
        {isNewTap ? (
          <a
            href={path}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} 바로가기`}
            className="flex items-center gap-g1 text-b-sm text-gray-40"
          >
            바로가기
            <img src={BtnShortcut} alt="화살표 아이콘" className="h-icon2 w-icon2" />
          </a>
        ) : (
          <Link
            to={path}
            aria-label={`${title} 바로가기`}
            className="flex items-center gap-g1 text-b-sm text-gray-40"
          >
            바로가기
            <img src={BtnShortcut} alt="화살표 아이콘" className="h-icon2 w-icon2" />
          </Link>
        )}
      </div>
    </article>
  );
}
