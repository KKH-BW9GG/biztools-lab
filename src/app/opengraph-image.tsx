import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BizTools Lab";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#1d1d1f",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 100px",
        position: "relative",
      }}
    >
      <div
        style={{
          width: 6,
          height: 100,
          background: "#0071e3",
          borderRadius: 3,
          marginBottom: 28,
        }}
      />
      <div
        style={{
          fontSize: 64,
          fontWeight: 900,
          color: "white",
          letterSpacing: "-2px",
          lineHeight: 1.1,
        }}
      >
        BizTools Lab
      </div>
      <div
        style={{ fontSize: 26, color: "rgba(255,255,255,0.45)", marginTop: 20 }}
      >
        使って良かったものだけ。正直レビュー。
      </div>
      <div
        style={{
          position: "absolute",
          right: 120,
          top: "50%",
          width: 180,
          height: 180,
          background: "#0071e3",
          borderRadius: "50%",
          opacity: 0.1,
          transform: "translateY(-50%)",
        }}
      />
    </div>,
    { ...size },
  );
}
