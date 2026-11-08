import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2563eb",
          borderRadius: 14,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 19,
            border: "4px solid white",
            display: "flex",
          }}
        />
      </div>
    ),
    size,
  );
}
