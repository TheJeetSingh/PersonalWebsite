import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#2E3A47", // midnight navy
        accent1: "#88A0A8", // pastel steel
        accent2: "#C2C5E8", // lavender haze
        highlight: "#F2F4FA", // moonlit white
        textSecondary: "#5C6773", // soft graphite
      },
      fontFamily: {
        lacquer: ["var(--font-lacquer)"],
        barrio: ["var(--font-barrio)"],
        schoolbell: ["var(--font-schoolbell)"],
        bungeeSpice: ["var(--font-bungee-spice)"],
        luckiestGuy: ["var(--font-luckiest-guy)"],
        dynaPuff: ["var(--font-dyna-puff)"],
      },
    },
  },
  plugins: [],
};
export default config;

