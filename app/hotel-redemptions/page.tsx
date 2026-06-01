import { HotelRedemptionsTool } from "@/components/modules/hotel-redemptions-tool";
import { ModuleShell } from "@/components/page-header";
import { moduleMetadata } from "@/lib/seo";

export const metadata = moduleMetadata({
  title: "Hotel Points Redemption",
  description:
    "Turn Marriott Bonvoy, Hilton Honors, IHG One Rewards and World of Hyatt points into the best nightly value for your destination.",
  path: "/hotel-redemptions",
});

export default function HotelRedemptionsPage() {
  return (
    <ModuleShell
      eyebrow="Module · Hotel Redemptions"
      title="Make every hotel point count."
      description="Enter your hotel points and where you're staying. PointPilot estimates nights possible, value per point and which programme stretches furthest."
    >
      <HotelRedemptionsTool />
    </ModuleShell>
  );
}
