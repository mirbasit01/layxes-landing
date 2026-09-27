import { ImageResponse } from "next/og";

export const alt = "LAYXES Winter Drop 01 — Premium winter streetwear";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px", background: "#080808", color: "#fff", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: 9 }}>LAYXES</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 20, letterSpacing: 6, color: "#aaa" }}>WINTER DROP 01 · 2026</div>
        <div style={{ display: "flex", marginTop: 18, fontSize: 86, fontWeight: 700, letterSpacing: -5 }}>WINTER, REIMAGINED.</div>
        <div style={{ display: "flex", marginTop: 18, fontSize: 26, color: "#c8c8c8" }}>Premium winter essentials · Designed in Pakistan</div>
      </div>
      <div style={{ display: "flex", width: 80, height: 3, background: "#fff" }} />
    </div>,
    size,
  );
}
