import { DashboardView } from "@/components/modules/dashboard-view";
import { ModuleShell } from "@/components/page-header";
import { moduleMetadata } from "@/lib/seo";

export const metadata = moduleMetadata({
  title: "Travel Dashboard",
  description:
    "Your travel rewards command centre: airline status progress, saved fare alerts, recent searches and quick access to every PointPilot tool — all stored locally.",
  path: "/dashboard",
});

export default function DashboardPage() {
  return (
    <ModuleShell
      eyebrow="Your dashboard"
      title="Everything in one place."
      description="A private overview of your tracked status, fare alerts and recent searches — saved in your browser, no login required."
    >
      <DashboardView />
    </ModuleShell>
  );
}
