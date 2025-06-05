import MedicalStaff from "@/assets/images/medical-staff.svg";
import Person from "@/assets/images/none-medical-person.svg";
import Organ from "@/assets/images/organ.svg";
import Tissue from "@/assets/images/tissue.svg";
import clsx from "clsx";

export default function QuickInfoCard({ isMobile }: { isMobile: boolean }) {
  return (
    <section
      className={clsx(
        isMobile && "mb-g11 px-p6",
        "ml-auto flex min-w-[386px] flex-col gap-4 text-b-md text-gray-90 mobile:mb-g8 mobile:min-w-full mobile:gap-g8",
      )}
    >
      <div className={clsx(!isMobile && "flex-col", "flex gap-g3")}>
        {/* 의료진 전용 */}
        <div
          className={clsx(
            isMobile && "border border-gray-20",
            "flex w-full items-center justify-between rounded-r3 bg-white",
            "px-p8 py-p6 mobile:px-p4",
          )}
        >
          <div>
            <p className="text-h-md font-bold text-[#15A88A] mobile:text-h-2xs">의료진 전용</p>
            <p className="mt-g3 flex gap-g5 text-gray-70 mobile:flex-col mobile:gap-0 mobile:text-b-xs">
              <span>뇌사시 통보</span>
              <span>1577-1458</span>
            </p>
          </div>
          <img
            src={MedicalStaff}
            alt="의료진 그림"
            className="h-[65px] w-[65px] mobile:h-[50px] mobile:w-[50px]"
          />
        </div>

        {/* 일반인 전용 */}
        <div
          className={clsx(
            isMobile && "border border-gray-20",
            "flex w-full items-center justify-between rounded-r3 bg-white",
            "px-p8 py-p6 mobile:px-p4",
          )}
        >
          <div>
            <p className="text-h-md font-bold text-[#D63D4A] mobile:text-h-2xs">일반인 전용</p>
            <p className="mt-g3 flex gap-g5 text-gray-70 mobile:flex-col mobile:gap-0 mobile:text-b-xs">
              <span>기증희망등록</span>
              <span>1544-0606</span>
            </p>
          </div>
          <img
            src={Person}
            alt="일반인 그림"
            className="mobile:w-[50px h-[65px] w-[65px] mobile:h-[50px]"
          />
        </div>
      </div>

      {/* 누적 기증자 */}
      <div
        className={clsx(
          isMobile && "border border-gray-20",
          "flex w-full flex-1 flex-col justify-between rounded-r3 bg-white px-p8 py-p6 mobile:gap-g5",
        )}
      >
        <p className="text-h-md font-bold mobile:text-h-sm">2025 누적 기증자</p>
        <div className="flex h-[170px] items-center justify-center gap-g11 mobile:h-[164px]">
          <div className="flex flex-col items-center justify-between">
            <img src={Organ} alt="장기 그림" className="h-[65px] w-[65px]" />
            <div className="text-center">
              <p className="text-h-xs font-bold mobile:text-h-xs">장기 기증자</p>
              <p className="text-b-xs text-gray-40">2025-01-16 (주간)</p>
              <p className="text-b-xs">
                <b className="mr-g2 text-d-md mobile:text-h-lg">25</b>명
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between">
            <img src={Tissue} alt="조직 그림" className="h-[65px] w-[65px]" />
            <div className="text-center">
              <p className="text-h-xs font-bold mobile:text-h-xs">조직 기증자</p>
              <p className="text-b-xs text-gray-40">2025-01-16 (주간)</p>
              <p className="text-b-xs">
                <b className="mr-g2 text-d-md mobile:text-h-lg">78</b>명
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
