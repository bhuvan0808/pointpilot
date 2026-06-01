import { StatusTrackerTool } from "@/components/modules/status-tracker-tool";
import { ModuleShell } from "@/components/page-header";
import { moduleMetadata } from "@/lib/seo";

export const metadata = moduleMetadata({
  title: "Airline Status Tracker",
  description:
    "Track your elite-status progress across airline loyalty programmes like KrisFlyer, Flying Blue, Qatar Privilege Club and Emirates Skywards. Stored locally, no login.",
  path: "/status-tracker",
});

export default function StatusTrackerPage() {
  return (
    <ModuleShell
      eyebrow="Module · Status Tracker"
      title="Watch your elite status climb."
      description="Log your current miles and renewal date for each programme. PointPilot shows a progress bar to your next tier — all stored privately in your browser."
    >
      <StatusTrackerTool />
    </ModuleShell>
  );
}
