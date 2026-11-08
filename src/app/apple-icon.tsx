import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Placeholder app icon; replace with a licensed mascot asset before launch. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 36,
        background: "#6b806c",
        color: "white",
        fontSize: 86,
        fontWeight: 700,
      }}
    >
      B
    </div>,
    size,
  );
}
