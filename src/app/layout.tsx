import type { Metadata } from "next";
import Nav from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "刘灿 | AI Product Builder Portfolio",
  description:
    "个人作品集 — AI 产品创作者，专注于 AI 内容生产、用户增长与数字品牌表达。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className="min-h-screen bg-[#0b0b0f] text-white/85 antialiased">
        <Nav />
        {children}
      </body>
    </html>
  );
}
