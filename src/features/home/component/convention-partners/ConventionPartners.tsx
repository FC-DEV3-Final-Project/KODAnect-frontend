import TabPanel from "@/features/home/component/common/TabPanel";
import AgencySlideList from "@/features/home/component/convention-partners/AgencySlideList";
import { activationAgencies, brainDeathAgencies } from "@/features/home/mock-data";

export default function ConventionPartner() {
  return (
    <section className="w-full" aria-labelledby="section-heading-partners">
      <h2 id="section-heading-partners" className="mb-g5 text-h-md font-bold mobile:text-h-sm">
        협약기관
      </h2>
      <TabPanel tabs={["뇌사자 관리업무", "기증 활성화 프로그램"]}>
        <AgencySlideList items={brainDeathAgencies} />
        <AgencySlideList items={activationAgencies} />
      </TabPanel>
    </section>
  );
}
