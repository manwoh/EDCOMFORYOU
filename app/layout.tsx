import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EDCOM TELESHOP Apple iPhone 分期",
  description: "EDCOM TELESHOP Apple iPhone installment page"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
