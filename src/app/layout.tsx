import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PYRAX - TriStream ZK-DAG Blockchain",
  description:
    "PYRAX is a Layer 1 blockchain combining Proof-of-Work BlockDAG consensus with zero-knowledge proof-based finality. Dual mining streams, EVM compatible, ZK-proven finality.",
  keywords: [
    "blockchain",
    "cryptocurrency",
    "PYRAX",
    "PYRX",
    "ZK",
    "zero-knowledge",
    "DAG",
    "BlockDAG",
    "proof-of-work",
    "EVM",
  ],
  authors: [{ name: "PYRAX Team" }],
  openGraph: {
    title: "PYRAX - TriStream ZK-DAG Blockchain",
    description:
      "Layer 1 blockchain with dual mining streams and ZK-proven finality",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
