import TabPanel from "../common/TabPanel";
import { notices, pressReleases } from "./mock-data";
import Table from "./Table";

export default function KodaNews() {
  return (
    <section className="flex h-full w-full flex-col" aria-labelledby="koda-news-heading">
      <h2 id="koda-news-heading" className="mb-g5 text-h-md font-bold mobile:text-h-sm">
        한국장기조직기증원 소식
      </h2>
      <article className="flex flex-1 flex-col justify-between rounded-r6 border border-gray-30 px-p8 pb-p8 pt-p5">
        <TabPanel tabs={["공지사항", "보도자료"]}>
          <Table items={notices} label="공지사항 목록" />
          <Table items={pressReleases} label="보도자료 목록" />
        </TabPanel>
        <div className="text-right">
          {/* 지선님 컴포넌트로 교체 예정 */}
          <span className="text-b-sm">더보기</span>
        </div>
      </article>
    </section>
  );
}
