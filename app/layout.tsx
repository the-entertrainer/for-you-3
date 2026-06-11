import type { Metadata } from "next";
import { Cinzel, Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

// Cinematic, elegant font for the main N-I-K-I-T-A letters (cinematic weight)
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

// Modern, highly legible sans for expanded reading text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Clean geometric font for additional text elements
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "For You <3",
  description: "A dark glassy liquid experience for NIKITA. Mobile-native 9:16 web app with refractive glass shaders and liquid Framer Motion physics.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${inter.variable} ${outfit.variable} h-dvh w-screen overflow-hidden antialiased dark`}
    >
      <body className="h-dvh w-screen overflow-hidden bg-[#050505] text-white">
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
