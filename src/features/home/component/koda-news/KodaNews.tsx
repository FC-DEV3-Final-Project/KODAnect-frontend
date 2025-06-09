import { MoreButton } from "@/features/home/component/common/MoreButton";
import TabPanel from "@/features/home/component/common/TabPanel";
import Table from "@/features/home/component/koda-news/Table";
import { notices, pressReleases } from "@/features/home/component/koda-news/mock-data";

export default function KodaNews() {
  return (
    <section className="flex h-full w-full flex-col" aria-labelledby="koda-news-heading">
      <h2 id="koda-news-heading" className="mb-g5 text-h-md font-bold mobile:text-h-sm">
        한국장기조직기증원 소식
      </h2>
      <article className="relative flex flex-1 flex-col gap-g5 rounded-r6 border border-gray-30 px-p8 pb-8 pt-p5">
        <TabPanel tabs={["공지사항", "보도자료"]}>
          <Table items={notices} label="공지사항 목록" />
          <Table items={pressReleases} label="보도자료 목록" />
        </TabPanel>
        <MoreButton className="justify-end text-b-sm" />
      </article>
    </section>
  );
}
