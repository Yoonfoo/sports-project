import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import logoPic from "../../public/sports-website-logo-transformed.webp"
import Image from "next/image";
import Link from "next/link";
import DropDown from "./drop-down-button";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-black flex items-center justify-between h-12">
            <Image src={logoPic} alt="logo" width={40} height={40} className="ml-4"/>
            <DropDown/>
        </div>
        <div id="dropDownMenu" className="absolute flex flex-col items-center justify-center w-full bg-gray-200 z-30 hidden">
            <Link href="/" className="text-md font-sans p-4 border-b-2 border-black w-full text-center">Home</Link>
            <Link href="/player" className="text-md font-sans p-4 border-b-2 border-black w-full text-center">Player</Link>
            <Link href="/playerStats" className="text-md font-sans p-4 border-b-2 border-black w-full text-center">Stats</Link>
            <Link href="/scoreboard" className="text-md font-sans p-4 border-b-2 border-black w-full text-center">Scoreboard</Link>
            <Link href="/standings" className="text-md font-sans p-4 border-b-2 border-black w-full text-center">Standings</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
