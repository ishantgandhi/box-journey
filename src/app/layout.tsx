import type { Metadata } from "next";
import { Geist_Mono, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "box-journey",
  description: "Concept homepage redesign with a scroll-driven box journey.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hanken.variable} ${geistMono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
