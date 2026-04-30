import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/api/inquiries",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            // ローカル/ステージング: 未設定で "*" 許容、本番: LPオリジンを指定
            value: process.env.ALLOWED_ORIGIN ?? "*",
          },
          { key: "Access-Control-Allow-Methods", value: "POST, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
    ];
  },
};

export default nextConfig;
