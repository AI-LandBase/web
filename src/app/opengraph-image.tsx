import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "株式会社 AI.LandBase — 沖縄の観光業に、AI という伴走者を。";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const [logoData, fontData] = await Promise.all([
    readFile(join(process.cwd(), "public", "logo", "logo.png")),
    readFile(join(process.cwd(), "src", "app", "_fonts", "NotoSansJP-Bold.woff2")),
  ]);

  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #142840 0%, #1E3A5F 50%, #2C4F7C 100%)",
          fontFamily: '"Noto Sans JP", sans-serif',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt=""
          width={220}
          height={220}
          style={{ borderRadius: 24 }}
        />
        <div
          style={{
            marginTop: 32,
            fontSize: 48,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "0.02em",
          }}
        >
          AI.LandBase
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 24,
            color: "#B8C5D6",
            letterSpacing: "0.04em",
          }}
        >
          沖縄の観光業に、AI という伴走者を。
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Noto Sans JP",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
