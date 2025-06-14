/*
 * 사용 방법
 *
 * 아래와 같이 donor 데이터를 추출해 전달합니다.
 *
 * const location = useLocation();
 * const donor = location.state?.donor;
 *
 * <TributeArea donor={donor} />
 */

import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

import { formatDateToDotNotation, formatDateToKorean } from "@/shared/utils/formatDate";

import clsx from "clsx";
import { Button } from "@/shared/components/Button";
import blackRibbon from "@/assets/images/black-ribbon.png";
import tributeFlower from "@/assets/images/tribute-flower.png";

interface Donor {
  donorName: string;
  genderFlag: string;
  donorAge: number;
  donationDate: string;
  replyCount: number;
  letterCount: number;
}

interface TributeAreaProps {
  donor: Donor | null;
}

export default function TributeArea({ donor }: TributeAreaProps) {
  if (!donor) {
    return <section>기증자 정보가 없습니다.</section>;
  }
  const isMobile = useIsMobile(768);
  const navigate = useNavigate();
  const mail = donor.genderFlag === "M";

  const handleClick = () => {
    navigate("/remembrance/members");
  };

  return (
    <article className={clsx("flex w-full flex-col pb-[60px] pt-[54px]", "mobile:pt-p10")}>
      <div
        className={clsx(
          "relative flex gap-g10 px-p8 pb-[66px] text-gray-90",
          "mobile:flex-col mobile:items-center mobile:gap-g7 mobile:px-0 mobile:pb-[160px]",
        )}
      >
        <img
          src={blackRibbon}
          alt="추모 리본 이미지"
          className={clsx(
            "h-[280px] w-[250px] rounded-r6 object-cover",
            "mobile:h-[175px] mobile:w-[156px]",
          )}
        />

        <div>
          <h2 className={clsx("text-h-lg font-bold", "mobile:text-center mobile:text-h-md")}>
            추모합니다.
          </h2>

          {/* 추모자 정보 */}
          <div
            className={clsx(
              "mb-g8 mt-g4 flex gap-g10",
              "mobile:mb-g7 mobile:mt-g5 mobile:flex-col mobile:gap-g4",
            )}
          >
            <div className={clsx("flex gap-g3 text-b-lg", "mobile:text-b-md")}>
              <span className="font-bold">기증자</span>
              <span>{donor.donorName}</span>
            </div>
            <div className={clsx("flex gap-g3 text-b-lg", "mobile:text-b-md")}>
              <span className="font-bold">기증일</span>
              <time>{formatDateToDotNotation(donor.donationDate)}</time>
            </div>
          </div>

          {/* 추모글 */}
          <div className={clsx("flex flex-col gap-g4", "mobile:text-b-sm")}>
            <p>
              기증자 {donor.donorName} ({mail ? "남" : "여"},{donor.donorAge}) 님은{" "}
              {formatDateToKorean(donor.donationDate)} 환자들에게 귀중한 장기를 선물해 주셨습니다.
            </p>
            <p>
              한국장기조직기증원은 귀한 생명을 나눠주신 기증자와 유가족께 깊이 감사드리며,
              <br />
              앞으로도 기증자 유가족들이 건강한 삶을 유지할 수 있도록 최선을 다해 지원할 것입니다.
            </p>
            <p>고인의 명복을 빕니다.</p>
          </div>

          {/* 헌화 이미지 */}
          <img
            src={tributeFlower}
            aria-hidden="true"
            draggable="false"
            className={clsx(
              "absolute right-0 top-0 h-[401px] w-[304px]",
              "bottom-g5 top-auto mobile:h-[203px] mobile:w-[154px]",
            )}
          />
        </div>
      </div>

      <div className={clsx("flex justify-end gap-g7", "mobile:gap-g4")}>
        <Button
          size={isMobile ? "small" : "large"}
          className="mobile:text-b-xs"
          aria-label={`${donor.donorName}에게 하늘나라 편지 쓰기`}
        >
          하늘나라 편지쓰기
        </Button>
        <Button
          variant="tertiary"
          size={isMobile ? "small" : "large"}
          className="mobile:text-b-xs"
          aria-label={`${donor.donorName}에게 하늘나라 편지 쓰기`}
          onClick={handleClick}
        >
          목록
        </Button>
      </div>
    </article>
  );
}
