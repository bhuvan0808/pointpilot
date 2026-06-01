import { TransferSimulatorTool } from "@/components/modules/transfer-simulator-tool";
import { ModuleShell } from "@/components/page-header";
import { moduleMetadata } from "@/lib/seo";

export const metadata = moduleMetadata({
  title: "Point Transfer Simulator",
  description:
    "Simulate transferring credit card points to an airline programme: see exact miles received, transfer timing and historical transfer bonuses.",
  path: "/transfer-simulator",
});

export default function TransferSimulatorPage() {
  return (
    <ModuleShell
      eyebrow="Module · Transfer Simulator"
      title="See exactly what you'll get before you transfer."
      description="Pick a card, a points amount and a partner. PointPilot shows the precise miles you'd receive, how long it takes and the bonuses worth waiting for."
    >
      <TransferSimulatorTool />
    </ModuleShell>
  );
}
