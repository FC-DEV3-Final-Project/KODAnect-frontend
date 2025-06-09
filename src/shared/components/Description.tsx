import GuideCheckIcon from "@/assets/icon/guide-check.svg?react";

interface DescriptionProps {
  startBefore: string;
  checkItems: string[];
}

export function Description({ startBefore, checkItems }: DescriptionProps) {
  return (
    <section className="rounded-r6 border border-secondary-10 bg-secondary-5 px-p9 py-p10 mobile:px-p6 mobile:py-p8">
      <div className="pb-p8 mobile:pb-p6">
        <h2 className="mb-p8 flex gap-g2 text-h-md font-bold text-gray-95 mobile:mb-p5 mobile:text-h-xs">
          <GuideCheckIcon className="h-icon5 w-icon5 mobile:h-icon4 mobile:w-icon4" />
          시작하기 전에
        </h2>
        <p className="text-b-lg text-gray-90 mobile:text-b-sm">{startBefore}</p>
      </div>
      <div className="border-t border-dotted border-gray-30 pt-p8 mobile:pt-p6">
        <h3 className="mb-p6 text-h-sm font-bold text-gray-95 mobile:text-h-2xs">확인하세요!</h3>
        <ul className="flex flex-col gap-g4 text-b-md text-gray-70 mobile:text-b-xs">
          {checkItems.map((item, index) => (
            <li
              key={index}
              dangerouslySetInnerHTML={{ __html: item }}
              className="relative w-full pl-p8 before:absolute before:left-0 before:top-[9px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-gray-70 before:content-['']"
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
