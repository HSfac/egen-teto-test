import type { Metadata } from "next";
import "./globals.css";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "에겐/테토 에너지 테스트",
  description: "요즘 유행 에너지 타입 테스트 - 24문항, 1~2분, 오락용",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-dvh bg-bg text-text">
        <div className="mx-auto mobile-frame px-5 py-6">{children}</div>
        <AdBanner />
      </body>
    </html>
  );
}
