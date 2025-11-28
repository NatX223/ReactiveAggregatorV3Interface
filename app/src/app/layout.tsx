import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { Web3Provider } from "@/providers/Web3Provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReactiveAggregator - Price feed on any chain",
  description:
    "ReactiveAggregator provides decentralized price feeds across multiple blockchains. Access real-time cryptocurrency prices with our reliable, cross-chain oracle solution.",
  keywords:
    "price feeds, oracle, cryptocurrency prices, cross-chain, blockchain data, DeFi infrastructure, real-time prices, decentralized oracle",
  openGraph: {
    title: "ReactiveAggregator - Decentralized Price Feeds",
    description:
      "Access reliable cryptocurrency price data across multiple chains. ReactiveAggregator delivers real-time price feeds for your DeFi applications.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReactiveAggregator - Cross-Chain Price Oracle",
    description:
      "Get real-time cryptocurrency prices on any blockchain. Reliable, decentralized price feeds for your DeFi projects.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`font-clash antialiased`}
      >
        <Toaster position="top-right"/>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
