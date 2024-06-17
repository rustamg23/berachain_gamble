import "./globals.css";

import type { Metadata } from "next";
import { Poppins, Bowlby_One } from "next/font/google";
import { cn } from "@/shared/utils";

export const metadata: Metadata = {
  title: "Junky Ursas",
  description: "Who let the beras out?",
  metadataBase: new URL("https://junkyursas.com/"),
};

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const bowlby = Bowlby_One({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bowlby",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(bowlby.variable, poppins.variable, "bg-dark text-white")}
    >
      <body>{children}</body>
    </html>
  );
}
