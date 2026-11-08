import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Placeholder OG artwork; replace with the owner-supplied mascot artwork before launch. */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 90,
        background: "#f7f3ed",
        color: "#46372e",
      }}
    >
      <div style={{ fontSize: 34, letterSpacing: 8, textTransform: "uppercase" }}>BuddyDays</div>
      <div style={{ marginTop: 28, fontSize: 76, lineHeight: 1.05, fontWeight: 600 }}>Better days, together.</div>
      <div style={{ marginTop: 28, fontSize: 30, color: "#68736b" }}>Thoughtful guides for dogs and cats.</div>
    </div>,
    size,
  );
}
