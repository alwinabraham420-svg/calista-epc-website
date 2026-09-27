import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Calista EPC | Construction Company in Kerala",
  description:
    "Calista EPC Pvt Ltd is a premier construction and EPC company in Alappuzha and across Kerala, delivering exceptional residential architecture, contemporary homes, and engineering excellence built to last.",
  keywords: [
    "Calista EPC",
    "Construction Company in Kerala",
    "Builders in Alappuzha",
    "Kerala luxury homes",
    "Contemporary Kerala house construction",
    "Architectural builders Kerala",
  ],
  authors: [{ name: "Calista EPC Pvt Ltd" }],
  openGraph: {
    title: "Calista EPC | Construction Company in Kerala",
    description:
      "Transforming visions into exceptional architectural spaces for over 15 years across Kerala.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <body
        className="font-sans antialiased text-[#111827] bg-[#FFFFFF] min-h-screen"
        suppressHydrationWarning
      >
        <SmoothScrollProvider>
          <CustomCursor />
          <ScrollProgress />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
