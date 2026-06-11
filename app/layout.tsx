import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-dvh w-screen overflow-hidden antialiased dark`}
    >
      <body className="h-dvh w-screen overflow-hidden bg-[#050505] text-white">
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
