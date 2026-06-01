import { LoungesTool } from "@/components/modules/lounges-tool";
import { ModuleShell } from "@/components/page-header";
import { moduleMetadata } from "@/lib/seo";

export const metadata = moduleMetadata({
  title: "Lounge Access Finder",
  description:
    "Discover which airport lounges your Indian credit cards unlock — by airport, terminal, Priority Pass and Dreamfolks support, opening hours and guest access.",
  path: "/lounges",
});

export default function LoungesPage() {
  return (
    <ModuleShell
      eyebrow="Module · Lounges"
      title="Find the lounges your cards unlock."
      description="Search by airport or filter by card to see domestic and international lounges, terminals, hours, guest access and network support."
    >
      <LoungesTool />
    </ModuleShell>
  );
}
