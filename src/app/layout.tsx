import type { Metadata } from "next";
import { Big_Shoulders, Inter } from "next/font/google";
import "./globals.css";

const bigShoulders = Big_Shoulders({
  variable: "--font-display-var",
  weight: ["700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body-var",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SporAirFitness — Elit Performans Stüdyosu",
  description:
    "Hedefini ciddiye al. Premium fitness koçluğu, bilimsel programlama, sıfır taviz.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="tr"
      className={`${bigShoulders.variable} ${inter.variable}`}
    >
      <body className="grain bg-[#0a0a0a] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
