import type { Metadata } from "next";
import { Playfair_Display, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

// Elegant, cinematic variable display font for the main N-I-K-I-T-A letters
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

// Modern, highly legible variable sans for body and expanded text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Modern geometric variable sans for labels, emphasis and UI elements (reactive feel)
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
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
      className={`${playfair.variable} ${inter.variable} ${spaceGrotesk.variable} h-dvh w-screen overflow-hidden antialiased dark`}
    >
      <body className="h-dvh w-screen overflow-hidden bg-[#050505] text-white">
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
