import { FareAlertsTool } from "@/components/modules/fare-alerts-tool";
import { ModuleShell } from "@/components/page-header";
import { moduleMetadata } from "@/lib/seo";

export const metadata = moduleMetadata({
  title: "Fare Alerts",
  description:
    "Set a target fare for any route and track it. Stored privately in your browser, with a roadmap to scheduled checks, email and push notifications.",
  path: "/fare-alerts",
});

export default function FareAlertsPage() {
  return (
    <ModuleShell
      eyebrow="Module · Fare Alerts"
      title="Set your price. Watch the route."
      description="Create a fare alert for any city pair and target price. PointPilot keeps your alerts locally today — with email and push notifications on the roadmap."
    >
      <FareAlertsTool />
    </ModuleShell>
  );
}
