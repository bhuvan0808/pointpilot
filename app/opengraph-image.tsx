import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f2ead9",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, rgba(60,40,30,0.06) 2px, transparent 0)",
          backgroundSize: "50px 50px",
          padding: "70px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "14px",
              backgroundColor: "#b14730",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f4efe4",
              fontSize: "34px",
            }}
          >
            ✦
          </div>
          <div style={{ fontSize: "38px", fontWeight: 700, color: "#2b2118" }}>
            {siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 700,
              color: "#2b2118",
              lineHeight: 1.05,
              maxWidth: "900px",
            }}
          >
            Fly further on the points you already have.
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "32px",
              color: "#6b5a4a",
              maxWidth: "820px",
            }}
          >
            Rank credit card transfer partners for the best flight redemptions —
            built for Indian travellers.
          </div>
        </div>

        <div style={{ fontSize: "26px", color: "#b14730", fontWeight: 600 }}>
          5 cards · 8 airline programmes · free & no sign-up
        </div>
      </div>
    ),
    { ...size }
  );
}
