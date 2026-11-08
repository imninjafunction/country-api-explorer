import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = "Country API Explorer: click a country to see its data and the API call behind it";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0f172a",
          color: "white",
        }}
      >
        <div style={{ fontSize: 28, color: "#60a5fa", marginBottom: 24 }}>Free · No API key</div>
        <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>{SITE_NAME}</div>
        <div style={{ fontSize: 36, color: "#cbd5e1", marginTop: 28, maxWidth: 900 }}>
          Click any country to see its capital, currency and more, plus the live API call behind it.
        </div>
      </div>
    ),
    size,
  );
}
