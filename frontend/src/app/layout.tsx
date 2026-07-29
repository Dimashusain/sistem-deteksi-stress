import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SereneCheck | Deteksi Dini Tingkat Stres Mahasiswa",
  description: "Sistem Pakar berbasis Certainty Factor (CF) untuk membantu mahasiswa tingkat akhir mendeteksi dini tingkat stres secara ilmiah, profesional, dan akurat.",
  keywords: ["Sistem Pakar", "Certainty Factor", "Stres Mahasiswa", "Skripsi Stres", "Kesehatan Mental", "SereneCheck"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-background-custom text-primary">
        {children}
      </body>
    </html>
  );
}
