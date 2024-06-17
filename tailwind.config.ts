import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",

      dark: "rgba(3, 10, 6, 1)",

      black: "#000000",
      white: "#FFFFFF",
    },
    extend: {
      fontFamily: {
        bowlby: ["var(--font-bowlby)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
    },
    screens: {
      xs: "640px",
      s: "1024px",
      m: "1280px",
      md: "1512px",
    },
  },
  plugins: [],
};
export default config;
