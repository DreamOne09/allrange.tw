import type { Metadata } from "next";
import { Inter, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-tc",
});

export const metadata: Metadata = {
  title: "AllRange Design | 樂橙創作設計",
  description: "用策展思維打造空間。劉懿德(Claire)與樂橙設計團隊，專注於展場設計、各類空間規劃與平面設計。",
  keywords: ["展場設計", "空間規劃", "平面設計", "AllRange", "樂橙創作", "劉懿德"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoSansTC.variable} antialiased font-sans bg-brand-black text-white selection:bg-brand-orange selection:text-black`}
      >
        <ThemeProvider>
          <Preloader />
          <Navbar />
          <main className="min-h-screen relative overflow-hidden">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
