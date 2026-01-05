import type { Metadata } from "next";
import { Inter, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import { ThemeProvider } from "@/context/ThemeContext";

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
  keywords: ["展場設計", "空間規劃", "平面設計", "AllRange", "樂橙創作", "劉懿德", "Exhibition Design", "Interior Design"],
  openGraph: {
    title: "AllRange Design | 樂橙創作設計",
    description: "用策展思維打造空間。劉懿德(Claire)與樂橙設計團隊，專注於展場設計、各類空間規劃與平面設計。",
    url: "https://dreamone09.github.io/allrange.tw/",
    siteName: "AllRange Design",
    images: [
      {
        url: "/allrange.tw/images/projects/cmp/cmp-main.png", // Use a representative image
        width: 1200,
        height: 630,
        alt: "AllRange Design Portfolio",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="scroll-smooth" suppressHydrationWarning style={{ backgroundColor: '#000000' }}>
      <body
        className={`${inter.variable} ${notoSansTC.variable} antialiased font-sans bg-brand-black text-white selection:bg-brand-orange selection:text-black`}
        style={{ backgroundColor: '#000000' }}
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
