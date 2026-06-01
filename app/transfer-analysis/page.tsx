import { TransferAnalysisTool } from "@/components/modules/transfer-analysis-tool";
import { ModuleShell } from "@/components/page-header";
import { moduleMetadata } from "@/lib/seo";

export const metadata = moduleMetadata({
  title: "Transfer Partner Analyzer",
  description:
    "See every airline transfer partner for your Indian credit card — ratios, recent transfer bonuses, typical redemption value, sweet spots and recommended uses.",
  path: "/transfer-analysis",
});

export default function TransferAnalysisPage() {
  return (
    <ModuleShell
      eyebrow="Module · Transfer Analysis"
      title="Know every partner your card can reach."
      description="Choose a card to reveal its airline transfer partners, the ratios, recent bonuses and the sweet spots worth transferring for."
    >
      <TransferAnalysisTool />
    </ModuleShell>
  );
}
