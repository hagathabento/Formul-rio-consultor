import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Formulário Consultor – Diagnóstico e Terapia Alvo",
  description: "Formulário de feedback para consultores – Diagnóstico e Testagem Molecular, Estudo AGILE (IDH1 mutado).",
};

export const viewport: Viewport = {
  themeColor: "#4B2C78",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-white`}>
        {children}
      </body>
    </html>
  );
}
