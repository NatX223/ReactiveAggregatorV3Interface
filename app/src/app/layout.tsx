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
  title: "Reactivate - Keep Your Reactive Contracts Alive",
  description:
    "Reactivate ensures your Reactive and Callback contracts never go inactive. Monitor balances, automate refills, and stay worry-free with ETH, REACT, or stablecoins.",
  keywords:
    "reactive contracts, callback contracts, smart contract monitoring, auto refills, Web3 infrastructure, blockchain automation",
  openGraph: {
    title: "Reactivate - Keep Your Reactive Contracts Alive",
    description:
      "A monitoring and refill system for Reactive contracts. Track, top-up, and automate — ensuring your dApps never stop working.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reactivate - Autonomous Monitoring for Reactive Contracts",
    description:
      "Never let your Reactive or Callback contracts go inactive. Reactivate tracks and automatically refills balances.",
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
