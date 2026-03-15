import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], display: "swap", variable: "--font-sora" });
export const metadata: Metadata = {
  title: "LAWZ — Law Within Reach | Find Verified Lawyers, Book Consultations",
  description: "LAWZ is a premium legal marketplace where you can find verified lawyers, compare fees, book affordable consultations, and join a legal community. Trusted legal help, made easier.",
  keywords: "lawyers, legal help, consultation, book lawyer, find lawyer, legal community, Bangladesh lawyers",
  openGraph: {
    title: "LAWZ — Law Within Reach",
    description: "Find verified lawyers, compare fees, book affordable consultations, and join a legal community.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
