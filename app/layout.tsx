import type { Metadata } from "next";
import { Josefin_Sans, Alata, Montserrat } from "next/font/google";
import "./globals.css";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

const alata = Alata({
  variable: "--font-alata",
  weight: "400",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Asset Pulse – Investment Tracker",
  description: "Track and manage your investment portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.variable} ${alata.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
