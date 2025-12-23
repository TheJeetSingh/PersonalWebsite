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
      <head>
        {/* Google Fonts for Rich Text Editor */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lora:wght@400;700&family=Merriweather:wght@400;700&family=Crimson+Text:wght@400;700&family=Libre+Baskerville:wght@400;700&family=EB+Garamond:wght@400;700&family=Cormorant:wght@400;700&family=Inter:wght@400;700&family=Roboto:wght@400;700&family=Open+Sans:wght@400;700&family=Montserrat:wght@400;700&family=Poppins:wght@400;700&family=Nunito:wght@400;700&family=Raleway:wght@400;700&family=Work+Sans:wght@400;700&family=Outfit:wght@400;700&family=Space+Grotesk:wght@400;700&family=Bebas+Neue&family=Oswald:wght@400;700&family=Righteous&family=Bungee&family=Luckiest+Guy&family=Bangers&family=Fredoka+One&family=Dancing+Script:wght@400;700&family=Pacifico&family=Caveat:wght@400;700&family=Satisfy&family=Great+Vibes&family=Kalam:wght@400;700&family=Patrick+Hand&family=Fira+Code:wght@400;700&family=JetBrains+Mono:wght@400;700&family=Source+Code+Pro:wght@400;700&family=IBM+Plex+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Navigation />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}

