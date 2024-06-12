import type { Config } from "tailwindcss";
//import { caveat } from '@/app/fonts';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        caveat: ["var(--font-caveat)"],
        inter: ["var(--font-inter)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        blue: {
          400: "#2589FE",
          500: "#0070F3",
          600: "#2F6FEB",
        },
        custom: {
          primary: " #730040", // Color primario
          secondary: "#877537", // Color secundario
          tertiary: "#eee", // Color terciario
          fourth: "#1A2528", // Cuarto color
          white: "#FFFFFF", // Blanco
          black: "#000000", // Negro
        },
      },
    },
  },
  plugins: [],
};
export default config;
