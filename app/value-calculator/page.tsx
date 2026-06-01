import { ValueCalculatorTool } from "@/components/modules/value-calculator-tool";
import { ModuleShell } from "@/components/page-header";
import { moduleMetadata } from "@/lib/seo";

export const metadata = moduleMetadata({
  title: "Value Calculator",
  description:
    "Work out the cents-per-point (CPP) value of any award redemption and get a clear redeem-or-pay-cash recommendation.",
  path: "/value-calculator",
});

export default function ValueCalculatorPage() {
  return (
    <ModuleShell
      eyebrow="Module · Value Calculator"
      title="Redeem points or pay cash?"
      description="Enter the cash fare, the miles required and the taxes. PointPilot computes your value-per-point and tells you whether redeeming is worth it."
    >
      <ValueCalculatorTool />
    </ModuleShell>
  );
}
