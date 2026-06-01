import { CardOptimizerTool } from "@/components/modules/card-optimizer-tool";
import { ModuleShell } from "@/components/page-header";
import { moduleMetadata } from "@/lib/seo";

export const metadata = moduleMetadata({
  title: "Credit Card Optimizer",
  description:
    "Find the best credit card to swipe for flights, hotels, dining and general spend. See your projected annual rewards and how much you lose by using the wrong card.",
  path: "/card-optimizer",
});

export default function CardOptimizerPage() {
  return (
    <ModuleShell
      eyebrow="Module · Card Optimizer"
      title="Swipe the right card, every time."
      description="Tell us your cards and how much you spend in each category. PointPilot shows the best card per category, your projected annual rewards and what poor card choice costs you."
    >
      <CardOptimizerTool />
    </ModuleShell>
  );
}
