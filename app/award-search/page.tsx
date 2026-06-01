import { AwardSearchTool } from "@/components/modules/award-search-tool";
import { ModuleShell } from "@/components/page-header";
import { moduleMetadata } from "@/lib/seo";

export const metadata = moduleMetadata({
  title: "Award Flight Search",
  description:
    "Search award flights from any city worldwide. Compare miles required, taxes, transfer partners and value-per-point across Singapore KrisFlyer, Flying Blue, Qatar & British Airways Avios, Air India and Emirates.",
  path: "/award-search",
});

export default function AwardSearchPage() {
  return (
    <ModuleShell
      eyebrow="Module · Award Search"
      title="Find the cheapest miles for any route."
      description="Pick any two cities on earth, a cabin and a date. PointPilot ranks every supported airline programme by the real value you'd unlock — net of taxes."
    >
      <AwardSearchTool />
    </ModuleShell>
  );
}
