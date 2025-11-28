import type { Metadata } from "next";
import { Lacquer, Barrio, Schoolbell, Bungee_Spice, Luckiest_Guy, DynaPuff } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/Navigation";

const lacquer = Lacquer({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lacquer",
});

const barrio = Barrio({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-barrio",
});

const schoolbell = Schoolbell({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-schoolbell",
});

const bungeeSpice = Bungee_Spice({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bungee-spice",
});

const luckiestGuy = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-luckiest-guy",
});

const dynaPuff = DynaPuff({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dyna-puff",
});

const bouncy = localFont({
  src: "./fonts/Bouncy-PERSONAL_USE_ONLY.otf",
  variable: "--font-bouncy",
});

export const metadata: Metadata = {
  title: "Jeet Rocks - Portfolio & Blog",
  description: "Personal website showcasing projects, achievements, experiences, and blog posts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lacquer.variable} ${barrio.variable} ${schoolbell.variable} ${bungeeSpice.variable} ${luckiestGuy.variable} ${dynaPuff.variable} ${bouncy.variable}`}>
      <body className="antialiased">
        <Navigation />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}

